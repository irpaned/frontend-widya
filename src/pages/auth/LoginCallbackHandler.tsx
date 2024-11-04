import {
  // useHandleGoogleCallback,
  useHandleGoogleToken,
} from "../../component/features/auth/hook/use-google-callback";

function LoginCallbackHandler() {
  // useHandleGoogleCallback();
  useHandleGoogleToken();
  return <div>Loading...</div>; // Tampilan saat menunggu respon
}

export default LoginCallbackHandler;
