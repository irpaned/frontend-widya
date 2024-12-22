import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../libs/axios";
import { LoginSchemaZod } from "../validators/auth";
import { LoginType } from "../types/login-type";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useState } from "react";

export const useLoginForm = () => {
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
  } = useForm<LoginType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchemaZod),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: LoginType) => {
      const res = await axiosInstance.post("/auth/login", data);
      const { token, restUser } = res.data;
      if (token) {
        sessionStorage.setItem("token", token);
      }
      return restUser;
    },
    onSuccess: () => {
      toast.success("Login Success!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setSnackbarMessage("Login Success!");
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        setSnackbarMessage("Email or Password is wrong!");
        setSnackbarOpen(true);
      }
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
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
  };
};
