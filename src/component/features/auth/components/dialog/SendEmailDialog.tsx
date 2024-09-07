import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface EmailConfirmationDialogProps {
  open: boolean;
  email?: string;
  onClose: () => void;
}

function EmailConfirmationDialog({
  open,
  onClose,
}: EmailConfirmationDialogProps) {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
    navigate("/login");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="p-6 relative">
        <IconButton
          onClick={handleClose}
          className="absolute right-2"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" className="font-bold text-center">
          Email Confirmation
        </Typography>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://res.cloudinary.com/dbgugbfil/image/upload/v1724290924/Genius/tkncqbqyvvub5pjf3ncu.png"
            alt="Email Sent"
            className="w-[200px] relative right-[10px]"
          />

          <Typography className="text-center">
            We have sent an email to{" "}
            <span className="font-semibold">niteshchandora47@gmail.com</span> to
            confirm the validity of your email address. After receiving the
            email, follow the link provided to complete your registration.
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EmailConfirmationDialog;
