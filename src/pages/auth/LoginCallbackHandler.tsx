// import {
//   // useHandleGoogleCallback,
//   useHandleGoogleToken,
// } from "../../component/features/auth/hook/use-google-callback";

// function LoginCallbackHandler() {
//   // useHandleGoogleCallback();
//   useHandleGoogleToken();
//   return <div>Loading...</div>; // Tampilan saat menunggu respon
// }

// export default LoginCallbackHandler;

import { CircularProgress, Box } from "@mui/material";
import { useHandleGoogleToken } from "../../component/features/auth/hook/use-google-callback";

function LoginCallbackHandler() {
  useHandleGoogleToken();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size={70} />
    </Box>
  );
}

export default LoginCallbackHandler;
