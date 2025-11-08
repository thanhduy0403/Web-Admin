import React from "react";

function EditStatusOrder({
  selectedOrderEdit,
  setSelectedOrderEdit,
  orders,
  confirmOrder,
}) {
  const orderStatusOption = [
    "Chưa Xác Nhận",
    "Đã Xác Nhận",
    "Đang Giao",
    "Hoàn Thành",
    "Đã Hủy",
  ];
  const orderPaymentOption = ["Thanh Toán Khi Nhận Hàng", "Thanh Toán Online"];

  return (
    <>
      {/* Thông tin đơn hàng */}
      <div className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          {selectedOrderEdit
            ? `Đơn hàng ORD-${
                orders.findIndex((o) => o._id === selectedOrderEdit._id) + 1
              }`
            : "Đơn hàng"}
        </h1>

        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">Khách hàng:</span>{" "}
            {selectedOrderEdit?.username_Receive}
          </p>
          <p>
            <span className="font-medium">Tổng tiền:</span>{" "}
            <span className="font-bold text-red-600">
              {selectedOrderEdit?.totalPriceProduct?.toLocaleString("vi-VN")} ₫
            </span>
          </p>
        </div>
      </div>
      {/* Trạng thái đơn hàng */}
      <div className="mt-5">
        <h1 className="text-sm font-semibold text-black">
          Trạng thái đơn hàng
        </h1>
        <select
          value={selectedOrderEdit?.orderStatus}
          onChange={(e) =>
            //...prev sẽ lưu các giá trị ban đầu
            // thay đổi orderStatus sau đó ghi đè lên các giá trị ban đầu

            setSelectedOrderEdit((prev) => ({
              ...prev,
              orderStatus: e.target.value,
            }))
          }
          className="mt-3 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          name=""
          id=""
        >
          {orderStatusOption.map((status, index) => (
            <option key={index}>{status}</option>
          ))}
        </select>
      </div>
      {/* Trạng thái thanh toán */}
      {/* <div className="mt-5">
        <h1 className="text-sm font-semibold text-black">
          Trạng thái thanh toán
        </h1>
        <select
          value={selectedOrderEdit?.paymentMethod}
          onChange={(e) =>
            setSelectedOrderEdit((prev) => ({
              //...prev sẽ lưu các giá trị ban đầu
              // thay đổi orderStatus sau đó ghi đè lên các giá trị ban đầu
              ...prev,
              paymentMethod: e.target.value,
            }))
          }
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          name=""
          id=""
        >
          {orderPaymentOption.map((pay, index) => (
            <option key={index}>{pay}</option>
          ))}
        </select>
      </div> */}
      <div className="w-full mx-auto mt-12 text-center py-2 rounded-md bg-black">
        <button
          onClick={(e) => confirmOrder(e, selectedOrderEdit._id)}
          className="text-white  font-semibold"
        >
          Xác nhận đơn hàng
        </button>
      </div>
    </>
  );
}

export default EditStatusOrder;
