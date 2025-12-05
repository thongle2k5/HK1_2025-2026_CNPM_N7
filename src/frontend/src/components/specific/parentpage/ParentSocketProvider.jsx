import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const ParentContext = createContext();

export function ParentSocketProvider({ user, children, busIds }) {
  const [socket, setSocket] = useState(null);
  const [hasNewBusNoti,setHasNewBusNoti] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const baseURL = "http://localhost:5000/api";

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    s.on("parent:bus_notification", (notification) => {
      setHasNewBusNoti(true);
      setUnreadCount((prevCount) => prevCount + 1);
      console.log("Received bus notification: ", notification);
    });
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    if (!busIds || busIds.length === 0) return;

    busIds.forEach(id => socket.emit("parent:join_bus_notification", { bus_id: id }));
  }, [busIds, socket]);

  useEffect(() => {
    if (!user || !user.userId) {
      console.log("No user found");
      return;
    }
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(
          `${baseURL}/notifications/unread-count/${user.userId}`
        );
        const data = await response.json();
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };
    fetchUnreadCount();
  }, [user]);

  const markAllAsRead = async () => {
    try {
      await fetch(`${baseURL}/notifications/mark-all-read/${user.userId}`, {
        method: "POST",
      });
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const fetchMessages = async () => {
    if (!user?.userId) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/notifications/messages/${user.userId}`);
      if (response.ok) {
        const data = await response.json();
        
        const sortedMessages = data.sort((a, b) => 
          new Date(a.created_at) - new Date(b.created_at)
        );
        
        setMessages(sortedMessages);
        
        const unread = data.filter(msg => !msg.is_read && msg.receiver_id === user.userId).length;
        setUnreadMessageCount(unread);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !user.userId) {
      console.log("No user found");
      return;
    }
    fetchMessages();
  }, []);
  
  const markMessagesAsRead = async () => {
    try {
      const unreadMessages = messages.filter(msg => !msg.is_read && msg.receiver_id === user.userId);
      
      for (const msg of unreadMessages) {
        await fetch(`${baseURL}/notifications/messages/mark-read/${msg.message_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.userId })
        });
      }
      
      setUnreadCount(0);
      fetchMessages(); 
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  return (
    <ParentContext.Provider value={{ 
      socket, 
      hasNewBusNoti, setHasNewBusNoti,unreadCount, markAllAsRead,
      messages, unreadMessageCount , markMessagesAsRead, loading ,user}}>
      {children}
    </ParentContext.Provider>
  );
}

