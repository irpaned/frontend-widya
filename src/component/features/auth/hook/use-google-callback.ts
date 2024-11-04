import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useHandleGoogleToken = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (token: string) => {
      sessionStorage.setItem("token", token);
      window.location.href = "/";
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Gagal menyimpan token:", error);
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      mutate(token);
    } else {
      console.error("Token tidak ditemukan di URL.");
    }
  }, [mutate]);
};
