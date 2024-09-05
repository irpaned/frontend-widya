import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { VerifyResetForm } from "../../component/features/auth/components/VerifyResetForm";
import { Card } from "@mui/material";

export default function ForgotPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md p-6  sm:p-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Typography
              sx={{ fontSize: "30px", fontWeight: "bold" }}
              className="text-center"
            >
              Verify email
            </Typography>
            <Typography className="text-muted-foreground">
              Enter your email.
            </Typography>
          </div>
          <VerifyResetForm />
          <Link to="/login">login</Link>
        </div>
      </Card>
    </div>
  );
}
