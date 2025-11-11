// import React from "react";
// // import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

// // import Login from "./pages/common/Login.jsx";
// import AdminLayout from "./pages/admin/AdminLayout";
// export default function App() {
//   // return (
//   //   <Routes>
//   //     <Route path="/" element={<Login />} />
//   //     <Route path="/login" element={<Login />} />
//   //     <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
//   //   </Routes>
//   // );
//   return <AdminLayout />;

// }





import Header from "./components/specific/parentpage/Header.jsx";
import ChildTracking from "./pages/parent/ChildTracking.jsx";

const user = {user_id :1};
function parentApp() {
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Header />
      <ChildTracking user = {user}/>
    </div>
  );
}
export default parentApp;


// import AppRoutes from "./routes/index.jsx"; // Đảm bảo AppRoutes được export default từ index.jsx
// export default function App() {
//   // Chỉ render component chứa Routes
//   return <AppRoutes />;
// }
