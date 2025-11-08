import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi"; // tiếng Việt

function Recent_User() {
  const [data, setData] = useState([]);
  dayjs.extend(relativeTime);
  dayjs.locale("vi");
  const getRecentUser = async () => {
    try {
      const res = await axiosInstance.get("/v1/admin/auth/getList");
      // console.log(res.data);
      setData(res.data.getAll);
    } catch (error) {
      setData([]);
    }
  };
  const Recent_User = Array.isArray(data)
    ? data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];

  console.log(Recent_User);
  useEffect(() => {
    getRecentUser();
  }, []);
  return (
    <>
      <div className="border border-orange-200 bg-orange-50 relative rounded-lg shadow-sm p-3 h-[12rem] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 bg-orange-100 border border-orange-200 rounded-full text-orange-600">
            <Users className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-base font-semibold text-orange-700">
            Khách Hàng Mới
          </h1>
        </div>
        {Recent_User.length > 0 ? (
          <div>
            <p className="text-xs mb-2 text-orange-500">
              Các khách hàng gần đây
            </p>
            <div className="space-y-1.5">
              {Recent_User.map((user) => (
                <div
                  className="flex justify-between items-center bg-orange-100 px-2.5 py-1 rounded-md border border-orange-200"
                  key={user._id}
                >
                  <span className="font-medium text-xs">{user.username}</span>
                  <span className="text-[11px] font-semibold text-orange-700">
                    Thời gian: {dayjs(user.createdAt).fromNow()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <Link
          className="text-[11px] font-medium absolute bottom-2 right-2 text-blue-500 mt-2 text-right hover:underline"
          to={"/user_management"}
        >
          Xem chi tiết
        </Link>
      </div>
    </>
  );
}

export default Recent_User;
