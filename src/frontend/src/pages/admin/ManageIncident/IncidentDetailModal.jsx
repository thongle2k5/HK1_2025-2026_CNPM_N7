// src/pages/admin/ManageIncident/IncidentDetailModal.jsx
import React, { useState, useEffect } from "react";

export default function IncidentDetailModal({
  isOpen,
  onClose,
  onUpdateStatus,
  report,
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (report) {
      setStatus(report.status);
    }
  }, [report]);

  if (!isOpen || !report) return null;

  const handleSave = () => {
    onUpdateStatus(report.report_id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <h2 className="text-lg font-bold">
            Chi tiết sự cố #{report.report_id}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-2 gap-6">
          {/* Cột trái: Thông tin sự cố */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Loại sự cố
              </label>
              <p className="text-lg font-semibold text-gray-800">
                {report.title}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Mô tả chi tiết
              </label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border">
                {report.description}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Vị trí
              </label>
              <p className="text-sm text-blue-600 underline cursor-pointer">
                {report.address}
                {/* (Sau này có thể gắn link Google Maps ở đây) */}
              </p>
            </div>
          </div>

          {/* Cột phải: Thông tin tài xế & Trạng thái */}
          <div className="col-span-2 md:col-span-1 space-y-4 border-l pl-6">
            <div>
              <label className="text-xs text-gray-500 uppercase font-bold">
                Tài xế báo cáo
              </label>
              <p className="font-medium">{report.driver_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(report.created_at).toLocaleString("vi-VN")}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="text-sm font-bold text-gray-800 block mb-2">
                Cập nhật trạng thái xử lý
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="pending">🔴 Chờ xử lý (Mới)</option>
                <option value="processing">🔵 Đang xử lý (Đã tiếp nhận)</option>
                <option value="resolved">🟢 Đã giải quyết (Hoàn thành)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
          >
            Đóng
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 shadow"
          >
            Lưu trạng thái
          </button>
        </div>
      </div>
    </div>
  );
}
