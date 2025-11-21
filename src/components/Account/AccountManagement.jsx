import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index.js";
import Sidebar from "../Sidebar/index.js";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { getAllUser } from "../../redux/apiRequest.js";
import AccountList from "./AccountList.jsx";
import { UserPlus } from "lucide-react";
import Input from "../../layout/Input.jsx";
import ModalCreateAccount from "./ModalCreateAccount.jsx";
import axios from "axios";
import axiosInstance from "../../axiosInstance.js";
function AccountManagement() {
  const dispatch = useDispatch();
  // const getAccount = useSelector((state) => state.user.getUser.getAll);
  // console.log("all account  =" + getAccount?.AccountList.length);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);
  const [account, setAccount] = useState([]);
  const getAccount = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/account/getList");
      if (res.data.success) {
        setAccount(res.data.AccountList);
      }
    } catch (error) {
      setAccount([]);
    }
  };

  // handle open modal create account
  const showModalView = () => {
    setOpenCreateAccount(true); // mở modal
  };
  const handleOk = () => {
    setOpenCreateAccount(false);
  };
  const handleCancel = () => {
    setOpenCreateAccount(false);
  };

  useEffect(() => {
    getAllUser(dispatch);
  }, []);
  useEffect(() => {
    getAccount();
  }, []);

  console.log("getAccount", getAccount);
  return (
    <>
      <div className="flex justify-between mt-16 mr-3 px-10 items-center">
        <div>
          <h1 className="text-xl font-bold"> Quản Lý Tài Khoản</h1>
          <span className="text-gray-500 text-sm">
            Quản lý thông tin tài khoản
          </span>
        </div>
        <div
          onClick={showModalView}
          className=" flex items-center text-white gap-2 w-[13rem] border font-semibold rounded-sm py-1 px-2 text-center bg-black"
        >
          <UserPlus />
          <button>Thêm mới tài khoản</button>
        </div>
      </div>
      <div
        className=" w-[90%] mx-auto space-y-5 py-8 text-sm border mt-4 bg-white mb-3
      rounded-md "
      >
        <AccountList getAccount={getAccount} account={account} />
      </div>

      {/*  modal thêm tài khoản  */}
      <Modal
        title="Thêm mới tài khoản"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openCreateAccount}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <ModalCreateAccount
          getAccount={getAccount}
          account={account}
          handleCancel={handleCancel}
        />
      </Modal>
    </>
  );
}

export default AccountManagement;
