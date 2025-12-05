import React, { useEffect, useState } from "react";
import { Clock, User, Bell, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../../utils/auth";
export default function DriverHeader({ driverId }) {
  const [currentDate, setCurrentDate] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const driver = getUserFromToken();
  // Cập nhật ngày + tên tài xế
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formatted);
  }, [driver.driverId]);

  // Lấy thông báo
  const user = getUserFromToken();
  // alert(user.userId);
  const fetchNotifications = async () => {
    if (!user.userId) return;

    try {
      // Gọi API mới đơn giản hơn
      const res = await fetch(
        `http://localhost:5000/api/notifications/user/${user.userId}`
      );

      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error("Lỗi tải thông báo:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // Đánh dấu đã đọc
  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) =>
        prev.map((n) => (n.notif_id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleProfileClick = () => {
    navigate("/driver/profile");
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 rounded-xl border border-gray-100 relative">
      <h1 className="text-xl font-semibold text-blue-700">Hệ thống tài xế</h1>

      <div className="flex items-center gap-6 text-sm text-gray-700">
        <div className="text-right">
          <p>
            Tài xế: <strong>{driver.name}</strong>
          </p>
          <p className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4 text-blue-500" />
            {currentDate}
          </p>
        </div>

        {/* CHUÔNG THÔNG BÁO */}
        <div className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 hover:bg-gray-100 rounded-full transition"
          >
            <Bell className="w-6 h-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown thông báo */}
          {openNotif && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpenNotif(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border z-50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 font-bold text-center">
                  Thông báo ({unreadCount} chưa đọc)
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {loadingNotif ? (
                    <p className="p-4 text-center text-gray-500">Đang tải...</p>
                  ) : notifications.length === 0 ? (
                    <p className="p-8 text-center text-gray-500">
                      Không có thông báo nào
                    </p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.notif_id}
                        onClick={() =>
                          !notif.is_read && markAsRead(notif.notif_id)
                        }
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition
                                                    ${
                                                      !notif.is_read
                                                        ? "bg-blue-50 font-medium border-l-4 border-l-blue-500"
                                                        : "bg-white"
                                                    }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {notif.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notif.created_at).toLocaleString(
                                "vi-VN"
                              )}
                            </p>
                          </div>
                          {!notif.is_read && (
                            <Circle className="w-3 h-3 text-blue-600 fill-current flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-2 bg-gray-50 text-center border-t">
                  <button
                    onClick={() => setOpenNotif(false)}
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Nút hồ sơ */}
        <button
          onClick={handleProfileClick}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition"
        >
          <User className="w-6 h-6 text-blue-700" />
        </button>
      </div>
    </header>
  );
}
