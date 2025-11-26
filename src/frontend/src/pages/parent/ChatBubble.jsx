import React, { useState, useEffect, useRef } from "react";
import "../../components/specific/parentpage/css/ChatBubble.css";
import { FaComment, FaTimes, FaBell } from "react-icons/fa";

const ChatBubble = ({ user }) => {
  const baseURL = "http://localhost:5000/api";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Lấy tin nhắn từ API
  const fetchMessages = async () => {
    if (!user?.user_id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/notifications/messages/${user.user_id}`);
      if (response.ok) {
        const data = await response.json();
        
        // SẮP XẾP TIN NHẮN: CŨ -> MỚI (theo thời gian tăng dần)
        const sortedMessages = data.sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        );
        
        setMessages(sortedMessages);
        
        // Đếm tin nhắn chưa đọc
        const unread = data.filter(msg => !msg.is_read && msg.receiver_id === user.user_id).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy tin nhắn khi component mount
  useEffect(() => {
    fetchMessages();
    
    // Polling mỗi 30 giây để cập nhật tin nhắn mới
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end"
      });
    }
  };

  // Mở/đóng chat
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen && unreadCount > 0) {
      markMessagesAsRead();
    }
    
    if (newIsOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
  };

  const markMessagesAsRead = async () => {
    try {
      const unreadMessages = messages.filter(msg => !msg.is_read && msg.receiver_id === user.user_id);
      
      for (const msg of unreadMessages) {
        await fetch(`${baseURL}/notifications/messages/mark-read/${msg.message_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.user_id })
        });
      }
      
      setUnreadCount(0);
      fetchMessages(); 
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Format thời gian
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format ngày
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <>
      {/* Bong bóng chat */}
      <div className={`chat-bubble ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <FaComment className="chat-icon" />
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </div>

      {/* Khung chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <FaComment className="header-icon" />
              <span>Tin nhắn</span>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="messages-container">
            {loading ? (
              <div className="loading-messages">Đang tải tin nhắn...</div>
            ) : messages.length > 0 ? (
              <>
                {messages.map((message, index) => {
                  const showDate = index === 0 || 
                    formatDate(messages[index-1].created_at) !== formatDate(message.created_at);

                  return (
                    <div key={message.message_id}>
                      {/* Ngày phân cách */}
                      {showDate && (
                        <div className="date-divider">
                          <span>{formatDate(message.created_at)}</span>
                        </div>
                      )}
                      
                      <div className="message notification-message">
                        <div className="message-content">
                          <div className="sender-info">
                            <span className="sender-name">
                              {message.sender_name || `Người gửi ${message.sender_id}`}
                            </span>
                            <span className="message-time">
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                          <div className="message-text">{message.content}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div 
                  ref={messagesEndRef} 
                  style={{ height: '1px', width: '100%' }}
                />
              </>
            ) : (
              <div className="no-messages">
                <FaBell className="no-messages-icon" />
                <p>Chưa có tin nhắn nào</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;