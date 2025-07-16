import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  baseURL: "", // Will be set when backend is ready
  apiVersion: "v1",
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
    setApiVersion: (state, action) => {
      state.apiVersion = action.payload;
    },
    apiCallStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    apiCallSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    apiCallFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearApiError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBaseURL,
  setApiVersion,
  apiCallStart,
  apiCallSuccess,
  apiCallFailure,
  clearApiError,
} = apiSlice.actions;

export default apiSlice.reducer;

// Selectors
export const selectApiState = (state) => state.api;
export const selectBaseURL = (state) => state.api.baseURL;
export const selectApiLoading = (state) => state.api.isLoading;
export const selectApiError = (state) => state.api.error;
