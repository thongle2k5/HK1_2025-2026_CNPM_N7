// src/pages/admin/ManageIncident/IncidentTable.jsx
import React from "react";
import { FaEye } from "react-icons/fa";

export default function IncidentTable({ data, onViewDetail }) {
  // Hàm tô màu cho Mức độ ưu tiên
  const getPriorityBadge = (priority) => {
    const colors = {
      Cao: "bg-red-100 text-red-800 border-red-200",
      "Trung bình": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Thấp: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-bold border ${
          colors[priority] || colors["Thấp"]
        }`}
      >
        {priority}
      </span>
    );
  };

  // Hàm tô màu cho Trạng thái xử lý
  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-red-500 text-white", // Chờ xử lý (Đỏ rực)
      processing: "bg-blue-500 text-white", // Đang xử lý (Xanh dương)
      resolved: "bg-green-500 text-white", // Đã xong (Xanh lá)
    };
    const labels = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      resolved: "Đã giải quyết",
    };
    return (
      <span
        className={`px-3 py-1 rounded-md text-xs font-medium shadow-sm ${
          colors[status] || "bg-gray-400"
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
          <tr>
            <th className="p-4 border-b">Thời gian</th>
            <th className="p-4 border-b">Tài xế</th>
            <th className="p-4 border-b">Sự cố</th>
            <th className="p-4 border-b">Vị trí</th>
            <th className="p-4 border-b text-center">Mức độ</th>
            <th className="p-4 border-b text-center">Trạng thái</th>
            <th className="p-4 border-b text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.report_id} className="hover:bg-blue-50 transition">
              <td className="p-4 text-sm text-gray-700">
                {new Date(item.created_at).toLocaleString("vi-VN")}
              </td>
              <td className="p-4 text-sm font-medium text-gray-900">
                {item.driver_name}
              </td>
              <td className="p-4 text-sm text-gray-700">
                <div className="font-bold">{item.title}</div>
                <div className="text-xs text-gray-500 truncate w-48">
                  {item.description}
                </div>
              </td>
              <td
                className="p-4 text-sm text-gray-500 truncate w-48"
                title={item.address}
              >
                {item.address}
              </td>
              <td className="p-4 text-center">
                {getPriorityBadge(item.priority)}
              </td>
              <td className="p-4 text-center">{getStatusBadge(item.status)}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => onViewDetail(item)}
                  className="text-blue-600 hover:text-blue-800 p-2 bg-blue-100 rounded-full transition"
                  title="Xem chi tiết & Xử lý"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
