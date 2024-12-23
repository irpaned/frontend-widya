import { Snackbar, TextField, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../ui/button/PrimatyButton";
import { useLoginForm } from "../hook/use-login-form";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending,
    snackbarOpen,
    snackbarMessage,
    handleSnackbarClose,
  } = useLoginForm();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        autoHideDuration={3000}
        ContentProps={{
          sx: {
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2"
      >
        <TextField
          {...register("email")}
          className="w-full"
          label="Email"
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

        <Link
          to="/auth/forgot-password"
          className="text-gray-400 flex justify-end mb-2"
        >
          Forgot password?
        </Link>

        <PrimaryButton
          title="Login"
          color="white"
          fw="bold"
          fs="15px"
          bg="black"
          buttonType="submit"
          className="w-full"
          isLoading={isPending}
        />
      </form>
    </>
  );
}
