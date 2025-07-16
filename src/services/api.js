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
  // TODO: Replace with your actual backend URL when ready
  baseURL: "http://localhost:3001/api", // Will be set from environment variables or config
  version: "v1",
  timeout: 10000,
};

// Helper function to get auth token
const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

// Helper function to create API URL (will be used when backend is ready)
// const createApiUrl = (endpoint) => {
//   return `${API_CONFIG.baseURL}/${API_CONFIG.version}${endpoint}`;
// };

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const { dispatch } = store;

  try {
    dispatch(apiCallStart());

    const token = getAuthToken();
    // const url = createApiUrl(endpoint); // Will be used when backend is ready

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      timeout: API_CONFIG.timeout,
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // TODO: Uncomment when backend is ready
    // const response = await fetch(url, mergedOptions);
    // const data = await response.json();

    // if (!response.ok) {
    //   throw new Error(data.message || 'API call failed');
    // }

    // Mock response for now
    const data = await mockApiResponse(endpoint, mergedOptions);

    dispatch(apiCallSuccess());
    return data;
  } catch (error) {
    dispatch(apiCallFailure(error.message));
    throw error;
  }
};

// Mock API responses (remove when backend is ready)
const mockApiResponse = async (endpoint) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock responses based on endpoint
  if (endpoint === "/auth/login") {
    return {
      success: true,
      user: {
        id: 1,
        email: "user@example.com",
        firstName: "أحمد",
        lastName: "محمد",
        role: "student",
      },
      token: "mock-jwt-token-123",
    };
  }

  if (endpoint === "/auth/signup") {
    return {
      success: true,
      user: {
        id: 2,
        email: "newuser@example.com",
        firstName: "فاطمة",
        lastName: "علي",
        role: "student",
      },
      token: "mock-jwt-token-456",
    };
  }

  return { success: true, data: null };
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
        body: JSON.stringify(credentials),
      });

      // Store token in localStorage
      localStorage.setItem("harfan_token", response.token);
      localStorage.setItem("harfan_user", JSON.stringify(response.user));

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
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

      const response = await apiCall("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // Store token in localStorage
      localStorage.setItem("harfan_token", response.token);
      localStorage.setItem("harfan_user", JSON.stringify(response.user));

      dispatch(
        signupSuccess({
          user: response.user,
          token: response.token,
        })
      );

      return response;
    } catch (error) {
      dispatch(signupFailure(error.message));
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    const { dispatch } = store;

    try {
      // TODO: Call backend logout endpoint when ready
      // await apiCall('/auth/logout', { method: 'POST' });

      // Clear localStorage
      localStorage.removeItem("harfan_token");
      localStorage.removeItem("harfan_user");

      dispatch({ type: "auth/logout" });
    } catch (error) {
      console.error("Logout error:", error);
      // Clear localStorage even if API call fails
      localStorage.removeItem("harfan_token");
      localStorage.removeItem("harfan_user");
      dispatch({ type: "auth/logout" });
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await apiCall("/auth/refresh", {
        method: "POST",
      });

      localStorage.setItem("harfan_token", response.token);

      return response.token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await apiCall("/auth/verify", {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw error;
    }
  },
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await apiCall("/user/profile", {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Get profile failed:", error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    const { dispatch } = store;

    try {
      dispatch(updateProfileStart());

      const response = await apiCall("/user/profile", {
        method: "PUT",
        body: JSON.stringify(userData),
      });

      dispatch(updateProfileSuccess(response.user));

      return response;
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await apiCall("/user/change-password", {
        method: "POST",
        body: JSON.stringify(passwordData),
      });

      return response;
    } catch (error) {
      console.error("Change password failed:", error);
      throw error;
    }
  },
};

// Courses API calls (for future use)
export const coursesAPI = {
  // Get all courses
  getCourses: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const endpoint = `/courses${queryString ? `?${queryString}` : ""}`;

      const response = await apiCall(endpoint, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Get courses failed:", error);
      throw error;
    }
  },

  // Get course by ID
  getCourse: async (courseId) => {
    try {
      const response = await apiCall(`/courses/${courseId}`, {
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Get course failed:", error);
      throw error;
    }
  },

  // Enroll in course
  enrollInCourse: async (courseId) => {
    try {
      const response = await apiCall(`/courses/${courseId}/enroll`, {
        method: "POST",
      });

      return response;
    } catch (error) {
      console.error("Course enrollment failed:", error);
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
