import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";

export const useDeleteThread = (id: number) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete("/product/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productsKey"] });
    },
  });

  const onDelete = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    onDelete,
  };
};
