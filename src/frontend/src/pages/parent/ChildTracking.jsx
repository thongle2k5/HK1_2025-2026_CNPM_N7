import { useState, useEffect, memo, useRef, useContext} from "react";
import StudentInfo from "../../components/specific/parentpage/StudentInfo.jsx";
import MapComponent from "../../components/specific/parentpage/MapComponent.jsx";
import api from '../../api/sql.api.js';
import { ParentContext } from "../../components/specific/parentpage/ParentSocketProvider.jsx";
import { useLocation } from "react-router-dom";

function ChildTracking({setBusIds,user}) {
  const [studentsData, setStudentsData] = useState([]);
  const [busData, setBusData] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const {socket} = useContext(ParentContext);
  const reqSelectBus = useRef(null)

  useEffect(() => {
    if (!user || !user.userId) {
      console.log("No user found");
      return;
    }
    const fetchStudentData = async () => {
      try {
        const studentsDataRes = await api.get(`/students/user/${user.userId}/detail`);
        setStudentsData(studentsDataRes.data);
        console.log("student data: ", studentsDataRes.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudentData();
  }, [user]);

  useEffect(() => {
    if (!studentsData || studentsData.length === 0)
      return;
    const fetchBusData = async () => {
      const scheduleIds = studentsData.map((s) => s.schedule?.schedule_id);
      const busDataRes = await api.post(`/buses/schedule/detail`,
        { scheduleIds: scheduleIds }
      )
      setBusData(busDataRes.data);
      if(setBusIds)
      {
        setBusIds(busDataRes.data.map(b=>b.bus_id));
      }
    }
    fetchBusData();

  }, [studentsData])

  useEffect(() => {
    if (!busData || busData.length === 0)
      return;
  }, [busData])
  
  return (
    <div className="flex flex-row h-screen w-screen relative">
      <div className="flex flex-col shrink-0 h-full w-3/4 relative">
        <div className="w-full h-full relative">
          <MapComponent socket = {socket} busData={busData} selectedBus={selectedBus} setSelectedBus={setSelectedBus} registerReqBus={(fn) => ( reqSelectBus.current = fn )} />
        </div>
      </div>
      <StudentInfo studentsData={studentsData} onTrackBus={(busId) => {
        if (reqSelectBus.current) {
          reqSelectBus.current(busId);
        }
      }} />

    </div>
  );
};

export default memo(ChildTracking);