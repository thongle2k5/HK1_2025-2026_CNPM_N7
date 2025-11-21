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
import { jwtDecode } from "jwt-decode";
import ManageStudent from "./ManageStudent/ManageStudent";
import ManageBus from "./ManageBus";
import ManageParent from "./ManageParent/ManageParent";
import Dashboard from "./Dashboard";
import BusSchedule from "./Schedule/BusSchedule";
import DriverManager from "./driver/DriverManager";
import ManageRoute from "./ManageRouteBus/ManageRoute";
import ManageLocation from "./ManageLocation/ManageLocation";
import ManageAssignment from "./ManageAssignment/ManageAssignment";
import ProFile from "./profile";
import ManageNotification from "./ManageNotification/index";
function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  let userData = null;
  const tokenData = localStorage.getItem("authToken");
  if (tokenData) {
    try {
      userData = jwtDecode(tokenData);
    } catch (err) {
      console.error("token không hợp lệ!", err);
      <Navigate to="/login" replace />;
    }
  } else {
    <Navigate to="/login" replace />;
  }
  const fullName = userData.name.trim();
  const nameParts = fullName.split(" ");
  const lastName = nameParts[nameParts.length - 1];
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
        ${location.pathname === "/admin/AdminLayout/Dashboard"
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
        ${location.pathname === "/admin/AdminLayout/BusSchedule"
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
        ${location.pathname === "/admin/AdminLayout/DriverManager"
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
        ${location.pathname === "/admin/AdminLayout/index"
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
        ${location.pathname === "/admin/AdminLayout/ManageRoute"
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
        ${location.pathname === "/admin/AdminLayout/students"
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
        ${location.pathname === "/admin/AdminLayout/parents"
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
        ${location.pathname === "/admin/AdminLayout/ManageNotification"
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
        ${location.pathname === "/admin/AdminLayout/ManageAssignment"
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
        ${location.pathname === "/admin/AdminLayout/ManageLocation"
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
          <div className="px-6"></div>
          <div className=" px-6 flex items-center">
            <Link to="/admin/AdminLayout/profile" className="flex items-center">
              <div className="px-2 text-black hover:border-b">
                Xin chào {userData ? lastName : "Đang tải..."}
              </div>
              <FaUserCircle className="text-3xl" />
            </Link>
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
      </div>{" "}
    </div>
  );
}

export default AdminLayout;

// import { FaUserCircle, FaBus } from "react-icons/fa";
// import { CiLogout } from "react-icons/ci";
// import { Link, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
// import React from "react";

// import ManageStudent from "./ManageStudent";
// import ManageBus from "./ManageBus";
// import ManageParent from "./ManageParent";
// import Dashboard from "./Dashboard";
// import BusSchedule from "./Schedule/BusSchedule";
// import DriverManager from "./driver/DriverManager";
// import ManageRoute from "./ManageRoute";
// import ManageLocation from "./ManageLocation";
// import ManageAssignment from "./ManageAssignment";
// import ProFile from "./profile";
// import ManageNotification from "./ManageNotification/index";

// function AdminLayout() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const fullName = "Admin";
//   const nameParts = fullName.split(" ");
//   const lastName = nameParts[nameParts.length - 1];

//   const handleLogout = () => {
//     // Nếu sau này muốn login lại thì bỏ comment
//     // localStorage.removeItem("authToken");
//     navigate("/login", { replace: true });
//   };

//   // Sidebar link helper để check active
//   const isActive = (path) => location.pathname.endsWith(path);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-white flex-shrink-0 shadow-lg">
//         <div className="flex justify-center items-center h-16 font-bold text-blue text-xl border-b border-r">
//           <FaBus className="mr-2 text-2xl text-blue-600" />
//           Quản lý Xe Buýt
//         </div>
//         <div className="h-[calc(100vh-4rem)] overflow-y-auto text-black border-r">
//           <ul className="py-2">
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('Dashboard') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="Dashboard" className="w-full flex items-center">🏠 Trang chủ</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('BusSchedule') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="BusSchedule" className="w-full flex items-center">📋 Lịch xe buýt</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('DriverManager') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="DriverManager" className="w-full flex items-center">👨‍✈️ Tài xế</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('index') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="index" className="w-full flex items-center">🚌 Xe buýt</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('ManageRoute') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="ManageRoute" className="w-full flex items-center">🗺️ Tuyến đường</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('students') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="students" className="w-full flex items-center">🎓 Học sinh</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('parents') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="parents" className="w-full flex items-center">👪 Phụ huynh</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('ManageNotification') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="ManageNotification" className="w-full flex items-center">🔔 Thông báo</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('ManageAssignment') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="ManageAssignment" className="w-full flex items-center">🔄 Phân công</Link>
//             </li>
//             <li className={`p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ${isActive('ManageLocation') ? 'border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white' : ''}`}>
//               <Link to="ManageLocation" className="w-full flex items-center">📍 Cập nhật vị trí</Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <button onClick={handleLogout} className="flex items-center">
//                 <CiLogout className="mr-1" />
//                 Đăng xuất
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
//         <Routes>
//           <Route path="/" element={<Navigate to="Dashboard" replace />} />
//           <Route path="profile" element={<ProFile />} />
//           <Route path="Dashboard" element={<Dashboard />} />
//           <Route path="BusSchedule" element={<BusSchedule />} />
//           <Route path="DriverManager" element={<DriverManager />} />
//           <Route path="students" element={<ManageStudent />} />
//           <Route path="index" element={<ManageBus />} />
//           <Route path="parents" element={<ManageParent />} />
//           <Route path="ManageRoute" element={<ManageRoute />} />
//           <Route path="ManageLocation" element={<ManageLocation />} />
//           <Route path="ManageAssignment" element={<ManageAssignment />} />
//           <Route path="ManageNotification" element={<ManageNotification />} />
//           {/* fallback nếu URL không match */}
//           <Route path="*" element={<Navigate to="Dashboard" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;
