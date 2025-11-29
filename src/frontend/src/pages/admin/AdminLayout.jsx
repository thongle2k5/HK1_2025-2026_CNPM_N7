// import { FaUserCircle, FaBus, FaBell } from "react-icons/fa";
// import { CiLogout } from "react-icons/ci";
// import React, { useState, useEffect } from "react";
// import {
//   Link,
//   Routes,
//   Route,
//   useLocation,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import ManageStudent from "./ManageStudent/ManageStudent";
// import ManageBus from "./ManageBus";
// import ManageParent from "./ManageParent/ManageParent";
// import Dashboard from "./Dashboard";
// import BusSchedule from "./Schedule/BusSchedule";
// import DriverManager from "./driver/DriverManager";
// import ManageRoute from "./ManageRouteBus/ManageRoute";
// import ManageLocation from "./ManageLocation/ManageLocation";
// import ManageAssignment from "./ManageAssignment/ManageAssignment";
// import ProFile from "./profileManager/profile";
// import ManageNotification from "./ManageNotification/index";
// import ManageIncident from "./ManageIncident/ManageIncident";
// function AdminLayout() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   let userData = null;
//   const tokenData = localStorage.getItem("authToken");
//   if (tokenData) {
//     try {
//       userData = jwtDecode(tokenData);
//     } catch (err) {
//       console.error("token không hợp lệ!", err);
//       <Navigate to="/login" replace />;
//     }
//   } else {
//     <Navigate to="/login" replace />;
//   }
//   const fullName = userData.name.trim();
//   const nameParts = fullName.split(" ");
//   const lastName = nameParts[nameParts.length - 1];
//   const hanldeLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login", { replace: true });
//   };
//   {
//     ("----------------------------report--------------------------");
//   }
//   const [pendingCount, setPendingCount] = useState(0);

//   // Hàm gọi API lấy số lượng báo cáo chưa xử lý
//   const fetchPendingCount = async () => {
//     try {
//       //Gọi API bạn vừa tạo (hoặc tạm thời để random số để test)
//       const res = await fetch("http://localhost:5000/api/report/count-pending");
//       const data = await res.json();
//       setPendingCount(data.count);
//     } catch (err) {
//       console.error("Lỗi lấy thông báo:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPendingCount(); // Gọi lần đầu khi load trang
//     const interval = setInterval(fetchPendingCount, 3000);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className=" flex h-screen ">
//       {/*------------------------------------------sidebar------------------------------------------------------------------*/}
//       <div className="w-64 bg-white flex-shrink-0 shadow-lg">
//         <div className="flex justify-center items-center h-16 font-bold text-blue text-xl border-b border-r">
//           <FaBus className="mr-2 text-2xl text-blue-600" />
//           Quản lý Xe Buýt
//         </div>
//         <div className="h-[calc(100vh-4rem)] overflow-y-auto text-black border-r">
//           <ul className=" py-2 ">
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer ">
//               <Link
//                 to="/admin/AdminLayout/Dashboard"
//                 className={`w-full flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/Dashboard"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🏠 Trang chủ
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/BusSchedule"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/BusSchedule"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 📋Lịch xe buýt
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/DriverManager"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/DriverManager"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 👨‍✈️Tài xế
//               </Link>
//             </li>

//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/index"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/index"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🚌Xe buýt
//               </Link>
//             </li>

//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/ManageRoute"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/ManageRoute"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🗺️Tuyến đường{" "}
//               </Link>
//             </li>

//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/students"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/students"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🎓Học sinh
//               </Link>
//             </li>

//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/parents"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/parents"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 👪Phụ huynh
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/ManageNotification"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/ManageNotification"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🔔Thông báo
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/ManageAssignment"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/ManageAssignment"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 🔄Phân công
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <Link
//                 to="/admin/AdminLayout/ManageLocation"
//                 className={`w-full  flex items-center
//         ${
//           location.pathname === "/admin/AdminLayout/ManageLocation"
//             ? "border-l-4 border-blue-700 font-semibold text-gray-800 hover:text-white"
//             : ""
//         }`}
//               >
//                 📍Cập nhật vị trí
//               </Link>
//             </li>
//             <li className="p-3 flex hover:bg-blue-500 hover:text-white items-center cursor-pointer">
//               <button onClick={hanldeLogout} className="flex items-center">
//                 <CiLogout className="mr-1" />
//                 Đăng xuất
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//       {/*------------------------------------------------------------------------------------------------- */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <div className="flex items-center justify-between h-16 bg-white border-b flex-shrink-0">
//           <div className="px-6"></div>

//           <div className=" px-6 flex items-center">
//             <div className="flex items-center gap-6 mr-4">
//               <div className="relative cursor-pointer group">
//                 <FaBell className="text-2xl text-gray-500 group-hover:text-blue-600 transition-colors" />
//                 {pendingCount > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
//                     {pendingCount > 9 ? "9+" : pendingCount}
//                   </span>
//                 )}
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
//                   <div className="p-2 text-sm text-gray-700">
//                     Bạn có{""}
//                     <strong className="text-red-500">{pendingCount}</strong> sự
//                     cố cần xử lý.
//                   </div>
//                   <Link
//                     to="/admin/AdminLayout/ManageIncident"
//                     className="block w-full text-center bg-blue-50 p-2 text-xs text-blue-600 hover:bg-blue-100"
//                   >
//                     Xem tất cả
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <Link to="/admin/AdminLayout/profile" className="flex items-center">
//               <div className="px-2 text-black hover:border-b">
//                 Xin chào {userData ? lastName : "Đang tải..."}
//               </div>
//               <FaUserCircle className="text-3xl" />
//             </Link>
//           </div>
//         </div>
//         {/*-------------------------------------------------- Route cho Trang chủ ------------------------------------------------*/}
//         <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
//           <Routes>
//             <Route path="/" element={<Navigate to="Dashboard" replace />} />
//             <Route path="profile" element={<ProFile />} />
//             <Route path="ManageIncident" element={<ManageIncident />} />
//             <Route path="Dashboard" element={<Dashboard />} />
//             <Route path="BusSchedule" element={<BusSchedule />} />
//             <Route path="DriverManager" element={<DriverManager />} />
//             <Route path="students" element={<ManageStudent />} />
//             <Route path="index" element={<ManageBus />} />
//             <Route path="parents" element={<ManageParent />} />
//             <Route path="ManageRoute" element={<ManageRoute />} />
//             <Route path="ManageLocation" element={<ManageLocation />} />
//             <Route path="ManageAssignment" element={<ManageAssignment />} />
//             <Route path="ManageNotification" element={<ManageNotification />} />
//           </Routes>
//         </div>
//       </div>{" "}
//     </div>
//   );
// }

// export default AdminLayout;

import React, { useState, useEffect } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  UserCircle,
  Bus,
  Bell,
  Home,
  ClipboardList,
  User,
  Route as RouteIcon,
  GraduationCap,
  Users,
  MapPin,
  CheckSquare,
  LogOut,
} from "lucide-react";
import ManageStudent from "./ManageStudent/ManageStudent";
import ManageBus from "./ManageBus";
import ManageParent from "./ManageParent/ManageParent";
import Dashboard from "./Dashboard/Dashboard";
import BusSchedule from "./Schedule/BusSchedule";
import DriverManager from "./driver/DriverManager";
import ManageRoute from "./ManageRouteBus/ManageRoute";
import ManageLocation from "./ManageLocation/ManageLocation";
import ManageAssignment from "./ManageAssignment/ManageAssignment";
import ProFile from "./profileManager/profile";
import ManageNotification from "./ManageNotification/index";
import ManageIncident from "./ManageIncident/ManageIncident";

import { jwtDecode } from "jwt-decode";

const MENU_ITEMS = [
  {
    path: "/admin/AdminLayout/Dashboard",
    label: "Trang chủ",
    icon: <Home size={20} />,
  },
  {
    path: "/admin/AdminLayout/BusSchedule",
    label: "Lịch xe buýt",
    icon: <ClipboardList size={20} />,
  },
  {
    path: "/admin/AdminLayout/DriverManager",
    label: "Tài xế",
    icon: <User size={20} />,
  },
  {
    path: "/admin/AdminLayout/index",
    label: "Xe buýt",
    icon: <Bus size={20} />,
  },
  {
    path: "/admin/AdminLayout/ManageRoute",
    label: "Tuyến đường",
    icon: <RouteIcon size={20} />,
  },
  {
    path: "/admin/AdminLayout/students",
    label: "Học sinh",
    icon: <GraduationCap size={20} />,
  },
  {
    path: "/admin/AdminLayout/parents",
    label: "Phụ huynh",
    icon: <Users size={20} />,
  },
  {
    path: "/admin/AdminLayout/ManageNotification",
    label: "Thông báo",
    icon: <Bell size={20} />,
  },
  {
    path: "/admin/AdminLayout/ManageAssignment",
    label: "Phân công",
    icon: <CheckSquare size={20} />,
  },
  // {
  //   path: "/admin/AdminLayout/ManageLocation",
  //   label: "Cập nhật vị trí",
  //   icon: <MapPin size={20} />,
  // },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [pendingCount, setPendingCount] = useState(0); // Giả lập có 5 thông báo
  const [loading, setLoading] = useState(true);
  const fetchPendingCount = async () => {
    try {
      //Gọi API bạn vừa tạo (hoặc tạm thời để random số để test)
      const res = await fetch("http://localhost:5000/api/report/count-pending");
      const data = await res.json();
      setPendingCount(data.count);
    } catch (err) {
      console.error("Lỗi lấy thông báo:", err);
    }
  };

  useEffect(() => {
    fetchPendingCount(); // Gọi lần đầu khi load trang
    const interval = setInterval(fetchPendingCount, 3000);
    return () => clearInterval(interval);
  }, []);
  // ------------------- PHẦN 1 & 2: BẢO MẬT & ĐIỀU HƯỚNG -------------------
  useEffect(() => {
    const checkAuth = () => {
      let token = localStorage.getItem("authToken");
      if (!token) {
        return navigate("/login", { replace: true });
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("authToken");
          return navigate("/login", { replace: true });
        }
        if (decoded.role !== "manager" && decoded.role !== "admin") {
          alert("Bạn không có quyền truy cập trang Quản trị!");
          localStorage.removeItem("authToken");
          return navigate("/login", { replace: true });
        }

        setUserData(decoded);
        setLoading(false);
      } catch (err) {
        console.error("Token lỗi:", err);
        localStorage.removeItem("authToken");
        return navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Dùng replace: true để xóa lịch sử, bấm Back không quay lại được
    navigate("/login", { replace: true });
    alert("Đã đăng xuất! (Chuyển hướng về Login)");
  };

  const getDisplayName = () => {
    if (!userData || !userData.name) return "Admin";
    const nameParts = userData.name.trim().split(" ");
    return nameParts[nameParts.length - 1];
  };

  const isActiveLink = (path) => {
    return location.pathname.includes(`${path}`);
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-medium">
        Đang kiểm tra quyền truy cập...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* ------------------- SIDEBAR ------------------- */}
      <div className="w-64 bg-white flex-shrink-0 shadow-xl z-20 flex flex-col transition-all duration-300 border-r border-gray-100">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md">
          <Bus className="mr-3" size={32} color="#FCD34D" />{" "}
          {/* Màu vàng xe bus */}
          <span className="font-bold text-xl tracking-wide">BUS ADMIN</span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1 px-3">
            {MENU_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActiveLink(item.path) ||
                      (location.pathname === "/" &&
                        item.path === "/admin/AdminLayout/Dashboard")
                      ? "bg-blue-50 text-blue-700 font-bold shadow-sm border-l-4 border-blue-600"
                      : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                >
                  <span
                    className={`mr-3 transition-colors duration-200 ${isActiveLink(item.path)
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-blue-500"
                      }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
          >
            <LogOut className="mr-2" size={18} />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* ------------------- MAIN CONTENT ------------------- */}
      <div className="flex flex-col flex-1 overflow-hidden relative bg-gray-100">
        {/* Header */}
        <header className="flex items-center justify-between h-20 bg-white shadow-sm px-8 z-10 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {MENU_ITEMS.find((i) => isActiveLink(i.path))?.icon}
            <span className="ml-2">
              {MENU_ITEMS.find((i) => isActiveLink(i.path))?.label ||
                "Tổng quan"}
            </span>
          </h2>

          <div className="flex items-center gap-6">
            {/* Notification */}
            <div className="relative cursor-pointer group">
              <div className="p-2.5 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-300">
                <Bell
                  size={24}
                  className={pendingCount > 0 ? "animate-pulse" : ""}
                />
              </div>
              {pendingCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white shadow-sm transform translate-x-1 -translate-y-1">
                  {pendingCount > 9 ? "9+" : pendingCount}
                </span>
              )}
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-2 text-sm text-gray-700">
                  Bạn có{""}
                  <strong className="text-red-500">{pendingCount}</strong> sự cố
                  cần xử lý.
                </div>
                <Link
                  to="/admin/AdminLayout/ManageIncident"
                  className="block w-full text-center bg-blue-50 p-2 text-xs text-blue-600 hover:bg-blue-100"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>

            {/* Profile */}
            <Link
              to="/admin/AdminLayout/profile"
              className="flex items-center gap-3 pl-6 border-l border-gray-200 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-gray-800">
                  {getDisplayName()}
                </div>
                <div className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Quản trị viên
                </div>
              </div>
              <UserCircle size={40} className="text-gray-300" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/admin/AdminLayout/Dashboard" replace />}
              />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="BusSchedule" element={<BusSchedule />} />
              <Route path="DriverManager" element={<DriverManager />} />
              <Route path="index" element={<ManageBus />} />
              <Route path="ManageRoute" element={<ManageRoute />} />
              <Route path="students" element={<ManageStudent />} />
              <Route path="parents" element={<ManageParent />} />
              <Route
                path="ManageNotification"
                element={<ManageNotification />}
              />
              <Route path="ManageAssignment" element={<ManageAssignment />} />
              <Route path="ManageLocation" element={<ManageLocation />} />
              <Route path="profile" element={<ProFile />} />
              <Route path="ManageIncident" element={<ManageIncident />} />
              <Route
                path="*"
                element={<Navigate to="/admin/AdminLayout/Dashboard" replace />}
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
//<div className=" px-6 flex items-center">
//             <div className="flex items-center gap-6 mr-4">
//               <div className="relative cursor-pointer group">
//                 <FaBell className="text-2xl text-gray-500 group-hover:text-blue-600 transition-colors" />
//                 {pendingCount > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
//                     {pendingCount > 9 ? "9+" : pendingCount}
//                   </span>
//                 )}
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
//                   <div className="p-2 text-sm text-gray-700">
//                     Bạn có{""}
//                     <strong className="text-red-500">{pendingCount}</strong> sự
//                     cố cần xử lý.
//                   </div>
//                   <Link
//                     to="/admin/AdminLayout/ManageIncident"
//                     className="block w-full text-center bg-blue-50 p-2 text-xs text-blue-600 hover:bg-blue-100"
//                   >
//                     Xem tất cả
//                   </Link>
//                 </div>
//               </div>
//             </div>
