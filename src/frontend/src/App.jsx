// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";

// import Login from "./pages/common/Login.jsx";
// import AdminLayout from "./pages/admin/AdminLayout";
// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
//     </Routes>
//   );
// }

// import { useState } from "react";
// import Header from "./components/specific/parentpage/Header.jsx";
// import ChildTracking from "./pages/parent/ChildTracking.jsx";
// import Notifications from "./pages/parent/Notifications.jsx";

// const user = { user_id: 1 };
// function ParentApp() {
//   const [screen, setScreen] = useState("tracking");
//   return (
//     <div className="w-screen h-screen flex flex-col relative">
//       <Header onBellClick={() => setScreen("notification")} />

//       {screen === "tracking" && <ChildTracking user={user} />}
//       {screen === "notification" && (
//         <Notifications user={user} onTracking={() => setScreen("tracking")} />
//       )}
//     </div>
//   );
// }
// export default ParentApp;


import AppRoutes from "./routes/index.jsx";
export default function App() {
  return <AppRoutes />;
}






