import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { PrimaryButton } from "../../../ui/button/PrimatyButton";
import { useRegisterForm } from "../hook/use-register-form";
import React from "react";

export default function RegisterForm() {
  const { register, errors, handleSubmit, onSubmit } = useRegisterForm();

  const [sex, setSex] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSex(event.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2"
      >
        <TextField
          {...register("fullName")}
          className="w-full"
          type="text"
          label="Full Name"
        />
        <Typography color={"red"}>{errors.fullName?.message}</Typography>

        <div className="mb-[6px]">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">Sex</InputLabel>
            <Select
              {...register("sex")}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={sex}
              onChange={handleChange}
              autoWidth
              label="Sex"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </div>

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
          bg="black"
          fs="15px"
          className="w-full"
        />

        <Typography>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-gray-400 hover:text-primary/80"
          >
            Sign in
          </Link>
        </Typography>
      </form>
    </>
  );
}
