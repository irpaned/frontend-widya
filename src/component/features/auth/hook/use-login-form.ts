// import { useToast } from "@chakra-ui/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import React from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { LoginType } from "../types/login-type";
// import { axiosInstance } from "../../../../libs/axios";
// import { LoginSchemaZod } from "../validators/login-form";

// export const useLoginForm = () => {
//   const [show, setShow] = React.useState(false);
//   const handleClick = () => setShow(!show);
//   // const toast = useToast();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginType>({
//     mode: "onChange",
//     resolver: zodResolver(LoginSchemaZod),
//   });

//   const onSubmit: SubmitHandler<LoginType> = async (data) => {
//     try {
//       const response = await axiosInstance.post("/auth/login", data);
//       const user = response.data.user;
//       const token = response.data.token;

//       if (token) localStorage.setItem("token", token);
//       if (user) {
//         // toast({
//         //   title: "Login Success!",
//         //   status: "success",
//         //   duration: 3000,
//         //   isClosable: true,
//         // });

//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//       // toast({
//       //   title: "Email or Password is wrong!",
//       //   status: "error",
//       //   duration: 3000,
//       //   isClosable: true,
//       // });
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     handleClick,
//     show,
//     setShow,
//   };
// };

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { LoginType } from "../types/login-type";
// import { axiosInstance } from "../../../../libs/axios";
// import { LoginSchemaZod } from "../validators/login-form";

// export const useLoginForm = () => {
//   const [show, setShow] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleClick = () => setShow(!show);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginType>({
//     mode: "onChange",
//     resolver: zodResolver(LoginSchemaZod),
//   });

//   const onSubmit: SubmitHandler<LoginType> = async (data) => {
//     try {
//       const response = await axiosInstance.post("/auth/login", data);
//       const user = response.data.restUser;
//       const token = response.data.token;
//       console.log("USERRRR", user);
//       if (token) sessionStorage.setItem("token", token);

//       setTimeout(() => {
//         if (user) {
//           setSnackbarMessage("Login Success!");
//           setSnackbarOpen(true);

//           navigate("/");
//         }
//       }, 1000);
//     } catch (error) {
//       console.log(error);
//       setSnackbarMessage("Email or Password is wrong!");
//       setSnackbarOpen(true);
//     }
//   };

//   return {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     handleClick,
//     show,
//     setShow,
//     snackbarOpen,
//     snackbarMessage,
//     handleSnackbarClose,
//   };
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../libs/axios";
import { LoginSchemaZod } from "../validators/login-form";
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
