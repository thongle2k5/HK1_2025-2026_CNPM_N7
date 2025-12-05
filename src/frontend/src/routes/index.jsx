// src/routes/index.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Import Components
import DriverLayout from "../pages/driver/DriverLayout.jsx";
import DriverHome from "../pages/driver/Home.jsx";
import Report from "../pages/driver/Report.jsx";
import StudentList from "../pages/driver/StudentList.jsx";
import Schedule from "../pages/driver/Schedule.jsx";
import ScheduleDetail from "../pages/driver/ScheduleDetail.jsx";
import Profile from "../pages/driver/Profile.jsx";
import DriverChat from "../pages/driver/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route  element={<DriverLayout />}>
        <Route index element={<DriverHome />} />

        <Route path="home" element={<DriverHome />} />
        <Route path="report" element={<Report />} />
        <Route path="students" element={<StudentList />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/:scheduleId" element={<ScheduleDetail />} />

        <Route path="profile" element={<Profile />} />
      </Route>{" "}
      <Route path="*" element={<Navigate to="/driver" replace />} />
    </Routes>
  );
};

export default AppRoutes;
