// import AdminLayout from "./pages/admin/AdminLayout.jsx";
// export default function App() {
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


import AppRoutes from "./routes/index.jsx"; // Đảm bảo AppRoutes được export default từ index.jsx

export default function App() {
  // Chỉ render component chứa Routes
  return <AppRoutes />; 
}

