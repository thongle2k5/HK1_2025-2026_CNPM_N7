import { createBrowserRouter } from "react-router-dom";
import DriverLayout from "../layouts/DriverLayout";
import Home from "../pages/driver/Home";
import Report from "../pages/driver/Report";
import StudentList from "../pages/driver/StudentList";
import Schedule from "../pages/driver/Schedule";

const router = createBrowserRouter([
  {
    path: "/driver",
    element: <DriverLayout />,
    children: [
      
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "students",
        element: <StudentList />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        index: true, // đường dẫn /driver mặc định
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 - Không tìm thấy trang</h1>,
  },
]);

export default router;
