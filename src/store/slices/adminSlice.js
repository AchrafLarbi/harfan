import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for admin
const initialState = {
  // Admin profile and permissions
  adminProfile: null,
  permissions: [],

  // UI state
  isLoading: false,
  error: null,

  // Admin preferences
  preferences: {
    theme: "light",
    language: "ar",
    itemsPerPage: 10,
    defaultView: "grid",
  },

  // Current admin session info
  sessionInfo: {
    loginTime: null,
    lastActivity: null,
    activityCount: 0,
  },
};

// Async thunks for admin operations
export const fetchAdminProfile = createAsyncThunk(
  "admin/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // This would call your API to get admin profile
      const response = await fetch("/api/admin/profile", {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("harfan_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch admin profile");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAdminPreferences = createAsyncThunk(
  "admin/updatePreferences",
  async (preferences, { rejectWithValue }) => {
    try {
      // This would call your API to update preferences
      const response = await fetch("/api/admin/preferences", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("harfan_token")}`,
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Set admin session info
    setSessionInfo: (state, action) => {
      state.sessionInfo = { ...state.sessionInfo, ...action.payload };
    },

    // Update activity
    updateActivity: (state) => {
      state.sessionInfo.lastActivity = new Date().toISOString();
      state.sessionInfo.activityCount += 1;
    },

    // Set preferences locally
    setPreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Clear admin state on logout
    clearAdminState: (state) => {
      state.adminProfile = null;
      state.permissions = [];
      state.sessionInfo = {
        loginTime: null,
        lastActivity: null,
        activityCount: 0,
      };
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch admin profile
      .addCase(fetchAdminProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminProfile = action.payload.profile;
        state.permissions = action.payload.permissions || [];
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update preferences
      .addCase(updateAdminPreferences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preferences = { ...state.preferences, ...action.payload };
      })
      .addCase(updateAdminPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Listen to auth actions
      .addCase("auth/loginSuccess", (state, action) => {
        const user = action.payload.user;
        if (user && (user.is_staff || user.is_superuser)) {
          // Initialize admin session
          state.sessionInfo = {
            loginTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            activityCount: 1,
          };
        }
      })
      .addCase("auth/logout", (state) => {
        // Clear admin state on logout
        state.adminProfile = null;
        state.permissions = [];
        state.sessionInfo = {
          loginTime: null,
          lastActivity: null,
          activityCount: 0,
        };
      });
  },
});

export const {
  setSessionInfo,
  updateActivity,
  setPreferences,
  clearAdminState,
  clearError,
} = adminSlice.actions;

export default adminSlice.reducer;

// Selectors
export const selectAdmin = (state) => state.admin;
export const selectAdminProfile = (state) => state.admin.adminProfile;
export const selectAdminPermissions = (state) => state.admin.permissions;
export const selectAdminPreferences = (state) => state.admin.preferences;
export const selectAdminSessionInfo = (state) => state.admin.sessionInfo;
export const selectAdminLoading = (state) => state.admin.isLoading;
export const selectAdminError = (state) => state.admin.error;
