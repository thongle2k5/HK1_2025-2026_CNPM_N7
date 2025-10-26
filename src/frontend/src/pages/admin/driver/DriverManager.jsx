import React, { useState } from "react";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import DriverCharts from "./DriverCharts";
function DriverManager() {
  const data = [
    {
      id: "TX001",
      maTX: "TX001",
      hoTen: "Nguyễn Văn A",
      soDienThoai: "0901234567",
      tuyenPhuTrach: "Tuyến 1",
      trangThai: "Hoạt động", // Dùng cho Lọc và Badge màu xanh
      viTriHienTai: "Trường Tiểu học A",
      // Dữ liệu phụ cho biểu đồ nếu cần
      soChuyenHoanThanh: 35,
      tyLeLamViec: 95,
    },
    {
      id: "TX002",
      maTX: "TX002",
      hoTen: "Trần Thị B",
      soDienThoai: "0912345678",
      tuyenPhuTrach: "Tuyến 2",
      trangThai: "Nghỉ phép", // Dùng cho Lọc và Badge màu vàng
      viTriHienTai: "Nhà riêng",
      soChuyenHoanThanh: 28,
      tyLeLamViec: 70,
    },
    {
      id: "TX003",
      maTX: "TX003",
      hoTen: "Lê Văn C",
      soDienThoai: "0987654321",
      tuyenPhuTrach: "Tuyến 3",
      trangThai: "Vi phạm", // Dùng cho Lọc và Badge màu đỏ
      viTriHienTai: "Trạm dừng xe",
      soChuyenHoanThanh: 10,
      tyLeLamViec: 50,
    },
    {
      id: "TX004",
      maTX: "TX004",
      hoTen: "Phạm Văn D",
      soDienThoai: "0976543210",
      tuyenPhuTrach: "Tuyến 1",
      trangThai: "Hoạt động",
      viTriHienTai: "Kho ngoại thành",
      soChuyenHoanThanh: 42,
      tyLeLamViec: 100,
    },
  ];
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
        <DriverTable data={filteredDriver} />
      </div>
      <div>
        <DriverCharts data={filteredDriver} />
      </div>
    </div>
  );
}
export default DriverManager;
