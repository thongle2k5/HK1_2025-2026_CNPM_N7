import React, { useState, useEffect } from "react";
import "../../components/specific/parentpage/css/Notifications.css";
import { FaBell, FaBus, FaMapMarkerAlt, FaChild } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Notifications = ({ user}) => {
  const baseURL = "http://localhost:5000/api";
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Lấy danh sách học sinh theo parent ID
  useEffect(() => {
    if (!user || !user.user_id) {
      console.log("No user found");
      return;
    }
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseURL}/students/parent/${user.user_id}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.log("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [user]);

  // Lấy thông báo từ bảng notification
  useEffect(() => {
    if (!user || !user.user_id) return;

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${baseURL}/notifications/user/${user.user_id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.log("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);
  
  // Lấy chi tiết và status cho từng học sinh
  useEffect(() => {
    if (!students || students.length === 0) return;
    console.log("students: ", students);
    const fetchStudentDetailsAndStatus = async () => {
      try {
        setLoading(true);
        
        const detailsPromises = students.map(async (student) => {
          try {
            // Lấy chi tiết học sinh
            const detailResponse = await fetch(`${baseURL}/students/${student.student_id}/detail`);
            const detailData = await detailResponse.json();
            
            // Lấy trạng thái pickup
            const statusResponse = await fetch(`${baseURL}/students/${student.student_id}/status`);
            const statusData = await statusResponse.json();

            return {
              student,
              detail: detailData,
              status: statusData
            };
          } catch (error) {
            console.log(`Error fetching data for student ${student.student_id}:`, error);
            return {
              student,
              detail: null,
              status: null
            };
          }
        });

        const results = await Promise.allSettled(detailsPromises);
        const fulfilledResults = results
          .filter(result => result.status === "fulfilled")
          .map(result => result.value);

        setStudentDetails(fulfilledResults);
        
      } catch (error) {
        console.log("Error in fetchStudentDetailsAndStatus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetailsAndStatus();
  }, [students]);

  const getStatusText = (status) => {
    const statusMap = {
      'boarded': 'Đã lên xe',
      'waiting': 'Đang chờ',
      'picked_up': 'Đã đón',
      'absent': 'Vắng mặt',
      'on_the_way': 'Đang trên đường'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      'boarded': 'green blue',
      'waiting': 'yellow',
      'picked_up': 'green',
      'absent': 'red',
      'on_the_way': 'blue'
    };
    return classMap[status] || 'green blue';
  };

  // Format thời gian cho thông báo
  const formatNotificationTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Lấy thông tin chuyến xe từ student detail đầu tiên (nếu có)
  const tripDetail = studentDetails.length > 0 ? studentDetails[0].detail : null;

  if (loading) {
    return <div className="notification-container">Đang tải thông tin...</div>;
  }

  return (
    <div className="notification-container">
      <div className="general-notic">Thông báo xe buýt</div>

      {/* Cột trái: Danh sách học sinh */}
      <div className="student-list">
        <div className="box-title text-black">Danh sách học sinh:</div>        

        {studentDetails.map((item, index) => (
          <div key={item.student.student_id} className="notify-card purple-bg">
            <div className="icon purple"><FaChild /></div>
            <div>
              <span className="title">{item.student.student_name}</span>
              <span className="class">{item.student.class}</span>
              {item.status && (
                <span className={`status ${getStatusClass(item.status.status)}`}>
                  {getStatusText(item.status.status)}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {studentDetails.length === 0 && (
          <div className="notify-card">
            <div className="icon purple"><FaChild /></div>
            <div>
              <span className="title">Không có học sinh</span>
            </div>
          </div>
        )}
      </div>

      {/* Cột giữa: Thông báo đưa đón từ bảng notification */}
      <div className="student-list">
        <div className="box-title"> 
          <FaBus className="inline mb-1 mr-2" /> Thông báo đưa đón
        </div>
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.notif_id} className="notify-card">
              <p><strong>{formatNotificationTime(notification.timestamp)}</strong></p>
              <p>{notification.message}</p>
            </div>
          ))
        ) : (
          <div className="notify-card">
            <p><strong>--:--</strong></p>
            <p>Không có thông báo mới</p>
          </div>
        )}
      </div>

      {/* Cột phải: Chi tiết chuyến xe */}
      <div className="trip-detail">
        <div className="box-title">Chi tiết chuyến xe</div>

        {tripDetail ? (
          <>
            <p>Điểm đón: <strong>{tripDetail.address }</strong></p>
            <p>Tài xế: <strong>{tripDetail.name }</strong></p>
            <p>
              SĐT tài xế:
              <strong> 
                <a href={`tel:${tripDetail.phone}`}> 
                  {tripDetail.phone }
                </a> 
              </strong>
            </p>
            <p>Biển số xe: <strong>{tripDetail.license_plate }</strong></p>
            {tripDetail.model && <p>Xe: <strong>{tripDetail.model}</strong></p>}
          </>
        ) : (
          <p>Không có thông tin chuyến xe.</p>
        )}
      </div>

      <div className="close-btn">
        <div className="relative cursor-pointer group" onClick={()=>navigate("/parent")}>
          <p className="red-text">X</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Notifications);