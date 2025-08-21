import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//1: Create a Context
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {
  //3: Put some state in the context
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  async function login(username, password) {
    const authUrl = `/authenticate`;
    try {
      const response = await executeJwtAuthenticationService(
        authUrl,
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;

        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  async function adminLogin(username, password) {
    const authUrl = `/admin/auth`;
    try {
      const response = await executeJwtAuthenticationService(
        authUrl,
        username,
        password
      );

      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setIsAdminUser(true);
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        apiClient.interceptors.request.use((config) => {
          console.log("intercepting and adding a token");
          config.headers.Authorization = jwtToken;
          return config;
        });

        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        adminLogin,
        isAdminUser,
        logout,
        username,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
