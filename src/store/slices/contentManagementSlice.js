import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contentService } from "../../services/contentApi";

// Initial state for content management
const initialState = {
  // Landing page content
  landingPage: {
    hero: null,
    about: null,
    features: null,
    testimonials: null,
    plans: null,
    contact: null,
  },

  // Plans management
  plans: {
    all: [],
    byCategory: {},
    categories: ["student", "teacher"],
  },

  // Content editing
  editingContent: {
    isEditing: false,
    contentType: null, // 'section', 'plan'
    contentId: null,
    originalData: null,
    hasChanges: false,
  },

  // File uploads
  uploads: {
    isUploading: false,
    progress: 0,
    uploadedFiles: [],
  },

  // Loading states
  isLoading: false,
  sectionsLoading: false,
  plansLoading: false,
  saveLoading: false,

  // Error states
  error: null,

  // Content history and versioning
  contentHistory: [],

  // Preview mode
  previewMode: false,
  previewData: null,

  // Content statistics
  contentStats: {
    totalSections: 0,
    totalPlans: 0,
    lastUpdated: null,
    totalViews: 0,
  },
};

// Async thunks for content management
export const fetchLandingPageContent = createAsyncThunk(
  "contentManagement/fetchLandingPage",
  async (_, { rejectWithValue }) => {
    try {
      const data = await contentService.getLandingPageContent();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "خطأ في تحميل محتوى الصفحة الرئيسية"
      );
    }
  }
);

export const fetchAboutContent = createAsyncThunk(
  "contentManagement/fetchAbout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await contentService.getAboutContent();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل محتوى صفحة من نحن");
    }
  }
);

export const fetchPlansContent = createAsyncThunk(
  "contentManagement/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const [allPlans, plansByCategory] = await Promise.all([
        contentService.getAllPlans(),
        contentService.getPlansByCategory(),
      ]);

      return { allPlans, plansByCategory };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل الخطط");
    }
  }
);

export const updateLandingPageSection = createAsyncThunk(
  "contentManagement/updateSection",
  async ({ sectionId, data, token }, { rejectWithValue }) => {
    try {
      const response = await contentService.updateLandingPageSection(
        sectionId,
        data,
        token
      );
      return { sectionId, data: response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحديث المحتوى");
    }
  }
);

export const updatePlan = createAsyncThunk(
  "contentManagement/updatePlan",
  async ({ planId, data, token }, { rejectWithValue }) => {
    try {
      const response = await contentService.updatePlan(planId, data, token);
      return { planId, data: response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحديث الخطة");
    }
  }
);

export const createPlan = createAsyncThunk(
  "contentManagement/createPlan",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await contentService.createPlan(data, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في إنشاء الخطة");
    }
  }
);

export const deletePlan = createAsyncThunk(
  "contentManagement/deletePlan",
  async ({ planId, token }, { rejectWithValue }) => {
    try {
      await contentService.deletePlan(planId, token);
      return planId;
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في حذف الخطة");
    }
  }
);

export const uploadContentFile = createAsyncThunk(
  "contentManagement/uploadFile",
  async ({ file, contentType, contentId }, { rejectWithValue, dispatch }) => {
    try {
      // Update progress during upload
      const onProgress = (progress) => {
        dispatch(updateUploadProgress(progress));
      };

      const response = await contentService.uploadFile(
        file,
        contentType,
        contentId,
        onProgress
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في رفع الملف");
    }
  }
);

export const fetchContentHistory = createAsyncThunk(
  "contentManagement/fetchHistory",
  async ({ contentType, contentId }, { rejectWithValue }) => {
    try {
      const data = await contentService.getContentHistory(
        contentType,
        contentId
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل تاريخ المحتوى");
    }
  }
);

const contentManagementSlice = createSlice({
  name: "contentManagement",
  initialState,
  reducers: {
    // Content editing
    startEditing: (state, action) => {
      const { contentType, contentId, originalData } = action.payload;
      state.editingContent = {
        isEditing: true,
        contentType,
        contentId,
        originalData,
        hasChanges: false,
      };
    },

    stopEditing: (state) => {
      state.editingContent = {
        isEditing: false,
        contentType: null,
        contentId: null,
        originalData: null,
        hasChanges: false,
      };
    },

    markAsChanged: (state) => {
      state.editingContent.hasChanges = true;
    },

    discardChanges: (state) => {
      state.editingContent.hasChanges = false;
      // Reset to original data logic would go here
    },

    // Preview mode
    enablePreviewMode: (state, action) => {
      state.previewMode = true;
      state.previewData = action.payload;
    },

    disablePreviewMode: (state) => {
      state.previewMode = false;
      state.previewData = null;
    },

    // Upload progress
    updateUploadProgress: (state, action) => {
      state.uploads.progress = action.payload;
    },

    startUpload: (state) => {
      state.uploads.isUploading = true;
      state.uploads.progress = 0;
    },

    finishUpload: (state, action) => {
      state.uploads.isUploading = false;
      state.uploads.progress = 100;
      if (action.payload) {
        state.uploads.uploadedFiles.push(action.payload);
      }
    },

    clearUploadedFiles: (state) => {
      state.uploads.uploadedFiles = [];
      state.uploads.progress = 0;
    },

    // Update content stats
    updateContentStats: (state, action) => {
      state.contentStats = { ...state.contentStats, ...action.payload };
    },

    // Clear states
    clearError: (state) => {
      state.error = null;
    },

    clearContentManagement: (state) => {
      Object.assign(state, initialState);
    },

    // Local content updates (for optimistic updates)
    updateLocalSectionContent: (state, action) => {
      const { sectionType, data } = action.payload;
      if (state.landingPage[sectionType]) {
        state.landingPage[sectionType] = {
          ...state.landingPage[sectionType],
          ...data,
        };
      }
    },

    updateLocalPlanContent: (state, action) => {
      const { planId, data } = action.payload;
      const planIndex = state.plans.all.findIndex((plan) => plan.id === planId);
      if (planIndex !== -1) {
        state.plans.all[planIndex] = { ...state.plans.all[planIndex], ...data };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch landing page content
      .addCase(fetchLandingPageContent.pending, (state) => {
        state.sectionsLoading = true;
        state.error = null;
      })
      .addCase(fetchLandingPageContent.fulfilled, (state, action) => {
        state.sectionsLoading = false;

        // Organize content by sections
        const content = action.payload;
        if (Array.isArray(content)) {
          content.forEach((section) => {
            if (section.section_type) {
              state.landingPage[section.section_type] = section;
            }
          });
        } else if (content && typeof content === "object") {
          Object.keys(content).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(state.landingPage, key)) {
              state.landingPage[key] = content[key];
            }
          });
        }

        state.contentStats.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchLandingPageContent.rejected, (state, action) => {
        state.sectionsLoading = false;
        state.error = action.payload;
      })

      // Fetch about content
      .addCase(fetchAboutContent.fulfilled, (state, action) => {
        state.landingPage.about = action.payload;
      })

      // Fetch plans content
      .addCase(fetchPlansContent.pending, (state) => {
        state.plansLoading = true;
        state.error = null;
      })
      .addCase(fetchPlansContent.fulfilled, (state, action) => {
        state.plansLoading = false;
        const { allPlans, plansByCategory } = action.payload;

        state.plans.all = allPlans;
        state.plans.byCategory = plansByCategory;
        state.contentStats.totalPlans = allPlans.length;
      })
      .addCase(fetchPlansContent.rejected, (state, action) => {
        state.plansLoading = false;
        state.error = action.payload;
      })

      // Update section
      .addCase(updateLandingPageSection.pending, (state) => {
        state.saveLoading = true;
        state.error = null;
      })
      .addCase(updateLandingPageSection.fulfilled, (state, action) => {
        state.saveLoading = false;
        const { sectionId, data } = action.payload;

        // Update the section in state
        Object.keys(state.landingPage).forEach((key) => {
          if (
            state.landingPage[key] &&
            state.landingPage[key].id === sectionId
          ) {
            state.landingPage[key] = { ...state.landingPage[key], ...data };
          }
        });

        state.editingContent.hasChanges = false;
        state.contentStats.lastUpdated = new Date().toISOString();
      })
      .addCase(updateLandingPageSection.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      })

      // Update plan
      .addCase(updatePlan.pending, (state) => {
        state.saveLoading = true;
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.saveLoading = false;
        const { planId, data } = action.payload;

        // Update plan in all plans array
        const planIndex = state.plans.all.findIndex(
          (plan) => plan.id === planId
        );
        if (planIndex !== -1) {
          state.plans.all[planIndex] = {
            ...state.plans.all[planIndex],
            ...data,
          };
        }

        // Update plan in byCategory object
        Object.keys(state.plans.byCategory).forEach((category) => {
          const categoryPlanIndex = state.plans.byCategory[category].findIndex(
            (plan) => plan.id === planId
          );
          if (categoryPlanIndex !== -1) {
            state.plans.byCategory[category][categoryPlanIndex] = {
              ...state.plans.byCategory[category][categoryPlanIndex],
              ...data,
            };
          }
        });

        state.editingContent.hasChanges = false;
        state.contentStats.lastUpdated = new Date().toISOString();
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      })

      // Create plan
      .addCase(createPlan.pending, (state) => {
        state.saveLoading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.saveLoading = false;
        const newPlan = action.payload;

        // Add to all plans
        state.plans.all.push(newPlan);

        // Add to category
        if (newPlan.plan_type && state.plans.byCategory[newPlan.plan_type]) {
          state.plans.byCategory[newPlan.plan_type].push(newPlan);
        }

        state.contentStats.totalPlans += 1;
        state.contentStats.lastUpdated = new Date().toISOString();
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      })

      // Delete plan
      .addCase(deletePlan.pending, (state) => {
        state.saveLoading = true;
        state.error = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.saveLoading = false;
        const planId = action.payload;

        // Remove from all plans
        state.plans.all = state.plans.all.filter((plan) => plan.id !== planId);

        // Remove from categories
        Object.keys(state.plans.byCategory).forEach((category) => {
          state.plans.byCategory[category] = state.plans.byCategory[
            category
          ].filter((plan) => plan.id !== planId);
        });

        state.contentStats.totalPlans -= 1;
        state.contentStats.lastUpdated = new Date().toISOString();
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      })

      // Upload file
      .addCase(uploadContentFile.pending, (state) => {
        state.uploads.isUploading = true;
        state.uploads.progress = 0;
        state.error = null;
      })
      .addCase(uploadContentFile.fulfilled, (state, action) => {
        state.uploads.isUploading = false;
        state.uploads.progress = 100;
        state.uploads.uploadedFiles.push(action.payload);
      })
      .addCase(uploadContentFile.rejected, (state, action) => {
        state.uploads.isUploading = false;
        state.uploads.progress = 0;
        state.error = action.payload;
      })

      // Fetch content history
      .addCase(fetchContentHistory.fulfilled, (state, action) => {
        state.contentHistory = action.payload;
      });
  },
});

export const {
  startEditing,
  stopEditing,
  markAsChanged,
  discardChanges,
  enablePreviewMode,
  disablePreviewMode,
  updateUploadProgress,
  startUpload,
  finishUpload,
  clearUploadedFiles,
  updateContentStats,
  clearError,
  clearContentManagement,
  updateLocalSectionContent,
  updateLocalPlanContent,
} = contentManagementSlice.actions;

export default contentManagementSlice.reducer;

// Selectors
export const selectContentManagement = (state) => state.contentManagement;
export const selectLandingPageContent = (state) =>
  state.contentManagement.landingPage;
export const selectPlans = (state) => state.contentManagement.plans;
export const selectEditingContent = (state) =>
  state.contentManagement.editingContent;
export const selectUploads = (state) => state.contentManagement.uploads;
export const selectPreviewMode = (state) => state.contentManagement.previewMode;
export const selectPreviewData = (state) => state.contentManagement.previewData;
export const selectContentStats = (state) =>
  state.contentManagement.contentStats;
export const selectContentHistory = (state) =>
  state.contentManagement.contentHistory;
export const selectSectionsLoading = (state) =>
  state.contentManagement.sectionsLoading;
export const selectPlansLoading = (state) =>
  state.contentManagement.plansLoading;
export const selectSaveLoading = (state) => state.contentManagement.saveLoading;
export const selectContentManagementError = (state) =>
  state.contentManagement.error;
