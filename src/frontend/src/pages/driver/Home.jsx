// src/pages/driver/Home.jsx
import { BusFront, Users, CalendarDays, MapPin, AlertTriangle } from "lucide-react";

export default function Home() {
  // Dữ liệu mẫu
  const driverInfo = {
    name: "Nguyễn Văn T",
    route: "Tuyến 12A",
    date: "24/10/2025",
    totalStudents: 15,
    pickedUp: 10,
    remaining: 5,
    alerts: [
      {
        id: 1,
        type: "Kẹt xe nhẹ",
        time: "06:50",
        location: "Nguyễn Văn Cừ, Q.5",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
          <BusFront className="w-6 h-6 text-blue-600" />
          Bảng điều khiển tài xế
        </h1>
        <p className="text-gray-600 text-sm">
          Xin chào, <strong>{driverInfo.name}</strong> | Ngày: {driverInfo.date}
        </p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Tuyến hôm nay</p>
            <p className="text-lg font-semibold text-blue-700">{driverInfo.route}</p>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Đã đón</p>
            <p className="text-lg font-semibold text-green-700">{driverInfo.pickedUp}</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg flex items-center gap-3">
          <Users className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-sm text-gray-600">Chưa đón</p>
            <p className="text-lg font-semibold text-yellow-700">{driverInfo.remaining}</p>
          </div>
        </div>
      </div>

      {/* Bản đồ giả lập */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" /> Vị trí xe hiện tại
        </h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
          (Google Map - mô phỏng vị trí xe)
        </div>
      </div>

      {/* Cảnh báo gần nhất */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" /> Cảnh báo gần nhất
        </h2>
        {driverInfo.alerts.length > 0 ? (
          <ul className="space-y-2">
            {driverInfo.alerts.map((a) => (
              <li
                key={a.id}
                className="flex justify-between items-center bg-red-50 border-l-4 border-red-500 p-3 rounded"
              >
                <div>
                  <p className="font-medium text-red-700">{a.type}</p>
                  <p className="text-sm text-gray-600">
                    {a.time} - {a.location}
                  </p>
                </div>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Xem chi tiết
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Không có cảnh báo nào.</p>
        )}
      </div>
    </div>
  );
}
