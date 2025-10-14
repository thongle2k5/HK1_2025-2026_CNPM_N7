// src/pages/admin/DriversPage.jsx

import React from 'react';
import { FaBus, FaPlus } from 'react-icons/fa'; // Giả sử dùng React Icons

function DriversPage() {
  return (
    // Component này chỉ tập trung vào nội dung trang Tài xế
    <div className="p-8"> 
      
      {/* Tiêu đề Trang */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
        <FaBus className="mr-3 text-blue-600" /> 
        Quản lý Tài xế Xe Buýt
      </h1>
      
      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white p-6 shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-lg">Danh sách 50 tài xế gần nhất</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center">
            <FaPlus className="mr-2" /> Thêm Tài xế
          </button>
        </div>
        
        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="border border-dashed border-gray-300 h-96 flex items-center justify-center text-gray-400">
          [KHU VỰC BẢNG DỮ LIỆU TÀI XẾ SẼ ĐƯỢC CHÈN VÀO ĐÂY]
        </div>
      </div>
      
    </div>
  );
}

export default DriversPage;