import { Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { PrimaryButton } from "../../../ui/button/PrimatyButton";
import { useRegisterForm } from "../hook/use-register-form";

export default function RegisterForm() {
  const { register, errors, handleSubmit, onSubmit } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2">
      <TextField
        {...register("fullName")}
        className="w-full"
        type="text"
        label="Full Name"
      />
      <Typography color={"red"}>{errors.fullName?.message}</Typography>

      <TextField
        {...register("userName")}
        className="w-full"
        type="text"
        label="User Name"
      />
      <Typography color={"red"}>{errors.userName?.message}</Typography>

      <TextField
        {...register("email")}
        className="w-full"
        type="email"
        label="Email"
      />
      <Typography color={"red"}>{errors.email?.message}</Typography>

      <TextField
        {...register("password")}
        className="w-full"
        type="password"
        label="Password"
      />
      <Typography color={"red"}>{errors.password?.message}</Typography>

      <PrimaryButton
        buttonType="submit"
        title="Submit"
        color="white"
        fw="bold"
        fs="15px"
        className="w-full"
      />

      <Typography>
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:text-primary/80">
          Sign in
        </Link>
      </Typography>
    </form>
  );
}
