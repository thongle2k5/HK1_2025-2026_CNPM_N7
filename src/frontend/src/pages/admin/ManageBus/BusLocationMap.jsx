// src/pages/admin/ManageBus/BusLocationMap.jsx
import React from "react";

export default function BusLocationMap({ busId }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Vị trí xe buýt hiện tại
      </h2>

      {/* Vùng bản đồ */}
      <div className="h-96 bg-gray-200 mt-2 rounded-md flex items-center justify-center">
        {busId ? (
          <p className="text-gray-700">
            Đang hiển thị bản đồ cho xe buýt ID:{" "}
            <span className="font-bold">{busId}</span>
            {/* Đây là nơi bạn sẽ tích hợp component bản đồ (vd: GoogleMapReact) */}
          </p>
        ) : (
          <p className="text-gray-500">
            Nhấn vào một xe buýt trong bảng để xem vị trí.
          </p>
        )}
      </div>
    </div>
  );
}
