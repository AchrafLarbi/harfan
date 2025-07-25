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

// API Configuration
const API_CONFIG = {
  // Django backend URL
  baseURL: "https://0vrkzhm5-8000.uks1.devtunnels.ms", // Django default port
  version: "v1",
  timeout: 10000,
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

// Helper function to get auth token
const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
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

    const token = getAuthToken();
    const url = createApiUrl(endpoint);

    // Public endpoints that don't require authentication
    const publicEndpoints = [
      "/auth/register",
      "/auth/login",
      "/verify-email",
      "/auth/request-reset-password/",
      "/auth/reset-password/",
    ];
    const isPublicEndpoint = publicEndpoints.some((publicEndpoint) =>
      endpoint.startsWith(publicEndpoint)
    );

    const defaultOptions = {
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

      const response = await apiCall("/auth/login", {
        method: "POST",
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

      // Store token in localStorage
      localStorage.setItem("harfan_token", response.access);
      localStorage.setItem("harfan_refresh_token", response.refresh);
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
        const response = await apiCall("/auth/register", {
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

        const response = await apiCall("/auth/register", {
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
      // Django JWT doesn't require server-side logout for stateless tokens
      // Just clear localStorage and Redux state
      localStorage.removeItem("harfan_token");
      localStorage.removeItem("harfan_refresh_token");
      localStorage.removeItem("harfan_user");

      dispatch({ type: "auth/logout" });
    } catch (error) {
      console.error("Logout error:", error);
      // Clear localStorage even if there's an error
      localStorage.removeItem("harfan_token");
      localStorage.removeItem("harfan_refresh_token");
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
      const refreshToken = localStorage.getItem("harfan_refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiCall("/auth/token/refresh/", {
        method: "POST",
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      localStorage.setItem("harfan_token", response.access);

      return response.access;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await apiCall("/auth/request-reset-password/", {
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
        `/auth/reset-password/${encodedPk}/${token}/`,
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
      dispatch(loginSuccess({ user, token }));
    }
  } catch (error) {
    console.error("Failed to restore user session:", error);
    // Clear corrupted localStorage
    localStorage.removeItem("harfan_token");
    localStorage.removeItem("harfan_refresh_token");
    localStorage.removeItem("harfan_user");
  }
};

// Helper to clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem("harfan_token");
  localStorage.removeItem("harfan_refresh_token");
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
