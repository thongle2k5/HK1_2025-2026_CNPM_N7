import { Outlet, Link } from "react-router-dom";
import SidebarDriver from "../components/SidebarDriver";

export default function DriverLayout() {
  return (
    <div className="flex h-screen">
      <SidebarDriver />
      <div className="flex-1 p-4 bg-gray-50">
        <Outlet /> {/* chỗ để hiển thị trang con */}
      </div>
    </div>
  );
}
