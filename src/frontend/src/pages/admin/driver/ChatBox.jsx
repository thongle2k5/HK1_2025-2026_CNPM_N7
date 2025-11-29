import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

export default function ChatBox({ driver, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Lấy ID của Admin đang đăng nhập
  // (Bạn nhớ kiểm tra xem localStorage lưu key là 'userId' hay 'user' nhé)
  const adminId = JSON.parse(localStorage.getItem("user"))?.userId || 1;

  // 1. Hàm tải lịch sử chat
  const fetchMessages = async (driverId, adminId) => {
    if (!driverId) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages?user1=${adminId}&user2=${driverId}`
      );
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Lỗi tải lịch sử tin nhắn:", err);
    }
  };

  useEffect(() => {
    if (!driver?.user_id) return; // Bảo vệ: Đảm bảo driver object có ID

    const driverUserId = driver.user_id;

    fetchMessages(driverUserId, adminId);
  }, [driver]);

  // Tự động cuộn xuống dưới cùng
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const messageToSend = inputMsg;
    const optimisticMessage = {
      // Tin nhắn hiển thị ngay
      sender_id: adminId,
      receiver_id: driver.user_id,
      content: messageToSend,
      created_at: new Date().toISOString(),
      // message_id: Date.now() // ID tạm
    };

    // 1. Hiển thị tin nhắn ngay lập tức (Optimistic UI)
    setMessages((prev) => [...prev, optimisticMessage]);
    setInputMsg(""); // 2. Xóa nội dung nhập liệu (FIX LỖI UI)

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: adminId,
          receiver_id: driver.user_id,
          content: messageToSend,
        }),
      });

      if (!res.ok) {
        fetchMessages(driver.user_id, adminId);
      }
    } catch (err) {
      alert("Lỗi gửi tin: " + err.message);
      fetchMessages(driver.user_id, adminId);
    }
  };
  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-2xl rounded-lg border border-gray-300 z-50 flex flex-col h-[400px]">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center shadow-md">
        <h3 className="font-bold text-sm">Chat với {driver?.name}</h3>
        <button onClick={onClose} className="hover:text-gray-200">
          <FaTimes />
        </button>
      </div>

      {/* Body (Danh sách tin nhắn) */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-10">
            Chưa có tin nhắn nào.
          </p>
        )}

        {messages.map((msg) => {
          const isMe = msg.sender_id == adminId; // Kiểm tra xem ai gửi
          return (
            <div
              key={msg.message_id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg text-sm shadow-sm ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.content}</p>
                <p
                  className={`text-[10px] mt-1 text-right ${
                    isMe ? "text-blue-100" : "text-gray-400"
                  }`}
                >
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer (Input) */}
      <form onSubmit={handleSend} className="p-2 border-t bg-white flex gap-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-full px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
}
