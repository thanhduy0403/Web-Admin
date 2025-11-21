import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import OverViewUser from "./OverViewUser";
import axiosInstance from "../../axiosInstance";
import UserList from "./UserList";
function UserManagement() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/auth/getList");
      if (res.data.success) {
        setData(res.data.getAll);
      }
    } catch (error) {
      setData([]);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="flex justify-between mt-16 mr-3 px-10 items-center">
        <div>
          <h1 className="text-xl font-bold"> Quản Lý Khách Hàng</h1>
          <span className="text-gray-500 text-sm">Danh sách khách hàng</span>
        </div>
      </div>
      <div className="w-[95%] mx-auto mt-3">
        <OverViewUser data={data} />
      </div>

      <div
        className=" w-[90%] mx-auto space-y-5 py-8 text-sm border mt-4 bg-white mb-3
      rounded-md "
      >
        <UserList data={data} getData={getData} />
      </div>
    </>
  );
}

export default UserManagement;
