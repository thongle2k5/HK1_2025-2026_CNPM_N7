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
      {/* Hàng 1: Tiêu đề và Nút Thêm */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Xe buýt</h1>
          <p className="text-sm text-gray-500">
            Smart School Bus Tracking (SSB 1.0)
          </p>
        </div>
        <button
          onClick={handleAddBus}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Thêm xe buýt mới
        </button>
      </div>

      {/* Hàng 2: Thanh tìm kiếm */}
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo biển số hoặc mã xe..."
          className="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="bg-white border border-l-0 border-gray-300 rounded-r-md px-6 py-2 text-gray-700 hover:bg-gray-50">
          Tìm
        </button>
        {/* Cái hộp màu xám trong ảnh của bạn có thể là nút Filter, 
            tôi tạm để nó là nút "Lọc" ở đây */}
        <button className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 ml-2 text-gray-700 hover:bg-gray-200">
          ...
        </button>
      </div>
    </div>
  );
}
