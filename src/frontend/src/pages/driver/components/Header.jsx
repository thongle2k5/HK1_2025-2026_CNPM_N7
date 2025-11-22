import React, { useEffect, useState } from "react";
import { Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverHeader({ driverId }) {
    const [driverName, setDriverName] = useState("Tài xế"); // default
    const [currentDate, setCurrentDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Hiển thị ngày hiện tại
        const now = new Date();
        const formatted = now.toLocaleDateString("vi-VN", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        setCurrentDate(formatted);

        // Lấy tên tài xế: dùng dữ liệu tạm thời nếu chưa có driverId
        if (driverId) {
            fetch(`http://localhost:5000/api/drivers/${driverId}`)
                .then((res) => res.json())
                .then((data) => setDriverName(data.name))
                .catch((err) => {
                    console.error(err);
                    // Nếu lỗi fetch, vẫn giữ tên mặc định
                });
        } else {
            // Dữ liệu tạm thời
            setDriverName("Nguyễn Văn A");
        }
    }, [driverId]);

    const handleProfileClick = () => {
        navigate("/driver/profile"); // Chuyển sang trang hồ sơ (đặt tên route thống nhất)
    };

    return (
        <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 rounded-xl border border-gray-100">
            <h1 className="text-xl font-semibold text-blue-700">
                Hệ thống tài xế
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-700">
                <div className="text-right">
                    <p>
                        Tài xế: <strong>{driverName}</strong>
                    </p>
                    <p className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {currentDate}
                    </p>
                </div>

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
