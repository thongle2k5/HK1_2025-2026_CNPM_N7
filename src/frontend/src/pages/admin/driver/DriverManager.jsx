import React, { useState, useEffect } from "react";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import DriverCharts from "./DriverCharts";
import DriverForm from "./DriverForm";
function DriverManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/drivers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data1 = await response.json();
        setData(data1);
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [drivers, setDrivers] = useState(data);
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const getFilteredDriver = () => {
    let currentDriver = drivers;
    if (statusFilter !== "Tất cả") {
      currentDriver = currentDriver.filter(
        (drivers) => drivers.trangThai === statusFilter
      );
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      currentDriver = currentDriver.filter(
        (driver) =>
          driver.maTX.toLowerCase().includes(searchLower) ||
          driver.hoTen.toLowerCase().includes(searchLower) ||
          driver.tuyenPhuTrach.toLowerCase().includes(searchLower)
      );
    }
    return currentDriver;
  };
  const filteredDriver = getFilteredDriver();
  return (
    <div>
      <div className="flex items-center justify-between text-left py-6 mx-4  font-bold text-2xl text-black">
        Quản lý tài xế
      </div>

      <div className="mx-4 my-6 ">
        <DriverStats />
      </div>
      <div className="mx-4 my-6 bg-white rounded-lg shadow-lg">
        <DriverForm />
      </div>
      <div className="bg-white rounded-lg shadow-lg my-4 mx-4">
        <div className="flex items-center justify-between py-3 ">
          <div className="flex items-center text-gray-900 mx-4">
            Lọc trạng thái:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border mx-3 border-gray-300 rounded-md py-1 px-3 text-gray-800 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Nghỉ phép">Nghỉ phép</option>
              <option value="Vi phạm">Vi phạm</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm . . ."
            className="outline-none border mx-6 rounded-3xl p-2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <DriverTable data={data} />
      </div>
      <div>
        <DriverCharts data={filteredDriver} />
      </div>
    </div>
  );
}
export default DriverManager;
