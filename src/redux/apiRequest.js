import {
  loginStart,
  loginSuccess,
  loginError,
  logoutStart,
  logoutSuccess,
  logoutError,
} from "./authSlice";
import {
  getStart,
  getSuccess,
  getError,
  postProductStart,
  postProductSuccess,
  postProductError,
  editProductStart,
  editProductSuccess,
  editProductError,
} from "./productSlice";
import {
  getCateStart,
  getCateSuccess,
  getCateError,
  postStart,
  postSuccess,
  postError,
  deleteStart,
  updateStart,
  updateSuccess,
  updateError,
} from "./categorySlice";
import axiosInstance from "../axiosInstance";
import axios from "axios";
import Cookies from "js-cookie";

import {
  addCartStart,
  addCartSuccess,
  addCartError,
  setCart,
  clearCart,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  setCartID,
} from "./cartSlice";
import { data } from "react-router-dom";
import { orderError, orderStart, orderSuccess } from "./orderSlice";
import { getUserError, getUserStart, getUserSuccess } from "./userSlice";
// login save token in local storage
// export const login = async (user, dispatch, navigate) => {
//   dispatch(loginStart());
//   try {
//     const res = await axiosInstance.post("/v1/admin/auth/login", user);
//     if (res.data.checkUser.isAdmin === true) {
//       console.log(res.data);
//       dispatch(loginSuccess(res.data));
//       navigate("/");
//     } else {
//       dispatch(loginError("Bạn không có quyền đăng nhập."));
//     }
//   } catch (error) {
//     console.error("Lỗi đăng nhập:", error);
//     dispatch(loginError("Đăng nhập thất bại. Vui lòng thử lại."));
//   }
// };

//getListProduct local storage
// export const getListProduct = async (accessToken, dispatch) => {
//   dispatch(getStart());
//   try {
//     const res = await axiosInstance.get("v1/admin/product/getList", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     dispatch(getSuccess(res.data));
//   } catch (error) {
//     dispatch(getError());
//   }
// };

// login

export const loginCookie = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post(
      "/v1/admin/account/loginAccount",
      user,
      {
        withCredentials: true,
      }
    );
    if (
      !res.data.user ||
      (res.data.user.role !== "admin" && res.data.user.role !== "subadmin")
    ) {
      console.log("Bạn không thể đăng nhập");
      return { success: false, message: "Bạn không thể đăng nhập" };
    }
    dispatch(loginSuccess(res.data));
    console.log("res", res.data);
    Cookies.set("currentUser", JSON.stringify(res.data), { expires: 7 });
    Cookies.set("token", res.data.token, { expires: 7 });
    setTimeout(() => {
      navigate("/");
    }, 1000);
    await dispatch(getCartCreateBy());
    return res.data;
  } catch (error) {
    dispatch(loginError());
    if (error.response && error.response.data) {
      return error.response.data; // trả message từ server
    }
    return { success: false, message: "Đã có lỗi xảy ra" };
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    const res = await axiosInstance.get("/v1/admin/account/logoutAccount", {
      withCredentials: true,
    });

    if (res.status === 200) {
      dispatch(logoutSuccess());
      Cookies.remove("currentUser");
      dispatch(clearCart());
    }
  } catch (error) {
    dispatch(logoutError());
  }
};
// get list Product
export const getListProduct = async (dispatch) => {
  dispatch(getStart());
  try {
    const res = await axiosInstance.get("/v1/admin/product/getList", {
      withCredentials: true,
    });
    dispatch(getSuccess(res.data));
  } catch (error) {
    dispatch(getError());
  }
};

// get list category
export const getCategory = async (dispatch) => {
  dispatch(getCateStart());
  try {
    const res = await axiosInstance.get("/v1/admin/category/getList", {
      withCredentials: true,
    });
    dispatch(getCateSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getCateError());
  }
};

// post category
export const postCategory = async (dispatch, formData) => {
  dispatch(postStart());
  try {
    const res = await axiosInstance.post("/v1/admin/category/post", formData, {
      withCredentials: true,
    });

    dispatch(postSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(postError());
    throw error;
  }
};

// update Category
export const updateCate = async (id, dispatch, formData) => {
  dispatch(updateStart());
  try {
    const res = await axiosInstance.put(`/v1/admin/category/${id}`, formData, {
      withCredentials: true,
    });
    dispatch(updateSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(updateError());
    console.error("Lỗi khi cập nhật danh mục:", error.message);
    throw error;
  }
};

// post product
export const postProduct = async (dispatch, formData) => {
  dispatch(postProductStart());
  try {
    const res = await axiosInstance.post(`/v1/admin/product/post`, formData, {
      withCredentials: true,
    });
    dispatch(postProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(postProductError());
    throw error;
  }
};

export const updateProduct = async (dispatch, id, formData) => {
  dispatch(editProductStart());
  try {
    const res = await axiosInstance.patch(`/v1/admin/product/${id}`, formData, {
      withCredentials: true,
    });
    dispatch(editProductSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(editProductError());
    throw error;
  }
};

// Thêm sản phẩm vào cart
export const addToCart =
  (id, quantity, size = null) =>
  async (dispatch) => {
    dispatch(addCartStart());
    try {
      await axiosInstance.post(`/v1/admin/cart/${id}`, {
        size: size || null,
        quantity,
      });

      // Sau khi thêm thành công, đồng bộ lại toàn bộ giỏ hàng từ server
      await dispatch(getCartCreateBy());
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      dispatch(addCartError());
    }
  };

// Lấy giỏ hàng từ server và lưu vào Redux + localStorage
export const getCartCreateBy = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/v1/admin/cart/getCart");
    const data = res.data;

    const cartID = data.cartID || null;

    // Chuẩn hoá cartItems
    const cartItems = Array.isArray(data.cartWithTotalPrice)
      ? data.cartWithTotalPrice
          .filter(
            (item) =>
              item && item.product && item.product._id && item.product.name
          )
          .map((item) => ({
            _id: item.product._id,
            name: item.product.name,
            image: item.product.image,
            discount: item.product.discount,
            size: item.size || null,
            quantity: item.quantity,
            stock: item.product.stock,
            price: item.product.price,
            totalPrice: item.totalPrice,
          }))
      : [];
    const totalQuantity = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalPriceProducts = data.totalPriceProducts || 0;

    dispatch(
      setCart({
        cartID,
        cartItems,
        totalQuantityProducts: totalQuantity,
        totalPriceProducts,
      })
    );
  } catch (error) {
    console.error("❌ Lỗi khi lấy giỏ hàng:", error);
  }
};

export const deleteItemCart = async (dispatch, productID, size) => {
  try {
    const res = await axiosInstance.delete(`/v1/admin/cart/${productID}`, {
      data: { size },
    });

    if (res.status === 200) {
      dispatch(deleteItem({ productID })); // Gửi ID của sản phẩm cần xóa
    }
    dispatch(deleteItem(res.data));
    // Sau khi xóa thành công, cập nhật lại danh sách giỏ hàng
    await dispatch(getCartCreateBy());
    //}
  } catch (error) {
    console.error("Xóa sản phẩm thất bại", error);
  }
};

export const increase = async (dispatch, productID, quantity, size) => {
  try {
    if (typeof quantity !== "number" || quantity < 1) {
      console.log("Số lượng hiện tại không hợp lệ:", quantity);
      return;
    }

    //  const newQuantity = currentQuantity + 1;
    // Kiểm tra nếu là sản phẩm không có size, so với stock

    const res = await axiosInstance.patch(`/v1/admin/cart/${productID}`, {
      quantity,
      size,
    });

    dispatch(increaseQuantity(res.data));
    await dispatch(getCartCreateBy());
    console.log("Tăng sản phẩm thành công");
  } catch (error) {
    console.log("Tăng sản phẩm thất bại", error?.response?.data || error);
  }
};

export const decrease = async (dispatch, productID, currentQuantity, size) => {
  try {
    const newQuantity = currentQuantity - 1;

    if (newQuantity < 1) {
      await deleteItemCart(dispatch, productID, size);
      // ✅ Return ngay để không thực hiện code phía dưới
      return { deleted: true };
    }

    const res = await axiosInstance.patch(`/v1/admin/cart/${productID}`, {
      quantity: newQuantity,
      size,
    });

    dispatch(decreaseQuantity(res.data));
    await dispatch(getCartCreateBy());
    console.log("Giảm sản phẩm thành công");
    return res.data;
  } catch (error) {
    console.log("Giảm sản phẩm thất bại", error);
  }
};

export const orderProduct = async (dispatch, info, cartID) => {
  dispatch(orderStart());

  if (!cartID) {
    console.error("Lỗi: cartIDProduct bị null!");
    dispatch(orderError());
    return;
  }

  try {
    const res = await axiosInstance.post(`/v1/admin/order/${cartID}`, info, {
      withCredentials: true,
    });
    dispatch(orderSuccess(res.data));
    localStorage.removeItem("cartID");
    dispatch(clearCart());
    return res.data;
  } catch (error) {
    console.error("Lỗi API đặt hàng:", error);
    dispatch(orderError());
    return null;
  }
};

export const getAllUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosInstance.get("/v1/admin/account/getList", {
      withCredentials: true,
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserError());
  }
};
