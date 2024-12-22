import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { createTransactionSchema } from "../validations/product.validate";
import { TransactionDto, TransactionResponseDto } from "../types/product.dto";

export const useCreateTransaction = (id: number) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TransactionDto>({
    mode: "onSubmit",
    resolver: zodResolver(createTransactionSchema),
  });

  const { mutateAsync } = useMutation<
    TransactionResponseDto, // Perbarui tipe hasil di sini
    AxiosError,
    TransactionDto
  >({
    mutationFn: async (transactionData) => {
      const response = await axiosInstance.post(
        "/create-transaction/" + id,
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      if (data.token) {
        if (window.snap) {
          window.snap.pay(data.token);
        } else {
          console.error("Error: snap.pay is not defined");
        }
      }
    },

    onError: (error) => {
      console.error("Error creating transaction:", error);
    },
  });

  const onSubmit: SubmitHandler<TransactionDto> = async (data) => {
    try {
      await mutateAsync(data); // Mutasi data ke backend
    } catch (error) {
      console.error(error);
    }
  };

  return {
    setValue,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
