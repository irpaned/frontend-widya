import Typography from "@mui/material/Typography";
import { LoginForm } from "../../component/features/auth/components/LoginForm";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Card className="mx-auto w-full max-w-md p-6 mb-20  sm:p-8">
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

        <Typography>
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-gray-400">
            Register
          </Link>
        </Typography>
      </div>
    </Card>
  );
}
