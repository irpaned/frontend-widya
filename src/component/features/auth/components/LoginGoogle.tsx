import { Button } from "@mui/material";
import { useAuthGoogle } from "../hook/use-login-google";
// import { Google } from "@mui/icons-material";
import GoogleLogo from "../../../../assets/google.svg";

function GoogleLoginButton() {
  const { googleAuthUrl, refetch } = useAuthGoogle();

  const handleGoogleLogin = () => {
    if (googleAuthUrl) {
      window.location.href = googleAuthUrl;
    } else {
      refetch();
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outlined"
      startIcon={
        <img
          src={GoogleLogo}
          alt="Google logo"
          style={{ width: 20, height: 20 }}
        />
      }
      sx={{
        marginTop: "0px",
        backgroundColor: "white",
        color: "black",
        borderColor: "#dadce0",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "14px",
        width: "100%",
        padding: "6px 12px",
        borderRadius: "8px",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#f7f8f8",
          borderColor: "#dadce0",
        },
      }}
    >
      Continue with Google
    </Button>
  );
}

export default GoogleLoginButton;
