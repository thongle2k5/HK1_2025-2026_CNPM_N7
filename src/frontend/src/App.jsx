import AdminLayout from "./pages/admin/AdminLayout.jsx";
import DriversPage from "./pages/admin/DriversPage.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
/*export default function App() {
  return <AdminLayout />;
}*/

import Header from "./components/specific/parentpage/Header.jsx";
import ChildTracking from "./pages/parent/ChildTracking.jsx";

function parentApp() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ChildTracking />
    </div>
  );
}
export default parentApp; 
