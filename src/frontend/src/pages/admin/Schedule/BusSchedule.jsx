import React, { useState, useEffect } from "react";
import BusScheduleForm from "./BusScheduleForm";
import BusScheduleTable from "./BusScheduleTable";
import ActivityLog from "./ActivityLog";
function BusSchedule() {
  {
    ("-----------------danh sách cho form----------------");
  }
  const [drivers, setDrivers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  {
    ("-------------get danh sách để post--------------");
  }
  const [formdata, setFormdata] = useState({
    route_id: "",
    bus_id: "",
    driver_id: "",
    date: "",
    start_time: "",
    end_time: "",
    manager_id: "",
  });
  {
    ("-----------------xử lý form-------------------------");
  }

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const currentUser = JSON.parse(userString);

      if (currentUser && currentUser.userId) {
        setFormdata((prevData) => ({
          ...prevData,
          manager_id: currentUser.userId,
        }));
      }
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Dữ liệu chuẩn bị POST:", formdata);

    try {
      const response = await fetch("http://localhost:5000/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Lỗi khi tạo lịch");
      }

      alert("Tạo lịch thành công!");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversRes, busesRes, routesRes] = await Promise.all([
          fetch("http://localhost:5000/api/drivers"),
          fetch("http://localhost:5000/api/buses"),
          fetch("http://localhost:5000/api/route"),
        ]);

        const driversData = await driversRes.json();
        const busesData = await busesRes.json();
        const routesData = await routesRes.json();

        setDrivers(driversData);
        setBuses(busesData);
        setRoutes(routesData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cho form:", error);
      }
    };

    fetchData();
  }, []);

  {
    ("---------------dữ liệu cho table--------------------");
  }
  const [getDataBus, setGetDataBus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `http://localhost:5000/api/schedules/manager?page=${currentPage}&limit=${limit}`
        );
        if (!data.ok) {
          throw new Error("lỗi http");
        }
        const get = await data.json();
        setGetDataBus(get.data);
        setTotalPages(get.totalPages);
      } catch (err) {
        console.log("không lấy được dữ liệu busSchedule", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
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
          <BusScheduleTable formdata={getDataBus} />
          <div className="flex items-center justify-between p-4 border-t">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 disabled:opacity-50"
            >
              Trang trước
            </button>
            <span className="text-sm text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 disabled:opacity-50"
            >
              Trang sau
            </button>
          </div>
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
              formdata={formdata}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              driverData={drivers}
              busData={buses}
              routeData={routes}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-2 m-4 ">
            <div className="text-gray-900 ">
              <div className="border-b w-full">Hoạt động gần đây</div>

              <div className="overflow-x-auto">
                <ActivityLog activities={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BusSchedule;
