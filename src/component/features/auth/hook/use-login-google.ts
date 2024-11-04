// import { useQuery } from "@tanstack/react-query";
// import { axiosInstance } from "../../../../libs/axios";

// export const useAuthGoogle = () => {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["loginGoogleKey"],
//     queryFn: AuthGoogle,
//   });

//   async function AuthGoogle() {
//     const response = await axiosInstance.get("/auth/google");
//     const { token } = response.data;
//     console.log("ini token : ", response.data.token);
//     if (token) {
//       sessionStorage.setItem("token", token);
//     }

//     console.log("Response data:", response.data);
//     return response.data; // Kembalikan data yang benar
//   }

//   return {
//     URL: data, // Data URL dari query
//     error,
//     isLoading,
//   };
// };

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../../libs/axios";

export const useAuthGoogle = () => {
  const { data, refetch } = useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/google");
      console.log("token ::", response.data.token);
      return response.data.url; // Gunakan response data yang sesuai
    },
    staleTime: 0,
  });

  return {
    googleAuthUrl: data,
    refetch,
  };
};
