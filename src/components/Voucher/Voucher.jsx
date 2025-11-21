import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Input from "../../layout/Input";
import { Popconfirm } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SquarePen } from "lucide-react";
import axiosInstance from "../../axiosInstance";
import { Modal } from "antd";
import ModalVoucher from "./ModalVoucher";
import { message } from "antd";

function Voucher() {
  const [messageApi, contextHolder] = message.useMessage();

  const [editVoucher, setEditVoucher] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const getListVoucher = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/voucher/getList");
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      setData([]);
    }
  };
  useEffect(() => {
    getListVoucher();
  }, []);
  const showModal = (voucher = null) => {
    setEditVoucher(voucher); // null khi thêm mới
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
    setEditVoucher(null); // reset khi đóng modal
  };

  const handleOk = () => {
    setOpenModal(false);
  };
  // const handleCancel = () => {
  //   setOpenModal(false);
  //   setEditVoucher(null);
  // };

  const handleDeleteVoucher = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.delete(`/v1/admin/voucher/${id}`);
      if (res.data.success) {
        messageApi.success(res.data.message);
        await getListVoucher();
      } else {
        messageApi.error(res.data.message);
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
  return (
    <>
      {contextHolder}

      <div className="flex justify-between mt-16 mr-3 px-10 items-center">
        <div>
          <h1 className="text-xl font-bold">Quản Lý Voucher</h1>
          <span className="text-gray-500 text-sm">Danh sách voucher</span>
        </div>
        <div className="">
          <div className="bg-black px-4 py-1 text-center font-semibold rounded-sm border-2">
            <button onClick={() => showModal(null)} className=" text-white ">
              Thêm voucher
            </button>
          </div>
        </div>
      </div>
      <div
        className=" w-[90%] mx-auto space-y-5 py-8 text-sm border mt-4 bg-white mb-3
      rounded-md "
      >
        {/*  */}
        <div className="flex items-center justify-between mx-auto px-[3rem] rounded-md mb-6">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            🏷️Danh Sách Voucher
          </h1>
          <div className="flex items-center gap-5">
            {/* tìm kiếm account */}
            <div className="relative w-[14rem]">
              {/* <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
              <Input
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                className="pl-2 pr-2 py-2 w-full border text-sm rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="🔍Tìm kiếm voucher..."
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-[90%] mx-auto border rounded-lg border-gray-200 shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">🏷️ Mã Voucher</th>
                <th className="px-6 py-3 text-center">💸 Giảm Giá</th>
                <th className="px-6 py-3 text-center">📦 Đơn Tối Thiểu</th>
                <th className="px-6 py-3 text-center">💰 Giảm Tối Đa</th>
                <th className="px-6 py-3 text-center">🕒 Ngày tạo</th>
                <th className="px-6 py-3 text-center">⏰ Hạn sử dụng</th>
                <th className="px-6 py-3 text-center">📦 Số lượng</th>
                <th className="px-6 py-3 text-center">⚙️ Thao Tác</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-sm divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((voc) => (
                  <tr
                    key={voc._id}
                    className="hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 text-left">
                      {voc.code}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {voc.discountValue}%
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {voc.minOrderValue.toLocaleString("vi-VN")} đ
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {voc.maxDiscount
                        ? voc.maxDiscount.toLocaleString("vi-VN") + " đ"
                        : "Không giới hạn"}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {new Date(voc.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {new Date(voc.expiryDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {voc.quantity}
                    </td>
                    <td className="px-6 py-4 text-center flex items-center justify-center gap-4">
                      <SquarePen
                        onClick={() => showModal(voc)}
                        size={18}
                        className="text-blue-500 cursor-pointer hover:scale-110 transition"
                      />
                      <Popconfirm
                        onConfirm={(e) => handleDeleteVoucher(e, voc._id)}
                        title="Bạn có chắc muốn xóa voucher này?"
                        okText="Có"
                        cancelText="Không"
                      >
                        <RiDeleteBin6Line
                          size={18}
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                        />
                      </Popconfirm>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400">
                    <p>🚫 Không có voucher nào</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={
          <div>
            {editVoucher ? "Cập nhật voucher" : " Thêm Voucher Mới"}
            <p className="text-gray-400 text-xs">
              {editVoucher
                ? " Chỉnh sửa thông tin voucher"
                : "Tạo mã giảm giá mới cho khách hàng"}
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
          <ModalVoucher
            getListVoucher={getListVoucher}
            handleCancel={handleCancel}
            editVoucher={editVoucher}
          />
        </div>
      </Modal>
    </>
  );
}

export default Voucher;
