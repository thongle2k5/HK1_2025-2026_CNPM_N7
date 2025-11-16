import { useState,useEffect,memo} from "react";
import StudentInfo from "../../components/specific/parentpage/StudentInfo.jsx";
import NotificationHistory from "../../components/specific/parentpage/NotificationHistory.jsx";
import MapComponent from "../../components/specific/parentpage/MapComponent.jsx";
import api from '../../api/sql.api.js';
function ChildTracking({ user }) {
  const [studentsData, setStudentsData] = useState([]);
  const [busData,setBusData] = useState([]);
  
  useEffect(() => {
    if (!user || !user.user_id) {
      console.log("No user found");
      return;
    }
    const fetchStudentData = async () => {
      try {
        const studentsDataRes = await api.get(`/students/user/${user.user_id}/detail`);
        setStudentsData(studentsDataRes.data);
        console.log(studentsDataRes.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, [user]);

  useEffect(()=>{
    if(!studentsData || studentsData.length === 0)
      return;
    const fetchBusData = async ()=>{
      const scheduleIds = studentsData.map((s)=> s.schedule?.schedule_id);
      const busDataRes = await api.post(`/buses/schedule/detail`,
        {scheduleIds: scheduleIds}
      )
      setBusData(busDataRes.data);
    }
    fetchBusData();

  },[studentsData])

  useEffect(()=>{
    if(!busData || busData.length === 0)
      return;
  },[busData])
  return (
    <div className="flex flex-row h-full w-full relative">
      <div className="flex flex-col shrink-0 h-full w-3/4 relative">
        <div className="w-full h-3/4 relative">
          <MapComponent busData={busData} />
        </div>
        <NotificationHistory />
      </div>
      <StudentInfo studentsData={studentsData} />

    </div>
  );
};

export default memo(ChildTracking);
