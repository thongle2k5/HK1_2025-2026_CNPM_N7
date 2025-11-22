import React, { useState, useEffect, useMemo } from "react";
import Starts from "./ManageStarts";
import NotificationList from "./NotificationList";
import DatePicker from "react-datepicker";
import SendNotificationForm from "./SendNotificationForm";
import EditNotificationModal from "./EditNotificationModal";
function index() {
  const [NotificationData, setNotificationData] = useState([]);
  const [startData, setStartData] = useState([]);
  const fetchNotifications = async () => {
    try {
      const [response, startData] = await Promise.all([
        fetch("http://localhost:5000/api/notifications"),
        fetch("http://localhost:5000/api/notifications/startData"),
      ]);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!startData.ok) {
        throw new Error(`HTTP error! status: ${startData.status}`);
      }
      const data = await response.json();
      setNotificationData(data);
      const start_response = await startData.json();
      setStartData(start_response);
    } catch (err) {
      console.error("Lỗi khi fetch data:", err);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  {
    ("------------------------------------phần cho bộ lọc và tìm kiếm------------------------------------");
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const filteredData = useMemo(() => {
    return NotificationData.filter((item) => {
      const itemDateStr = item.created_at.split("T")[0];
      const itemDate = new Date(itemDateStr);

      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && itemDate < start) return false;
      if (end) {
        const nextDay = new Date(end);
        nextDay.setDate(end.getDate() + 1);
        if (itemDate >= nextDay) return false;
      }

      const searchLower = searchTerm.toLowerCase();
      if (
        !item.title.toLowerCase().includes(searchLower) &&
        !item.message.toLowerCase().includes(searchLower)
      ) {
        return false;
      }

      return true;
    });
  }, [NotificationData, searchTerm, startDate, endDate]);
  {
    ("-------------------------------------phần cho xoá và chỉnh sửa trong table-------------------------------------");
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const handleDelete = async (notifId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${notifId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Lỗi khi xoá");
      }
      fetchNotifications();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
      throw err;
    }
  };
  const handleEdit = (item) => {
    setEditingNotification(item);
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = async (notifId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notifications/${notifId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật");
      }
      fetchNotifications();
    } catch (err) {
      console.error("Lỗi khi lưu:", err);

      throw err;
    }
  };
  {
    ("---------------------------------------Phần cho thêm thông báo mới---------------------------------------");
  }
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };
  return (
    <div>
      <div className="flex py-6 px-7 items-center justify-between bg-white rounded-lg shadow-lg">
        <div className="font-bold text-2xl text-blue-500">
          Quản lý thông báo
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm thông báo.."
          className="rounded-lg border outline-none pr-20 py-2 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-1 rounded-lg"
        >
          Tạo thông báo mới
        </button>
      </div>
      <div>
        <Starts data={startData} />
      </div>
      <div className="bg-wwhite rounded-lg border shadow-lg bg-white p-3">
        <div className="m-3 flex items-canter">
          <label className="mr-1 ml-2 text-black">Từ:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-black border rounded-lg px-2 "
          />
          <label className="mr-1 ml-2 text-black">Đến:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-black border rounded-lg px-2 "
          />
        </div>
        <div>
          <NotificationList
            data={filteredData}
            onEdit={handleEdit}
            handleDeleteClick={handleDelete}
          />
        </div>
      </div>
      <SendNotificationForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={fetchNotifications}
      />
      <EditNotificationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        data={editingNotification}
      />
    </div>
  );
}
export default index;
