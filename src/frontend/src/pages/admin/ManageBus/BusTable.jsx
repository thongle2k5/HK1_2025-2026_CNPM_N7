// src/pages/admin/ManageBus/BusTable.jsx
import React, { useMemo, useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import io from "socket.io-client";
// Dữ liệu mẫu - Sau này bạn sẽ fetch API
const socket = io.connect("http://localhost:5000");
const getStatusBus = (data) => {
  switch (data) {
    case "active":
      return <span>Hoạt động</span>;
    case "idle":
      return <span>Sẵn sàng</span>;
    case "maintenance":
      return <span>đang bảo trì</span>;
    case "retired":
      return <span>Ngưng hoạt động</span>;
  }
};
export default function BusTable({
  searchTerm,
  onToggleView,
  dataBus,
  onEditClick,
  ondelete,
  selectedBusId,
}) {
  const filteredData = useMemo(() => {
    if (!searchTerm) return dataBus;

    const searchTermLower = searchTerm.toLowerCase();
    return dataBus.filter((bus) => {
      const idString = String(bus.bus_id);
      return (
        idString.includes(searchTermLower) ||
        bus.license_plate.toLowerCase().includes(searchTermLower)
      );
    });
  }, [searchTerm, dataBus]);

  // xử lý realtime trên table
  const [liveData, setLiveData] = useState({}); // State lưu dữ liệu động
  const liveDataRef = useRef({});
  useEffect(() => {
    // A. Lắng nghe vị trí mới
    const handleLocation = (data) => {
      liveDataRef.current = {
        ...liveDataRef.current,
        [data.bus_license]: {
          ...data,
          isLive: true,
          last_update: new Date().toISOString(),
        },
      };
    };

    // B. Lắng nghe xe offline
    const handleOffline = (data) => {
      if (liveDataRef.current[data.bus_license]) {
        liveDataRef.current = {
          ...liveDataRef.current,
          [data.bus_license]: {
            ...liveDataRef.current[data.bus_license],
            isLive: false,
            status: "idle",
          },
        };
      }
    };

    socket.on("receive_location", handleLocation);
    socket.on("bus_offline", handleOffline);

    const interval = setInterval(() => {
      if (Object.keys(liveDataRef.current).length > 0) {
        setLiveData({ ...liveDataRef.current });
      }
    }, 1000);
    return () => {
      socket.off("receive_location", handleLocation);
      socket.off("bus_offline", handleOffline);
      clearInterval(interval);
    };
  }, []);
  //hàm lấy hiển thị
  const getDisplayStatus = (bus) => {
    const live = liveData[bus.license_plate];
    if (live && live.isLive) return "active"; // Nếu có tín hiệu -> Active
    if (live && !live.isLive) return "idle";
    return bus.status; // Nếu không -> Dùng status cũ từ DB
  };

  const getDisplayTime = (bus) => {
    const live = liveData[bus.license_plate];

    // Nếu có tín hiệu Live -> Lấy thời gian hiện tại (hoặc time từ socket)
    if (live) {
      return format(new Date(), "dd/MM HH:mm");
    }

    // Nếu không -> Lấy thời gian cũ trong DB
    return bus.last_update
      ? format(new Date(bus.last_update), "dd/MM HH:mm")
      : "—";
  };

  // Hàm tô màu trạng thái
  const getStatusClass = (status) => {
    if (status === "active") return "bg-green-100 text-green-700";
    if (status === "idle") return "bg-blue-100 text-blue-700";
    if (status === "maintenance") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  const getStatusLabel = (status) => {
    if (status === "active") return "Đang chạy";
    if (status === "idle") return "Sẵn sàng";
    if (status === "maintenance") return "Bảo trì";
    return status;
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              STT
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Mã xe
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Biển số
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Loại xe
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Sức chứa
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Trạng thái
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Vị trí hiện tại
            </th>

            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Cập nhật gần nhất
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((bus, index) => {
            const isSelected = selectedBusId === bus.bus_id;
            const displayStatus = getDisplayStatus(bus);
            const displayTime = getDisplayTime(bus);
            return (
              <tr key={bus.bus_id} className="border-b hover:bg-gray-50 ">
                <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                <td className="p-3 text-sm text-gray-700">{bus.bus_id}</td>
                <td className="p-3 text-sm text-gray-700">
                  {bus.license_plate}
                </td>
                <td className="p-3 text-sm text-gray-700">{bus.model}</td>
                <td className="p-3 text-sm text-gray-700">{bus.capacity}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                      displayStatus
                    )}`}
                  >
                    {getStatusLabel(displayStatus)}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    onClick={() => onToggleView(bus)}
                    disabled={!bus.current_latitude}
                    className={`border px-6 py-1 rounded-xl cursor-pointer transition-colors duration-200
                      ${
                        !bus.current_latitude
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isSelected
                          ? "bg-red-500 text-white hover:bg-red-600 border-red-500"
                          : "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                      }
                    `}
                  >
                    {isSelected ? "Hủy" : "Xem"}
                  </button>
                </td>

                <td className="p-3 text-sm text-gray-700">{displayTime}</td>
                <td className="p-3 text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-3"
                    onClick={() => onEditClick(bus)}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => ondelete(bus.bus_id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
