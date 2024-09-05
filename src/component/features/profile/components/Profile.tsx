import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { EditForm } from "./modal/EditForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    // <div className="flex items-center justify-center bg-background p-10">
    <Card sx={{ maxWidth: 800 }}>
      <div className="h-[220px]">
        <CardMedia
          sx={{ height: 180 }}
          image="https://images.pexels.com/photos/2093323/pexels-photo-2093323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="green iguana"
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
          <EditForm />
        </Modal>

        <Avatar
          alt="Remy Sharp"
          src="https://images.pexels.com/photos/28173991/pexels-photo-28173991/free-photo-of-red-avatar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
        <Typography variant="body2" sx={{ minWidth: 800 }}>
          {currentUser.bio}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", minWidth: 800 }}
        >
          {currentUser.userName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    // </div>
  );
}
