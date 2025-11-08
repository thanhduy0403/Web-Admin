import React from "react";
import { FolderOpen, Tag, Package } from "lucide-react";

function OverViewCategory({ cate }) {
  const totalCategory = cate.categories?.length || 0;
  const totalProduct = cate.totalProduct || 0;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Tổng Danh Mục */}
      <div className="bg-white h-[9.5rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
        <h1 className="text-gray-600 text-sm font-semibold">Tổng Danh Mục</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{totalCategory}</h1>
          <div className="p-3 bg-blue-100 rounded-full">
            <FolderOpen className="w-6 h-6 text-blue-700" />
          </div>
        </div>
        <span className="text-gray-500 text-sm">
          Tất cả danh mục trong hệ thống
        </span>
      </div>

      {/* Đang Hoạt Động */}
      <div className="bg-white h-[9.5rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
        <h1 className="text-green-600 text-sm font-semibold">Đang Hoạt Động</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-600">{totalCategory}</h1>
          <div className="p-3 bg-green-100 rounded-full">
            <Tag className="w-6 h-6 text-green-700" />
          </div>
        </div>
        <span className="text-gray-500 text-sm">
          Danh mục đang được sử dụng
        </span>
      </div>

      {/* Tổng Sản Phẩm */}
      <div className="bg-white h-[9.5rem] border px-6 py-5 rounded-xl shadow-md flex flex-col justify-between">
        <h1 className="text-purple-600 text-sm font-semibold">Tổng Sản Phẩm</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-600">{totalProduct}</h1>
          <div className="p-3 bg-purple-100 rounded-full">
            <Package className="w-6 h-6 text-purple-700" />
          </div>
        </div>
        <span className="text-gray-500 text-sm">
          Sản phẩm trong tất cả danh mục
        </span>
      </div>
    </div>
  );
}

export default OverViewCategory;
