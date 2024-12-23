import { useMutation, useQuery } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SET_USER } from "../../../../redux/slices/auth";
import { profileSchema } from "../validations/profile.validate";
import { axiosInstance } from "../../../../libs/axios";
import { ProfileDto } from "../types/profile.dto";
import { ProfileEntity } from "../entities/ProfileEntity";

export const useEditProfile = (id: number) => {
  const dispatch = useDispatch();

  const { data: user, refetch } = useQuery<ProfileEntity[]>({
    queryKey: ["EditProfile"],
    queryFn: getUser,
  });

  async function getUser() {
    const response = await axiosInstance.get("/user/" + id);
    return response.data;
  }

  useEffect(() => {
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDto>({
    mode: "onSubmit",
    resolver: zodResolver(profileSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (newUser: FormData) => {
      const response = await axiosInstance.patch("/user/" + id, newUser);
      dispatch(SET_USER(response.data));
      return response;
    },
  });

  const onSubmit: SubmitHandler<ProfileDto> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("fullName", data.fullName);
      formData.append("sex", data.sex);
      formData.append("bio", data.bio);
      if (data.photoProfile) {
        formData.append("photoProfile", data.photoProfile[0]);
      }
      if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
      }

      mutateAsync(formData);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    onSubmit,
    register,
    handleSubmit,
    errors,
  };
};
