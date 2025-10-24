import React from "react";
function DriverStats() {
  return (
    <div className="flex justify-between ">
      <div className="p-4 bg-blue-300 rounded-lg text-gray-900 ">
        Tổng số tài xế
      </div>
      <div className="p-4 bg-blue-300 rounded-lg text-gray-900 ">
        số tài xế đang hoạt động
      </div>
      <div className="p-4 bg-blue-300 rounded-lg text-gray-900 ">
        Số tài xế nghỉ phép
      </div>
      <div className="p-4 bg-blue-300 rounded-lg text-gray-900 ">
        số tài xế vi phạm hoặc cần kiểm tra
      </div>
    </div>
  );
}

export default DriverStats;
