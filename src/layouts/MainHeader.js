import React, { useCallback, useMemo, useState } from "react";
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
  Container,
  Typography,
  Tooltip,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../layouts/MainHeader.css";
import { useMediaQuery } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import EditNoteIcon from "@mui/icons-material/EditNote";

function MainHeader() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 900px");

  const pages = useMemo(
    () => [
      {
        title: "ABOUT",
        action: () => navigate("/about"),
      },
      {
        title: "TEST",
        action: () => navigate("/test"),
      },
      {
        title: "REVIEW",
        action: () => navigate("/review"),
      },
    ],
    [navigate]
  );

  const { logout, isAuthenticated, user } = useAuth();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleOpenUserMenu = useCallback(
    (event) => {
      setAnchorElUser(event.currentTarget);
      setTimeout(() => {
        handleCloseUserMenu();
      }, 3000);
    },
    [handleCloseUserMenu]
  );

  const handleLogOut = useCallback(async () => {
    try {
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  }, [logout, navigate]);

  const handleAdminControl = useCallback(() => {
    try {
      navigate("admin/controlpanel");
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handleAccountSettings = useCallback(() => {
    try {
      navigate(`/account-settings`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handleMyProfile = useCallback(() => {
    try {
      navigate(`/my-profile`);
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const handleCreateNewReadingLesson = useCallback(() => {
    try {
      navigate("/createNewReadingLesson");
      handleCloseUserMenu();
    } catch (error) {
      console.error(error);
    }
  }, [navigate, handleCloseUserMenu]);

  const settings = useMemo(() => {
    const settingsArray = [
      {
        title: "My Profile",
        action: handleMyProfile,
        icon: <ListIcon />,
      },
      {
        title: "Account Information",
        action: handleAccountSettings,
        icon: <AccountBoxIcon />,
      },
    ];

    if (isAuthenticated) {
      if (user && user.role === "admin") {
        settingsArray.push(
          {
            title: "Create New Reading Lesson",
            action: handleCreateNewReadingLesson,
            icon: <EditNoteIcon />,
          },
          {
            title: "Website Management",
            action: handleAdminControl,
            icon: <AdminPanelSettingsIcon />,
          }
        );
      }

      settingsArray.push({
        title: "Logout",
        action: handleLogOut,
        icon: <LogoutIcon />,
      });
    }

    return settingsArray;
  }, [
    isAuthenticated,
    user,
    handleMyProfile,
    handleAdminControl,
    handleAccountSettings,
    handleCreateNewReadingLesson,
    handleLogOut,
  ]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <Logo edge="start" sx={{ marginTop: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            {isMobile && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
                ml: 5,
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  pl={1}
                  pr={1}
                  key={page.title}
                  onClick={page.action}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F8F8F8",
                      borderRadius: "4px",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{ fontSize: "18px" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              marginLeft: 10,
              flexGrow: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button key={page.title} onClick={page.action}>
                {page.title}
              </Button>
            ))}
          </Box>
          {isAuthenticated ? (
            <Stack direction="row" spacing={2}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Typography
                    component={"span"}
                    variant={"body2"}
                    sx={{ display: "flex", alignItems: "center", p: 2 }}
                  >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        {user?.name}
                      </Typography>
                      <Avatar src={user?.avatar} sx={{ ml: 2 }} />
                    </IconButton>
                  </Typography>
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
                    <div key={setting.title}>
                      <MenuItem key={setting.title} onClick={setting.action}>
                        {setting.icon}
                        <Typography textAlign="center">
                          {setting.title}
                        </Typography>
                      </MenuItem>
                      <Divider sx={{ boderyStyle: "dashed" }} />
                    </div>
                  ))}
                </Menu>
              </Box>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                sx={{ color: "white" }}
              >
                LOGIN
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="contained"
                sx={{
                  backgroundColor: "#E1BFBF",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#F8F8",
                    borderRadius: "4px",
                  },
                }}
              >
                REGISTER
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
