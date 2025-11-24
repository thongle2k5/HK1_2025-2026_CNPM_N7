import React, { useState, useEffect } from "react";
import "../../components/specific/parentpage/css/Notifications.css";
import { FaBell, FaBus, FaMapMarkerAlt, FaChild, FaUser, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Notifications = ({ user}) => {
  const baseURL = "http://localhost:5000/api";
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
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

  // Fallback: Nếu không có tripDetails từ API, tạo thông tin mặc định từ student details
  useEffect(() => {
    if (!tripDetails && studentDetails.length > 0) {
      // Tìm student đầu tiên có thông tin chi tiết
      const studentWithDetail = studentDetails.find(item => item.detail);
      if (studentWithDetail && studentWithDetail.detail) {
        setTripDetails({
          stop_address: studentWithDetail.detail.address,
          driver_name: studentWithDetail.detail.name || "Chưa có thông tin",
          driver_phone: studentWithDetail.detail.phone || "Chưa có SĐT",
          bus_plate: studentWithDetail.detail.license_plate || "Chưa có biển số",
          bus_model: studentWithDetail.detail.model,
        });
      }
    }
  }, [studentDetails, tripDetails]);

  const getStatusText = (status) => {
    const statusMap = {
      'boarded': 'Đã lên xe',
      'waiting': 'Chưa lên xe',
      'picked_up': 'Đã xuống xe',
      'absent': 'Vắng mặt',
      'on_the_way': 'Đang trên đường',
      'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      'boarded': 'blue',
      'waiting': 'yellow',
      'picked_up': 'green',
      'absent': 'red',
      'on_the_way': 'blue',
      'completed': 'green'
    };
    return classMap[status] || 'blue';
  };

  const formatNotificationTime = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatUpdateTime = () => {
    return new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="notification-container">Đang tải thông tin...</div>;
  }

  return (
    <div className="notification-container">
      <div className="general-notic">Thông báo xe buýt</div>

      {/* Cột trái: Thông báo đưa đón từ bảng notification */}
      <div className="student-list">
        <div className="box-title"> 
          <FaBell className="inline mb-1 mr-2" /> Thông báo từ nhà trường
        </div>
        
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.notif_id} className="notify-card">
              <p><strong>{formatNotificationTime(notification.created_at)}</strong></p>
              <p>{notification.message}</p>
              {notification.title && (
                <p style={{fontWeight: 'bold', color: '#4a6cf7'}}>{notification.title}</p>
              )}
            </div>
          ))
        ) : (
          <div className="notify-card">
            <p><strong>--:--</strong></p>
            <p>Không có thông báo mới từ nhà trường</p>
          </div>
        )}
      </div>

      {/* Cột giữa: Danh sách học sinh */}
      <div className="student-list">
        <div className="box-title">
          <FaChild className="inline mb-1 mr-2" /> Danh sách học sinh
        </div>        

        {studentDetails.map((item, index) => (
          <div key={item.student.student_id} className="notify-card purple-bg">
            <div className="icon purple"><FaChild /></div>
            <div>
              <span className="title">{item.student.student_name}</span>
              <span className="class">{item.student.class}</span>
              {item.status ? (
                <span className={`status ${getStatusClass(item.status.status)}`}>
                  {getStatusText(item.status.status)}
                </span>
              ) : (
                <span className="status blue">Chưa cập nhật</span>
              )}
            </div>
          </div>
        ))}
        
        {studentDetails.length === 0 && (
          <div className="notify-card purple-bg">
            <div className="icon purple"><FaChild /></div>
            <div>
              <span className="title">Không có học sinh</span>
              <span className="class">--</span>
            </div>
          </div>
        )}
      </div>

      {/* Cột phải: Chi tiết chuyến xe  */}
      <div className="trip-detail">
        <div className="box-title">
          <FaBus className="inline mb-1 mr-2" /> Chi tiết chuyến xe
        </div>

        {tripDetails ? (
          <div className="trip-info-content">
            <div className="info-item">
              <FaMapMarkerAlt className="icon-small blue" />
              <span>Điểm đón: <strong>{tripDetails.stop_address || tripDetails.address || "Đang cập nhật"}</strong></span>
            </div>
            
            <div className="info-item">
              <FaUser className="icon-small green" />
              <span>Tài xế: <strong>{tripDetails.driver_name || tripDetails.name || "Chưa có thông tin"}</strong></span>
            </div>
            
            <div className="info-item">
              <FaBell className="icon-small purple" />
              <span>
                SĐT tài xế: 
                <strong>
                  {tripDetails.driver_phone || tripDetails.phone ? (
                    <a href={`tel:${tripDetails.driver_phone || tripDetails.phone}`} style={{marginLeft: '5px'}}>
                      {tripDetails.driver_phone || tripDetails.phone}
                    </a>
                  ) : (
                    " Chưa có SĐT"
                  )}
                </strong>
              </span>
            </div>
            
            <div className="info-item">
              <FaCar className="icon-small red" />
              <span>Biển số xe: <strong>{tripDetails.bus_plate || tripDetails.license_plate || "Chưa có biển số"}</strong></span>
            </div>
            
            {tripDetails.bus_model && (
              <div className="info-item">
                <span>Loại xe: <strong>{tripDetails.bus_model}</strong></span>
              </div>
            )}
            
            <div className="update-time">
              <small>Cập nhật lúc: {formatUpdateTime()}</small>
            </div>
          </div>
        ) : (
          <div className="no-trip-info">
            <p>🚌 Chưa có thông tin chuyến xe</p>
            <small>Thông tin sẽ được cập nhật khi có lịch trình</small>
          </div>
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