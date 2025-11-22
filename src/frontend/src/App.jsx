// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/common/Login.jsx";
// import AdminLayout from "./pages/admin/AdminLayout";

// import { ToastContainer, toast, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export default function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin/AdminLayout/*" element={<AdminLayout />} />
//       </Routes>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );

// }

// import Header from "./components/specific/parentpage/Header.jsx";
// import ChildTracking from "./pages/parent/ChildTracking.jsx";

// function parentApp() {
//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <ChildTracking />
//     </div>
//   );
// }
// export default parentApp;

// import AppRoutes from "./routes/index.jsx"; // Đảm bảo AppRoutes được export default từ index.jsx

// export default function App() {
//   // Chỉ render component chứa Routes
//   return <AppRoutes />;
// }

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

// import Header from "./components/specific/parentpage/Header.jsx";
// import ChildTracking from "./pages/parent/ChildTracking.jsx";

// function parentApp() {
//   return (
//     <div className="h-screen flex flex-col">
//       <Header />
//       <ChildTracking />
//     </div>
//   );
// }
// export default parentApp;

import AppRoutes from "./routes/index.jsx";
export default function App() {
  return <AppRoutes />;
}