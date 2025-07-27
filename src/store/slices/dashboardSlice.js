import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for dashboard
const initialState = {
  // Dashboard statistics
  stats: {
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalContent: 0,
    totalViews: 0,
    growthRate: 0,
    activeUsers: 0,
    newRegistrations: 0,
  },

  // Recent activities
  recentActivities: [],

  // Charts data
  userGrowthData: [],
  contentViewsData: [],
  registrationTrends: [],

  // Time period for stats
  timePeriod: "7d", // 7d, 30d, 90d, 1y

  // Loading states
  isLoading: false,
  statsLoading: false,
  activitiesLoading: false,

  // Error states
  error: null,
  lastUpdated: null,
};

// Async thunks for dashboard operations
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (timePeriod = "7d", { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/dashboard/stats?period=${timePeriod}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("harfan_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      const data = await response.json();
      return { ...data, timePeriod };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecentActivities = createAsyncThunk(
  "dashboard/fetchActivities",
  async (limit = 10, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/dashboard/activities?limit=${limit}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("harfan_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recent activities");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChartData = createAsyncThunk(
  "dashboard/fetchChartData",
  async ({ chartType, timePeriod = "7d" }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/admin/dashboard/charts/${chartType}?period=${timePeriod}`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("harfan_token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${chartType} chart data`);
      }

      const data = await response.json();
      return { chartType, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Set time period for stats
    setTimePeriod: (state, action) => {
      state.timePeriod = action.payload;
    },

    // Add new activity (for real-time updates)
    addActivity: (state, action) => {
      state.recentActivities.unshift(action.payload);
      // Keep only the latest 50 activities
      if (state.recentActivities.length > 50) {
        state.recentActivities = state.recentActivities.slice(0, 50);
      }
    },

    // Update specific stat
    updateStat: (state, action) => {
      const { statName, value } = action.payload;
      if (Object.prototype.hasOwnProperty.call(state.stats, statName)) {
        state.stats[statName] = value;
      }
    },

    // Clear dashboard data
    clearDashboard: (state) => {
      Object.assign(state, initialState);
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },

    // Set mock data (for development)
    setMockData: (state) => {
      state.stats = {
        totalUsers: 1250,
        totalStudents: 1050,
        totalTeachers: 200,
        totalContent: 15,
        totalViews: 8430,
        growthRate: 12.5,
        activeUsers: 324,
        newRegistrations: 47,
      };
      state.recentActivities = [
        {
          id: 1,
          type: "user_registration",
          message: "مستخدم جديد انضم للمنصة",
          user: "أحمد محمد",
          timestamp: new Date().toISOString(),
          icon: "user-plus",
        },
        {
          id: 2,
          type: "content_update",
          message: "تم تحديث محتوى الصفحة الرئيسية",
          user: "المدير",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          icon: "edit",
        },
      ];
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload.stats;
        state.timePeriod = action.payload.timePeriod;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload;
      })

      // Fetch recent activities
      .addCase(fetchRecentActivities.pending, (state) => {
        state.activitiesLoading = true;
      })
      .addCase(fetchRecentActivities.fulfilled, (state, action) => {
        state.activitiesLoading = false;
        state.recentActivities = action.payload;
      })
      .addCase(fetchRecentActivities.rejected, (state, action) => {
        state.activitiesLoading = false;
        state.error = action.payload;
      })

      // Fetch chart data
      .addCase(fetchChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chartType, data } = action.payload;

        switch (chartType) {
          case "user-growth":
            state.userGrowthData = data;
            break;
          case "content-views":
            state.contentViewsData = data;
            break;
          case "registration-trends":
            state.registrationTrends = data;
            break;
        }
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setTimePeriod,
  addActivity,
  updateStat,
  clearDashboard,
  clearError,
  setMockData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

// Selectors
export const selectDashboard = (state) => state.dashboard;
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectRecentActivities = (state) =>
  state.dashboard.recentActivities;
export const selectUserGrowthData = (state) => state.dashboard.userGrowthData;
export const selectContentViewsData = (state) =>
  state.dashboard.contentViewsData;
export const selectRegistrationTrends = (state) =>
  state.dashboard.registrationTrends;
export const selectTimePeriod = (state) => state.dashboard.timePeriod;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectStatsLoading = (state) => state.dashboard.statsLoading;
export const selectActivitiesLoading = (state) =>
  state.dashboard.activitiesLoading;
export const selectDashboardError = (state) => state.dashboard.error;
export const selectLastUpdated = (state) => state.dashboard.lastUpdated;
