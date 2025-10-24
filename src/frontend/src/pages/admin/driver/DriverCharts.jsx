import React from "react";
function DriverCharts() {
  return (
    <div className="flex justify-between bg-white rounded-lg shadow-lg">
      <div className="p-4 m-4">Số chuyến xe hoàn thành theo tài xế</div>
      <div className="p-4 m-4">Tỷ lệ tài xế theo trạng thái làm việc</div>
      <div className="p-4 m-4">Hiệu suất trung bình theo tuần</div>
    </div>
  );
}
export default DriverCharts;
