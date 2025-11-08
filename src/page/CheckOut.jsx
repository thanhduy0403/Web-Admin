import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../layout/Input";
import { MdOutlinePeopleAlt, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { orderProduct } from "../redux/apiRequest";
import { setCartID } from "../redux/cartSlice"; // Import hành động setCartID
import { useNavigate } from "react-router-dom";
import { Button, message, Space, Popconfirm, Select } from "antd";
import { FaPhoneVolume } from "react-icons/fa6";

function CheckOut() {
  const [messageApi, contextHolder] = message.useMessage();
  const [username_Receive, setUsername_Receive] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentStatus] = useState("");
  const dispatch = useDispatch();
  const cartID =
    useSelector((state) => state.myCart.cartID) ||
    localStorage.getItem("cartID");
  const navigate = useNavigate();
  const order = async (e) => {
    e.preventDefault();

    // ✅ Kiểm tra lại cartID trước khi gọi orderProduct
    // let finalCartID = cartID || JSON.parse(localStorage.getItem("cartID"));

    // console.log("cartIDProduct trước khi gọi orderProduct:", finalCartID);

    // if (!finalCartID) {
    //   alert("Giỏ hàng của bạn đang trống hoặc chưa được khởi tạo!");
    //   return;
    // }

    // Kiểm tra dữ liệu nhập vào
    if (!username_Receive.trim() || !address.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newOrder = { username_Receive, address, phoneNumber, paymentMethod };

    try {
      const res = await orderProduct(dispatch, newOrder, cartID);
      if (res !== null) {
        messageApi.success("Order sản phẩm thành công");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      messageApi.error("Order sản phẩm thất bại!!");
      console.log(error);
    }
  };

  // useEffect(() => {
  //   let storedCartID = JSON.parse(localStorage.getItem("cartID"));
  //   console.log("cartID từ localStorage:", storedCartID);

  //   if (!cartID && storedCartID) {
  //     dispatch(setCartID(storedCartID));
  //   }
  // }, [cartID, dispatch]);

  const orderPaymentOption = [
    "Thanh Toán Khi Nhận Hàng",
    "Chuyển Khoản Ngân Hàng",
  ];
  return (
    <>
      {contextHolder}
      <Navbar />
      <div className="flex w-full bg-slate-300 min-h- mt-16">
        <form
          onSubmit={order}
          className="w-[30rem] bg-white rounded-md h-[35rem] space-y-5 mx-auto justify-center mt-10 px-5 mb-[2rem]"
        >
          <h1 className="font-semibold text-xl mt-5">Checkout</h1>
          <div className=" space-y-3">
            <label className="flex items-center gap-1">
              <span>Username Receiver</span>
              <MdOutlinePeopleAlt className="text-black" />
            </label>
            <Input
              value={username_Receive}
              onChange={(e) => setUsername_Receive(e.target.value)}
              className="w-full py-1 border  border-black rounded-md px-2"
              placeholder="Enter Username Receiver"
              required
            />
          </div>
          <div className=" space-y-4">
            <label className="flex items-center gap-1">
              <span className="">Address</span>
              <MdLocationOn />
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full  border border-black  rounded-md placeholder:p-2"
              placeholder="Enter Address"
              required
            ></textarea>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-1">
              <span> Phone Number</span>
              <FaPhoneVolume />
            </label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
              className="w-full p-2 border  border-black rounded-md "
              required
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-1">
              <span> Payment method</span>
              <FaPhoneVolume />
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full py-2 border px-2 border-black rounded-md"
            >
              <option value="">Chọn Phương Thức Thanh Toán</option>
              {orderPaymentOption?.map((pay) => (
                <option value={pay} key={pay}>
                  {pay}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full text-center bg-indigo-600 py-2 rounded-md text-white font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}

export default CheckOut;
