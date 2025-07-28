import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userManagementAPI } from "../../services/userManagementApi";

// Initial state for user management
const initialState = {
  // Users data
  students: [],
  teachers: [],

  // Cache metadata
  cache: {
    students: {
      lastFetched: null,
      cacheExpiry: 5 * 60 * 1000, // 5 minutes
      lastParams: null,
    },
    teachers: {
      lastFetched: null,
      cacheExpiry: 5 * 60 * 1000, // 5 minutes
      lastParams: null,
    },
  },

  // Pagination and filtering
  pagination: {
    students: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
    },
    teachers: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
    },
  },

  // Filters and search
  filters: {
    students: {
      search: "",
      status: "all", // all, active, inactive
      sortBy: "created_at",
      sortOrder: "desc",
    },
    teachers: {
      search: "",
      status: "all",
      approvalStatus: "all", // all, pending, approved, rejected
      sortBy: "created_at",
      sortOrder: "desc",
    },
  },

  // Selected users
  selectedStudents: [],
  selectedTeachers: [],

  // Loading states
  isLoading: false,
  studentsLoading: false,
  teachersLoading: false,
  actionLoading: false,

  // Error states
  error: null,

  // User details modal
  userDetailsModal: {
    isOpen: false,
    user: null,
    userType: null,
  },

  // Bulk actions
  bulkActions: {
    isProcessing: false,
    selectedAction: null,
    progress: 0,
  },
};

// Async thunks for user management
export const fetchStudents = createAsyncThunk(
  "userManagement/fetchStudents",
  async (
    {
      page = 1,
      search = "",
      status = "all",
      sortBy = "created_at",
      sortOrder = "desc",
      forceRefresh = false,
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const { cache, students } = state.userManagement;
      const currentParams = { page, search, status, sortBy, sortOrder };

      // Check if we have cached data and it's still fresh (unless forced refresh)
      if (!forceRefresh && students.length > 0 && cache.students.lastFetched) {
        const now = Date.now();
        const timeSinceLastFetch = now - cache.students.lastFetched;
        const paramsChanged =
          JSON.stringify(currentParams) !==
          JSON.stringify(cache.students.lastParams);

        if (timeSinceLastFetch < cache.students.cacheExpiry && !paramsChanged) {
          // Return cached data
          return {
            fromCache: true,
            data: { students },
            ...currentParams,
          };
        }
      }

      // Fetch fresh data
      const data = await userManagementAPI.getStudents({
        page,
        search,
        status,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      return {
        data,
        page,
        search,
        status,
        sortBy,
        sortOrder,
        fromCache: false,
        timestamp: Date.now(),
        params: currentParams,
      };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل قائمة الطلاب");
    }
  }
);

export const fetchTeachers = createAsyncThunk(
  "userManagement/fetchTeachers",
  async (
    {
      page = 1,
      search = "",
      status = "all",
      approvalStatus = "all",
      sortBy = "created_at",
      sortOrder = "desc",
      forceRefresh = false,
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState();
      const { cache, teachers } = state.userManagement;
      const currentParams = {
        page,
        search,
        status,
        approvalStatus,
        sortBy,
        sortOrder,
      };

      // Check if we have cached data and it's still fresh (unless forced refresh)
      if (!forceRefresh && teachers.length > 0 && cache.teachers.lastFetched) {
        const now = Date.now();
        const timeSinceLastFetch = now - cache.teachers.lastFetched;
        const paramsChanged =
          JSON.stringify(currentParams) !==
          JSON.stringify(cache.teachers.lastParams);

        if (timeSinceLastFetch < cache.teachers.cacheExpiry && !paramsChanged) {
          // Return cached data
          return {
            fromCache: true,
            data: { teachers },
            ...currentParams,
          };
        }
      }

      // Fetch fresh data
      const data = await userManagementAPI.getTeachers({
        page,
        search,
        status,
        approval_status: approvalStatus,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      return {
        data,
        page,
        search,
        status,
        approvalStatus,
        sortBy,
        sortOrder,
        fromCache: false,
        timestamp: Date.now(),
        params: currentParams,
      };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل قائمة الأساتذة");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "userManagement/fetchUserById",
  async ({ userId, userType }, { rejectWithValue }) => {
    try {
      const data =
        userType === "student"
          ? await userManagementAPI.getStudentById(userId)
          : await userManagementAPI.getTeacherById(userId);
      return { data, userType };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تحميل بيانات المستخدم");
    }
  }
);

export const activateUser = createAsyncThunk(
  "userManagement/activateUser",
  async ({ userId, userType, activate = true }, { rejectWithValue }) => {
    try {
      const response =
        userType === "teacher"
          ? await userManagementAPI.activateTeacher(userId)
          : await userManagementAPI.activateStudent(userId);

      return { userId, userType, activate, response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تغيير حالة المستخدم");
    }
  }
);

export const approveTeacher = createAsyncThunk(
  "userManagement/approveTeacher",
  async ({ teacherId, approve = true }, { rejectWithValue }) => {
    try {
      const response = await userManagementAPI.approveTeacher(
        teacherId,
        approve
      );
      return { teacherId, approve, response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تغيير حالة الموافقة");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userManagement/deleteUser",
  async ({ userId, userType }, { rejectWithValue }) => {
    try {
      const response =
        userType === "student"
          ? await userManagementAPI.deleteStudent(userId)
          : await userManagementAPI.deleteTeacher(userId);

      return { userId, userType, response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في حذف المستخدم");
    }
  }
);

export const bulkActionUsers = createAsyncThunk(
  "userManagement/bulkAction",
  async ({ userIds, userType, action }, { rejectWithValue, dispatch }) => {
    try {
      const response = await userManagementAPI.bulkAction(
        userIds,
        userType,
        action
      );

      // Refresh the user list after bulk action
      if (userType === "student") {
        dispatch(fetchStudents({}));
      } else {
        dispatch(fetchTeachers({}));
      }

      return { userIds, userType, action, response };
    } catch (error) {
      return rejectWithValue(error.message || "خطأ في تنفيذ العملية المجمعة");
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    // Set filters
    setStudentFilters: (state, action) => {
      state.filters.students = { ...state.filters.students, ...action.payload };
    },

    setTeacherFilters: (state, action) => {
      state.filters.teachers = { ...state.filters.teachers, ...action.payload };
    },

    // Set pagination
    setStudentPagination: (state, action) => {
      state.pagination.students = {
        ...state.pagination.students,
        ...action.payload,
      };
    },

    setTeacherPagination: (state, action) => {
      state.pagination.teachers = {
        ...state.pagination.teachers,
        ...action.payload,
      };
    },

    // Selection management
    setSelectedStudents: (state, action) => {
      state.selectedStudents = action.payload;
    },

    setSelectedTeachers: (state, action) => {
      state.selectedTeachers = action.payload;
    },

    toggleStudentSelection: (state, action) => {
      const studentId = action.payload;
      const index = state.selectedStudents.indexOf(studentId);
      if (index > -1) {
        state.selectedStudents.splice(index, 1);
      } else {
        state.selectedStudents.push(studentId);
      }
    },

    toggleTeacherSelection: (state, action) => {
      const teacherId = action.payload;
      const index = state.selectedTeachers.indexOf(teacherId);
      if (index > -1) {
        state.selectedTeachers.splice(index, 1);
      } else {
        state.selectedTeachers.push(teacherId);
      }
    },

    selectAllStudents: (state) => {
      state.selectedStudents = state.students.map((student) => student.id);
    },

    selectAllTeachers: (state) => {
      state.selectedTeachers = state.teachers.map((teacher) => teacher.id);
    },

    clearStudentSelection: (state) => {
      state.selectedStudents = [];
    },

    clearTeacherSelection: (state) => {
      state.selectedTeachers = [];
    },

    // User details modal
    openUserDetailsModal: (state, action) => {
      state.userDetailsModal = {
        isOpen: true,
        user: action.payload.user,
        userType: action.payload.userType,
      };
    },

    closeUserDetailsModal: (state) => {
      state.userDetailsModal = {
        isOpen: false,
        user: null,
        userType: null,
      };
    },

    // Clear states
    clearError: (state) => {
      state.error = null;
    },

    // Cache management
    invalidateStudentsCache: (state) => {
      state.cache.students.lastFetched = null;
      state.cache.students.lastParams = null;
    },

    invalidateTeachersCache: (state) => {
      state.cache.teachers.lastFetched = null;
      state.cache.teachers.lastParams = null;
    },

    invalidateAllCache: (state) => {
      state.cache.students.lastFetched = null;
      state.cache.students.lastParams = null;
      state.cache.teachers.lastFetched = null;
      state.cache.teachers.lastParams = null;
    },

    clearUserManagement: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.studentsLoading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        const {
          data,
          page,
          search,
          status,
          sortBy,
          sortOrder,
          fromCache,
          timestamp,
          params,
        } = action.payload;

        if (!fromCache) {
          state.students = data.results || data;
          state.cache.students.lastFetched = timestamp;
          state.cache.students.lastParams = params;
        }

        state.pagination.students = {
          currentPage: page,
          itemsPerPage: state.pagination.students.itemsPerPage,
          totalItems: data.count || data.length || state.students.length,
          totalPages: Math.ceil(
            (data.count || data.length || state.students.length) /
              state.pagination.students.itemsPerPage
          ),
        };
        state.filters.students = { search, status, sortBy, sortOrder };
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.error = action.payload;
        state.students = [];
      })

      // Fetch teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.teachersLoading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachersLoading = false;
        const {
          data,
          page,
          search,
          status,
          approvalStatus,
          sortBy,
          sortOrder,
          fromCache,
          timestamp,
          params,
        } = action.payload;

        if (!fromCache) {
          state.teachers = data.results || data;
          state.cache.teachers.lastFetched = timestamp;
          state.cache.teachers.lastParams = params;
        }

        state.pagination.teachers = {
          currentPage: page,
          itemsPerPage: state.pagination.teachers.itemsPerPage,
          totalItems: data.count || data.length || state.teachers.length,
          totalPages: Math.ceil(
            (data.count || data.length || state.teachers.length) /
              state.pagination.teachers.itemsPerPage
          ),
        };
        state.filters.teachers = {
          search,
          status,
          approvalStatus,
          sortBy,
          sortOrder,
        };
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.teachersLoading = false;
        state.error = action.payload;
        state.teachers = [];
      })

      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, userType } = action.payload;
        state.userDetailsModal = {
          isOpen: true,
          user: data,
          userType,
        };
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Activate user
      .addCase(activateUser.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { userId, userType, activate } = action.payload;

        if (userType === "student") {
          const student = state.students.find((s) => s.id === userId);
          if (student) {
            student.is_active = activate;
          }
          // Invalidate students cache since data changed
          state.cache.students.lastFetched = null;
          state.cache.students.lastParams = null;
        } else {
          const teacher = state.teachers.find((t) => t.id === userId);
          if (teacher) {
            teacher.is_active = activate;
          }
          // Invalidate teachers cache since data changed
          state.cache.teachers.lastFetched = null;
          state.cache.teachers.lastParams = null;
        }
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Approve teacher
      .addCase(approveTeacher.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(approveTeacher.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { teacherId, approve } = action.payload;

        const teacher = state.teachers.find((t) => t.id === teacherId);
        if (teacher) {
          teacher.is_approved = approve;
          teacher.approval_status = approve ? "approved" : "rejected";
        }

        // Invalidate teachers cache since data changed
        state.cache.teachers.lastFetched = null;
        state.cache.teachers.lastParams = null;
      })
      .addCase(approveTeacher.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.actionLoading = false;
        const { userId, userType } = action.payload;

        if (userType === "student") {
          state.students = state.students.filter((s) => s.id !== userId);
          state.selectedStudents = state.selectedStudents.filter(
            (id) => id !== userId
          );
          // Invalidate students cache since data changed
          state.cache.students.lastFetched = null;
          state.cache.students.lastParams = null;
        } else {
          state.teachers = state.teachers.filter((t) => t.id !== userId);
          state.selectedTeachers = state.selectedTeachers.filter(
            (id) => id !== userId
          );
          // Invalidate teachers cache since data changed
          state.cache.teachers.lastFetched = null;
          state.cache.teachers.lastParams = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Bulk actions
      .addCase(bulkActionUsers.pending, (state) => {
        state.bulkActions.isProcessing = true;
        state.bulkActions.progress = 0;
      })
      .addCase(bulkActionUsers.fulfilled, (state, action) => {
        state.bulkActions.isProcessing = false;
        state.bulkActions.progress = 100;

        // Clear selections after successful bulk action
        if (action.payload.userType === "student") {
          state.selectedStudents = [];
        } else {
          state.selectedTeachers = [];
        }
      })
      .addCase(bulkActionUsers.rejected, (state, action) => {
        state.bulkActions.isProcessing = false;
        state.bulkActions.progress = 0;
        state.error = action.payload;
      });
  },
});

export const {
  setStudentFilters,
  setTeacherFilters,
  setStudentPagination,
  setTeacherPagination,
  setSelectedStudents,
  setSelectedTeachers,
  toggleStudentSelection,
  toggleTeacherSelection,
  selectAllStudents,
  selectAllTeachers,
  clearStudentSelection,
  clearTeacherSelection,
  openUserDetailsModal,
  closeUserDetailsModal,
  clearError,
  invalidateStudentsCache,
  invalidateTeachersCache,
  invalidateAllCache,
  clearUserManagement,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;

// Selectors
export const selectUserManagement = (state) => state.userManagement;
export const selectStudents = (state) => state.userManagement.students;
export const selectTeachers = (state) => state.userManagement.teachers;
export const selectStudentPagination = (state) =>
  state.userManagement.pagination.students;
export const selectTeacherPagination = (state) =>
  state.userManagement.pagination.teachers;
export const selectStudentFilters = (state) =>
  state.userManagement.filters.students;
export const selectTeacherFilters = (state) =>
  state.userManagement.filters.teachers;
export const selectSelectedStudents = (state) =>
  state.userManagement.selectedStudents;
export const selectSelectedTeachers = (state) =>
  state.userManagement.selectedTeachers;
export const selectUserDetailsModal = (state) =>
  state.userManagement.userDetailsModal;
export const selectBulkActions = (state) => state.userManagement.bulkActions;
export const selectStudentsLoading = (state) =>
  state.userManagement.studentsLoading;
export const selectTeachersLoading = (state) =>
  state.userManagement.teachersLoading;
export const selectActionLoading = (state) =>
  state.userManagement.actionLoading;
export const selectUserManagementError = (state) => state.userManagement.error;
