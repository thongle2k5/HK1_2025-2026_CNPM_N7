import React, { useState, useEffect, use } from "react";
import "../../components/specific/parentpage/css/Notifications.css";
import { FaBell, FaBus, FaMapMarkerAlt, FaChild, FaUser, FaCar, FaFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ParentContext } from "../../components/specific/parentpage/ParentSocketProvider";
const Notifications = ({user}) => {
  const baseURL = "http://localhost:5000/api";
  const [students, setStudents] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [busNotifications, setBusNotifications] = useState([]);
  const [combinedNotifications, setCombinedNotifications] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { hasNewBusNoti, setHasNewBusNoti} = React.useContext(ParentContext);
  const navigate = useNavigate();


  // Lấy danh sách học sinh theo parent ID
  useEffect(() => {
    if (!user || !user.userId) {
      console.log("No user found");
      return;
    }
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${baseURL}/students/parent/${user.userId}`);
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
    if (!user || !user.userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${baseURL}/notifications/user/${user.userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.slice(0, 20); //  chỉ lấy 20 thông báo mới nhất
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

  // Tạo thông báo xe buýt từ trạng thái pickup của học sinh
  useEffect(() => {
    if (!studentDetails || studentDetails.length === 0) return;
    const generateStudentStatus = () => {
      const busNotifs = [];

      const getLocalDate = (d) => {
        const dt = new Date(d);
        return dt.getFullYear() + '-' + (dt.getMonth() + 1).toString().padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0');
      };

      studentDetails.forEach((item) => {
        if (!item.status) return;
        const studentName = item.student.student_name;
        const status = item.status.status;
        const time = item.status.time;
        // if (getLocalDate(time) !== getLocalDate(new Date())) return;
        let message = '';
        let type = '';

        switch (status) {
          case 'boarded':
            message = `H.S ${studentName} đã lên xe`;
            type = 'boarded';
            break;
          case 'picked up':
            message = `H.S ${studentName} đã xuống xe`;
            type = 'picked up';
            break;
          case 'on_the_way':
            message = `H.S ${studentName} đang trên đường`;
            type = 'on_the_way';
            break;
          case 'completed':
            message = `H.S ${studentName} đã đến trường`;
            type = 'completed';
            break;
          default:
            return;
        }

        busNotifs.push({
          id: `${type}-${item.student.student_id}-${time}`,
          type: type,
          timestamp: time,
          message: message,
          studentName: studentName,
          notifyType: "student_status"
        });
      });

      return busNotifs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    };


    const newStudenStatus = generateStudentStatus();
    setStudentStatus(newStudenStatus);
  }, [studentDetails]);

  const fetchBusNotification = async () => {
    try {
      const res = await fetch(`${baseURL}/notifications/${user.userId}/busNoti`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // console.log(data);
      setBusNotifications(data);
      setHasNewBusNoti(false);
    } catch (err) {
      console.error('Error fetching bus notification:', err);
    }
  };

  //Thông báo đến về việc đến điểm dừng của xe
  useEffect(() => {
    if (!user || !user.userId) return;
    if (hasNewBusNoti)
      fetchBusNotification();
  }, [hasNewBusNoti]),

    useEffect(() => {
      if (!user || !user.userId) return;
      fetchBusNotification();
    }, [user]),

    //Phân loại thông báo xe với điểm dừng
    useEffect(() => {
      if (busNotifications.length === 0) return;

      const typedBusNoti = () => {
        busNotifications.forEach((notification) => {
          let busMessage = '';

          if (notification.type == "arrived") {
            busMessage = `Xe buýt đã đến điểm dừng!`;
          }

          if (notification.type == "close to") {
            busMessage = `Xe buýt sẽ đến điểm dừng trong vòng 5 phút nữa!`;
          }

          notification.message = busMessage;
          notification.notifyType = "bus_stop";
        });
        return busNotifications;
      }

      const newTypedBusNoti = typedBusNoti();
      newTypedBusNoti.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setBusNotifications(newTypedBusNoti);
    }, [busNotifications]);

  //Trộn 2 loại thông báo
  useEffect(() => {
    const totalNotifications = [...studentStatus, ...busNotifications];
    // console.log("Student Status Notifications:", studentStatus);
    // console.log("Bus Notifications:", busNotifications);
    totalNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    totalNotifications.slice(0, 20); // Giới hạn chỉ lấy 20 thông báo mới nhất
    setCombinedNotifications(totalNotifications);
    // console.log("Combined Notifications:", totalNotifications);
  }, [studentStatus, busNotifications]);

  // Fallback: Nếu không có tripDetails từ API, tạo thông tin mặc định từ student details
  useEffect(() => {
    if (!tripDetails && studentDetails.length > 0) {
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


  function formatNotificationTime(ts) {
    const date = new Date(ts);

    const hours = date.getHours().toString().padStart(1, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    return `${day}/${month} ${hours}:${minutes}`;
  }

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
      <div className="general-notic">Thông báo</div>

      {/* Thông báo từ nhà trường*/}
      <div className="school-notify-list">
        <div className="box-title">
          <FaBell className="inline mb-1 mr-2" /> Thông báo từ nhà trường
        </div>

        <div className="scrollable-notifications">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.notif_id} className="notify-card">
                <p className="notifyTime"><strong>{formatNotificationTime(notification.created_at)}</strong></p>
                <p>{notification.message}</p>
                {notification.title && (
                  <p style={{ fontWeight: 'bold', color: '#eb4040ff' }}>{notification.title}</p>
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
      </div>

      {/* Thông báo của xe buýt */}
      <div className="bus-notify">
        <div className="box-title">
          <FaBus className="inline mb-1 mr-2" /> Thông báo từ xe buýt
        </div>

        <div className="scrollable-notifications">

          {combinedNotifications.length > 0 ? (
            combinedNotifications.map((notification) => (
              notification.notifyType === "bus_stop" ? (
                  <div key={`${notification.timestamp}-${notification.notifyType}-${notification.stop_id}`} className="notify-card">
                    <p className="notifyTime"><strong>{formatNotificationTime(notification.timestamp)}</strong></p>
                    <p className="font-medium">Điểm dừng: {notification.address}</p>
                    <p>{notification.message}</p>
                  </div>
                ) : (
                  <div key={`${notification.timestamp}-${notification.notifyType}`} className="notify-card">
                    <p className="notifyTime"><strong>{formatNotificationTime(notification.timestamp)}</strong></p>
                    <p className="text-purple-800"><strong>{notification.message}</strong></p>
                  </div>
                ) 
            ))
          ) : (
            <div className="notify-card">
              <p><strong>--:--</strong></p>
              <p>Chưa có thông báo mới từ xe buýt</p>
            </div>
          )}

        </div>
      </div>

      {/* Thông tin của học sinh & xe buýt */}
      <div className="student-bus-infor">
        <div className="box-title">
          <FaFile className="inline mb-1 mr-2" /> Thông tin học sinh & chuyến xe
        </div>

        {/* Danh sách học sinh */}
        <div className="student-list">
          <div className="box-title">
            <FaChild className="inline mb-1 mr-2" /> Danh sách học sinh
          </div>

          <div className="scrollable-students">
            {studentDetails.map((item, index) => (
              <div key={item.student.student_id} className="notify-card purple-bg">
                <div className="icon purple"><FaChild /></div>
                <div>
                  <span className="title">{item.student.student_name}</span>
                  <span className="class">{item.student.class}</span>
                </div>
              </div>
            ))}

            {studentDetails.length === 0 && (
              <div className="notify-card purple-bg">
                <div className="icon purple"><FaChild /></div>
                <div className="student-info">
                  <span className="title">Không có học sinh</span>
                  <span className="class">--</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chi tiết chuyến xe */}
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
                      <a href={`tel:${tripDetails.driver_phone || tripDetails.phone}`} style={{ marginLeft: '5px' }}>
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
      </div>

      <div className="close-btn">
        <div className="relative cursor-pointer group" onClick={() => navigate("/parent", { state: { user: user },relative: true})}>


          <p className="red-text">X</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Notifications);