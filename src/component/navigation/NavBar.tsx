import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function NavBar() {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("ASDAS", user);

  const navigate = useNavigate();

  const handleLogout = () => {
    queryClient.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const handleProfile = () => {
    navigate("/");
  };

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className="px-4 lg:px-6 h-[65px] flex justify-between items-center bg-[#1B5EA0]">
      <nav className=" flex gap-4 sm:gap-6 items-center ">
        <img
          className="w-14"
          src="https://res.cloudinary.com/dbgugbfil/image/upload/v1725683526/Matador/cbmeik1aiwbtyjkgnwd7.png"
          alt="logo"
        />
        {user.isVerified ? (
          <>
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
          </>
        ) : null}
      </nav>
      <div>
        {user.isVerified ? (
          <div className="flex justify-between">
            <Typography
              style={{
                fontWeight: "bold",
                color: "white",
                marginTop: "8px",
                marginRight: "10px",
              }}
            >
              {user.fullName}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.photoProfile} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === "Logout") {
                      handleLogout();
                    } else if (setting === "Profile") {
                      handleProfile();
                    } else {
                      handleCloseUserMenu();
                    }
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="text-sm text-white font-bold hover:underline underline-offset-4"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
