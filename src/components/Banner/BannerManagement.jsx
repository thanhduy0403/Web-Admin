import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { SquarePen } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalBanner from "./ModalBanner";
import { Modal } from "antd";

function BannerManagement() {
  const [editBanner, setEditBanner] = useState(null);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getListBanner = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/banner/get_All");
      setData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    getListBanner();
  }, []);

  const showBanner = (ban = null) => {
    setEditBanner(ban); // null để thêm mới
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      {/* ✅ Chỉ giữ nội dung chính */}
      <div className="px-10 py-6 mt-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              📢 Quản Lý Banner
            </h1>
            <span className="text-gray-500 text-sm">
              Tạo và quản lý các banner quảng cáo cho cửa hàng
            </span>
          </div>
          <button
            onClick={() => showBanner(null)}
            className="flex items-center gap-2 font-semibold bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Thêm Banner
          </button>
        </div>

        {/* Table container */}
        <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6">
          {/* Table header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              📋 Danh Sách Banner
            </h2>
            <div className="relative w-56">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm banner..."
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left w-1/4">🏷️ Tiêu Đề</th>
                  <th className="px-6 py-3 text-left w-1/6">🖼️ Ảnh</th>
                  <th className="px-6 py-3 text-left w-1/6">⏰ Thời Gian</th>
                  <th className="px-6 py-3 text-left w-1/6">📦 Sản Phẩm</th>
                  <th className="px-6 py-3 text-center w-1/6">⚙️ Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Tiêu đề */}
                      <td className="px-6 py-4 font-medium">{item.title}</td>

                      {/* Ảnh banner */}
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center shadow-sm">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Thời gian */}
                      <td className="px-6 py-4 text-gray-600">
                        <div>
                          {new Date(item.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-400 text-xs">
                          → {new Date(item.endDate).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Sản phẩm */}
                      <td className="px-6 py-4">
                        <div className="flex justify-start">
                          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold text-xs">
                            {item.products.length} sản phẩm
                          </span>
                        </div>
                      </td>

                      {/* Thao tác */}
                      <td className="px-6 py-4 mt-5 text-center flex items-center justify-center gap-4">
                        <SquarePen
                          onClick={() => showBanner(item)}
                          size={18}
                          className="text-blue-500 cursor-pointer hover:scale-110 transition"
                        />

                        <RiDeleteBin6Line
                          size={18}
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Không có banner
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={
          <div>
            {editBanner ? "Cập nhật banner" : " Thêm banner mới"}
            <p className="text-gray-400 text-xs">
              {editBanner ? " Chỉnh sửa thông tin banner" : "Thêm mới banner"}
            </p>
          </div>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <div className="max-h-[70vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ModalBanner
            setOpenModal={setOpenModal}
            getListBanner={getListBanner}
            handleCancel={handleCancel}
            editBanner={editBanner}
          />
        </div>
      </Modal>
    </>
  );
}

export default BannerManagement;
