import React from "react";
import Input from "../../layout/Input";
import { useState } from "react";
import { Button, message, Space } from "antd";
import { getCategory, postCategory } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

function FormCategory({
  nameCate,
  setNameCate,
  descCate,
  setDescCate,
  imageCate,
  setImageCate,
  isEdit,
  setIsEdit,
  getList,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const { id } = useParams();
  const formData = new FormData();
  formData.append("name", nameCate);
  formData.append("description", descCate);
  formData.append("image", imageCate);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (!nameCate || !descCate || !imageCate) {
        messageApi.error("Hãy điền đầy đủ thông tin!");
        return;
      }

      const postCate = await postCategory(dispatch, formData);
      if (postCate) {
        messageApi.success(`Tạo mới danh mục thành công`);
        setNameCate("");
        setDescCate("");
        setImageCate(null);
        await getList();
      }
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 403 ? "Không đủ quyền truy cập" : "Tạo mới thất bại";

      messageApi.error(message);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      if (!nameCate || !descCate || !imageCate) {
        messageApi.error("Hãy điền đầy đủ thông tin!");
      }
      const updateCate = await axiosInstance.patch(
        `/v1/admin/category/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (updateCate.status === 200) {
        messageApi.success("cập nhật thành công");
        setNameCate("");
        setDescCate("");
        setImageCate(null);
        await getList();
      }
    } catch (error) {
      const status = error.response?.status;
      const message =
        status === 403 ? "Không đủ quyền truy cập" : "Cập nhật thất bại";

      messageApi.error(message);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="text-center mb-6">
        {isEdit ? (
          <>
            <h1 className="text-xl font-bold text-gray-800">
              Cập Nhật Danh Mục
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Cập nhật danh mục để phân loại sản phẩm
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-gray-800">
              Thêm Danh Mục Mới
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Tạo danh mục mới để phân loại sản phẩm
            </p>
          </>
        )}
      </div>

      {/* Form inputs */}
      <div className="space-y-5">
        {/* Tên danh mục */}
        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <Input
            value={nameCate}
            onChange={(e) => setNameCate(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="Nhập tên danh mục"
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-medium text-gray-700 text-sm mb-1">
            Mô tả
          </label>
          <textarea
            value={descCate}
            onChange={(e) => setDescCate(e.target.value)}
            rows="4"
            className="block w-full text-sm border rounded-md p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="Mô tả ngắn về danh mục..."
          ></textarea>
        </div>

        {/* Upload hình ảnh */}
        <div>
          <label className="block font-medium text-gray-700 text-sm mb-2">
            Hình ảnh danh mục
          </label>
          <label
            htmlFor="upload"
            className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16v-4m0 0V8m0 4h10m-5 4v-4m0 0V8m0 4h10"
              />
            </svg>
            <p className="text-gray-700 font-medium">
              Kéo thả hình ảnh vào đây
            </p>
            <p className="text-sm text-gray-500 my-1">hoặc</p>
            <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-md font-semibold hover:bg-blue-100">
              Chọn hình ảnh
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB mỗi file.
            </p>
            <input
              onChange={(e) => setImageCate(e.target.files[0])}
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>

          {imageCate && (
            <div className="relative mt-4 inline-block">
              <img
                src={
                  typeof imageCate === "string"
                    ? imageCate
                    : URL.createObjectURL(imageCate)
                }
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border shadow"
              />
              <button
                type="button"
                onClick={() => setImageCate(null)}
                className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 shadow"
                title="Xóa ảnh"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        {isEdit ? (
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={handleUpdateCategory}
              className="bg-black hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Cập Nhật Danh Mục
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setNameCate("");
                setDescCate("");
                setImageCate(null);
              }}
              className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-md font-semibold text-gray-700 transition"
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="pt-4 text-center">
            <button
              onClick={handleAddCategory}
              className="bg-black hover:bg-gray-900 text-white font-semibold px-8 py-2 rounded-md transition"
            >
              Thêm Danh Mục
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default FormCategory;
