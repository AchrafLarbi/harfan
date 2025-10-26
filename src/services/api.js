import { store } from "../store/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from "../store/slices/authSlice";
import {
  apiCallStart,
  apiCallSuccess,
  apiCallFailure,
} from "../store/slices/apiSlice";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  storeAccessTokenInStorage,
  clearAccessTokenFromStorage,
  isTokenExpired,
  refreshAccessToken,
} from "../utils/tokenUtils";

// API Configuration
const API_CONFIG = {
  // Django backend URL from environment variable
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/", // Fallback to localhost
  version: import.meta.env.VITE_API_VERSION || "v1",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

// Helper function to decode JWT token
export const decodeJWT = (token) => {
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
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Helper function to get auth token with automatic refresh
const getAuthToken = async () => {
  let token = getAccessToken();

  // If no token in memory, try to get from Redux store
  if (!token) {
    const state = store.getState();
    token = state.auth.token;
    if (token) {
      setAccessToken(token);
    }
  }

  // Check if token is expired and refresh if needed
  if (token && isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Clear all auth data if refresh fails
      clearAccessToken();
      clearAccessTokenFromStorage();
      const { dispatch } = store;
      dispatch({ type: "auth/logout" });
      return null;
    }
  }

  return token;
};

// Helper function to create API URL
const createApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const { dispatch } = store;

  try {
    dispatch(apiCallStart());

    const token = await getAuthToken();
    const url = createApiUrl(endpoint);

    // Public endpoints that don't require authentication
    const publicEndpoints = [
      "auth/register",
      "auth/login",
      "/verify-email",
      "auth/request-reset-password/",
      "auth/reset-password/",
      "auth/token/refresh/",
    ];
    const isPublicEndpoint = publicEndpoints.some((publicEndpoint) =>
      endpoint.startsWith(publicEndpoint)
    );

    const defaultOptions = {
      credentials: "include", // Include cookies for refresh token
      headers: {
        // Only set Content-Type for non-FormData requests
        ...(!(options.body instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        // Only add Authorization header for non-public endpoints
        ...(!isPublicEndpoint && token && { Authorization: `Bearer ${token}` }),
      },
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    // Handle 401 Unauthorized responses (token expired)
    if (response.status === 401 && !isPublicEndpoint) {
      try {
        // Try to refresh the token
        const newToken = await refreshAccessToken();

        if (newToken) {
          // Retry the request with the new token
          const retryOptions = {
            ...mergedOptions,
            headers: {
              ...mergedOptions.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };

          const retryResponse = await fetch(url, retryOptions);
          const retryData = await retryResponse.json();

          if (!retryResponse.ok) {
            throw new Error(
              retryData.detail ||
                retryData.message ||
                "API call failed after retry"
            );
          }

          dispatch(apiCallSuccess());
          return retryData;
        }
      } catch (refreshError) {
        console.error("Token refresh failed during API call:", refreshError);
        // Clear auth data and logout user
        clearAccessToken();
        clearAccessTokenFromStorage();
        localStorage.removeItem("harfan_user");
        dispatch({ type: "auth/logout" });
        throw new Error("Authentication failed. Please log in again.");
      }
    }

    if (!response.ok) {
      throw new Error(data.detail || data.message || "API call failed");
    }

    dispatch(apiCallSuccess());
    return data;
  } catch (error) {
    dispatch(apiCallFailure(error.message));
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const { dispatch } = store;

    try {
      dispatch(loginStart());

      const response = await apiCall("auth/login", {
        method: "POST",
        credentials: "include", // Important: This allows setting httpOnly cookies
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Decode JWT token to get user role and admin status
      const decodedToken = decodeJWT(response.access);
      console.log("Decoded JWT:", decodedToken);
      const userRoleFromToken = decodedToken?.role || response.user?.role;
      const isAdmin =
        decodedToken?.role === "admin" || decodedToken?.is_superuser;

      // Verify that the user's role matches the selected role
      // Skip role verification for admin users
      console.log("isAdmin", userRoleFromToken);
      if (isAdmin) {
        console.log("Admin user logged in:", decodedToken);
      } else if (userRoleFromToken !== credentials.role) {
        throw new Error(
          `هذا الحساب مخصص لـ ${
            userRoleFromToken === "teacher" ? "المعلمين" : "الطلاب"
          } فقط`
        );
      }

      // Store access token securely
      setAccessToken(response.access);
      storeAccessTokenInStorage(response.access);

      // Store user info (but NOT refresh token in localStorage)
      localStorage.setItem(
        "harfan_user",
        JSON.stringify({
          id: response.user?.id || decodedToken?.user_id,
          email: credentials.email,
          firstName: response.user?.first_name,
          lastName: response.user?.last_name,
          role: userRoleFromToken, // Use role from JWT token
          is_staff: response.user?.is_staff || decodedToken?.is_staff || false,
          is_superuser:
            response.user?.is_superuser || decodedToken?.is_superuser || false,
        })
      );

      dispatch(
        loginSuccess({
          user: {
            id: response.user?.id || decodedToken?.user_id,
            email: credentials.email,
            firstName: response.user?.first_name,
            lastName: response.user?.last_name,
            role: userRoleFromToken, // Use role from JWT token
            is_staff:
              response.user?.is_staff || decodedToken?.is_staff || false,
            is_superuser:
              response.user?.is_superuser ||
              decodedToken?.is_superuser ||
              false,
          },
          token: response.access,
        })
      );

      return response;
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error;
    }
  },

  // Signup user
  signup: async (userData) => {
    const { dispatch } = store;

    try {
      dispatch(signupStart());

      // Check if userData is FormData (for file uploads)
      if (userData instanceof FormData) {
        console.log("Signup data being sent as FormData" + userData);

        // For FormData, we need to send it directly without JSON.stringify
        const response = await apiCall("auth/register", {
          method: "POST",
          body: userData,
          headers: {
            // Remove Content-Type to let browser set it for FormData
            // This is important for file uploads
          },
        });

        console.log("Signup response:", response);

        // User will need to verify email before login
        dispatch(
          signupSuccess({
            user: {
              id: response.id,
              email: response.email,
              firstName: response.first_name,
              lastName: response.last_name,
              role: response.role,
              isActive: response.is_active,
            },
            token: null, // No token until email is verified
          })
        );

        return response;
      } else {
        // Handle regular object data (legacy)
        const formattedData = {
          email: userData.email,
          first_name: userData.firstName || userData.first_name,
          last_name: userData.lastName || userData.last_name,
          phone_number: userData.phone || userData.phone_number,
          country: userData.country,
          date_of_birth:
            userData.dateOfBirth || userData.date_of_birth
              ? formatDateToDjango(
                  userData.dateOfBirth || userData.date_of_birth
                )
              : null,
          password: userData.password,
          password2: userData.confirmPassword || userData.password2,
          role: userData.role,
          ...(userData.role === "teacher" && {
            specialty: userData.specialty,
            years_of_experience:
              userData.yearsOfExperience || userData.years_of_experience,
            cv: userData.cv,
          }),
        };

        console.log("Signup data being sent:", formattedData);

        const response = await apiCall("auth/register", {
          method: "POST",
          body: JSON.stringify(formattedData),
        });

        console.log("Signup response:", response);

        // User will need to verify email before login
        dispatch(
          signupSuccess({
            user: {
              id: response.id,
              email: response.email,
              firstName: response.first_name,
              lastName: response.last_name,
              role: response.role,
              isActive: response.is_active,
            },
            token: null, // No token until email is verified
          })
        );

        return response;
      }
    } catch (error) {
      console.error("Signup error:", error);
      dispatch(signupFailure(error.message));
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    const { dispatch } = store;

    try {
      // Clear access token from memory and storage
      clearAccessToken();
      clearAccessTokenFromStorage();
      localStorage.removeItem("harfan_user");

      // Make logout request to clear httpOnly refresh token cookie
      try {
        await apiCall("auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (logoutError) {
        // Continue with client-side logout even if server logout fails
        console.warn(
          "Server logout failed, continuing with client logout:",
          logoutError
        );
      }

      dispatch({ type: "auth/logout" });
    } catch (error) {
      console.error("Logout error:", error);
      // Clear all auth data even if there's an error
      clearAccessToken();
      clearAccessTokenFromStorage();
      localStorage.removeItem("harfan_user");
      dispatch({ type: "auth/logout" });
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await apiCall(`/verify-email?token=${token}`, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Email verification failed:", error);
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const newAccessToken = await refreshAccessToken();

      // Update Redux store with new token
      const { dispatch } = store;
      const state = store.getState();
      if (state.auth.user) {
        dispatch(
          loginSuccess({
            user: state.auth.user,
            token: newAccessToken,
          })
        );
      }

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Clear all auth data and logout user
      const { dispatch } = store;
      clearAccessToken();
      clearAccessTokenFromStorage();
      localStorage.removeItem("harfan_user");
      dispatch({ type: "auth/logout" });
      throw error;
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await apiCall("auth/request-reset-password/", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
      });

      return response;
    } catch (error) {
      console.error("Password reset request failed:", error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (newPassword, encodedPk, token) => {
    try {
      const response = await apiCall(
        `auth/reset-password/${encodedPk}/${token}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            new_password: newPassword,
          }),
        }
      );

      return response;
    } catch (error) {
      console.error("Password reset failed:", error);
      throw error;
    }
  },
};

// User API calls
export const userAPI = {
  // Get user profile (when endpoint is available)
  getProfile: async () => {
    try {
      const response = await apiCall("/api/profile/", {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Get profile failed:", error);
      throw error;
    }
  },

  // Update user profile (when endpoint is available)
  updateProfile: async (userData) => {
    const { dispatch } = store;

    try {
      dispatch(updateProfileStart());

      const response = await apiCall("/api/profile/", {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      dispatch(updateProfileSuccess(response));

      return response;
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      throw error;
    }
  },

  // Change password (when endpoint is available)
  changePassword: async (passwordData) => {
    try {
      const response = await apiCall("/api/change-password/", {
        method: "POST",
        body: JSON.stringify({
          old_password: passwordData.oldPassword,
          new_password: passwordData.newPassword,
        }),
      });

      return response;
    } catch (error) {
      console.error("Change password failed:", error);
      throw error;
    }
  },
};

// Export configuration for easy access
export { API_CONFIG };

// Helper to initialize API with backend URL
export const initializeAPI = (baseURL) => {
  API_CONFIG.baseURL = baseURL;
  console.log(`API initialized with base URL: ${baseURL}`);
};

// Helper to restore user session from localStorage
export const restoreUserSession = () => {
  const { dispatch } = store;

  try {
    const token = localStorage.getItem("harfan_token");
    const userStr = localStorage.getItem("harfan_user");

    if (token && userStr) {
      const user = JSON.parse(userStr);

      // Check if token is still valid
      if (!isTokenExpired(token)) {
        setAccessToken(token);
        dispatch(loginSuccess({ user, token }));
      } else {
        // Token is expired, clear it and try to refresh
        clearAccessTokenFromStorage();
        localStorage.removeItem("harfan_user");

        // Attempt to refresh token using httpOnly cookie
        refreshAccessToken()
          .then((newToken) => {
            if (newToken) {
              setAccessToken(newToken);
              storeAccessTokenInStorage(newToken);
              // Restore user data
              localStorage.setItem("harfan_user", userStr);
              dispatch(loginSuccess({ user, token: newToken }));
            }
          })
          .catch((error) => {
            console.error(
              "Failed to refresh token during session restore:",
              error
            );
            // Clear all auth data
            clearAccessToken();
            clearAccessTokenFromStorage();
            localStorage.removeItem("harfan_user");
          });
      }
    }
  } catch (error) {
    console.error("Failed to restore user session:", error);
    // Clear corrupted localStorage
    clearAccessToken();
    clearAccessTokenFromStorage();
    localStorage.removeItem("harfan_user");
  }
};

// Helper to clear all authentication data
export const clearAuthData = () => {
  clearAccessToken();
  clearAccessTokenFromStorage();
  localStorage.removeItem("harfan_user");

  const { dispatch } = store;
  dispatch({ type: "auth/logout" });

  console.log("All auth data cleared");
};

// Helper function to format date for Django backend (dd/mm/yyyy)
const formatDateToDjango = (dateString) => {
  if (!dateString) return null;

  // If it's already in dd/mm/yyyy format, return as is
  if (dateString.includes("/")) {
    return dateString;
  }

  // Convert from YYYY-MM-DD to dd/mm/yyyy
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString; // Return original if invalid
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Initialize app authentication on startup
export const initializeAuth = () => {
  // Try to restore session from localStorage
  restoreUserSession();

  // Set up periodic token refresh check (every 4 minutes)
  setInterval(async () => {
    const token = getAccessToken();
    if (token && isTokenExpired(token)) {
      try {
        await authAPI.refreshToken();
      } catch (error) {
        console.error("Periodic token refresh failed:", error);
      }
    }
  }, 240000); // 4 minutes
};
