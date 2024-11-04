import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";

export const useAuthGoogle = () => {
  const { data, refetch } = useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/google");
      return response.data.url;
    },
    staleTime: 0,
  });

  return {
    googleAuthUrl: data,
    refetch,
  };
};
