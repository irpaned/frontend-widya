import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { axiosInstance } from "../../../../../libs/axios";
import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
import { RegisterDto } from "../../../auth/dto/RegisterDto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export function EditForm() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: RegisterDto) => {
      const res = await axiosInstance.patch("/edit-profile", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Edit profile successfully");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      mutateAsync(value);
      navigate("/login");
    },
  });

  return (
    <div>
      <Box sx={style}>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().min(3, "Name must be at least 3 characters"),
            }}
            name="name"
            children={(field) => (
              <div>
                <TextField
                  className="w-full"
                  type="text"
                  label="Full Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z
                .string()
                .min(11, "Phone number must be at least 11 characters"),
            }}
            name="phone"
            children={(field) => (
              <div>
                <TextField
                  className="w-full"
                  type="number"
                  label="Number Phone"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  InputProps={{
                    inputProps: {
                      style: {
                        WebkitAppearance: "none",
                        MozAppearance: "textfield",
                      },
                    },
                  }}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z.string().email("Must be a valid email"),
            }}
            name="email"
            children={(field) => (
              <div>
                <TextField
                  className="w-full"
                  type="email"
                  label="Email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />

          <form.Field
            validatorAdapter={zodValidator()}
            validators={{
              onChange: z
                .string()
                .min(6, "Password must be at least 6 characters"),
            }}
            name="password"
            children={(field) => (
              <div>
                <TextField
                  className="w-full"
                  type="password"
                  label="Password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <div className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </div>
                )}
              </div>
            )}
          />
          {isPending ? (
            <PrimaryButton
              title="Please wait"
              icon={<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            />
          ) : (
            <PrimaryButton
              title="Submit"
              color="white"
              fw="bold"
              fs="15px"
              onClick={form.handleSubmit}
              className="w-full"
            />
          )}
        </form>
      </Box>
    </div>
  );
}
