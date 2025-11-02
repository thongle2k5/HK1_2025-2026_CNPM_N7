import React, { useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import DetailInfo from "./DetailInfo";

const statusColor = {
  "Boarded": "bg-green-400",
  "Waiting": "bg-yellow-400",
  "Missed": "bg-red-500",
  "N/A": "bg-gray-400",
};

function StudentInfo({ students }) {
  // Backend URL
  const url = "http://localhost:5000/api"

  // State quản lý học sinh được chọn để xem thông tin chi tiết 
  const [selectedStudent, setSelectedStudent] = React.useState(null);

  // State quản lý thông tin cơ bản của học sinh, kiểu mảng(student + pickup_status)
  const [studentsInfo, setStudentsInfo] = React.useState([]);

  // State quản lý thông tin chi tiết của các học sinh , kiểu cache(stop,driver,bus,schedule)
  const [detailInfo, setDetailInfo] = React.useState({});

  // Gọi khi click chuột để xem thông tin chi tiết 1 học sinh 
  // Cập nhật state selectedStudent
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  // Lấy thông tin status của các học sinh từ backend khi render
  useEffect(() => {
    if (students.length === 0 || !students)
      return;
    const fetchStudentStatus = async () => {
      try {
        const result = await Promise.allSettled(
          students.map(async (student) => {
            const statusRes = await fetch(`${url}/students/${student.student_id}/status`);
            if (!statusRes)
              console.log(`No status from student ${student.student_id}`);
            const status = await statusRes.json();
            return { ...student, status };
          }));

        const fulfilledInfo = result.map((r, i) => {
          if (r.status === "fulfilled")
            return r.value;
          else
            return { ...students[i], status: { status: "N/A" } };
        });
        setStudentsInfo(fulfilledInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudentStatus();
  }, [students]);

  // Lấy thông tin chi tiết học sinh khi selectedStudent thay đổi và cập nhật vào detailInfo
  useEffect(() => {
    if (selectedStudent == null)
      return;
    else {
      const fetchDetailStudentInfo = async () => {
        try {
          const res = await fetch(`${url}/students/${selectedStudent.student_id}/detail`);
          const data = await res.json();
          setDetailInfo(prev => ({ ...prev, [selectedStudent.student_id]: data }));
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
          {studentsInfo.map((s, i) => (
            <tr key={i} className="border-b text-xl h-12">
              <td>{s.student_name || "N/A"}</td>
              <td>{s.class || "N/A"}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className={`text-white px-2 py-1 rounded-md text-lg min-w-24 text-center ${statusColor[s.status.status || "N/A"]}`}>
                    {s.status.status || "N/A"}
                  </span>
                </div>
              </td>
              <td>
                <button className="flex justify-center items-center"
                  onClick={() => {
                    handleStudentClick(s);
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
            name={selectedStudent.student_name || "N/A"}
            status={selectedStudent.status.status || "N/A"}
            stop={detailInfo[selectedStudent.student_id]?.stop_name || "N/A"}
            address={detailInfo[selectedStudent.student_id]?.address || "N/A"}
            driver_name={detailInfo[selectedStudent.student_id]?.name || "N/A"}
            phone={detailInfo[selectedStudent.student_id]?.phone || "N/A"}
            plate={detailInfo[selectedStudent.student_id]?.license_plate || "N/A"}
          />
        )
      }

    </aside>
  );
};

export default StudentInfo;
