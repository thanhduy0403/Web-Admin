import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import Sidebar from "../Sidebar/index";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { message } from "antd";
import { ArrowLeft } from "lucide-react";
import { UserPen } from "lucide-react";
import PermissionList from "./PermissionList";

const Permission = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [permissionList, setPermissionList] = useState(null);
  const [selectedEndpoints, setSelectedEndpoints] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getDataUser = async () => {
    try {
      const res = await axiosInstance.get(`/v1/admin/account/${id}`, {
        withCredentials: true,
      });
      setData(res.data.checkAccountID);
      console.log("data", res.data);

      if (res.data && res.data.checkAccountID.allowedEndpoints) {
        setSelectedEndpoints(res.data.checkAccountID.allowedEndpoints);
      }
    } catch (error) {
      setData(null);
    }
  };

  const getListPermission = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/permission/getList", {
        withCredentials: true,
      });
      setPermissionList(res.data);
    } catch (error) {
      setPermissionList(null);
    }
  };

  const handleCheckBoxChange = (endpointID) => {
    setSelectedEndpoints((selected) => {
      // tìm kiếm những endpoint nào đã được chọn
      //endpointID được gửi từ client selected là các endpoint đã được tick hay chưa nếu rồi == true
      const isSelected = selected.includes(endpointID);

      // kiểm tra nếu đã tick thì nhấn bỏ tick
      if (isSelected) {
        // bỏ tick khi endpoint đó đã được tick
        const newSelected = selected.filter((id) => id !== endpointID);
        return newSelected;
      } else {
        // thêm mới khi endpoint đó chưa được tick
        const newSelected = [...selected, endpointID];
        return newSelected;
      }
    });
  };

  const assignPermission = async () => {
    try {
      const res = await axiosInstance.patch(
        `/v1/admin/permission/assign_permission/${id}`,
        // endpointIDs = req.body.endpointIDs
        // selectedEndpoints là các endpoint được chọn ex selectedEndpoints = ["12345", "67890"];
        { endpointIDs: selectedEndpoints },
        {
          withCredentials: true,
        }
      );
      messageApi.success("Thay đổi thành công");
      await getListPermission();
      console.log("selectedEndpoints:", selectedEndpoints);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Thay đổi thất bại");
      }
    }
  };

  const revokeEndpointPermission = async (endpointID) => {
    try {
      const res = await axiosInstance.delete(
        `/v1/admin/permission/revokeEndpointPermission/${id}`,
        {
          withCredentials: true,
          data: { endpointID },
        }
      );
      messageApi.success("Hủy quyền thành công");
      await getListPermission();
      await getDataUser();
    } catch (error) {
      messageApi.error("Hủy quyền thất bại");
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    getListPermission();
  }, []);

  return (
    <>
      {contextHolder}

      <div className="w-full px-[3rem] mt-[7rem] text-sm">
        {/* Back Button */}
        <Link
          to={"/account_management"}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="border w-6 h-6 rounded-md p-1 hover:bg-gray-100" />
          <span className="text-sm font-medium">Quay lại</span>
        </Link>

        {/* Page Title */}
        <h1 className="font-bold mt-4 text-xl flex items-center gap-2">
          🔑 Phân Quyền Tài Khoản
        </h1>
        <span className="text-gray-500 text-base">
          Quản lý quyền hạn cho tài khoản Sub Admin
        </span>

        {/* Account Info Card */}
        <div className="w-[32rem] h-auto border shadow-sm bg-white px-6 py-5 mt-5 rounded-xl">
          {data ? (
            <div className="flex justify-between items-start">
              {/* Left Info */}
              <div className="space-y-5">
                <div className="flex items-center text-lg gap-2 font-semibold">
                  <UserPen className="text-blue-500" />
                  <h1>Thông tin tài khoản</h1>
                </div>

                <div className="flex items-center">
                  {/* Avatar */}
                  <div className="w-[5rem] h-[5rem] flex items-center justify-center bg-gray-100 rounded-full border shadow-inner">
                    <UserPen className="w-10 h-10 text-gray-600" />
                  </div>

                  {/* User Info */}
                  <div className="px-6 space-y-2">
                    <p className="font-medium text-xl">{data.fullname}</p>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        data.position === "Admin"
                          ? "bg-red-100 text-red-600"
                          : data.position === "Sub Admin"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      @{data.position}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Info */}
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">📧 Email:</span>{" "}
                  <span className="text-gray-700">{data.email}</span>
                </p>
                <p>
                  <span className="font-medium">🏢 Phòng ban:</span>{" "}
                  <span className="text-gray-700">{data.position}</span>
                </p>
                <p>
                  <span className="font-medium">📅 Ngày tạo:</span>{" "}
                  <span className="text-gray-700">
                    {new Date(data.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      {/* Permission List */}
      <div className="mx-auto px-10 w-full h-auto mb-[4rem] mt-8">
        <PermissionList
          permissionList={permissionList}
          assignPermission={assignPermission}
          selectedEndpoints={selectedEndpoints}
          handleCheckBoxChange={handleCheckBoxChange}
        />
      </div>
    </>
  );
};

export default Permission;
