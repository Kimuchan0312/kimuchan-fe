import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../layouts/MainHeader.css";
import { useMediaQuery } from "@mui/material";

const pages = ["PREPARE", "TEST", "REVIEW"];

const UserMenu = ({ user, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar
        onClick={handleProfileMenuOpen}
        src={user?.avatarUrl}
        alt={user?.name}
        sx={{ width: 32, height: 32 }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

const NavMenu = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="navigation menu"
        aria-controls="nav-menu"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorElNav}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        {pages.map((page) => (
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            {page}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="banner">
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ marginTop: 1}}>
            <Logo />
          </IconButton>

          <Box pages={pages} sx={{ marginLeft: 10, flexGrow: 2 }}>
            {isDesktop ? (
              // Render NavMenu directly for desktop
              pages.map((page) => (
                <Button key={page}>
                  {page}
                </Button>
              ))
            ) : (
              // Render IconButton which triggers NavMenu for smaller screens
              <NavMenu sx={{ marginLeft: "50"}} pages={pages} />
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <UserMenu user={user} handleLogout={handleLogout} />
          </Box>
        </Toolbar>
      </AppBar>

      <div className="banner_contents">
        <h1 className="banner_title">
          Practice Japanese reading effortlessly.
        </h1>
        <button variant="outlined" className="banner_button">
          Read More
        </button>
      </div>
    </header>
  );
}

export default MainHeader;
