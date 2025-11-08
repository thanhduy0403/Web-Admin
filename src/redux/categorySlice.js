import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: {
    isFetching: false,
    getAll: [],
    error: false,
  },
  postCategories: {
    isFetching: false,
    success: false,
    error: false,
  },
  updateCategories: {
    isFetching: false,
    success: false,
    error: false,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    getCateStart: (state) => {
      state.categories.isFetching = true;
      state.categories.getAll = [];
      state.categories.error = false;
    },
    getCateSuccess: (state, action) => {
      state.categories.isFetching = false;
      state.categories.getAll = action.payload;
      state.categories.error = false;
    },
    getCateError: (state) => {
      state.categories.isFetching = false;
      state.categories.getAll = [];
      state.categories.error = true;
    },
    postStart: (state) => {
      state.postCategories.isFetching = true;
      state.postCategories.success = false;
      state.postCategories.error = false;
    },
    postSuccess: (state, action) => {
      state.postCategories.isFetching = false;
      state.postCategories.success = action.payload;
      state.postCategories.error = false;
    },
    postError: (state) => {
      state.postCategories.isFetching = false;
      state.postCategories.success = false;
      state.postCategories.error = true;
    },
    updateStart: (state) => {
      state.updateCategories.isFetching = true;
      state.updateCategories.success = false;
      state.updateCategories.error = false;
    },
    updateSuccess: (state, action) => {
      state.updateCategories.isFetching = false;
      state.updateCategories.success = action.payload;
      state.updateCategories.error = false;
    },
    updateError: (state) => {
      state.updateCategories.isFetching = false;
      state.updateCategories.success = false;
      state.updateCategories.error = true;
    },
  },
});

export const {
  getCateStart,
  getCateSuccess,
  getCateError,
  postStart,
  postSuccess,
  postError,
  updateStart,
  updateSuccess,
  updateError,
} = categorySlice.actions;
export default categorySlice.reducer;
