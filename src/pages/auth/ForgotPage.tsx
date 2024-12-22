import Typography from "@mui/material/Typography";
import { VerifyResetForm } from "../../component/features/auth/components/VerifyResetForm";
import { Card } from "@mui/material";

export default function ResetPasswordPage() {
  return (
    <Card className="mx-auto w-full max-w-md p-6 mb-20 sm:p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Typography
            sx={{ fontSize: "30px", fontWeight: "bold" }}
            className="text-center"
          >
            Reset Password
          </Typography>
        </div>
        <VerifyResetForm />
      </div>
    </Card>
  );
}
