import React, { useState, useEffect } from "react";
import BusScheduleForm from "./BusScheduleForm";
import BusScheduleTable from "./BusScheduleTable";
import ActivityLog from "./ActivityLog";

function BusSchedule() {
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [getDataBus, setGetDataBus] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formdata, setFormdata] = useState({
    route_id: "",
    bus_id: "",
    driver_id: "",
    date: "",
    start_time: "",
    end_time: "",
    manager_id: "",
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const currentUser = JSON.parse(userString);
      if (currentUser?.userId) {
        setFormdata((prev) => ({ ...prev, manager_id: currentUser.userId }));
      }
    }
  }, []);

  const fetchTableData = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
        `http://localhost:5000/api/schedules/manager?page=${currentPage}&limit=${limit}`
      );
      if (!data.ok) throw new Error("Lỗi tải dữ liệu bảng");
      const get = await data.json();
      setGetDataBus(get.data);
      setTotalPages(get.totalPages);
    } catch (err) {
      console.log("Lỗi:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [currentPage]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [driversRes, busesRes, routesRes] = await Promise.all([
          fetch("http://localhost:5000/api/drivers"),
          fetch("http://localhost:5000/api/buses"),
          fetch("http://localhost:5000/api/route"),
        ]);
        setDrivers(await driversRes.json());
        setBuses(await busesRes.json());
        setRoutes(await routesRes.json());
      } catch (error) {
        console.error("Lỗi tải options:", error);
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditId(item.schedule_id);

    setFormdata({
      route_id: item.route_id || "",
      bus_id: item.bus_id || "",
      driver_id: item.driver_id || "",
      date: item.date ? item.date.split("T")[0] : "",
      start_time: item.start_time || "",
      end_time: item.end_time || "",
      manager_id: formdata.manager_id,
    });
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa lịch trình này?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/schedules/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xóa thất bại");

      alert("Đã xóa thành công!");
      fetchTableData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReset = () => {
    setIsEditing(false);
    setEditId(null);
    setFormdata({
      route_id: "",
      bus_id: "",
      driver_id: "",
      date: "",
      start_time: "",
      end_time: "",
      manager_id: formdata.manager_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/api/schedules/${editId}`
      : "http://localhost:5000/api/schedules";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Lỗi khi lưu");
      }

      alert(isEditing ? "Cập nhật thành công!" : "Tạo lịch thành công!");
      fetchTableData();
      handleReset();
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div>
      <div className="px-2 py-2 border-b flex justify-between items-center rounded-lg bg-white shadow-md">
        <div>
          <div className="px-4 font-bold text-xl ">Lịch xe buýt</div>
          <div className="px-4 text-xs">Quản lý lịch chạy xe</div>
        </div>
        <div className="px-6"></div>
      </div>

      <div className="flex md:flex-row gap-8 h-screen mt-4 gap-4 px-4 ">
        <div className="bg-white rounded-lg shadow-lg md:w-8/12 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
          <div className="flex justify-between p-4 border-b flex-shrink-0">
            <div className="text-gray-900 font-bold">Danh sách lịch chạy</div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-auto">
            <BusScheduleTable
              formdata={getDataBus}
              onDeleteAssignment={handleDeleteClick}
              onEdit={handleEditClick}
            />
          </div>

          <div className="flex items-center justify-between p-4 border-t bg-gray-50 flex-shrink-0">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-white border px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
            >
              Trước
            </button>
            <span className="text-sm text-gray-700 font-medium">
              Trang {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="bg-white border px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 shadow-sm"
            >
              Sau
            </button>
          </div>
        </div>

        <div className="md:w-4/12">
          <div className="bg-white rounded-lg shadow-lg p-4 m-4 border-t-4 border-blue-500">
            <div className="text-gray-900 py-2 mb-2 border-b">
              <div className="font-bold text-lg">
                {isEditing ? "Chỉnh sửa lịch trình" : "Tạo lịch mới"}
              </div>
            </div>

            <BusScheduleForm
              formdata={formdata}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={handleReset}
              driverData={drivers}
              busData={buses}
              routeData={routes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default BusSchedule;
