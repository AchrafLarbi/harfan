import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import apiReducer from "./slices/apiSlice";
import adminReducer from "./slices/adminSlice";
import dashboardReducer from "./slices/dashboardSlice";
import userManagementReducer from "./slices/userManagementSlice";
import contentManagementReducer from "./slices/contentManagementSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    admin: adminReducer,
    dashboard: dashboardReducer,
    userManagement: userManagementReducer,
    contentManagement: contentManagementReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Export types for TypeScript support (if you convert to TS later)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
