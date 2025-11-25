import React, { useState, useEffect, useMemo } from "react";
import BusHeader from "./BusHeader";
import BusTable from "./BusTable";
import BusLocationMap from "./BusLocationMap";
import EditBus from "./editBus";
import "leaflet/dist/leaflet.css";
export default function ManageBus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [getBuses, setGetBuses] = useState([]);

  const fetchBuses = async () => {
    try {
      const getAllBuses = await fetch("http://localhost:5000/api/buses");
      if (!getAllBuses.ok) {
        throw new Error(`HTTP error! status: ${getAllBuses.status}`);
      }
      const getall = await getAllBuses.json();
      setGetBuses(getall);
    } catch (err) {
      console.error("Lỗi khi fetch data:", err);
    }
  };
  useEffect(() => {
    fetchBuses();
  }, []);
  // --- LOGIC PHÂN TRANG MỚI ---
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu thô (Chưa phân trang)
  const filteredData = useMemo(() => {
    if (!getBuses) return [];
    const lowerTerm = searchTerm.toLowerCase();
    return getBuses.filter((bus) => {
      const idString = String(bus.bus_id);
      return (
        idString.includes(lowerTerm) ||
        bus.license_plate.toLowerCase().includes(lowerTerm)
      );
    });
  }, [getBuses, searchTerm]);

  // Cắt mảng để hiển thị theo trang
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // --- END LOGIC PHÂN TRANG ---
  {
    ("-------------------------Hàm dành cho hiển thị map---------------------");
  }
  const [selectedBusId, setSelectedBusId] = useState(null);
  const handleToggleViewMap = (bus) => {
    if (selectedBusId === bus.bus_id) {
      // Nếu đang xem xe này rồi mà bấm lại -> Hủy (Reset về null)
      setSelectedBusId(null);
    } else {
      // Nếu chưa xem -> Chọn xe này
      setSelectedBusId(bus.bus_id);
    }
  };
  const busesOnMap = selectedBusId
    ? getBuses?.filter((b) => b.bus_id === selectedBusId)
    : getBuses || [];
  {
    ("--------------------hàm cho các nút sửa xoá trong table-----------------------");
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const handleOpenEditModal = (bus) => {
    setEditingBus(bus);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBus(null);
  };
  const handleSaveEdit = async (updatedBusData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/buses/${updatedBusData.bus_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBusData), // Gửi data mới lên
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật xe!");
      }
      setGetBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus.bus_id === updatedBusData.bus_id ? updatedBusData : bus
        )
      );

      handleCloseEditModal();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
    }
  };
  const handleDeleteBus = async (busId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/buses/${busId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Lỗi khi xóa xe!");
      }
      fetchBuses();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <BusHeader onSearch={setSearchTerm} />
      <div className="bg-white rounded-lg shadow-lg flex flex-col min-h-[380px] border border-gray-200">
        <div className="flex-1 overflow-x-auto">
          <BusTable
            searchTerm={searchTerm}
            dataBus={paginatedData}
            selectedBusId={selectedBusId}
            onToggleView={handleToggleViewMap}
            onEditClick={handleOpenEditModal}
            ondelete={handleDeleteBus}
          />
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t bg-gray-50 flex-shrink-0">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white border px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="text-sm text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white border px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
        )}
      </div>

      <BusLocationMap buses={busesOnMap} />
      <EditBus
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        busData={editingBus}
      />
    </div>
  );
}
