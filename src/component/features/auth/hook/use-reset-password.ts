import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../libs/axios";
import { ResetPassword } from "../types/reset-password";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useState } from "react";
import { ResetPasswordSchemaZod } from "../validators/auth";

export const useResetPasswordForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPassword>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordSchemaZod),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: ResetPassword) => {
      const res = await axiosInstance.patch("/auth/resetpassword", data);
      const { token, restUser } = res.data;
      if (token) {
        sessionStorage.setItem("token", token);
      }
      return restUser;
    },
    onSuccess: () => {
      toast.success("Reset Password Success!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setSnackbarMessage("Reset Password Success!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setSnackbarMessage("Email or Password is wrong!");
        setSnackbarOpen(true);
      }
    },
  });

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    await mutateAsync(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    handleClick,
    show,
    setShow,
    snackbarOpen,
    snackbarMessage,
    handleSnackbarClose,
    watch,
  };
};
