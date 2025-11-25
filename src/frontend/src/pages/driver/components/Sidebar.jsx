import { Home, Calendar, Users, AlertTriangle, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SidebarDriver() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 space-y-2 shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Menu</h2>

      <NavLink to="/driver" end className={linkClass}>
        <Home className="w-4 h-4" /> Trang chủ
      </NavLink>

      <NavLink to="/driver/schedule" className={linkClass}>
        <Calendar className="w-4 h-4" /> Lịch làm việc
      </NavLink>

      <NavLink to="/driver/students" className={linkClass}>
        <Users className="w-4 h-4" /> Danh sách học sinh
      </NavLink>

      <NavLink to="/driver/report" className={linkClass}>
        <AlertTriangle className="w-4 h-4" /> Báo cáo sự cố
      </NavLink>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <NavLink to="/Login" className={linkClass}>
          <LogOut className="w-4 h-4" /> Đăng xuất
        </NavLink>
      </div>
    </aside>
  );
}
