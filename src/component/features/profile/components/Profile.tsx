import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { EditProfile } from "./modal/EditProfile";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <Card sx={{ maxWidth: 800 }}>
      <div className="h-[220px]">
        <CardMedia
          sx={{ height: 180, backgroundColor: "gray" }}
          image={
            currentUser.coverImage ||
            "https://res.cloudinary.com/dbgugbfil/image/upload/v1725683526/Matador/cbmeik1aiwbtyjkgnwd7.png"
          }
          title="Cover Image"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={handleOpen}
            style={{
              borderRadius: "50%",
              width: 40,
              height: 40,
              minWidth: 0,
              padding: 0,
            }}
          >
            <EditIcon style={{ color: "black", fontSize: "25px" }} />
          </Button>
        </div>

        <Modal open={open} onClose={handleClose}>
          <EditProfile />
        </Modal>

        <Avatar
          alt="Remy Sharp"
          src={currentUser.photoProfile}
          sx={{ width: 140, height: 140 }}
          style={{
            border: "5px solid white",
            position: "relative",
            bottom: "130px",
            left: "20px",
          }}
        />
      </div>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontWeight: "bold", marginBottom: 0 }}
        >
          {currentUser.fullName}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", minWidth: 800 }}
        >
          {currentUser.email} {currentUser.sex ? " | " + currentUser.sex : ""}
        </Typography>
        <Typography variant="body2" sx={{ width: "full" }}>
          {currentUser.bio || "Hi there, I am using Matador"}
        </Typography>
      </CardContent>
    </Card>
  );
}
