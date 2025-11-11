import React, { useEffect } from "react";
import StudentInfo from "../../components/specific/parentpage/StudentInfo.jsx";
import NotificationHistory from "../../components/specific/parentpage/NotificationHistory.jsx";
import Map from "../../components/specific/parentpage/MapComponent.jsx";
import MapComponent from "../../components/specific/parentpage/MapComponent.jsx";

function ChildTracking({ user }) {
  const baseURL = "http://localhost:5000/api";
  const [students, setStudents] = React.useState([]);
  const [schedules, setSchedules] = React.useState([]);

  useEffect(() => {
    if (!user || !user.user_id)
    {
      console.log("No user found");
      return;

    }
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${baseURL}/students/parent/${user.user_id}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentData();
  }, [user]);
  
  useEffect(() => {
    if (!students || students.length === 0)
      return;
    const fetchSchedules = async () => {
      try {
        const getSchedules = await Promise.allSettled(
          students.map(async (student) => {
            const result = await fetch(`${baseURL}/students/${student.student_id}/schedule`);
            if (!result)
              console.log(`No schedule from student ${student.student_id}`);
            const data = await result.json();
            const schedule = data[0];
            return { ...student,  schedule: schedule}
          })
        );
        const fulfilled = getSchedules.map((r, i) => {
          if (r.status === "fulfilled")
            return r.value;
          else
            return { ...r, schedule: { schedule: "N/A" } };
        });
        setSchedules(fulfilled);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSchedules();
  }, [students])
  return (
    <div className="flex flex-row h-full w-full relative">
      <div className="flex flex-col shrink-0 h-full w-3/4 relative">
        <div className="w-full h-3/4 relative">
          <MapComponent schedules={schedules} />
        </div>
        <NotificationHistory />
      </div>
      <StudentInfo students={students} />

    </div>
  );
};

export default React.memo(ChildTracking);
