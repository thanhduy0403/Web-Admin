import React from "react";

function ModalDetailOrder({ selectedOrder }) {
  return (
    <div className="max-h-[450px] overflow-y-auto pr-2 space-y-4">
      <div className="mt-4 space-y-6">
        {/* Thông tin khách hàng */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            🧑 Thông Tin Khách Hàng
          </h2>
          <div className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm space-y-2">
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Tên: </span>
              {selectedOrder?.username_Receive}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Điện thoại: </span>
              {selectedOrder?.phoneNumber}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Địa chỉ: </span>
              {[
                selectedOrder?.address.street,
                selectedOrder?.address?.ward,
                selectedOrder?.address.district,
                selectedOrder?.address?.province,
              ].join("-")}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-gray-700">Ghi chú: </span>
              {selectedOrder?.note ? selectedOrder.note : ""}
            </p>
          </div>
        </section>

        {/* Danh sách sản phẩm */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            📦 Sản phẩm
          </h2>
          <div className="space-y-3">
            {selectedOrder?.products?.map((pro, idx) => (
              <div
                key={pro._id || idx}
                className="border px-4 py-3 rounded-lg flex items-center gap-4 bg-white shadow-sm"
              >
                <img
                  className="w-16 h-16 object-cover rounded-md border"
                  src={pro.product?.image}
                  alt="product"
                />
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    {pro.nameSnapshot || pro.product?.name || "Không rõ"}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Số lượng: {pro.quantity}
                  </p>
                  <p className="text-gray-500 text-xs">Size: {pro.size}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tóm tắt đơn hàng */}
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            📝 Tóm Tắt Đơn Hàng
          </h2>
          <div className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm space-y-4">
            {/* Tổng tiền */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Tổng tiền: </span>
              <span className="text-lg font-bold text-red-600">
                {selectedOrder?.finalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            {/* Trạng thái */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Trạng thái: </span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  selectedOrder?.orderStatus === "Chưa Xác Nhận"
                    ? "text-yellow-600 bg-yellow-100"
                    : selectedOrder?.orderStatus === "Đã Xác Nhận"
                    ? "text-blue-600 bg-blue-100"
                    : selectedOrder?.orderStatus === "Đang Giao"
                    ? "text-purple-600 bg-purple-100"
                    : selectedOrder?.orderStatus === "Hoàn Thành"
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {selectedOrder?.orderStatus}
              </span>
            </div>

            {/* Thanh toán */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Thanh toán: </span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  selectedOrder?.paymentMethod === "Thanh Toán Khi Nhận Hàng"
                    ? "text-yellow-600 bg-yellow-100"
                    : selectedOrder?.paymentMethod === "Đã Thanh Toán"
                    ? "text-green-600 bg-green-100"
                    : "text-red-600 bg-red-100"
                }`}
              >
                {selectedOrder?.paymentMethod}
              </span>
            </div>

            {/* Ngày đặt */}
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Ngày đặt: </span>
              <span className="text-sm font-semibold text-gray-800">
                {new Date(selectedOrder.createdAt).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ModalDetailOrder;
