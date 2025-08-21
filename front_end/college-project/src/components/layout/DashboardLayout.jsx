import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Map as MapIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle,
  Logout,
  Settings,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const drawerWidth = 280;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/Admin/home" },
  { text: "Companies", icon: <BusinessIcon />, path: "/Admin/companies" },
  { text: "Categories", icon: <CategoryIcon />, path: "/Admin/categories" },
  { text: "Products", icon: <InventoryIcon />, path: "/Admin/products" },
  { text: "Users", icon: <PeopleIcon />, path: "/Admin/users" },
  {
    text: "Products for Sale",
    icon: <ShoppingCartIcon />,
    path: "/products-for-sale",
  },
  { text: "Search Map", icon: <MapIcon />, path: "/search" },
];

const DashboardLayout = ({ children, title = "Unsoldly Dashboard" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authContext.logout();
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top App Bar with Navigation - Full Width */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: theme.zIndex.drawer + 1,
          width: "100%",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 1, width: "100%" }}>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo/Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 4,
              minWidth: "200px",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                display: { xs: "none", sm: "block" },
              }}
            >
              Unsoldly
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 1, display: { xs: "none", lg: "block" } }}
            >
              B2B Marketplace
            </Typography>
          </Box>

          {/* Desktop Navigation - Full Width */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 1,
              justifyContent: "center",
              width: "100%",
              maxWidth: "none",
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                variant={isActiveRoute(item.path) ? "contained" : "text"}
                startIcon={item.icon}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontSize: "0.875rem",
                  mx: 0.5,
                  "&.MuiButton-contained": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                  "&.MuiButton-text": {
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Page Title */}
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", xl: "block" },
              textAlign: "center",
              fontWeight: "medium",
              minWidth: "200px",
              mx: 2,
            }}
          >
            {title}
          </Typography>

          {/* User Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 2,
              minWidth: "150px",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                mr: 2,
                textAlign: "right",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                {authContext.username || "Admin User"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <AccountCircle />
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            mt: "64px",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            Navigation
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isActiveRoute(item.path)}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.light + "20",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light + "30",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActiveRoute(item.path)
                      ? theme.palette.primary.main
                      : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "64px", // AppBar height
          minHeight: "calc(100vh - 64px)",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
