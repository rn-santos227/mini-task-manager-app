import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const parsedToken = storedToken ? JSON.parse(storedToken) : null;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedToken) {
      return {
        user: parsedUser,
        token: parsedToken,
        loading: false,
        error: null,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Failed to hydrate auth state from storage", error);
  }

  return {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = Boolean(action.payload.token);
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;
