// src/pages/admin/ManageBus/BusHeader.jsx
import React from "react";
import { FaPlus } from "react-icons/fa";

export default function BusHeader({ onSearch }) {
  const handleAddBus = () => {
    // Logic mở Modal (pop-up) thêm xe mới
    console.log("Mở modal thêm xe");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Xe buýt</h1>
          <p className="text-sm text-gray-500">
            Smart School Bus Tracking (SSB 1.0)
          </p>
        </div>
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo biển số hoặc mã xe..."
          className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 ml-2 text-gray-700 hover:bg-gray-200">
          ...
        </button>
      </div>
    </div>
  );
}
