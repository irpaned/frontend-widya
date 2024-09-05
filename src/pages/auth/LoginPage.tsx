import Typography from "@mui/material/Typography";
import { LoginForm } from "../../component/features/auth/components/LoginForm";
import { Card } from "@mui/material";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md p-6  sm:p-8">
        <div className="space-y-4 ">
          <div className="space-y-2">
            <Typography
              sx={{ fontSize: "30px", fontWeight: "800" }}
              className="text-center"
            >
              Sign in
            </Typography>
            <Typography className="text-muted-foreground">
              Enter your email and password to sign in
            </Typography>
          </div>
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}
