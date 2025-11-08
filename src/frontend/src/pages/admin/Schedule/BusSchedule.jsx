import React, { useState, useEffect } from "react";
import BusScheduleForm from "./BusScheduleForm";
import BusScheduleTable from "./BusScheduleTable";
import ActivityLog from "./ActivityLog";
function BusSchedule() {
  const [getDataBus, setGetDataBus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [assignments, setAssignments] = useState([
    {
      td: "1",
      xe: "29B-12345",
      tx: "Nguyen Van A",
      ngay: "20-06-2024",
      gio: "08:00",
    },
    {
      td: "2",
      xe: "29B-12342",
      tx: "Le Van B",
      ngay: "20-06-2024",
      gio: "08:30",
    },
    {
      td: "3",
      xe: "29B-12335",
      tx: "Nguyen Quoc C",
      ngay: "21-06-2024",
      gio: "09:00",
    },
  ]);
  const [newAssigment, setNewAssigment] = useState({
    td: "",
    xe: "",
    tx: "",
    ngay: "",
    gio: "",
  });
  const handleDeleteAssignment = (tdToDelete) => {
    const updatedAssignments = assignments.filter((item) => {
      return item.td !== tdToDelete;
    });
    setAssignments(updatedAssignments);
    if (tdToDelete) {
      addActivity("DELETE", `Đã xóa lịch trình tuyến số ${tdToDelete.td}.`);
    }
  };
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssigment({ ...newAssigment, [name]: value });
  };
  const handleAddAssignment = (e) => {
    e.preventDefault();
    setAssignments([...assignments, newAssigment]);
    setNewAssigment({ td: Date.now(), xe: "", tx: "", ngay: "", gio: "" });
  };
  // hàm sử lý hoạt động gần đây
  const [activityLog, setActivityLog] = useState([]);
  const addActivity = (type, message) => {
    const newActivity = {
      id: "",
      type: type,
      message: message,
      timestamp: new Date().toLocaleTimeString("vi-VN"), // Giờ phút giây
    };
    // Chỉ giữ 5 hoạt động gần nhất
    setActivityLog((prevLog) => [newActivity, ...prevLog].slice(0, 5));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:5000/api/buses");
        if (!data.ok) {
          throw new Error("lỗi http");
        }
        const get = await data.json();
        setGetDataBus(get);
      } catch (err) {
        console.log("không lấy được dữ liệu busSchedule", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-2 py-2 border-b flex justify-between items-center rounded-lg bg-white shadow-md">
        <div>
          <div className="px-4 font-bold text-xl ">Lịch xe buýt</div>
          <div className="px-4 text-xs">
            Quản lý lịch chạy xe, tài xế và đồng bộ dữ liệu lên hệ thống
          </div>
        </div>
        <div className="px-6">
          <button className="bg-blue-500 p-2 rounded-xl text-white">
            Đồng bộ lên hệ thống
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm theo tuyến,xe,tài xế..."
            className="w-[250px] m-4 border p-2 outline-none rounded-3xl text-black"
          />
        </div>
      </div>
      <div className="flex md:flex-row gap-8 h-screen  mt-4 gap-4 px-4 ">
        <div className="bg-white rounded-lg shadow-lg md:w-8/12 overflow-x-auto ">
          <div className="flex justify-between p-4 border-b">
            <div className="text-gray-900">Danh sách lịch chạy</div>
            <div className="text-gray-600 text-xs px-4">Tổng:{"6"}</div>
          </div>
          <BusScheduleTable
            formdata={getDataBus}
            onDeleteAssignment={handleDeleteAssignment}
          />
        </div>
        <div className="md:w-4/12 ">
          <div className="bg-white rounded-lg shadow-lg p-4 m-4">
            <div className="text-gray-900 py-4">
              <div className="font-bold ">Tạo cập nhật lịch</div>
              <div className="text-xs text-gray-700">
                Quản lý lịch chạy xe, tài xế và đồng bộ dữ liệu lên hệ thống
              </div>
            </div>
            <BusScheduleForm
              onSubmit={handleAddAssignment}
              formdata={assignments}
              onInputChange={handleNewInputChange}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-2 m-4 ">
            <div className="text-gray-900 ">
              <div className="border-b w-full">Hoạt động gần đây</div>

              <div className="overflow-x-auto">
                <ActivityLog activities={activityLog} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BusSchedule;
