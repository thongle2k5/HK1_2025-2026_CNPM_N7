import React from "react";
import BaseBarChart from "../../../components/Chart/BaseBarChart";
import BasePieChart from "../../../components/Chart/BasePieChart";
function DriverCharts({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex justify-between bg-white rounded-lg shadow-lg p-4 m-4">
        <p className="text-gray-500">Không có dữ liệu để hiển thị biểu đồ.</p>
      </div>
    );
  }
  return (
    <div className="flex justify-between bg-white rounded-lg shadow-lg">
      <div className="border m-4">
        {" "}
        Số chuyến xe hoàn thành theo tài xế{" "}
        <BaseBarChart
          data={data}
          dataKeyX="hoTen"
          barKeys={[
            {
              key: "soChuyenHoanThanh",
              color: "#0088FE",
              name: "So chuyen hoan thanh",
            },
          ]}
        />
      </div>
      <div className="p-4 m-4">
        Tỷ lệ tài xế theo trạng thái làm việc
        <BasePieChart data={data} nameKey="hoTen" valueKey="tyLeLamViec" />
      </div>
      <div className="p-4 m-4">Hiệu suất trung bình theo tuần</div>
    </div>
  );
}
export default DriverCharts;
