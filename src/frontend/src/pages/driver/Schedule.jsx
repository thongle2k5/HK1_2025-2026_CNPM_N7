import { useState } from "react";
import { CalendarDays, Clock, MapPin, Bus } from "lucide-react";
import DriverHeader from "./components/Header";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Thứ 2");

  // Dữ liệu giả lập lịch làm việc (giữ nguyên)
  const scheduleData = {
    "Thứ 2": [
      { id: 1, route: "Tuyến 12A", bus: "SG-1234", start: "06:30", end: "08:00", status: "Hoàn thành" },
      { id: 2, route: "Tuyến 12A (Chiều)", bus: "SG-1234", start: "16:00", end: "17:30", status: "Hoàn thành" },
    ],
    "Thứ 3": [
      { id: 1, route: "Tuyến 12B", bus: "SG-5678", start: "06:30", end: "08:15", status: "Đang thực hiện" },
    ],
    "Thứ 4": [],
    "Thứ 5": [],
    "Thứ 6": [
      { id: 1, route: "Tuyến 9A", bus: "SG-9999", start: "06:40", end: "08:20", status: "Chưa bắt đầu" },
    ],
    "Thứ 7": [],
    "Chủ nhật": [],
  };

  const statusColor = (status) => {
    // ... (Giữ nguyên)
    switch (status) {
      case "Hoàn thành": return "bg-green-100 text-green-700";
      case "Đang thực hiện": return "bg-yellow-100 text-yellow-700";
      case "Chưa bắt đầu": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const days = [
    "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header vẫn giữ nguyên (có px-6 nội tại) */}
      <DriverHeader title="Lịch làm việc của tài xế" week="21/10 - 27/10/2025" />

      {/* ✅ SỬA LỖI LỀ: Sử dụng max-w-7xl mx-auto để giới hạn và căn giữa nội dung chính 
          (giúp tạo khoảng trống lớn hai bên giống Trang Chủ trên màn hình lớn)
      */}
      <div className="**max-w-7xl mx-auto px-6 pt-6 pb-6**">
        {/* Bộ chọn ngày */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${selectedDay === day
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Nội dung lịch trong ngày */}
        {scheduleData[selectedDay].length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            Không có lịch làm việc trong ngày này.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {scheduleData[selectedDay].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
              >
                <div>
                  {/* ... (Phần hiển thị chi tiết lịch giữ nguyên) ... */}
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chú giải trạng thái */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-2 text-gray-800">
            Chú giải trạng thái
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>🟢 Hoàn thành: Ca làm việc đã xong</li>
            <li>🟡 Đang thực hiện: Tài xế đang trong hành trình</li>
            <li>⚪ Chưa bắt đầu: Chưa tới thời gian làm việc</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


