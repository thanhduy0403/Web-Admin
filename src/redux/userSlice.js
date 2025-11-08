import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    getUser: {
      isStart: false,
      getAll: null,
      error: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.getUser.isStart = true;
      state.getUser.getAll = null;
      state.getUser.error = false;
    },
    getUserSuccess: (state, action) => {
      state.getUser.isStart = false;
      state.getUser.getAll = action.payload;
      state.getUser.error = false;
    },
    getUserError: (state) => {
      state.getUser.isStart = false;
      state.getUser.getAll = null;
      state.getUser.error = true;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserError } = userSlice.actions;
export default userSlice.reducer;
