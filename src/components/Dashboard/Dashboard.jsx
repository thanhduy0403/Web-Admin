import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar/index";
import { Funnel, Calendar } from "lucide-react";
import OverView from "./Header/OverView";
import Recent_Order from "./Body/Recent_Order";
import Best_Seller from "./Body/Best_Seller";
import axiosInstance from "../../axiosInstance";
import Inventory from "./Footer/Inventory";
import CateBest_Seller from "./Footer/CateBest_Seller";
import Recent_User from "./Footer/Recent_User";
import Today_Statistics from "./Body/Today_Statistics";

function Dashboard() {
  const monthNow = new Date().getMonth() + 1;
  const yearNow = new Date().getFullYear();
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth() + 1);
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());

  const renderMonthLabel = (month) => {
    return month === monthNow ? `Tháng ${monthNow}` : `Tháng ${month}`;
  };

  const renderYearLabel = (year) => {
    return year === yearNow ? `Năm ${yearNow} ` : `Năm ${year}`;
  };

  const startYear = 2024;
  const years = Array.from(
    { length: yearNow - startYear + 1 },
    (_, i) => startYear + i
  );

  const [data, setData] = useState("");

  const getDashboardStart = async (month = selectMonth, year = selectYear) => {
    try {
      const res = await axiosInstance.get(
        `/v1/admin/query/dsh?month=${month}&year=${year}`
      );
      setData(res.data);
    } catch (error) {
      setData("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full ">
        <div className="w-[14%] ">
          <Sidebar />
        </div>
        <div className="w-[86%] mx-auto  mt-10  min-h-screen border  bg-gray-50">
          <div className="px-10 shadow-sm  py-5 h-[13rem] bg-white border">
            <h1 className="mt-10  text-xl font-bold ">Dashboard</h1>
            <span className="text-sm text-gray-500">
              Chào mừng đã trở lại! Đây là tổng quan hệ thống hiện tại
            </span>
            <div className="mt-5 justify-between flex items-center">
              {/* time */}
              <div>
                <p className="text-sm font-semibold text-gray-700 flex items-center gap-3">
                  Thời gian:{" "}
                  <span className=" text-center font-semibold border w-[11rem] py-1 px-2 flex items-center gap-2 bg-gray-100 rounded-md text-blue-500">
                    <Calendar size={12} />
                    {selectMonth ? renderMonthLabel(selectMonth) : ""} {""}
                    {selectYear ? renderYearLabel(selectYear) : ""}
                  </span>
                </p>
              </div>
              {/* filter */}
              <div className="flex items-center gap-3 ">
                <Funnel size={15} />
                {/* month */}
                <select
                  value={selectMonth}
                  className="w-[6rem] border py-1 rounded-md text-sm"
                  onChange={(e) => setSelectMonth(Number(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {renderMonthLabel(month)}
                    </option>
                  ))}
                </select>
                {/* year */}
                <select
                  value={selectYear}
                  className="w-[6rem] border py-1 rounded-md text-sm"
                  onChange={(e) => setSelectYear(Number(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {renderYearLabel(year)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* over view */}
          <div className="flex items-center justify-center gap-4 mx-auto  px-2 h-[13rem] ">
            <OverView
              data={data}
              getDashboardStart={getDashboardStart}
              selectMonth={selectMonth}
              selectYear={selectYear}
            />
          </div>
          <div className="flex items-center py-3 px-6  w-full gap-2">
            <Recent_Order />
            <Today_Statistics />
          </div>
          {/* best seller */}
          <div className="flex items-center py-3 px-6  w-full ">
            <Best_Seller
              data={data}
              selectMonth={selectMonth}
              selectYear={selectYear}
              getDashboardStart={getDashboardStart}
            />
          </div>
          {/*  */}
          <div className=" w-full px-6 items-center grid grid-cols-3 gap-5 mt-5 mb-5">
            <Inventory />
            <CateBest_Seller />
            <Recent_User />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
