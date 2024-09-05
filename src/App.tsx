import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPage from "./pages/auth/ForgotPage";
import { axiosInstance } from "./libs/axios";
import { useQuery } from "@tanstack/react-query";
import Profile from "./component/features/profile/components/Profile";
import { MainLayout } from "./component/layouts/MainLayout";
import { useDispatch } from "react-redux";
import { SET_USER } from "./redux/slices/auth";
function App() {
  const dispatch = useDispatch();
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        dispatch(
          SET_USER({
            ...response.data,
          })
        );
        console.log("TEEESTTT", response.data);
        return response.data;
      } catch {
        throw new Error("Unauthenticated");
      }
    },
    retry: 1,
  });

  const PrivateRoute = () => {
    return authUser ? <Outlet /> : <Navigate to={"/auth/login"} />;
  };

  const AuthRoute = () => {
    return !authUser ? <Outlet /> : <Navigate to={"/"} />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Profile />} />
          </Route>
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
