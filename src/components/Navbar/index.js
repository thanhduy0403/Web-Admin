import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsCartPlus } from "react-icons/bs";
import { getCartCreateBy, logOut } from "../../redux/apiRequest";
import { TbLogout2 } from "react-icons/tb";
import { TbLogin2 } from "react-icons/tb";
import { Bell } from "lucide-react";
import axiosInstance from "../../axiosInstance";

function Navbar({ setSearchProduct }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const cartItems = useSelector((state) => state.myCart.cartItems || []);
  const [order, setOrder] = useState([]);
  const getListOrder = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/order/getList");
      setOrder(res.data.orderList);
    } catch (error) {
      setOrder([]);
    }
  };
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut(dispatch);
  };

  useEffect(() => {
    if (user) {
      getCartCreateBy(dispatch);
    }
  }, [user, dispatch]);
  useEffect(() => {
    getListOrder();
  }, []);

  return (
    <div className="w-[86%] h-[5rem] fixed top-0 right-0 z-50 border bg-white">
      <div className="h-full px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <h1 className="font-bold text-2xl text-blue-600">Admin Panel</h1>
          <span className="text-gray-500 text-sm">Hệ thống quản lý</span>
        </Link>

        {/* Menu phải */}
        <div className="flex items-center gap-5">
          <Link
            to="/order_management"
            className="relative flex items-center justify-center bg-orange-500 hover:bg-orange-600 p-2 rounded-full text-white transition"
          >
            <Bell size={20} />

            {/* Badge số lượng */}
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
              {order?.length}
            </span>
          </Link>
          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">
                Hi, {user.user.fullname}
              </span>
              <button
                onClick={handleLogOut}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-medium"
              >
                Logout
                <TbLogout2 className="size-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition font-medium"
            >
              Login
              <TbLogin2 className="size-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
