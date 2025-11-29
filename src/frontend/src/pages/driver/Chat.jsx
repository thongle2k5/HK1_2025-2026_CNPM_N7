import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Shield, Bell, Info, MessageCircle, X } from "lucide-react"; // Thêm icon X và MessageCircle
import { getUserId } from "../../utils/auth";
import { createPortal } from "react-dom";
// Kết nối Socket (Giữ nguyên)
const socket = io.connect("http://localhost:5000");

export default function DriverChatWidget() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const driverId = getUserId();
  const ADMIN_ID = 29;

  useEffect(() => {
    if (!driverId) return;

    console.log("🔌 Đang yêu cầu vào phòng chat với ID:", driverId);
    socket.emit("join_chat", driverId);

    fetch(
      `http://localhost:5000/api/messages?user1=${ADMIN_ID}&user2=${driverId}`
    )
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    const handleNewMessage = (newMessage) => {
      console.log("📩 Nhận tin mới:", newMessage);

      // Cập nhật danh sách tin nhắn ngay lập tức
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    };
    setIsOpen((currentIsOpen) => {
      if (!currentIsOpen) {
        setUnreadCount((prev) => prev + 1);
      }
      return currentIsOpen;
    });

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [driverId, isOpen]); // Thêm isOpen vào dependency

  // 2. Tự động cuộn (Giữ nguyên)
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnreadCount(0); // Mở ra thì reset số chưa đọc
    }
  }, [messages, isOpen]);

  // --- PHẦN GIAO DIỆN (THAY ĐỔI HOÀN TOÀN SANG WIDGET) ---
  const widgetJSX = (
    // Vẫn giữ z-[9999] cho chắc chắn
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans pointer-events-auto">
      {/* KHUNG CHAT */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in-up">
          {/* ... (Nội dung bên trong khung chat giữ nguyên) ... */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Bell size={18} />
              <div>
                <h3 className="font-bold text-sm">Hộp thư điều hành</h3>
                <p className="text-[10px] opacity-80">Tin nhắn từ Quản lý</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xs text-center px-4">
                <Info size={32} className="mb-2 opacity-20" />
                <p>Chưa có tin nhắn nào.</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className="flex justify-start animate-fade-in">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2 text-white flex-shrink-0 mt-1">
                  <Shield size={10} />
                </div>
                <div className="max-w-[85%] bg-white border border-gray-200 p-2 rounded-r-lg rounded-bl-lg shadow-sm">
                  <p className="text-[10px] font-bold text-blue-600 mb-0.5">
                    Quản trị viên
                  </p>
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {msg.content}
                  </p>
                  <p className="text-[9px] text-gray-400 mt-1 text-right">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 bg-gray-100 text-[10px] text-center text-gray-500 border-t">
            Kênh thông báo một chiều.
          </div>
        </div>
      )}

      {/* NÚT TRÒN (ICON) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform hover:scale-110 relative"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );

  // 3. Dùng createPortal để đưa widgetJSX vào thẳng body
  // Nó sẽ nằm ngoài cùng của cây DOM, không bị ai che khuất.
  return createPortal(widgetJSX, document.body);
}



