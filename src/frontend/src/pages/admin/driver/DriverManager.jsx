import React, { useState, useEffect, useMemo } from "react";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import DriverCharts from "./DriverCharts";
import DriverForm from "./DriverForm";
import DriverEditModal from "./DriverEditModal";
function DriverManager() {
  const [drivers, setDrivers] = useState([]);
  const [totaldriver, setTotalDriver] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDrivers = async () => {
    try {
      const [response, totalDrivers] = await Promise.all([
        fetch("http://localhost:5000/api/drivers"),
        fetch("http://localhost:5000/api/drivers/total"),
      ]);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data1 = await response.json();
      setDrivers(data1);
      if (!totalDrivers.ok) {
        throw new Error(`HTTP error! status: ${totalDrivers.status}`);
      }
      const total = await totalDrivers.json();
      setTotalDriver(total);
    } catch (err) {
      setError(err.message);
      console.error("Lỗi khi fetch data:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDrivers();
  }, []);
  {
    ("------------------------phần dành cho lọc và tìm kiếm------------------------");
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const getFilteredDriver = useMemo(() => {
    let currentDriver = drivers;
    if (statusFilter !== "All") {
      currentDriver = currentDriver.filter(
        (drivers) => drivers.status === statusFilter
      );
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      currentDriver = currentDriver.filter((driver) => {
        const idString = String(driver.driver_id);
        const phoneString = String(driver.phone);
        return (
          idString.toLowerCase().includes(searchLower) ||
          driver.name?.toLowerCase().includes(searchLower) ||
          phoneString.toLowerCase().includes(searchLower) ||
          driver.email.toLowerCase().includes(searchLower) ||
          driver.license_number.toLowerCase().includes(searchLower)
        );
      });
    }
    return currentDriver;
  }, [drivers, statusFilter, searchTerm]);

  const filteredDriver = getFilteredDriver;
  {
    ("------------------------phần dành cho xử lý table------------------------");
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = async (updatedDriverData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/drivers/${updatedDriverData.driver_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDriverData),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật tài xế");
      }
      alert("Cập nhật thành công!");
      setIsEditModalOpen(false);
      fetchDrivers();
    } catch (err) {
      console.error("Lỗi save edit:", err);
      alert("Cập nhật thất bại: " + err.message);
    }
  };
  const handleDelete = async (driverId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/drivers/${driverId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchDrivers();
    } catch (error) {
      console.error("Lỗi khi xóa tài xế:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between text-left py-6 mx-4  font-bold text-2xl text-black">
        Quản lý tài xế
      </div>

      <div className="mx-4 my-6 ">
        <DriverStats data={totaldriver} />
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
              <option value="All">Tất cả</option>
              <option value="Active">Hoạt động</option>
              <option value="On-Leave">Nghỉ phép</option>
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
        <DriverTable
          data={filteredDriver}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <DriverEditModal
        isOpen={isEditModalOpen}
        onEdit={handleEdit}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        driverData={editingItem}
      />
    </div>
  );
}
export default DriverManager;
