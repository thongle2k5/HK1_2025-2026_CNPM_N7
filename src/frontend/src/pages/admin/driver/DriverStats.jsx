import React from "react";
import { FaBus, FaUserTie } from "react-icons/fa";
import { FaCirclePause, FaTriangleExclamation } from "react-icons/fa6";

function DriverStats() {
  return (
    <div className="flex justify-between ">
      <div className="bg-white rounded-lg shadow-lg p-5 flex items-center space-x-4">
        <FaUserTie className=" text-blue-700 mx-2 text-xl" />
        Tổng số tài xế
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 flex items-center space-x-4">
        <FaBus className=" text-blue-700 mx-2 text-xl" />
        số tài xế đang hoạt động
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 flex items-center space-x-4">
        <FaCirclePause className=" text-blue-700 mx-2 text-xl" />
        Số tài xế nghỉ phép
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 flex items-center space-x-4">
        <FaTriangleExclamation className=" text-blue-700 mx-2 text-xl" />
        số tài xế vi phạm hoặc cần kiểm tra
      </div>
    </div>
  );
}

export default DriverStats;
