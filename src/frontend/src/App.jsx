import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";
import Login from "./pages/common/Login.jsx";
import AdminLayout from "./pages/admin/AdminLayout";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

// import { Routes, Route } from "react-router-dom";
// import Header from "./components/specific/parentpage/Header.jsx";
// import ChildTracking from "./pages/parent/ChildTracking.jsx";
// import Notifications from "./pages/parent/Notifications.jsx";
// import { SocketProvider } from "./components/specific/parentpage/ParentSocketProvider.jsx";

// export default function App() {
//   const user = { user_id: 1 };

//   return (
//     <div className="w-screen h-screen flex flex-col relative">
//       <Header />   {/* tuỳ bạn đặt ở đâu */}
//       <SocketProvider>
//         <Routes>
//           <Route path="/" element={<ChildTracking user={user} />} />
//           <Route path="/parent" element={<ChildTracking user={user} />} />
//           <Route path="/parent/notifications" element={<Notifications user={user} />} />
//         </Routes>
//       </SocketProvider>
//     </div>
//   );
// }

// import AppRoutes from "./routes/index.jsx";
// export default function App() {
//   return <AppRoutes />;
// }

// import AppRoutes from "./routes/index.jsx";
// export default function App() {
//   return <AppRoutes />;
// }
