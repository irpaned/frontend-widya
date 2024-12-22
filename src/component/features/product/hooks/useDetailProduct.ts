import { useQuery } from "@tanstack/react-query";
import { ProductEntity } from "../entities/ProductEntity";
import { axiosInstance } from "../../../../libs/axios";

export const useDetailProduct = (id: number) => {
  const { data: products } = useQuery<ProductEntity>({
    queryKey: ["detailProductsKey"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    },
  });

  return {
    products,
  };
};
