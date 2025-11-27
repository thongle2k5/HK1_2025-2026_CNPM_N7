import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const ParentContext = createContext();

export function ParentSocketProvider({ user, children, busIds }) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    s.on("parent:bus_notification", (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
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
    if (!user || !user.user_id) {
      console.log("No user found");
      return;
    }


    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(
          `${baseURL}/notifications/unread-count/${user.user_id}`
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
      await fetch(`${baseURL}/notifications/mark-all-read/${user.user_id}`, {
        method: "POST",
      });
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <ParentContext.Provider value={{ socket, notifications, unreadCount,setUnreadCount }}>
      {children}
    </ParentContext.Provider>
  );
}

