import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export function NavBarTest() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = () => {
    queryClient.clear();
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <header className="px-4 lg:px-6 h-[65px] flex justify-between items-center bg-[#1B5EA0]">
      <nav className=" flex gap-4 sm:gap-6 items-center ">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dbgugbfil/image/upload/v1725683526/Matador/cbmeik1aiwbtyjkgnwd7.png"
          alt="logo"
        />
        <Link
          to="/"
          className="text-sm font-bold text-white hover:underline underline-offset-4"
        >
          Profile
        </Link>
        <Link
          to="product"
          className="text-sm text-white font-bold hover:underline underline-offset-4"
        >
          Product
        </Link>
      </nav>
      {currentUser.isVerified ? (
        <Button
          onClick={handleLogout}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: isHovered ? "white" : "transparent",
            color: isHovered ? "#1B5EA0" : "white",
            border: "2px solid white",
            padding: "3px 15px 3px 15px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            fontSize: "13px",
          }}
        >
          {currentUser.fullName}
        </Button>
      ) : (
        <Button
          onClick={handleLogout}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: isHovered ? "white" : "transparent",
            color: isHovered ? "#1B5EA0" : "white",
            border: "2px solid white",
            padding: "3px 15px 3px 15px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            fontSize: "13px",
          }}
        >
          Log in
        </Button>
      )}
    </header>
  );
}
