import React, { useState, useEffect } from "react";
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
  {
    ("-------------------------Hàm dành cho hiển thị map---------------------");
  }
  const [selectedBus, setSelectedBus] = useState(null);
  const handleViewLocation = (bus) => {
    if (bus.current_latitude && bus.current_longitude) {
      setSelectedBus(bus);
    } else {
      setSelectedBus(null);
    }
  };
  const mapPosition = selectedBus
    ? [selectedBus.current_latitude, selectedBus.current_longitude]
    : null;
  const busInfo = selectedBus
    ? { license_plate: selectedBus.license_plate, model: selectedBus.model }
    : null;
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
      <BusTable
        searchTerm={searchTerm}
        onRowClick={(bus) => handleViewLocation(bus)}
        onEditClick={handleOpenEditModal}
        dataBus={getBuses}
        ondelete={handleDeleteBus}
      />
      <BusLocationMap position={mapPosition} busInfo={busInfo} />
      <EditBus
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        busData={editingBus}
      />
    </div>
  );
}
