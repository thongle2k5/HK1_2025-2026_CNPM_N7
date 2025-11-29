import { Outlet } from "react-router-dom";
import SidebarDriver from "./components/Sidebar.jsx";
import DriverChatWidget from "./Chat.jsx";

export default function DriverLayout() {
  return (
    <div className="flex h-screen">
      <SidebarDriver />
      <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>

      <DriverChatWidget />
    </div>
  );
}
