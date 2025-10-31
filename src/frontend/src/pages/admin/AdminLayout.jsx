import { FaUserCircle, FaBus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import {
  Link,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ManageStudent from "./ManageStudent";
import ManageBus from "./ManageBus";
import ManageParent from "./ManageParent";
import Dashboard from "./Dashboard";
import BusSchedule from "./Schedule/BusSchedule";
import React, { useState } from "react";
import DriverManager from "./driver/DriverManager";
import ManageRoute from "./ManageRoute";
import ManageLocation from "./ManageLocation";
import ManageAssignment from "./ManageAssignment";
import ProFile from "./profile";
import ManageNotification from "./ManageNotification/index";
function AdminLayout() {
  const location = useLocation();
  const [isOpen, setIsOpnen] = useState(false);
  const toggleDropdown = () => {
    setIsOpnen(!isOpen);
  };
  const navigate = useNavigate();
  const hanldeLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };
  return (
    <div className=" flex h-screen ">
      {/*------------------------------------------sidebar------------------------------------------------------------------*/}
      <div className="w-64 bg-white flex-shrink-0 shadow-lg">
        <div className="flex justify-center items-center h-16 font-bold text-blue text-xl border-b border-r">
          <FaBus className="mr-2 text-2xl text-blue-600" />
          Quản lý Xe Buýt
        </div>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto text-black border-r">
          <ul className=" py-2 ">
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ">
              <Link
                to="/admin/AdminLayout/Dashboard"
                className={`w-full flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/Dashboard"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🏠 Trang chủ
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/BusSchedule"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/BusSchedule"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                📋Lịch xe buýt
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/DriverManager"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/DriverManager"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                👨‍✈️Tài xế
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/index"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/index"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🚌Xe buýt
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/ManageRoute"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/ManageRoute"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🗺️Tuyến đường{" "}
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/students"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/students"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🎓Học sinh
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/parents"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/parents"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                👪Phụ huynh
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/ManageNotification"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/ManageNotification"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🔔Thông báo
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/ManageAssignment"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/ManageAssignment"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🔄Phân công
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/admin/AdminLayout/ManageLocation"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/admin/AdminLayout/ManageLocation"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                📍Cập nhật vị trí
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <button onClick={hanldeLogout} className="flex items-center">
                <CiLogout className="mr-1" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/*------------------------------------------------------------------------------------------------- */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center justify-between h-16 bg-white border-b flex-shrink-0">
          <div className="px-6">{"chua xac dinh"}</div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="focus:outline-none px-6"
            >
              <FaUserCircle className="text-3xl" />
            </button>
            {/*-----------------------dropdown---------------------------- */}
            {isOpen && (
              <div className=" mr-12 absolute right-0  w-52 bg-white rounded-md shadow-lg py-1 z-50 trainsform origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul className="text-gray-700 cursor-pointer ">
                  <li className="px-4 py-2">Nguyen van a</li>
                  <li className="px-4 py-2">vai tro: {"quan tri vien"}</li>
                </ul>
                <Link
                  to="Profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cài đặt tài khoản
                </Link>

                <hr className="my-1" />
              </div>
            )}
            {/*----------------------------------------------------------- */}
          </div>
        </div>
        {/*-------------------------------------------------- Route cho Trang chủ ------------------------------------------------*/}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" replace />} />
            <Route path="profile" element={<ProFile />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="BusSchedule" element={<BusSchedule />} />
            <Route path="DriverManager" element={<DriverManager />} />
            <Route path="students" element={<ManageStudent />} />
            <Route path="index" element={<ManageBus />} />
            <Route path="parents" element={<ManageParent />} />
            <Route path="ManageRoute" element={<ManageRoute />} />
            <Route path="ManageLocation" element={<ManageLocation />} />
            <Route path="ManageAssignment" element={<ManageAssignment />} />
            <Route path="ManageNotification" element={<ManageNotification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
