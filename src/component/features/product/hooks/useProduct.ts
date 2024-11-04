import { useQuery } from "@tanstack/react-query";
import { ProductEntity } from "../entities/ProductEntity";
import { axiosInstance } from "../../../../libs/axios";

export const useProduct = () => {
  const { data: products } = useQuery<ProductEntity[]>({
    queryKey: ["productsKey"],
    queryFn: getProducts,
  });

  async function getProducts() {
    const response = await axiosInstance.get("/products", {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    });
    console.log("first", response.data);
    return response.data.reverse();
  }

  return {
    products,
  };
};
