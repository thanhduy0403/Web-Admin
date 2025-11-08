import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

function Recent_Order() {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const [orders, setOrders] = useState([]);
  const getListOrder = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/order/getList", {
        withCredentials: true,
      });
      if (res.data.success) {
        setOrders(res.data.orderList);
      }
    } catch (error) {
      setOrders([]);
    }
  };

  // get top 5 order recent
  const top_3_orders_recent = Array.isArray(orders)
    ? orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : 0;

  useEffect(() => {
    getListOrder();
  }, []);
  return (
    <>
      <div className="w-[65%] bg-white h-[31rem] shadow-md rounded-xl p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Đơn Hàng Gần Đây
            </h1>
            <p className="text-sm  text-gray-500">
              {top_3_orders_recent?.length} đơn hàng mới nhất hiện tại
            </p>
          </div>

          {/* Link */}
          <Link
            to={"/order_management"}
            className="text-sm flex items-center gap-1 font-semibold text-blue-500 hover:text-blue-600 transition"
          >
            Xem tất cả
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* List */}
        <div className="space-y-4">
          {top_3_orders_recent?.map((ord, index) => (
            <div
              key={ord._id}
              className="flex justify-between items-center bg-white hover:shadow-md transition rounded-xl p-4 border"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                {/* Sản phẩm chính */}
                {ord.products.slice(0, 1).map((pro) => (
                  <img
                    key={pro._id}
                    className="w-16 h-16 rounded-lg object-cover border"
                    src={pro.product.image}
                    alt={pro.nameSnapshot || pro?.product.name}
                  />
                ))}

                {/* Thông tin chung */}
                <div>
                  <h1 className="font-semibold text-gray-800 text-sm">
                    Đơn hàng #{index + 1}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {ord.username_Receive}
                  </p>

                  <div className="text-gray-500 text-xs mt-1 flex items-center gap-2">
                    {ord.products.nameSnapshot || ord.products.product?.name}
                    {ord.products.length > 1 && (
                      <span className="italic">
                        +{ord.products.length - 1} sản phẩm
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Info */}
              <div className="text-right space-y-2 min-w-[140px]">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    ord.orderStatus === "Chưa Xác Nhận"
                      ? "text-yellow-500 bg-yellow-50"
                      : ord.orderStatus === "Đã Xác Nhận"
                      ? "text-blue-500 bg-blue-50"
                      : ord.orderStatus === "Đang Giao"
                      ? "text-purple-500 bg-purple-50"
                      : ord.orderStatus === "Hoàn Thành"
                      ? "text-green-500 bg-green-50"
                      : "text-red-500 bg-red-50"
                  }`}
                >
                  {ord.orderStatus}
                </span>

                <span
                  className={`block px-3 py-1 rounded-full text-xs font-medium ${
                    ord.paymentMethod === "Thanh Toán Khi Nhận Hàng"
                      ? "text-yellow-500 bg-yellow-100"
                      : "text-green-500 bg-green-100"
                  }`}
                >
                  {ord.paymentMethod}
                </span>

                <p className="text-gray-900 font-bold text-sm">
                  {ord.totalPriceProduct.toLocaleString("vi-VN")} VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Recent_Order;
