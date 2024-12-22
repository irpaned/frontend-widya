import { Outlet } from "react-router-dom";
import { NavBar } from "../navigation/NavBar";

export function AuthLayout() {
  return (
    <div className="flex flex-col ">
      <NavBar isAuthPage />
      <main className="flex items-center justify-center  h-screen">
        <Outlet />
      </main>
    </div>
  );
}
