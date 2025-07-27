// Token utility functions for secure token management

// Store access token in memory (more secure than localStorage)
let accessToken = null;

// Get access token from memory
export const getAccessToken = () => {
  return accessToken;
};

// Set access token in memory
export const setAccessToken = (token) => {
  accessToken = token;
};

// Clear access token from memory
export const clearAccessToken = () => {
  accessToken = null;
};

// Store access token in localStorage as fallback (less secure but persistent)
export const storeAccessTokenInStorage = (token) => {
  if (token) {
    localStorage.setItem("harfan_token", token);
    setAccessToken(token);
  }
};

// Get access token from localStorage (fallback)
export const getAccessTokenFromStorage = () => {
  const token = localStorage.getItem("harfan_token");
  if (token) {
    setAccessToken(token);
    return token;
  }
  return null;
};

// Clear access token from storage
export const clearAccessTokenFromStorage = () => {
  localStorage.removeItem("harfan_token");
  clearAccessToken();
};

// Check if access token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    const currentTime = Date.now() / 1000;

    // Check if token expires in the next 5 minutes (300 seconds)
    return decoded.exp < currentTime + 300;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// API Configuration (should match the one in api.js)
const API_BASE_URL = "https://0vrkzhm5-8000.uks1.devtunnels.ms/";

// Refresh token using httpOnly cookie
export const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}auth/token/refresh/`, {
      method: "POST",
      credentials: "include", // Important: This sends httpOnly cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();

    if (data.access) {
      setAccessToken(data.access);
      storeAccessTokenInStorage(data.access);
      return data.access;
    }

    throw new Error("No access token in refresh response");
  } catch (error) {
    console.error("Token refresh failed:", error);
    clearAccessToken();
    clearAccessTokenFromStorage();
    throw error;
  }
};

// Initialize token from storage on app start
export const initializeTokenFromStorage = () => {
  const token = getAccessTokenFromStorage();
  if (token && !isTokenExpired(token)) {
    return token;
  } else if (token) {
    // Token exists but is expired, clear it
    clearAccessTokenFromStorage();
  }
  return null;
};
