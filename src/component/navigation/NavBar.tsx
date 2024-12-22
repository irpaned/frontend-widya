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
import logo from "../../assets/image/logo.png";

type NavBarProps = {
  isAuthPage?: boolean;
  isMainPage?: boolean;
};

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function NavBar({
  isAuthPage = false,
  isMainPage = false,
}: NavBarProps) {
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);

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
    <header className="px-4 lg:px-40 h-[70px] flex justify-between items-center bg-white">
      <nav
        className=" flex items-center "
        style={{
          gap: isMainPage ? "10px" : 0,
        }}
      >
        <img className="w-[100px] mb-2" src={logo} alt="logo" />
        {user.isLogin ? (
          <>
            <Link
              to="/"
              className="text-m font-bold text-black hover:underline underline-offset-4"
            >
              PROFILE
            </Link>
            <Link
              to="product"
              className="text-m text-black font-bold hover:underline underline-offset-4"
            >
              PRODUCT
            </Link>
          </>
        ) : (
          <>
            <p className="text-xl font-bold text-black">Netify</p>
          </>
        )}
      </nav>
      <div>
        {user.isLogin ? (
          <div className="flex justify-between">
            <Typography
              style={{
                fontWeight: "bold",
                color: "black",
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
          <>
            {isAuthPage ? (
              <>
                <Link className="text-m" to="#">
                  Butuh bantuan?
                </Link>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="text-m text-black font-bold hover:underline underline-offset-4"
              >
                Log in
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
