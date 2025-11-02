// src/pages/admin/ManageBus/BusTable.jsx
import React, { useMemo } from "react";

// Dữ liệu mẫu - Sau này bạn sẽ fetch API
const mockData = [
  {
    id: 1,
    code: "BUS01",
    plate: "51B-12345",
    type: "Thaco Town 29",
    seats: 29,
    status: "Đang hoạt động",
    lat: 10.762622,
    lng: 106.682222,
    updated: "26/10/2025 09:45",
  },
  {
    id: 2,
    code: "BUS02",
    plate: "29A-67890",
    type: "Hyundai County",
    seats: 29,
    status: "Đang bảo trì",
    lat: 10.801111,
    lng: 106.702222,
    updated: "26/10/2025 08:30",
  },
];

export default function BusTable({ searchTerm, onRowClick }) {
  // Lọc dữ liệu dựa trên searchTerm (từ component cha)
  const filteredData = useMemo(
    () =>
      mockData.filter(
        (bus) =>
          bus.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.code.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  // Hàm xử lý class cho status
  const getStatusClass = (status) => {
    if (status === "Đang hoạt động") {
      return "bg-green-100 text-green-700";
    }
    if (status === "Đang bảo trì") {
      return "bg-yellow-100 text-yellow-700";
    }
    return "bg-gray-100 text-gray-700";
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
              Vĩ độ hiện tại
            </th>
            <th className="p-3 text-left text-sm font-semibold text-gray-600">
              Kinh độ hiện tại
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
          {filteredData.map((bus, index) => (
            <tr
              key={bus.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(bus.id)}
            >
              <td className="p-3 text-sm text-gray-700">{index + 1}</td>
              <td className="p-3 text-sm text-gray-700">{bus.code}</td>
              <td className="p-3 text-sm text-gray-700">{bus.plate}</td>
              <td className="p-3 text-sm text-gray-700">{bus.type}</td>
              <td className="p-3 text-sm text-gray-700">{bus.seats}</td>
              <td className="p-3 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                    bus.status
                  )}`}
                >
                  {bus.status}
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700">{bus.lat}</td>
              <td className="p-3 text-sm text-gray-700">{bus.lng}</td>
              <td className="p-3 text-sm text-gray-700">{bus.updated}</td>
              <td className="p-3 text-sm">
                <button
                  className="text-blue-600 hover:text-blue-800 mr-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Edit", bus.id);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete", bus.id);
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
