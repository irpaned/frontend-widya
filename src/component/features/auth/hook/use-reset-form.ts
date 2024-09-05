import React from "react";
import { api } from "../../../libraries/api";
import { ResetForm } from "../types/reset-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ResetFormSchema } from "../validators/reset-form";
import axios from "axios";

export const useResetForm = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    mode: "onChange",
    resolver: zodResolver(ResetFormSchema),
  });

  const onSubmit: SubmitHandler<ResetForm> = async (data) => {
    try {
      const response = await api.post("/auth/reset-password", data);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/auth/reset");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response from server:", error.response.data);
        } else if (error.request) {
          console.error("Nothing response from server:", error.request);
        }
      } else {
        console.error("Error yang tidak diketahui:", error);
      }
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
