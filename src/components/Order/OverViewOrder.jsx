import React from "react";
import { Clock, DollarSign, ShoppingCart, Calendar, Car } from "lucide-react";
function OverViewOrder({ orders }) {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  console.log(orders);
  const filterOrder = {
    unconfirmed_order: orders.filter(
      (item) => item.orderStatus === "Chưa Xác Nhận"
    ),
    paid_order: orders.filter(
      (item) =>
        item.paymentMethod === "Thanh Toán Online" ||
        item.orderStatus === "Hoàn Thành"
    ),
    today_order: orders.filter((item) => {
      // là thời điểm tạo đơn hàng
      const createdDate = new Date(item.createdAt);
      // so sánh đơn hàng có được tạo trong ngày hôm nay không
      return createdDate >= startOfToday;
    }),
  };
  // tổng doanh thu
  const totalPaidAmount = filterOrder.paid_order.reduce(
    (sum, order) => sum + (order.totalPriceProduct || 0),
    0
  );

  return (
    <>
      <div className="flex  gap-6 mt-2">
        {/* Tổng số lượng đơn hàng */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Tổng đơn hàng</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-blue-600">
              {orders.length}
            </h1>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart size={22} className="text-blue-600" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Tất cả đơn hàng trong hệ thống
          </span>
        </div>

        {/* Đang chờ xử lý */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Chờ xử lý</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-yellow-500">
              {filterOrder.unconfirmed_order.length}
            </h1>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock size={22} className=" text-yellow-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">Đơn hàng cần xử lý</span>
        </div>

        {/* Doanh thu */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Doanh thu</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-green-500">
              {totalPaidAmount.toLocaleString("de-DE")}
            </h1>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign size={22} className=" text-green-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">
            Tổng doanh thu đã thanh toán
          </span>
        </div>

        {/* Đơn hàng hôm nay */}
        <div className="flex-1 min-w-[250px] bg-white h-[9rem] border px-5 py-4 rounded-xl shadow-md">
          <h1 className="text-gray-600 text-sm font-semibold">Hôm nay</h1>
          <div className="flex justify-between items-center mt-2">
            <h1 className="text-3xl font-bold text-purple-500">
              {filterOrder.today_order.length}
            </h1>
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar size={22} className=" text-purple-500" />
            </div>
          </div>
          <span className="text-gray-500 text-sm">Đơn hàng mới hôm nay</span>
        </div>
      </div>
    </>
  );
}

export default OverViewOrder;
