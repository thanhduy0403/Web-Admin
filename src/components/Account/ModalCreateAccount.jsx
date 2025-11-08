import React, { useEffect, useState } from "react";
import Input from "../../layout/Input";
import { message } from "antd";
import axiosInstance from "../../axiosInstance";
import { getAllUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

function ModalCreateAccount({ handleCancel, getAccount }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      if (fullname === "" || email === "" || password === "") {
        messageApi.error("Vui lòng điền đầy đủ thông tin");
      }
      const res = await axiosInstance.post(
        "v1/admin/account/createAccount",
        {
          fullname: fullname,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setFullname("");
        setEmail("");
        setPassword("");
        console.log(res.data);
        messageApi.success("Đăng ký thành công");
        await getAccount();
        setTimeout(() => {
          handleCancel();
        }, 500);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Tạo tài khoản thất bại");
      }
    }
  };

  useEffect(() => {
    getAllUser(dispatch);
  }, []);
  return (
    <>
      {contextHolder}
      <label htmlFor="" className="mb-2">
        Nhập họ tên
      </label>
      <Input
        onChange={(e) => setFullname(e.target.value)}
        className="w-full mt-1 px-2 py-1 border mb-4"
        placeholder="Nhập họ tên"
        value={fullname}
      />

      <label htmlFor="" className="mb-2">
        Nhập email
      </label>
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full  mt-1 px-2 py-1 border mb-4"
        placeholder="Nhập email"
        value={email}
      />

      <label htmlFor="" className="mb-2">
        Nhập password
      </label>
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full  mt-1 px-2 py-1 border"
        placeholder="Nhập password"
        value={password}
      />
      <div className="w-full mx-auto mt-5 py-2 text-center rounded-md border bg-black">
        <button
          onClick={createAccount}
          className="text-white text-sm font-semibold "
        >
          Tạo tài khoản
        </button>
      </div>
    </>
  );
}

export default ModalCreateAccount;
