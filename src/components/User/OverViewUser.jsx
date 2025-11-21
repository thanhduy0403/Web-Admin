import React, { useEffect, useState } from "react";
import { FolderOpen, Tag, Package } from "lucide-react";
import axiosInstance from "../../axiosInstance";
function OverViewUser({ data }) {
  const statusCount = {
    active: data.filter((item) => item.status === "Hoạt động").length,
    deleted: data.filter((item) => item.status === "Đã xóa").length,
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-6 ">
        {/* Tổng Danh Mục */}
        <div className="bg-white h-[9rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
          <h1 className="text-gray-600 text-sm font-semibold">
            Tổng khách hàng
          </h1>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">{data.length}</h1>
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderOpen className="w-6 h-6 text-blue-700" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Tất cả khách hàng trong hệ thống
          </span>
        </div>

        {/* Đang Hoạt Động */}
        <div className="bg-white h-[9rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
          <h1 className="text-green-600 text-sm font-semibold">
            Đang Hoạt Động
          </h1>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-600">
              {statusCount.active}
            </h1>
            <div className="p-3 bg-green-100 rounded-full">
              <Tag className="w-6 h-6 text-green-700" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Tình trạng tồn tại tài khoản
          </span>
        </div>

        {/* Tổng Sản Phẩm */}
        <div className="bg-white h-[9rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
          <h1 className="text-red-500 text-sm font-semibold">Đã xóa</h1>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-500">
              {statusCount.deleted}
            </h1>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Khách hàng đã hủy tài khoản
          </span>
        </div>
      </div>
    </>
  );
}

export default OverViewUser;
