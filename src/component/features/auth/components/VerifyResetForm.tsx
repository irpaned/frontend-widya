import { Button, TextField } from "@mui/material";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { VerifyEmailDto } from "../dto/VerifyEmailDto";
import { axiosInstance } from "../../../../libs/axios";
import { PrimaryButton } from "../../../ui/button/PrimatyButton";
// import { Link } from "react-router-dom";

export function VerifyResetForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: VerifyEmailDto) => {
      const res = await axiosInstance.patch("/auth/verify-email", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("We’ve already sent you an email");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      mutateAsync(value);
      navigate("/login");
    },
  });
  return (
    <>
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
            onChange: z.string().email("Must be a valid email"),
          }}
          name="email"
          children={(field) => (
            <div>
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
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
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <PrimaryButton
            title="Submit"
            color="white"
            onClick={form.handleSubmit}
            className="w-full"
          />
        )}
      </form>
    </>
  );
}
