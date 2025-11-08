import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
function OverView({ selectMonth, selectYear, getDashboardStart, data }) {
  useEffect(() => {
    if (selectMonth && selectYear) {
      getDashboardStart(selectMonth, selectYear);
    }
  }, [selectMonth, selectYear]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tổng Doanh Thu */}
        <div className="bg-white rounded-xl shadow-md min-w-[260px] p-5 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium text-gray-500">
              Tổng Doanh Thu
            </h1>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="text-green-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">
            {data?.totalRevenue != null
              ? data.totalRevenue.toLocaleString("vi-VN") + " đ"
              : "0 đ"}
          </p>
          <span
            className={`inline-flex items-center mt-3 text-sm font-medium ${
              data?.percentChange?.revenue > 0
                ? "text-green-600"
                : data?.percentChange?.revenue < 0
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {data?.percentChange?.revenue > 0 ? (
              <>
                <TrendingUp size={14} className="mr-1" /> +
                {data?.percentChange?.revenue ?? 0}% so với tháng trước
              </>
            ) : data?.percentChange?.revenue < 0 ? (
              <>
                <TrendingDown size={14} className="mr-1" />{" "}
                {data?.percentChange?.revenue ?? 0}% so với tháng trước
              </>
            ) : (
              "Không thay đổi so với tháng trước"
            )}
          </span>
        </div>

        {/* Đơn Hàng */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-[260px] border-t-4 border-blue-500">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium text-gray-500">Đơn Hàng</h1>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="text-blue-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">
            {data?.total_orders}
            <span className="text-sm text-gray-500 ml-2">đơn</span>
          </p>
          <span
            className={`inline-flex items-center mt-3 text-sm font-medium ${
              data?.percentChange?.orders > 0
                ? "text-green-600"
                : data?.percentChange?.orders < 0
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {data?.percentChange?.orders > 0 ? (
              <>
                <TrendingUp size={14} className="mr-1" /> +
                {data?.percentChange?.orders ?? 0}% so với tháng trước
              </>
            ) : data?.percentChange?.orders < 0 ? (
              <>
                <TrendingDown size={14} className="mr-1" />{" "}
                {data?.percentChange?.orders ?? 0}% so với tháng trước
              </>
            ) : (
              "Không thay đổi so với tháng trước"
            )}
          </span>
        </div>

        {/* Sản phẩm */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-[260px] border-t-4 border-purple-500">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium text-gray-500">Sản Phẩm</h1>
            <div className="p-3 bg-purple-100 rounded-full">
              <Package className="text-purple-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">
            {data?.total_Products}
            <span className="text-sm text-gray-500 ml-2">sản phẩm</span>
          </p>
          <span
            className={`inline-flex items-center mt-3 text-sm font-medium ${
              data?.percentChange?.products > 0
                ? "text-green-600"
                : data?.percentChange?.products < 0
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {data?.percentChange?.products > 0 ? (
              <>
                <TrendingUp size={14} className="mr-1" /> +
                {data?.percentChange?.products ?? 0}% so với tháng trước
              </>
            ) : data?.percentChange?.products < 0 ? (
              <>
                <TrendingDown size={14} className="mr-1" />{" "}
                {data?.percentChange?.products ?? 0}% so với tháng trước
              </>
            ) : (
              "Không thay đổi so với tháng trước"
            )}
          </span>
        </div>

        {/* Khách hàng */}
        <div className="bg-white rounded-xl shadow-md p-5 min-w-[260px] border-t-4 border-orange-500">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium text-gray-500">
              Khách Hàng Online
            </h1>
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="text-orange-500 w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">
            {data?.total_Users}
            <span className="text-sm text-gray-500 ml-2">khách hàng</span>
          </p>
          <span
            className={`inline-flex items-center mt-3 text-sm font-medium ${
              data?.percentChange?.users > 0
                ? "text-green-600"
                : data?.percentChange?.users < 0
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {data?.percentChange?.users > 0 ? (
              <>
                <TrendingUp size={14} className="mr-1" /> +
                {data?.percentChange?.users ?? 0}% so với tháng trước
              </>
            ) : data?.percentChange?.users < 0 ? (
              <>
                <TrendingDown size={14} className="mr-1" />{" "}
                {data?.percentChange?.users ?? 0}% so với tháng trước
              </>
            ) : (
              "Không thay đổi so với tháng trước"
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default OverView;
