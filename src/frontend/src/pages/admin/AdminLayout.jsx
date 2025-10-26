import { FaUserCircle, FaBus } from "react-icons/fa";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import index from "./ManageBus/index";
function App() {
  const location = useLocation();
  const [isOpen, setIsOpnen] = useState(false);
  const toggleDropdown = () => {
    setIsOpnen(!isOpen);
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
              <Link
                to="/BusSchedule"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/BusSchedule"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                📋Lịch xe buýt
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/DriverManager"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/DriverManager"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                👨‍✈️Tài xế
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/index"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/index"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🚌Xe buýt
              </Link>
            </li>

            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/ManageRoute"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/ManageRoute"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🗺️Tuyến đường{" "}
              </Link>
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
              <Link
                to="/ManageAssignment"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/ManageAssignment"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                🔄Phân công
              </Link>
            </li>
            <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
              <Link
                to="/ManageLocation"
                className={`w-full  flex items-center 
        ${
          location.pathname === "/ManageLocation"
            ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
            : ""
        }`}
              >
                📍Cập nhật vị trí
              </Link>
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
                  to="/Profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cài đặt tài khoản
                </Link>

                <hr className="my-1" />
                <button
                  onClick={() => alert("Đăng xuất!")}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </div>
            )}
            {/*----------------------------------------------------------- */}
          </div>
        </div>
        {/*-------------------------------------------------- Route cho Trang chủ ------------------------------------------------*/}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/Dashboard" replace />} />
            <Route path="/profile" element={<ProFile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/BusSchedule" element={<BusSchedule />} />
            <Route path="/DriverManager" element={<DriverManager />} />
            <Route path="/students" element={<ManageStudent />} />
            <Route path="/index" element={<ManageBus />} />
            <Route path="/parents" element={<ManageParent />} />
            <Route path="/ManageRoute" element={<ManageRoute />} />
            <Route path="/ManageLocation" element={<ManageLocation />} />
            <Route path="/ManageAssignment" element={<ManageAssignment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
