import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  Container,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { retrieveAllCompaniesApi } from "../api/CompanyApiService";
import { retrieveAllProductsApi } from "../api/ProductApiService";
import { retrieveAllCategoriesApi } from "../api/ProductCategoryApiService";
import { getAllUsersApi } from "../api/ApiService";
import { useAuth } from "../security/AuthContext";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";

const StatCard = ({ title, value, icon, color, trend, trendValue }) => {
  const theme = useTheme();

  return (
    <Card sx={{ height: "100%", minHeight: "140px" }}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {value}
            </Typography>
            {trend && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {trend === "up" ? (
                  <TrendingUpIcon
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: 16,
                      mr: 0.5,
                    }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{
                      color: theme.palette.error.main,
                      fontSize: 16,
                      mr: 0.5,
                    }}
                  />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      trend === "up"
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                    fontWeight: "medium",
                  }}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color + "20",
              borderRadius: "50%",
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: 2,
            }}
          >
            {React.cloneElement(icon, { sx: { color: color, fontSize: 32 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const RecentActivityItem = ({ activity, type }) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case "warning":
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      case "error":
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />;
    }
  };

  const getChipColor = () => {
    switch (type) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <ListItem sx={{ px: 0 }}>
      <ListItemIcon sx={{ minWidth: 40 }}>{getIcon()}</ListItemIcon>
      <ListItemText
        primary={activity.title}
        secondary={activity.description}
        secondaryTypographyProps={{ variant: "body2" }}
        sx={{ mr: 2 }}
      />
      <Chip
        label={activity.time}
        size="small"
        color={getChipColor()}
        variant="outlined"
      />
    </ListItem>
  );
};

const DashboardHome = () => {
  const theme = useTheme();
  const { isAdminUser } = useAuth();
  const [stats, setStats] = useState({
    companies: 0,
    products: 0,
    users: 0,
    orders: 0,
    categories: 0,
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const recentActivities = [
    {
      title: "New Company Registered",
      description: "TechCorp Solutions joined the platform",
      time: "2 min ago",
      type: "success",
    },
    {
      title: "Product Added",
      description: "Industrial Machinery - Category: Manufacturing",
      time: "15 min ago",
      type: "success",
    },
    {
      title: "Order Request",
      description: "New order request for Steel Products",
      time: "1 hour ago",
      type: "warning",
    },
    {
      title: "User Login",
      description: "Admin user logged in from new device",
      time: "2 hours ago",
      type: "success",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [companiesRes, productsRes, categoriesRes, usersRes] =
          await Promise.all([
            retrieveAllCompaniesApi(),
            retrieveAllProductsApi(),
            retrieveAllCategoriesApi(),
            getAllUsersApi(),
          ]);
        setStats({
          companies: companiesRes.data.length,
          products: productsRes.data.length,
          users: usersRes.data.length,
          orders: 0, // TODO: Add real order API if available
          categories: categoriesRes.data.length,
        });
        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
        setUsers(usersRes.data);
      } catch (e) {
        // handle error
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Prepare data for bar chart: products per category
  const productsPerCategory = categories.map((cat) => ({
    category: cat.categoryName || cat.name || "Unknown",
    count: products.filter(
      (p) => p.categoryId === cat.id || p.category?.id === cat.id
    ).length,
  }));

  // Prepare columns and rows for users table
  const userColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
  ];
  const userRows = users.map((u) => ({
    id: u.id,
    username: u.username || u.name,
    email: u.email,
    role: u.role || (u.isAdmin ? "Admin" : "User"),
  }));

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your B2B marketplace today.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Companies"
            value={stats.companies}
            icon={<BusinessIcon />}
            color={theme.palette.primary.main}
            trend="up"
            trendValue="+12% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={<InventoryIcon />}
            color={theme.palette.secondary.main}
            trend="up"
            trendValue="+8% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Categories"
            value={stats.categories}
            icon={<InventoryIcon />}
            color={theme.palette.info.main}
            trend="up"
            trendValue="+5% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Active Users"
            value={stats.users}
            icon={<PeopleIcon />}
            color={theme.palette.success.main}
            trend="up"
            trendValue="+15% this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Order Requests"
            value={stats.orders}
            icon={<ShoppingCartIcon />}
            color={theme.palette.warning.main}
            trend="down"
            trendValue="-3% this month"
          />
        </Grid>
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        {/* Bar Chart: Products per Category */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", minHeight: "400px" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Products per Category
              </Typography>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: productsPerCategory.map((d) => d.category),
                  },
                ]}
                series={[
                  {
                    data: productsPerCategory.map((d) => d.count),
                    label: "Products",
                  },
                ]}
                width={420}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Users Table */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", minHeight: "400px" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Recent Users
              </Typography>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={userRows}
                  columns={userColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Recent Activity (keep as is) */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", minHeight: "400px" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Recent Activity
              </Typography>
              <List sx={{ pt: 0 }}>
                {recentActivities.map((activity, index) => (
                  <RecentActivityItem
                    key={index}
                    activity={activity}
                    type={activity.type}
                  />
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* Platform Performance (keep as is) */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: "100%", minHeight: "400px" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Platform Performance
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    System Uptime
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    99.9%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={99.9}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Response Time
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    245ms
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={85}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Active Sessions
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    1,247
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
