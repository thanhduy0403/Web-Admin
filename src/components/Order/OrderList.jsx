import React, { useState } from "react";
import { Eye, ShoppingCart } from "lucide-react";
import { Button, message, Space, Popconfirm, Modal } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenSquare } from "react-icons/fa";
import axiosInstance from "../../axiosInstance";
import EditStatusOrder from "./EditStatusOrder";
import ModalDetailOrder from "./ModalDetailOrder";
import { CircleCheckBig, Clock, Car, Package, CircleX } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Pagination } from "antd";
function OrderList({
  orders,
  showModalEdit,
  handleEditOk,
  handleEditCancel,
  showModalView,
  // cancelOrder,
  isModalEditOpen,
  selectedOrderEdit,
  setSelectedOrderEdit,
  getListOrder,
  handleOk,
  selectedOrder,
  isModalOpenView,
  handleCancel,
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectStatus, setSelectStatus] = useState("");
  const [selectPayment, setSelectPayment] = useState("");

  //page hiện tại = 1
  const [currentPage, setCurrentPage] = useState(1);

  //số lượng sản phẩm được hiện thị trên page
  const itemsPerPage = 5;

  // cập nhật trạng thái
  const confirmOrder = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(
        `/v1/admin/order/${id}`,
        {
          orderStatus: selectedOrderEdit.orderStatus,
          paymentMethod: selectedOrderEdit.paymentMethod,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        messageApi.success("Cập nhật đơn hàng thành công");
        await getListOrder();
        handleEditCancel();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Cập nhật thất bại");
      }
    }
  };

  // hủy đơn hàng
  const cancelOrder = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.delete(`/v1/admin/order/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        messageApi.success("Hủy đơn hàng thành công");
        await getListOrder();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        messageApi.error(error.response.data.message);
      } else {
        messageApi.error("Hủy đơn hàng thất bại");
      }
    }
  };

  const ORDER_STATUS = [
    "Chưa Xác Nhận",
    "Đã Xác Nhận",
    "Đang Giao",
    "Hoàn Thành",
    "Đã Hủy",
  ];
  const PAYMENT_STATUS = [
    "Thanh Toán Khi Nhận Hàng",
    "Thanh Toán Online",
    "Thất Bại",
  ];

  const filterOder = Array.isArray(orders)
    ? orders.filter((item) => {
        // lấy trạng thái payment status và order status từ orders
        const matchesStatus =
          selectStatus === "" || selectStatus === item.orderStatus;
        const matchesPayment =
          selectPayment === "" || selectPayment === item.paymentMethod;
        return matchesStatus && matchesPayment;
      })
    : [];

  // tính số lượng sản phẩm sẽ hiển thị trên page
  //1. lấy thứ tự sản phẩm đầu tiên 1 page
  // (1-1) * 4 = 0 ==> lấy sản phẩm ở vị trí đầu tiên
  const startIndex = (currentPage - 1) * itemsPerPage;
  //2. lấy sản phẩm cuối cùng trên 1 page
  // 0 + 4  = 4 ==> 0->1->2->3
  const endIndex = startIndex + itemsPerPage;

  const displayedOrders = filterOder.slice(startIndex, endIndex);
  return (
    <>
      {contextHolder}
      <div className="w-[95%] mx-auto mt-5">
        {/* Bộ lọc & tiêu đề */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-3">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📝 Danh Sách Đơn Hàng
            </h1>

            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Lọc trạng thái */}
              <select
                onChange={(e) => setSelectStatus(e.target.value)}
                className="block w-[14rem] font-medium p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Trạng thái đơn hàng</option>
                {ORDER_STATUS.map((status, index) => (
                  <option key={index}>{status}</option>
                ))}
              </select>

              {/* Lọc phương thức thanh toán */}
              <select
                onChange={(e) => setSelectPayment(e.target.value)}
                className="block w-[14rem] font-medium p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Phương thức thanh toán</option>
                {PAYMENT_STATUS.map((pay, index) => (
                  <option key={index}>{pay}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bảng danh sách đơn */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left">STT</th>
                <th className="px-4 py-3 text-left">Mã đơn hàng</th>
                <th className="px-4 py-3 text-left">Khách hàng</th>
                <th className="px-4 py-3 text-left">Sản phẩm</th>
                <th className="px-4 py-3 text-right">Tổng tiền</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Thanh toán</th>
                <th className="px-4 py-3 text-center">Ngày Đặt</th>
                <th className="px-4 py-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {displayedOrders && displayedOrders.length > 0 ? (
                displayedOrders.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3 font-semibold">ORD-{index + 1}</td>
                    <td className="px-4 py-3 font-mono">ORD{item._id}</td>
                    <td className="px-4 py-3">{item.username_Receive}</td>

                    {/* Sản phẩm */}
                    <td className="px-4 py-3">
                      {item.products.slice(0, 1).map((pro, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          {pro.nameSnapshot || pro.product?.name || "Không rõ"}
                        </div>
                      ))}
                      {item.products.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{item.products.length - 1} sản phẩm khác
                        </div>
                      )}
                    </td>

                    {/* Tổng tiền */}
                    <td className="px-4 py-3 text-right text-red-500 font-semibold">
                      {item.totalPriceProduct?.toLocaleString("de-DE") || 0}$
                    </td>

                    {/* Trạng thái đơn */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-1 rounded-lg font-semibold text-xs gap-1
                    ${
                      item.orderStatus === "Chưa Xác Nhận"
                        ? "bg-yellow-50 text-yellow-600"
                        : item.orderStatus === "Đã Xác Nhận"
                        ? "bg-blue-50 text-blue-600"
                        : item.orderStatus === "Đang Giao"
                        ? "bg-purple-50 text-purple-600"
                        : item.orderStatus === "Hoàn Thành"
                        ? "bg-green-50 text-green-600"
                        : item.orderStatus === "Đã Hủy"
                        ? "bg-red-50 text-red-600"
                        : ""
                    }`}
                      >
                        {item.orderStatus === "Chưa Xác Nhận" && (
                          <Clock size={14} />
                        )}
                        {item.orderStatus === "Đã Xác Nhận" && (
                          <CircleCheckBig size={14} />
                        )}
                        {item.orderStatus === "Đang Giao" && <Car size={14} />}
                        {item.orderStatus === "Hoàn Thành" && (
                          <Package size={14} />
                        )}
                        {item.orderStatus === "Đã Hủy" && <CircleX size={14} />}
                        {item.orderStatus}
                      </span>
                    </td>

                    {/* Thanh toán */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block w-[10rem] text-center font-medium text-xs
                    ${
                      item.paymentMethod === "Thanh Toán Khi Nhận Hàng"
                        ? "text-orange-500"
                        : item.paymentMethod === "Đã Thanh Toán"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                      >
                        {item.paymentMethod}
                      </span>
                    </td>

                    {/* Ngày đặt */}
                    <td className="px-4 py-3 text-center">
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    {/* Thao tác */}
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <Eye
                          onClick={() => showModalView(item)}
                          size={18}
                          className="cursor-pointer hover:text-blue-500 transition"
                        />
                        <SquarePen
                          onClick={() => showModalEdit(item)}
                          size={18}
                          className="cursor-pointer text-blue-500 hover:text-blue-600 transition"
                        />
                        <Popconfirm
                          title="Bạn muốn hủy đơn hàng này?"
                          onConfirm={(e) => cancelOrder(e, item._id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <RiDeleteBin6Line
                            size={18}
                            className="text-red-500 cursor-pointer hover:text-red-600 transition"
                          />
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                      <ShoppingCart className="w-8 h-8 mb-2" />
                      <p>Không tìm thấy đơn hàng nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Phân trang */}
          <div className="flex justify-end p-4">
            <Pagination
              pageSize={itemsPerPage}
              current={currentPage}
              total={filterOder.length}
              showSizeChanger={false}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      {/*  modal chi tiết đơn hàng  */}
      <Modal
        title={
          <h1 className="text-2xl font-semibold">
            {selectedOrder
              ? `Chi tiết đơn hàng ODR-${orders.indexOf(selectedOrder) + 1}`
              : "Chi tiết đơn hàng"}
          </h1>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpenView}
        onOk={handleOk}
        className="rounded-2xl overflow-hidden"
        onCancel={handleCancel}
        width={600}
      >
        <ModalDetailOrder selectedOrder={selectedOrder} />
      </Modal>
      {/* modal trạng thái đơn hàng */}
      <Modal
        title={<h1 className="font-semibold text-2xl">Cập Nhật Trạng Thái</h1>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        width={500}
      >
        <EditStatusOrder
          selectedOrderEdit={selectedOrderEdit}
          setSelectedOrderEdit={setSelectedOrderEdit}
          orders={orders}
          confirmOrder={confirmOrder}
        />
      </Modal>
    </>
  );
}

export default OrderList;
