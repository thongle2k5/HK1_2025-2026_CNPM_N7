// src/pages/driver/Schedule.jsx
import { useState } from "react";
import { CalendarDays, Clock, MapPin, Bus } from "lucide-react";

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState("Thứ 2");

  // Dữ liệu giả lập lịch làm việc
  const scheduleData = {
    "Thứ 2": [
      {
        id: 1,
        route: "Tuyến 12A",
        bus: "SG-1234",
        start: "06:30",
        end: "08:00",
        status: "Hoàn thành",
      },
      {
        id: 2,
        route: "Tuyến 12A (Chiều)",
        bus: "SG-1234",
        start: "16:00",
        end: "17:30",
        status: "Chưa bắt đầu",
      },
    ],
    "Thứ 3": [
      {
        id: 1,
        route: "Tuyến 12B",
        bus: "SG-5678",
        start: "06:30",
        end: "08:15",
        status: "Đang thực hiện",
      },
    ],
    "Thứ 4": [],
    "Thứ 5": [],
    "Thứ 6": [
      {
        id: 1,
        route: "Tuyến 9A",
        bus: "SG-9999",
        start: "06:40",
        end: "08:20",
        status: "Chưa bắt đầu",
      },
    ],
    "Thứ 7": [],
    "Chủ nhật": [],
  };

  const statusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-700";
      case "Đang thực hiện":
        return "bg-yellow-100 text-yellow-700";
      case "Chưa bắt đầu":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-600" />
          Lịch làm việc của tài xế
        </h1>
        <p className="text-sm text-gray-600">
          Tuần: <strong>21/10 - 27/10/2025</strong>
        </p>
      </div>

      {/* Bộ chọn ngày */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              selectedDay === day
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
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg text-blue-700">
                    {item.route}
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${statusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Bus className="w-4 h-4 text-blue-500" /> Xe: {item.bus}
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4 text-blue-500" /> {item.start} →{" "}
                  {item.end}
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-500" /> Tuyến trường DEF
                </p>
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
        <h3 className="font-semibold mb-2 text-gray-800">Chú giải trạng thái</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>🟢 Hoàn thành: Ca làm việc đã xong</li>
          <li>🟡 Đang thực hiện: Tài xế đang trong hành trình</li>
          <li>⚪ Chưa bắt đầu: Chưa tới thời gian làm việc</li>
        </ul>
      </div>
    </div>
  );
}
