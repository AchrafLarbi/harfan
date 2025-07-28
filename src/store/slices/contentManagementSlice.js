import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contentService } from "../../services/contentApi";

// Initial state for content management
const initialState = {
  // Content data
  content: null,
  plans: [],

  // Cache metadata
  lastFetched: null,
  cacheExpiry: 5 * 60 * 1000, // 5 minutes in milliseconds

  // Loading states
  isLoading: false,
  actionLoading: false,

  // Error and success states
  error: null,
  success: null,

  // UI state
  editingSection: null,
};

// Async thunks for content operations
export const fetchContentAndPlans = createAsyncThunk(
  "contentManagement/fetchContentAndPlans",
  async (forceRefresh = false, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { lastFetched, cacheExpiry, content, plans } =
        state.contentManagement;

      // Check if we have cached data and it's still fresh (unless forced refresh)
      if (!forceRefresh && content && plans.length > 0 && lastFetched) {
        const now = Date.now();
        const timeSinceLastFetch = now - lastFetched;

        if (timeSinceLastFetch < cacheExpiry) {
          // Return cached data
          return { content, plans, fromCache: true };
        }
      }

      // Fetch fresh data
      const [contentData, plansData] = await Promise.all([
        contentService.getLandingPageContent(),
        contentService.getAllPlans(),
      ]);

      return {
        content: contentData,
        plans: plansData,
        fromCache: false,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error("Error fetching content:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || "فشل في تحميل المحتوى"
      );
    }
  }
);

export const updateSection = createAsyncThunk(
  "contentManagement/updateSection",
  async ({ sectionType, sectionData }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const { content } = state.contentManagement;

      let sectionId, updateData;
      if (sectionType === "about") {
        sectionId = content.about.id;
        updateData = {
          section_type: "about",
          about_title_main: sectionData.title_main,
          about_title_highlighted: sectionData.title_highlighted,
          about_title_secondary: sectionData.title_secondary,
          about_description: sectionData.description,
          about_badge_text: sectionData.badge_text,
        };
      } else if (sectionType === "plans") {
        sectionId = content.plans_section.id;
        updateData = {
          section_type: "plans",
          plans_title_main: sectionData.title_main,
          plans_title_highlighted: sectionData.title_highlighted,
          plans_title_secondary: sectionData.title_secondary,
          plans_description: sectionData.description,
          plans_badge_text: sectionData.badge_text,
        };
      }

      const updatedSection = await contentService.updateLandingPageSection(
        sectionId,
        updateData,
        token
      );

      return { sectionType, updatedSection };
    } catch (error) {
      console.error("Error updating section:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || "فشل في حفظ التغييرات"
      );
    }
  }
);

export const updatePlan = createAsyncThunk(
  "contentManagement/updatePlan",
  async (planData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = state.auth;

      const updatedPlan = await contentService.updatePlan(
        planData.id,
        planData,
        token
      );

      return updatedPlan;
    } catch (error) {
      console.error("Error updating plan:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || "فشل في حفظ الخطة"
      );
    }
  }
);

export const createPlan = createAsyncThunk(
  "contentManagement/createPlan",
  async (planData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = state.auth;

      const createdPlan = await contentService.createPlan(planData, token);
      return createdPlan;
    } catch (error) {
      console.error("Error creating plan:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || "فشل في إضافة الخطة"
      );
    }
  }
);

export const deletePlan = createAsyncThunk(
  "contentManagement/deletePlan",
  async (planId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { token } = state.auth;

      await contentService.deletePlan(planId, token);
      return planId;
    } catch (error) {
      console.error("Error deleting plan:", error);
      return rejectWithValue(
        error.response?.data?.detail || error.message || "فشل في حذف الخطة"
      );
    }
  }
);

const contentManagementSlice = createSlice({
  name: "contentManagement",
  initialState,
  reducers: {
    // Set editing section
    setEditingSection: (state, action) => {
      state.editingSection = action.payload;
    },

    // Clear editing section
    clearEditingSection: (state) => {
      state.editingSection = null;
    },

    // Clear messages
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },

    // Force refresh (clear cache)
    invalidateCache: (state) => {
      state.lastFetched = null;
    },

    // Set action loading state
    setActionLoading: (state, action) => {
      state.actionLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch content and plans
      .addCase(fetchContentAndPlans.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContentAndPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        const { content, plans, fromCache, timestamp } = action.payload;

        if (!fromCache) {
          state.content = content;
          state.plans = plans;
          state.lastFetched = timestamp;
        }
        state.error = null;
      })
      .addCase(fetchContentAndPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update section
      .addCase(updateSection.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { sectionType, updatedSection } = action.payload;

        if (sectionType === "about") {
          state.content.about = {
            id: updatedSection.id,
            title_main: updatedSection.about_title_main,
            title_highlighted: updatedSection.about_title_highlighted,
            title_secondary: updatedSection.about_title_secondary,
            description: updatedSection.about_description,
            badge_text: updatedSection.about_badge_text,
          };
        } else if (sectionType === "plans") {
          state.content.plans_section = {
            id: updatedSection.id,
            title_main: updatedSection.plans_title_main,
            title_highlighted: updatedSection.plans_title_highlighted,
            title_secondary: updatedSection.plans_title_secondary,
            description: updatedSection.plans_description,
            badge_text: updatedSection.plans_badge_text,
          };
        }

        state.success = "تم حفظ التغييرات بنجاح";
        state.editingSection = null;

        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          state.success = null;
        }, 3000);
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Update plan
      .addCase(updatePlan.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.actionLoading = false;
        const updatedPlan = action.payload;

        state.plans = state.plans.map((plan) =>
          plan.id === updatedPlan.id ? updatedPlan : plan
        );

        state.success = "تم حفظ الخطة بنجاح";

        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          state.success = null;
        }, 3000);
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Create plan
      .addCase(createPlan.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.plans.push(action.payload);
        state.success = "تم إضافة الخطة بنجاح";

        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          state.success = null;
        }, 3000);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Delete plan
      .addCase(deletePlan.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.actionLoading = false;
        const planId = action.payload;

        state.plans = state.plans.filter((plan) => plan.id !== planId);
        state.success = "تم حذف الخطة بنجاح";

        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          state.success = null;
        }, 3000);
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setEditingSection,
  clearEditingSection,
  clearMessages,
  invalidateCache,
  setActionLoading,
} = contentManagementSlice.actions;

// Selectors
export const selectContent = (state) => state.contentManagement.content;
export const selectPlans = (state) => state.contentManagement.plans;
export const selectContentLoading = (state) =>
  state.contentManagement.isLoading;
export const selectActionLoading = (state) =>
  state.contentManagement.actionLoading;
export const selectContentError = (state) => state.contentManagement.error;
export const selectContentSuccess = (state) => state.contentManagement.success;
export const selectEditingSection = (state) =>
  state.contentManagement.editingSection;
export const selectCacheInfo = (state) => ({
  lastFetched: state.contentManagement.lastFetched,
  cacheExpiry: state.contentManagement.cacheExpiry,
});

// Helper selector to check if cache is fresh
export const selectIsCacheFresh = (state) => {
  const { lastFetched, cacheExpiry } = state.contentManagement;
  if (!lastFetched) return false;

  const now = Date.now();
  const timeSinceLastFetch = now - lastFetched;
  return timeSinceLastFetch < cacheExpiry;
};

export default contentManagementSlice.reducer;
