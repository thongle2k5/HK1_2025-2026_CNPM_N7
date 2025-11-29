import React, { useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import DetailInfo from "./DetailInfo";
import api from '../../../api/sql.api.js';
const statusColor = {
  "picked up": "bg-green-500",
  "dropped off": "bg-blue-500",
  "waiting": "bg-yellow-400",
  "missed": "bg-red-500",
  "N/A": "bg-gray-400",
};

function StudentInfo({ studentsData,onTrackBus }) {
  // State quản lý học sinh được chọn để xem thông tin chi tiết 
  const [selectedStudent, setSelectedStudent] = React.useState(null);

  // State quản lý thông tin chi tiết của các học sinh , kiểu cache(stop,driver,bus,schedule)
  const [detailInfo, setDetailInfo] = React.useState({});

  // Gọi khi click chuột để xem thông tin chi tiết 1 học sinh 
  // Cập nhật state selectedStudent
  const handleStudentClick = (student) => {
      setSelectedStudent(student);
  };

  useEffect(() => {
    if (!studentsData || studentsData.length === 0) {
      return;
    }
  }, []);

  // Lấy thông tin chi tiết học sinh khi selectedStudent thay đổi và cập nhật vào detailInfo
  useEffect(() => {
    if (selectedStudent == null)
      return;
    else {
      const fetchDetailStudentInfo = async () => {
        try {
        } catch (error) {
          console.log(error);
        }
      };
      fetchDetailStudentInfo();
    }
  }, [selectedStudent]);

  return (
    <aside className="w-full h-full border-l border-gray-400 flex flex-col">
      <h2 className="text-3xl font-bold text-blue-800 p-4">Student Info</h2>
      <table className="text-left text-2xl m-4">
        <thead>
          <tr className="border-b-2 border-blue-700 h-12">
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            studentsData.map((student) => (
              <tr key={student.student.student_id} className="border-b text-xl h-12">
                <td>{student.student.student_name || "N/A"}</td>
                <td>{student.student.class || "N/A"}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className={`text-white px-2 py-1 rounded-md text-lg min-w-24 text-center bg-green-400 ${statusColor[student.pickup_status.status || "N/A"]}`}>
                      {student.pickup_status.status || "N/A"}
                    </span>
                  </div>
                </td>
                <td>
                  <button className="flex justify-center items-center"
                    onClick={() => {
                      handleStudentClick(student);
                    }}>
                    <MoreHorizontal className="text-gray-600 hover:text-gray-900 size-8" />
                  </button>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
      {
        selectedStudent != null && (
          <DetailInfo
            studentData ={selectedStudent}
            onTrackBus={onTrackBus}
          />
        )
      }

    </aside>
  );
};

export default StudentInfo;