import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Paper,
  Container,
  Fade,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Business,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

const ModernLogin = ({ isAdmin = false }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (isAdmin) {
        await authContext.adminLogin(username, password);
        navigate("/Admin/home");
      } else {
        await authContext.login(username, password);
        navigate(`/welcome/${username}`);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Fade in timeout={800}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              width: "100%",
              maxWidth: 450,
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                color: "white",
                p: 4,
                textAlign: "center",
              }}
            >
              <Box sx={{ mb: 2 }}>
                {isAdmin ? (
                  <Business sx={{ fontSize: 48, mb: 1 }} />
                ) : (
                  <Email sx={{ fontSize: 48, mb: 1 }} />
                )}
              </Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {isAdmin ? "Admin Login" : "Welcome Back"}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {isAdmin
                  ? "Access your admin dashboard"
                  : "Sign in to your Unsoldly account"}
              </Typography>
            </Box>

            {/* Login Form */}
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {errorMessage && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {errorMessage}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                    },
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>

                {!isAdmin && (
                  <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{" "}
                      <Button
                        variant="text"
                        onClick={() => navigate("/register")}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                      >
                        Sign up here
                      </Button>
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default ModernLogin;
