import { FaUserCircle } from "react-icons/fa";
import DriversPage from "./DriversPage";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import ManageStudent from "./ManageStudent";
import ManageBus from "./ManageBus";
import ManageParent from "./ManageParent";
import Dashboard from "./Dashboard";

function App() {
  const location = useLocation();
  return (
    <div className=" flex h-screen ">
      <div className="w-64 bg-white flex-shrink-0 shadow-lg">
        <div className="flex justify-center items-center h-16 font-bold text-blue text-xl border-b border-r">
          Quản lý Xe Buýt
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto text-black border-r">
          <ul className=" py-2 ">
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ">
              <Link
                to="/Dashboard"
                className={`w-full flex items-center 
        ${
          location.pathname === "/Dashboard"
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
              <Link
                to="/buses"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/buses"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🚌Xe buýt
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              🗺️Tuyến đường
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/students"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/students"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🎓Học sinh
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/parents"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/parents"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                👪Phụ huynh
              </Link>
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
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between h-16 bg-white border-b flex-shrink-0">
          <div className="px-6">
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

        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Routes>
            {/* Route cho Trang chủ */}
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/students" element={<ManageStudent />} />
            <Route path="/buses" element={<ManageBus />} />
            <Route path="/parents" element={<ManageParent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
