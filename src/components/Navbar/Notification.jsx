import React, { useEffect, useState } from "react";
import { Bell, ShoppingCart } from "lucide-react";
import { useSocket } from "../../context/SocketContext";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function Notification() {
  const navigate = useNavigate();
  const [showBell, setShowBell] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new_order", (order) => {
      message.open({
        type: "info",
        content: order.message,
        duration: 10,
      });
      console.log("bạn có đơn hàng mới", order);
      const newNoti = {
        id: order.newOrder._id,
        data: order.newOrder,
        timestamp: Date.now(),
      };
      setNotifications((prev) => {
        const updated = [newNoti, ...prev];
        localStorage.setItem("admin_notifications", JSON.stringify(updated));
        return updated;
      });
      setNotificationCount((prev) => {
        const updatedCount = prev + 1;
        localStorage.setItem(
          "admin_notifications_count",
          updatedCount.toString()
        );
        return updatedCount;
      });
      setShowBell(true);
    });
    return () => {
      socket.off("new_order");
    };
  }, [socket]);

  // Xử lý khi click vào thông báo - XÓA NGAY LẬP TỨC
  const handleNotificationClick = (e, orderId) => {
    e.preventDefault();

    // Xóa thông báo ngay khi click
    setNotifications((prev) => {
      const updated = prev.filter((i) => i.id !== orderId);
      localStorage.setItem("admin_notifications", JSON.stringify(updated));
    });
    setNotificationCount((prev) => {
      const updatedCount = Math.max(0, prev - 1);
      localStorage.setItem(
        "admin_notifications_count",
        updatedCount.toString()
      );
    });
    // Đóng dropdown
    setShowBell(false);

    // Navigate đến order management với orderId
    navigate(`/order_management?orderId=${orderId}`);
  };

  // Xóa thủ công một thông báo bằng nút X
  const handleRemoveNotification = (e, notificationId) => {
    e.preventDefault();
    e.stopPropagation();
    // cập nhật vào local
    setNotifications((prev) => {
      const updated = prev.filter((i) => i.id !== notificationId);
      localStorage.setItem("admin_notifications", JSON.stringify(updated));
      return updated;
    });
    setNotificationCount((prev) => {
      const updated = Math.max(0, prev - 1);
      localStorage.setItem("admin_notifications_count", updated);
      return updated;
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    setNotificationCount(0);
    localStorage.removeItem("admin_notifications");
    localStorage.removeItem("admin_notifications_count");
  };

  const handleToggleBell = () => {
    setShowBell((prev) => !prev);
  };
  useEffect(() => {
    // lấy về danh sách thông báo
    const saveNoti = JSON.parse(
      localStorage.getItem("admin_notifications") || "[]"
    );
    // lấy về số lượng thông báo
    const saveCount = parseInt(
      localStorage.getItem("admin_notifications_count") || "0"
    );
    setNotifications(saveNoti);
    setNotificationCount(saveCount);
  }, []);
  return (
    <>
      <div className="relative">
        <button
          onClick={handleToggleBell}
          className="relative flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-2.5 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Bell
            size={20}
            className={notificationCount > 0 ? "animate-pulse" : ""}
          />

          {/* Badge số lượng với hiệu ứng */}
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-lg animate-bounce">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        {/* Dropdown thông báo */}
        {showBell && (
          <>
            {/* Overlay để click outside */}
            <div className="fixed inset-0 z-40" onClick={handleToggleBell} />

            <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Bell size={20} />
                    Thông báo mới
                    {notificationCount > 0 && (
                      <span className="bg-white text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </h3>

                  {/* Nút xóa tất cả */}
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-white text-xs hover:underline opacity-90 hover:opacity-100 transition"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>
              </div>

              {/* Nội dung thông báo */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((nor) => (
                      <div key={nor.id} className="relative group">
                        <button
                          onClick={(e) => handleNotificationClick(e, nor.id)}
                          className="w-full block p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 text-left"
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <ShoppingCart size={18} className="text-white" />
                            </div>

                            {/* Nội dung */}
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-800 text-sm mb-1">
                                FashionHub thông báo
                              </p>
                              <p className="text-gray-600 text-sm mb-1">
                                Bạn có đơn hàng mới
                              </p>
                              <p className="text-orange-600 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                Xem chi tiết đơn hàng
                                <span className="group-hover:translate-x-1 transition-transform">
                                  →
                                </span>
                              </p>
                            </div>

                            {/* Dot indicator */}
                            <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          </div>
                        </button>

                        {/* Nút X để xóa */}
                        <button
                          className="absolute top-2 right-2 w-6 h-6 bg-gray-200 hover:bg-red-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs font-bold z-10"
                          title="Xóa thông báo"
                          onClick={(e) => handleRemoveNotification(e, nor.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bell size={28} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                      Không có thông báo nào
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Các thông báo mới sẽ hiển thị tại đây
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="border-t border-gray-100 p-3 bg-gray-50">
                  <Link
                    to="/order_management"
                    onClick={handleToggleBell}
                    className="block w-full text-center text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                  >
                    Xem tất cả đơn hàng
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Notification;
