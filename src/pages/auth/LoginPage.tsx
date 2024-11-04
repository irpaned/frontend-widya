import Typography from "@mui/material/Typography";
import { LoginForm } from "../../component/features/auth/components/LoginForm";
import { Card } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../../component/features/auth/components/LoginGoogle";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="mx-auto w-full max-w-md p-6  sm:p-8">
        <div className="space-y-4 ">
          <div className="space-y-2">
            <Typography
              sx={{ fontSize: "30px", fontWeight: "800" }}
              className="text-center"
            >
              LOGIN
            </Typography>
            <Typography className="text-muted-foreground text-gray-600">
              Welcome back to Matador
            </Typography>
          </div>
          <LoginForm />
          <p className="text-center">or</p>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
          <Typography>
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500">
              Register
            </Link>
          </Typography>
        </div>
      </Card>
    </div>
  );
}
