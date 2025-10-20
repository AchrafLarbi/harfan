import { store } from "../store/store";

// API Configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
};

// Helper function to get auth token
const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const token = getAuthToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: "GET",
    headers: defaultHeaders,
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // Use default error message if response is not JSON
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
};

export const userManagementAPI = {
  // Get all students
  getStudents: async () => {
    return await apiCall("/adminmanagement/students/");
  },

  // Get all teachers
  getTeachers: async () => {
    return await apiCall("/adminmanagement/teachers/");
  },

  // Get student by ID
  getStudentById: async (studentId) => {
    return await apiCall(`/adminmanagement/students/${studentId}/`);
  },

  // Get teacher by ID
  getTeacherById: async (teacherId) => {
    return await apiCall(`/adminmanagement/teachers/${teacherId}/`);
  },

  // Activate/Deactivate teacher
  activateTeacher: async (teacherId) => {
    return await apiCall(`/adminmanagement/teachers/${teacherId}/activate/`, {
      method: "PATCH",
    });
  },
};
