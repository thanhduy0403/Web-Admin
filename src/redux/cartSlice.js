import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance"; // chỉnh theo đường dẫn của bạn

// ✅ Lấy dữ liệu từ localStorage
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};
const getCartIDFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cartID")) || null;
};
const getTotalPriceProductsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("totalPriceProducts")) || 0;
};
const getTotalQuantityProductsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("totalQuantityProducts")) || 0;
};

// Initial state
const initialState = {
  addCart: { isFetching: false, error: false },
  cartID: getCartIDFromLocalStorage(),
  cartItems: getCartFromLocalStorage(),
  totalPriceProducts: getTotalPriceProductsFromLocalStorage(),
  totalQuantityProducts: getTotalQuantityProductsFromLocalStorage(),
};

// ✅ Hàm lưu giỏ hàng vào localStorage
const saveCartToLocalStorage = (state) => {
  localStorage.setItem("cartID", JSON.stringify(state.cartID));
  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  localStorage.setItem(
    "totalPriceProducts",
    JSON.stringify(state.totalPriceProducts)
  );
  localStorage.setItem(
    "totalQuantityProducts",
    JSON.stringify(state.totalQuantityProducts)
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartStart: (state) => {
      state.addCart.isFetching = true;
      state.addCart.error = false;
    },
    addCartSuccess: (state, action) => {
      state.addCart.isFetching = false;
      state.addCart.error = false;

      const product = action.payload;

      // Tìm sản phẩm trùng _id và size
      const exist = state.cartItems.find(
        (item) => item._id === product._id && item.size === product.size
      );

      if (exist) {
        exist.quantity += product.quantity || 1;
        exist.totalPrice += (product.price || 0) * (product.quantity || 1);
      } else {
        state.cartItems.push({
          _id: product._id,
          name: product.name,
          image: product.image,
          discount: product.discount,
          size: product.size || null,
          quantity: product.quantity || 1,
          stock: product.stock,
          price: product.price,
          totalPrice: product.price * (product.quantity || 1),
        });
      }

      // Cập nhật tổng tiền & tổng số lượng
      state.totalQuantityProducts += product.quantity || 1;
      state.totalPriceProducts +=
        (product.price || 0) * (product.quantity || 1);

      saveCartToLocalStorage(state);
    },
    addCartError: (state) => {
      state.addCart.isFetching = false;
      state.addCart.error = true;
    },

    setCart: (state, action) => {
      state.cartID = action.payload.cartID || state.cartID;
      state.cartItems = action.payload.cartItems || [];
      state.totalQuantityProducts = action.payload.totalQuantityProducts || 0;
      state.totalPriceProducts = action.payload.totalPriceProducts || 0;

      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.cartID = null;
      state.cartItems = [];
      state.totalQuantityProducts = 0;
      state.totalPriceProducts = 0;

      localStorage.removeItem("cartID");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalQuantityProducts");
      localStorage.removeItem("totalPriceProducts");
    },

    // Tuỳ chọn: tăng / giảm / xoá item
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i._id === action.payload._id && i.size === action.payload.size
      );
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantityProducts++;
        state.totalPriceProducts += item.price;
        saveCartToLocalStorage(state);
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (i) => i._id === action.payload._id && i.size === action.payload.size
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          item.totalPrice -= item.price;
          state.totalQuantityProducts--;
          state.totalPriceProducts -= item.price;
        } else {
          state.cartItems = state.cartItems.filter(
            (i) => i._id !== item._id || i.size !== item.size
          );
          state.totalQuantityProducts--;
          state.totalPriceProducts -= item.price;
        }
        saveCartToLocalStorage(state);
      }
    },
    deleteItem: (state, action) => {
      const { _id, size } = action.payload;
      const item = state.cartItems.find(
        (i) => i._id === _id && i.size === size
      );
      if (item) {
        state.totalQuantityProducts -= item.quantity;
        state.totalPriceProducts -= item.totalPrice;
        state.cartItems = state.cartItems.filter(
          (i) => i._id !== _id || i.size !== size
        );
        saveCartToLocalStorage(state);
      }
    },
  },
});

export const {
  addCartStart,
  addCartSuccess,
  addCartError,
  setCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} = cartSlice.actions;
export default cartSlice.reducer;
