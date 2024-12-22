import { Button, TextField, Typography } from "@mui/material";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PrimaryButton } from "../../../ui/button/PrimatyButton";
import { useResetPasswordForm } from "../hook/use-reset-password";

export function VerifyResetForm() {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useResetPasswordForm();
  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email")}
          className="w-full"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
        />
        <Typography color={"red"}>{errors.email?.message}</Typography>

        <TextField
          {...register("password")}
          className="w-full"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="Enter your password"
        />
        <Typography color={"red"}>{errors.password?.message}</Typography>

        <TextField
          {...register("confirmPassword")}
          className="w-full"
          id="confirm-password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          placeholder="Confirm your password"
        />
        <Typography color={"red"}>{errors.confirmPassword?.message}</Typography>

        {isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <PrimaryButton
            title="Submit"
            buttonType="submit"
            color="white"
            className="w-full"
          />
        )}
      </form>
    </>
  );
}
