import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { PrimaryButton } from "../../../../ui/button/PrimatyButton";
import { useEditProfile } from "../../hooks/use-edit-profile";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export function EditProfile() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { register, handleSubmit, onSubmit, errors } = useEditProfile(
    currentUser.id
  );

  const [sex, setSex] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSex(event.target.value);
  };
  return (
    <div>
      <Box sx={style}>
        <Typography
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: 15,
          }}
        >
          Edit Profile
        </Typography>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("fullName")}
            defaultValue={currentUser.fullName}
            className="w-full"
            type="text"
            label="Full Name"
          />
          <div className="mb-[-15px]">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Sex
              </InputLabel>
              <Select
                {...register("sex")}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                defaultValue={currentUser.sex}
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
          <Typography color={"red"}>{errors.sex?.message}</Typography>
          <TextField
            {...register("bio")}
            defaultValue={currentUser.bio}
            className="w-full"
            type="text"
            label="Bio"
          />

          <Typography>Photo Profile</Typography>
          <TextField
            {...register("photoProfile")}
            className="w-full"
            type="file"
          />

          <Typography>Cover Image</Typography>
          <TextField
            {...register("coverImage")}
            className="w-full"
            type="file"
          />

          <PrimaryButton
            title="Submit"
            buttonType="submit"
            color="white"
            fw="bold"
            fs="15px"
            className="w-full"
          />
        </form>
      </Box>
    </div>
  );
}
