import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {
      isStart: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    orderStart: (state) => {
      state.order.isStart = true;
      state.order.success = false;
      state.order.isStart = false;
    },
    orderSuccess: (state, action) => {
      state.order.isStart = false;
      state.order.success = action.payload;
      state.order.isStart = false;
    },
    orderError: (state) => {
      state.order.isStart = false;
      state.order.success = false;
      state.order.isStart = true;
    },
  },
});

export const { orderStart, orderSuccess, orderError } = orderSlice.actions;
export default orderSlice.reducer;
