import { Outlet } from "react-router-dom";
import { NavBar } from "../navigation/Navbar";

export function MainLayout() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <main className="flex items-center justify-center p-10">
        <Outlet />
      </main>
    </div>
  );
}
