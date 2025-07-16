import { useSelector, useDispatch } from "react-redux";
import {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectUserRole,
  clearError,
} from "../store/slices/authSlice";
import { authAPI, userAPI } from "../services/api";

// Custom hook for authentication
export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const userRole = useSelector(selectUserRole);

  const login = async (credentials) => {
    return await authAPI.login(credentials);
  };

  const signup = async (userData) => {
    return await authAPI.signup(userData);
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    auth,
    user,
    isAuthenticated,
    isLoading,
    error,
    userRole,

    // Actions
    login,
    signup,
    logout,
    clearAuthError,
  };
};

// Custom hook for user profile management
export const useUser = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const updateProfile = async (userData) => {
    return await userAPI.updateProfile(userData);
  };

  const changePassword = async (passwordData) => {
    return await userAPI.changePassword(passwordData);
  };

  const getProfile = async () => {
    return await userAPI.getProfile();
  };

  return {
    // State
    user,
    isLoading,
    error,

    // Actions
    updateProfile,
    changePassword,
    getProfile,
  };
};

// Custom hook for API state
export const useApi = () => {
  const apiState = useSelector((state) => state.api);

  return {
    isLoading: apiState.isLoading,
    error: apiState.error,
    baseURL: apiState.baseURL,
  };
};
