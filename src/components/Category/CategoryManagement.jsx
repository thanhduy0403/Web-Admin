import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Input from "../../layout/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SquarePen, Package } from "lucide-react";
import { Popconfirm, message } from "antd";
import axiosInstance from "../../axiosInstance";
import Sidebar from "../Sidebar";
import OverViewCategory from "./OverViewCategory";
import FormCategory from "./FormCategory";

function CategoryManagement() {
  const [messageApi, contextHolder] = message.useMessage();
  const [nameCate, setNameCate] = useState("");
  const [descCate, setDescCate] = useState("");
  const [imageCate, setImageCate] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [cate, setCate] = useState({ categories: [], totalProduct: 0 });

  const navigate = useNavigate();

  // ✅ Lấy danh sách danh mục từ API
  const getList = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/category/getList");
      if (res.data.success) {
        setCate(res.data);
      } else {
        setCate({ categories: [], totalProduct: 0 });
      }
    } catch (error) {
      console.log(error);
      setCate({ categories: [], totalProduct: 0 });
    }
  };

  // ✅ Lọc theo từ khóa
  const searchCategory = cate.categories.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Xóa danh mục
  const handleDeleteItemCate = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.delete(`/v1/admin/category/${id}`);
      if (res.status === 200) {
        messageApi.success("Xóa danh mục thành công");
        await getList(); // cập nhật lại danh sách
        return;
      } else {
        messageApi.error("Bạn không thể xóa danh mục này");
        return;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Xóa thất bại");
      }
    }
  };

  // ✅ Lấy thông tin để sửa
  const getInfoCate = (cateItem) => {
    setNameCate(cateItem.name);
    setDescCate(cateItem.description);
    setImageCate(cateItem.image);
    setIsEdit(true);
    navigate(`/category/edit/${cateItem._id}`);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {contextHolder}

      {/* Title */}
      <div className="px-10 mb-6 mt-16 ">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mt-10">
          Quản Lý Danh Mục
        </h1>
        <span className="text-gray-500 text-sm">
          Tổ chức và phân loại sản phẩm theo danh mục
        </span>
      </div>

      {/* Overview */}
      <div className="w-[95%] mx-auto mt-3">
        <OverViewCategory cate={cate} />
      </div>

      {/* Content */}
      <div className="w-full px-6 flex gap-6 mt-6">
        {/* Category List */}
        <div className="w-[65%] mx-auto border rounded-xl bg-white shadow-sm">
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <h1 className="font-bold text-xl">🗂️ Danh Sách Danh Mục</h1>
            <div className="relative w-[15rem]">
              <Input
                onChange={(e) => setQuery(e.target.value)}
                className="pl-2 pr-3 py-2 w-full border rounded-md text-sm"
                placeholder="🔍 Tìm kiếm danh mục..."
              />
            </div>
          </div>

          <div className="p-4 space-y-3">
            {searchCategory.length > 0 ? (
              searchCategory.map((item, index) => (
                <div
                  key={index}
                  className="flex relative items-center gap-4 border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    className="w-[5rem] h-[4rem] object-cover rounded-md border"
                    alt=""
                  />

                  <div className="flex-1 text-start space-y-1">
                    <div className="flex items-center gap-3">
                      <h1 className="font-semibold text-gray-800">
                        {item.name}
                      </h1>
                      <p className="px-2 py-1 text-xs text-blue-700 bg-blue-100 border border-blue-200 rounded-lg font-semibold">
                        {item.productCount} Sản Phẩm
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="text-xs text-gray-400">
                      Tạo ngày{" "}
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <div
                      onClick={() => getInfoCate(item)}
                      className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white text-sm font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    >
                      <SquarePen size={18} className="text-blue-500" />
                      Sửa
                    </div>
                    <Popconfirm
                      title="Bạn muốn xóa danh mục này?"
                      okText="Có"
                      cancelText="Không"
                      onConfirm={(e) => handleDeleteItemCate(e, item._id)}
                    >
                      <div className="flex items-center gap-2 px-3 py-1 border rounded-md bg-white text-sm font-medium hover:bg-red-50 hover:text-red-600 cursor-pointer">
                        <RiDeleteBin6Line size={18} className="text-red-500" />
                        Xóa
                      </div>
                    </Popconfirm>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <Package className="w-8 h-8 mb-2" />
                <p>Không tìm thấy danh mục nào</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Category */}
        <div className="w-[35%] bg-white border rounded-xl shadow-sm p-6">
          <FormCategory
            nameCate={nameCate}
            setNameCate={setNameCate}
            descCate={descCate}
            setDescCate={setDescCate}
            imageCate={imageCate}
            setImageCate={setImageCate}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            getList={getList}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryManagement;
