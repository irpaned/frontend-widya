import { useQuery } from "@tanstack/react-query";
import { ProductEntity } from "../entities/ProductEntity";
import { axiosInstance } from "../../../../libs/axios";

export const useMyProduct = () => {
  const { data: products } = useQuery<ProductEntity[]>({
    queryKey: ["productsKey"],
    queryFn: getMyProducts,
  });

  async function getMyProducts() {
    const response = await axiosInstance.get("/my-product", {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    return response.data.reverse();
  }

  return {
    products,
  };
};
