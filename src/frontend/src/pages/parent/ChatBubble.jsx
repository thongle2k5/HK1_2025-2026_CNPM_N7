import React, { useState, useEffect, useRef } from "react";
import "../../components/specific/parentpage/css/ChatBubble.css";
import { FaComment, FaTimes, FaBell } from "react-icons/fa";
import {ParentContext} from "../../components/specific/parentpage/ParentSocketProvider.jsx";

const ChatBubble = ({ user }) => {
  const baseURL = "http://localhost:5000/api";
  const [isOpen, setIsOpen] = useState(false);
  const {messages} = React.useContext(ParentContext);
  const {unreadMessageCount, markMessagesAsRead} = React.useContext(ParentContext);
  const {loading} = React.useContext(ParentContext);;
  const messagesEndRef = useRef(null);

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
  const toggleChat = async () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen && unreadMessageCount > 0) {
      await markMessagesAsRead();
    }
    
    if (newIsOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 200);
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
        {unreadMessageCount > 0 && (
          <span className="unread-badge">{unreadMessageCount > 99 ? '99+' : unreadMessageCount}</span>
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