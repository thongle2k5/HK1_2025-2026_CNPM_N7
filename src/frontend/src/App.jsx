/* import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./pages/common/Login.jsx";
import AdminLayout from "./pages/admin/AdminLayout";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
    </Routes>
  );
} */
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Thêm useEffect import
import Header from "./components/specific/parentpage/Header.jsx";
import ChildTracking from "./pages/parent/ChildTracking.jsx";
import Notifications from "./pages/parent/Notifications.jsx";
import ChatBubble from "./pages/parent/ChatBubble.jsx";
import { SocketProvider } from "./components/specific/parentpage/ParentSocketProvider.jsx";


const user = { user_id: 1 };

function ParentApp() {
  const [unreadCount, setUnreadCount] = useState(0);
  const baseURL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(`${baseURL}/notifications/unread-count/${user.user_id}`);
        const data = await response.json();
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, []);

  const markAllAsRead = async () => {
    try {
      await fetch(`${baseURL}/notifications/mark-all-read/${user.user_id}`, {
        method: 'POST' 
      });
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleBellClick = async () => { 
    await markAllAsRead(); 
  };


  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Header 
        onBellClick={handleBellClick} 
        unreadCount={unreadCount} 
      />

      <SocketProvider>
        <Routes>
          <Route path="/" element={<ChildTracking user={user}/>} />
          <Route path="/parent" element={<ChildTracking user={user}/>} />
          <Route path="/parent/notifications" element={<Notifications user={user}/>} />
        </Routes>
      </SocketProvider>

      <ChatBubble user={user} />

    </div>
  );
}

export default ParentApp;