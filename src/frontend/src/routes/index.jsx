import { Routes, Route } from 'react-router-dom';


import DriverLayout from '../pages/driver/DriverLayout.jsx';
import DriverHome from '../pages/driver/Home.jsx';
import Report from '../pages/driver/Report.jsx';
import StudentList from '../pages/driver/StudentList.jsx';
import Schedule from '../pages/driver/Schedule.jsx';
import ScheduleDetail from '../pages/driver/ScheduleDetail.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/driver/*" element={<DriverLayout />}>

        <Route index element={<DriverHome />} />

        <Route path="home" element={<DriverHome />} />

        <Route path="report" element={<Report />} />

        <Route path="students" element={<StudentList />} />

        <Route path="schedule" element={<Schedule />} />

        <Route path="schedule/:scheduleId" element={<ScheduleDetail />} />


      </Route>
    </Routes>
  );
};

export default AppRoutes;
