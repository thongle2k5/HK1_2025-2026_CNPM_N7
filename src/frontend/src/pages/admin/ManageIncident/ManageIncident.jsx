// src/pages/admin/ManageIncident/index.jsx
import React, { useState, useEffect, useMemo } from "react";
import IncidentTable from "./IncidentTable";
import IncidentDetailModal from "./IncidentDetailModal";

export default function ManageIncident() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal state
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Lấy dữ liệu từ API
  const fetchReports = async () => {
    try {
      // API này bạn CẦN VIẾT THÊM ở backend (GET /api/reports)
      // Hiện tại nếu chưa có, nó sẽ lỗi 404.
      const res = await fetch("http://localhost:5000/api/report");
      if (!res.ok) throw new Error("Lỗi tải báo cáo");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi tải dữ liệu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 2. Hàm cập nhật trạng thái (Gọi API PUT)
  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/report/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Lỗi cập nhật");

      alert("Đã cập nhật trạng thái!");
      fetchReports(); // Tải lại bảng
    } catch (err) {
      alert("Có lỗi xảy ra: " + err.message);
    }
  };

  // 3. Lọc dữ liệu
  const filteredReports = useMemo(() => {
    if (filterStatus === "all") return reports;
    return reports.filter((r) => r.status === filterStatus);
  }, [reports, filterStatus]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 uppercase">
          ⚠️ Quản lý Sự cố & Báo cáo
        </h1>

        {/* Bộ lọc nhanh */}
        <div className="bg-white p-1 rounded-lg shadow flex">
          {["all", "pending", "processing", "resolved"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status === "all"
                ? "Tất cả"
                : status === "pending"
                ? "Chờ xử lý"
                : status === "processing"
                ? "Đang xử lý"
                : "Đã xong"}
            </button>
          ))}
        </div>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <IncidentTable
            data={filteredReports}
            onViewDetail={(item) => {
              setSelectedReport(item);
              setIsModalOpen(true);
            }}
          />
        )}
      </div>

      {/* Modal chi tiết */}
      <IncidentDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        report={selectedReport}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
