import { FaUserCircle } from "react-icons/fa";
import DriversPage from "./DriversPage";
import { Link, Routes, Route, useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  return (
    <div className=" min-h-screen grid grid-cols-7 grid-rows-12 ">
      <div className="row-span-12 col-span-1 bg-white  grid grid-rows-12 ">
        <div className="flex justify-center items-center row-span-1 font-bold text-blue text-2xl border-b border-r">
          Quản lý Xe Buýt
        </div>
        <div className="block row-span-11 text-black">
          <ul className=" h-full ">
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ">
              <Link
                to="/"
                className={`w-full flex items-center 
        ${
          location.pathname === "/"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🏠 Trang chủ
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              📋Lịch xe buýt
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/drivers"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/drivers"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                👨‍✈️Tài xế
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🚌Xe buýt
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🗺️Tuyến đường
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🎓Học sinh
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              👪Phụ huynh
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🔔Thông báo
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🔄Phân công
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              📍Cập nhật vị trí
            </li>
          </ul>
        </div>
      </div>

      <div className=" flex items-center justify-between col-span-6 row-span-1 bg-white border-b">
        <div className="px-6 ">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="p-2 px-6 border outline-none text-black"
          />
        </div>
        <div className="px-6 ">
          <button>
            <FaUserCircle className="text-3xl" />
          </button>
        </div>
      </div>

      <div className="row-span-11  col-span-6 ">
        <Routes>
          {/* Route cho Trang chủ */}
          <Route path="/" element={<h1>Chào mừng đến Trang chủ!</h1>} />

          <Route path="/drivers" element={<DriversPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
