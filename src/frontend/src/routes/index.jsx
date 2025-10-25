import { Routes, Route } from 'react-router-dom';

// Import Components
import DriverLayout from '../pages/driver/DriverLayout.jsx';
import DriverHome from '../pages/driver/Home.jsx'; 
import Report from '../pages/driver/Report.jsx';
import StudentList from '../pages/driver/StudentList.jsx'; 
import Schedule from '../pages/driver/Schedule.jsx';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/driver" element={<DriverLayout />}>
          
          {/* 1. Trang Mặc Định: URL / */}
          <Route index element={<DriverHome />} /> 
          
          {/* 2. Route Rõ ràng cho Trang Chủ: URL /home */}
          <Route path="home" element={<DriverHome />} />
          
          {/* 3. Trang Report: URL /report */}
          <Route path="report" element={<Report />} />
          
          {/* 4. DANH SÁCH HỌC SINH: URL /students */}
          <Route path="students" element={<StudentList />} /> {/* <-- ĐÃ THÊM ROUTE */}
          
          {/* 5. Route Lịch Trình */}
          <Route path="schedule" element={<Schedule />} />

        </Route>
    </Routes>
  );
};

export default AppRoutes;
