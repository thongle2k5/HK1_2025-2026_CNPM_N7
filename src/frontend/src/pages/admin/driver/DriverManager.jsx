import React, { useState, useEffect, useMemo } from "react";
import DriverStats from "./DriverStats";
import DriverTable from "./DriverTable";
import DriverCharts from "./DriverCharts";
import DriverForm from "./DriverForm";
import DriverEditModal from "./DriverEditModal";
import ChatBox from "./ChatBox";
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
  {
    ("--------------------------chatbox--------------------------");
  }
  const [chatDriver, setChatDriver] = useState(null); // Lưu tài xế đang chat

  const handleOpenChat = (driver) => {
    setChatDriver(driver);
  };
  // --- STATE CHO PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10; // Giới hạn 10 người/trang
  // --- LOGIC CẮT DỮ LIỆU THEO TRANG ---
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDriver.slice(startIndex, endIndex);
  }, [filteredDriver, currentPage]);
  const totalPages = Math.ceil(filteredDriver.length / ITEMS_PER_PAGE);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
          data={paginatedData}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onOpenChat={handleOpenChat}
        />
        {/* --- FOOTER PHÂN TRANG --- */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm text-gray-700"
            >
              Trước
            </button>

            <span className="text-sm text-gray-600">
              Trang <strong>{currentPage}</strong> / {totalPages}
              (Tổng: {filteredDriver.length} tài xế)
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm text-gray-700"
            >
              Sau
            </button>
          </div>
        )}
      </div>
      <DriverEditModal
        isOpen={isEditModalOpen}
        onEdit={handleEdit}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        driverData={editingItem}
      />
      {chatDriver && (
        <ChatBox driver={chatDriver} onClose={() => setChatDriver(null)} />
      )}
    </div>
  );
}
export default DriverManager;
