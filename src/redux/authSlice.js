import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const storedUser = Cookies.get("currentUser");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: storedUser ? JSON.parse(storedUser) : null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.currentUser = null;
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
      state.login.isFetching = false;
      state.login.error = false;
    },
    loginError: (state) => {
      state.login.currentUser = false;
      state.login.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
    },
    logoutError: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  logoutStart,
  logoutSuccess,
  logoutError,
} = authSlice.actions;
export default authSlice.reducer;
