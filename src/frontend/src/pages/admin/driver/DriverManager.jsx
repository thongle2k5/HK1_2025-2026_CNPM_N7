import React from "react";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import DriverCharts from "./DriverCharts";
function DriverManager() {
  return (
    <div>
      <div className="flex items-center justify-between border p-6 m-4 rounded-lg shadow-md bg-white">
        <div className="font-bold text-xl">Quản lý tài xế</div>
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm tài xế...."
            className="rounded-3xl border p-2 mx-4 outline-none"
          />
          <button className="text-white bg-blue-500 py-1 px-4 rounded-3xl hover:bg-blue-600">
            Thêm tài xế mới
          </button>
        </div>
      </div>

      <div className="mx-4 my-6 ">
        <DriverStats />
      </div>
      <div>
        <DriverTable />
      </div>
      <div>
        <DriverCharts />
      </div>
    </div>
  );
}
export default DriverManager;
