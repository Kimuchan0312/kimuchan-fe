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

const pages = ["ABOUT", "TEST", "REVIEW"];

const UserMenu = ({ user, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettings = () => {
    handleMenuClose(); // Close the menu
    navigate('/account-settings'); // Navigate to the account settings page
  };

  const handleMyProfile = () => {
    handleMenuClose(); 
    navigate('/my-profile'); 
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
        <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleAccountSettings}>Account Settings</MenuItem>
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
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleNavigate = (page) => {
    const route = page.toLowerCase(); // Converts 'ABOUT' to 'about'
    navigate(`/${route}`); // Navigates to the corresponding route
  };

  return (
      <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ marginTop: 1}}>
            <Logo />
          </IconButton>

          <Box sx={{ marginLeft: 10, flexGrow: 2 }}>
          {isDesktop ? (
            pages.map((page) => (
              <Button key={page} onClick={() => handleNavigate(page)}>
                {page}
              </Button>
            ))
          ) : (
            <NavMenu pages={pages} handleNavigate={handleNavigate} />
          )}
        </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
    <UserMenu user={user} handleLogout={handleLogout} navigate={navigate} />
  </Box>
        </Toolbar>
      </AppBar>
  );
}

export default MainHeader;
