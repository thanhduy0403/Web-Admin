import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      isFetching: false,
      getAll: [],
      error: false,
    },
    post: {
      isStart: false,
      success: false,
      error: false,
    },
    edit: {
      isStart: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    getStart: (state) => {
      state.products.isFetching = true;
      state.products.error = false;
      state.products.getAll = [];
    },
    getSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.getAll = action.payload;
      state.products.error = false;
    },
    getError: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
      state.products.getAll = [];
    },
    postProductStart: (state) => {
      state.post.isStart = true;
    },
    postProductSuccess: (state, action) => {
      state.post.success = action.payload;
    },
    postProductError: (state) => {
      state.post.error = true;
    },
    editProductStart: (state) => {
      state.edit.isStart = true;
    },
    editProductSuccess: (state, action) => {
      state.edit.isStart = false;
      state.edit.success = action.payload;
    },
    editProductError: (state) => {
      state.edit.isStart = false;
      state.edit.error = true;
    },
  },
});

export const {
  getStart,
  getSuccess,
  getError,
  postProductStart,
  postProductSuccess,
  postProductError,
  editProductStart,
  editProductSuccess,
  editProductError,
} = productSlice.actions;

export default productSlice.reducer;
