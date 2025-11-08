import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import axiosInstance from "../../../axiosInstance";
import ProgressBar from "./ProgressBar";
function Today_Statistics() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [data, setData] = useState([]);
  const getDailyData = async () => {
    const res = await axiosInstance.get("v1/admin/query/daily");
    setData(res.data.percentChange);
    console.log(res.data);
  };

  useEffect(() => {
    getDailyData();
  }, []);
  return (
    <>
      <div className="w-[35%] bg-white h-[31rem] shadow-md rounded-xl p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Thống kê nhanh</h1>
            <p className="text-sm  text-gray-500"> 2 ngày gần đây</p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
            <CalendarDays size={18} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-500">
              {formattedDate}
            </span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-6">
          <ProgressBar label="Doanh thu" percent={data.PercentRevenue || 0} />
          <ProgressBar label="Đơn hàng" percent={data.PercentOrders || 0} />
          <ProgressBar label="Khách hàng" percent={data.PercentUsers || 0} />
        </div>
      </div>
    </>
  );
}

export default Today_Statistics;
