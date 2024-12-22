import Typography from "@mui/material/Typography";
import RegisterForm from "../../component/features/auth/components/RegisterForm";
import { Card } from "@mui/material";

export default function RegisterPage() {
  return (
    // <div className="flex min-h-screen items-center justify-center bg-background">
    <Card className="mx-auto w-full max-w-md p-6 mb-20  sm:p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <Typography
            sx={{ fontSize: "30px", fontWeight: "800" }}
            className="text-center"
          >
            Sign up
          </Typography>
          <Typography className="text-muted-foreground">
            Enter your details to create an account.
          </Typography>
        </div>
        <RegisterForm />
      </div>
    </Card>
    // </div>
  );
}
