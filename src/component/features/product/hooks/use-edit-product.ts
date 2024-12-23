import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductDto } from "../types/product.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validations/product.validate";

export const useEditProduct = (id: number) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDto>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (newProduct: FormData) => {
      const response = await axiosInstance.patch(`/product/${id}`, newProduct);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsKey"] });
    },
  });

  const onSubmit: SubmitHandler<ProductDto> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stock", data.stock.toString());
      formData.append("discount", data.discount.toString());
      if (data.photoProduct) {
        formData.append("photoProduct", data.photoProduct[0]);
      }

      mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
