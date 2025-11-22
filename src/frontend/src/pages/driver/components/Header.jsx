// import React, { useEffect, useState } from "react";
// import { Clock } from "lucide-react";

// export default function DriverHeader({ driverName = "Nguyễn Văn T" }) {
//     const [currentDate, setCurrentDate] = useState("");

//     useEffect(() => {
//         const now = new Date();
//         const formatted = now.toLocaleDateString("vi-VN", {
//             weekday: "long",
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//         });
//         setCurrentDate(formatted);
//     }, []);

//     return (
//         <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 rounded-xl border border-gray-100">
//             <h1 className="text-xl font-semibold text-blue-700">
//                 Hệ thống tài xế
//             </h1>

//             <div className="text-right text-sm text-gray-700">
//                 <p>
//                     Tài xế: <strong>{driverName}</strong>
//                 </p>
//                 <p className="flex items-center justify-end gap-1 text-gray-500">
//                     <Clock className="w-4 h-4 text-blue-500" />
//                     {currentDate}
//                 </p>
//             </div>
//         </header>
//     );
// }



import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function DriverHeader({ driverId }) {
    const [driverName, setDriverName] = useState("Tài xế");
    const [currentDate, setCurrentDate] = useState("");

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

        // Lấy tên tài xế từ backend
        if (driverId) {
            fetch(`http://localhost:5000/api/driver/info/${driverId}`)
                .then(res => res.json())
                .then(data => setDriverName(data.name))
                .catch(err => console.error(err));
        }
    }, [driverId]);

    return (
        <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 rounded-xl border border-gray-100">
            <h1 className="text-xl font-semibold text-blue-700">
                Hệ thống tài xế
            </h1>

            <div className="text-right text-sm text-gray-700">
                <p>
                    Tài xế: <strong>{driverName}</strong>
                </p>
                <p className="flex items-center justify-end gap-1 text-gray-500">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {currentDate}
                </p>
            </div>
        </header>
    );
}
