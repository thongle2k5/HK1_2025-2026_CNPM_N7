import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Notifications({ driverId }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);


    useEffect(() => {
        const socket = io("http://localhost:5000");

        // 1. Lấy thông báo cũ từ API
        fetch(`http://localhost:5000/api/driver/notifications/${driverId}`)
            .then(res => res.json())
            .then(data => setNotifications(data));

        // 2. Nhận thông báo mới realtime
        socket.on("new_notification", (notif) => {
            setNotifications(prev => [notif, ...prev]);
        });

        return () => socket.disconnect();
    }, [driverId]);

    return (
        <div>
            <h2>Thông báo Admin</h2>
            <ul>
                {notifications.map(n => (
                    <li key={n.notif_id}>
                        <strong>{n.title}</strong> - {n.message} ({new Date(n.created_at).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}




