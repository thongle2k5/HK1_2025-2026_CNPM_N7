// src/pages/admin/ManageBus/index.jsx
import React, { useState } from "react";
import BusHeader from "./BusHeader";
import BusTable from "./BusTable";
import BusLocationMap from "./BusLocationMap";

export default function ManageBus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusId, setSelectedBusId] = useState(null);

  return (
    // Thêm `gap-4` hoặc `gap-6` để tạo khoảng cách giữa các khối
    <div className="flex flex-col gap-6">
      {/* 1. Thanh tiêu đề, tìm kiếm, nút thêm mới */}
      <BusHeader onSearch={setSearchTerm} />

      {/* 2. Bảng danh sách xe buýt */}
      <BusTable
        searchTerm={searchTerm}
        onRowClick={(busId) => setSelectedBusId(busId)}
      />

      {/* 3. Bản đồ mini */}
      <BusLocationMap busId={selectedBusId} />
    </div>
  );
}
