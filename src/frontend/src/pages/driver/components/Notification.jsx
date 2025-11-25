import React, { useState, useEffect } from "react";
import { Bell, Circle } from "lucide-react";

export default function DriverNotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/notifications/user/27"
      );
      const data = await res.json();
      setNotifications(data || []);
    } catch (err) {
      console.error("Lỗi tải thông báo:", err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // cập nhật mỗi 30s
    return () => clearInterval(interval);
  }, [token]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="relative">
      {/* Chuông thông báo */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown danh sách */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 overflow-hidden">
            <div className="bg-blue-600 text-white p-3 font-semibold text-center">
              Thông báo ({unreadCount} chưa đọc)
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <p className="p-4 text-center text-gray-500">Đang tải...</p>
              ) : notifications.length === 0 ? (
                <p className="p-8 text-center text-gray-500">
                  Không có thông báo nào
                </p>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.notif_id}
                    onClick={() => !notif.is_read && markAsRead(notif.notif_id)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition
                      ${
                        !notif.is_read ? "bg-blue-50 font-medium" : "bg-white"
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-2">
                        <h4 className="font-semibold text-gray-800">
                          {notif.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(notif.created_at).toLocaleString("vi-VN")}
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

            <div className="p-2 bg-gray-50 text-center">
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-blue-600 hover:underline"
              >
                Đóng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
