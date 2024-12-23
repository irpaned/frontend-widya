import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./component/layouts/MainLayout";
import { NavBar } from "./component/navigation/NavBar";
import { axiosInstance } from "./libs/axios";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ProductPage } from "./pages/productPage";
import { SET_USER } from "./redux/slices/auth";
import { AuthLayout } from "./component/layouts/AuthLayout";
import ResetPasswordPage from "./pages/auth/ForgotPage";
import HomePage from "./pages/HomePage";
import { DetailProduct } from "./pages/DetailProductPage";
import { ProfilePage } from "./pages/ProfilePage";
function App() {
  const dispatch = useDispatch();
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        console.log("AAAAAAAA", response);
        dispatch(
          SET_USER({
            ...response.data,
            isLogin: true,
          })
        );
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
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<DetailProduct />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<ProductPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path="auth/login" element={<AuthLayout />}>
          <Route element={<AuthRoute />}>
            <Route index element={<LoginPage />} />
          </Route>
        </Route>
        <Route path="auth/register" element={<AuthLayout />}>
          <Route index element={<RegisterPage />} />
        </Route>
        <Route path="auth/forgot-password" element={<AuthLayout />}>
          <Route index element={<ResetPasswordPage />} />
        </Route>

        <Route path="test" element={<NavBar />} />
      </Routes>
    </>
  );
}

export default App;
