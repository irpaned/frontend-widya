import React from "react";
import { RegisterForm } from "../types/register-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../libs/axios";
import { RegisterSchema } from "../validators/auth";

export const useRegisterForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    handleClick,
    show,
    setShow,
    errors,
    onSubmit,
  };
};
