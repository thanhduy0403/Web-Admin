import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Input from "../layout/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginCookie } from "../redux/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import { message } from "antd";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isAdmin = { email, password };

    // Check trước để tránh gọi API khi input trống
    if (!email || !password) {
      return messageApi.error("Vui lòng nhập đầy đủ thông tin");
    }

    try {
      const res = await loginCookie(isAdmin, dispatch, navigate);
      console.log(res);

      if (res.success) {
        messageApi.success("Đăng nhập thành công");
      } else {
        messageApi.error(res.message || "Bạn Không Thể Đăng Nhập");
      }
    } catch (error) {
      messageApi.error("Xảy Ra Lỗi Vui Lòng Thử Lại");
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center  h-screen flex-col  bg-[rgb(239,83,42)]">
        <div className="mx-auto bg-[#fef6f5] border-2  sm:w-[450] md:w-[500px] w-[25rem] rounded-md ">
          <h1 className="text-center md:text-3xl text-2xl font-semibold mt-10 ">
            Login Page
          </h1>
          <form onSubmit={handleLogin}>
            <div className="my-10 mx-4 space-y-4 ">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                className="w-full px-2 h-[3rem] rounded-md border border-gray-300"
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                className="w-full px-2 h-[3rem] rounded-md border border-gray-300"
              />
              <div className="text-center ">
                <button className=" bg-[#e78a62] w-full py-3 rounded-md text-white font-semibold hover:bg-[#ee6f39]">
                  Đăng Nhập
                </button>
              </div>
              <div className="flex space-x-2 text-center justify-center ">
                <p className="text-gray-400">
                  Đăng ký nếu bạn chưa có tài khoản?
                </p>
                <Link className="text-[#ee2c4a]" to="/register">
                  Đăng Ký
                </Link>
              </div>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
