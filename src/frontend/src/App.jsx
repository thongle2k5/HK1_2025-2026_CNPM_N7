import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";
import Login from "./pages/common/Login.jsx";
import AdminLayout from "./pages/admin/AdminLayout";
import ParentApp from "./pages/parent/ParentApp.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
        <Route path="/driver/*" element={<AppRoutes />} />
        <Route path="/parent/*" element={<ParentApp />} />
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

// import React from "react";
// import ParentApp from "./pages/parent/ParentApp.jsx";
// const user = { user_id: 1 };
// export default function App() {
//   return <ParentApp user={user} />;
// }
