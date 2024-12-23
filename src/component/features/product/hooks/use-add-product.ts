import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductDto } from "../types/product.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../validations/product.validate";
import { AxiosError } from "axios";
import { ProductEntity } from "../entities/ProductEntity";

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductDto>({
    mode: "onSubmit",
    resolver: zodResolver(productSchema),
  });

  const { mutateAsync } = useMutation<ProductEntity, AxiosError, ProductDto>({
    mutationFn: async (product) => {
      const formData = new FormData();
      formData.append("price", `${product.price}`);
      formData.append("description", product.description);
      formData.append("stock", `${product.stock}`);
      formData.append("discount", `${product.discount}`);

      formData.append("productName", product.productName);

      if (product.photoProduct) {
        formData.append("photoProduct", product.photoProduct[0]);
      }
      return await axiosInstance.post("/product", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsKey"] });
    },
  });

  const onSubmit: SubmitHandler<ProductDto> = async (data) => {
    try {
      await mutateAsync(data);
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
