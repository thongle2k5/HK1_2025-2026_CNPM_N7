import React from "react";
import "../../components/specific/parentpage/css/Notifications.css";
import { FaBell, FaBus, FaMapMarkerAlt, FaChild } from "react-icons/fa";

const Notifications = ({title, onTracking}) => {
  return (
    <div className="notification-container">

      {/* Cột trái: Danh sách thông báo */}
      <div className="notify-list">
        <div className="box-title">Thông báo xe buýt</div>

        <div className="notify-card">
          <div className="icon green"><FaMapMarkerAlt /></div>
          <div>
            <p className="title green-text">Xe buýt đã tới điểm đón!</p>
            <span className="time">07:45 AM</span>
          </div>
        </div>

        <div className="notify-card">
          <div className="icon blue"><FaChild /></div>
          <div>
            <p className="title">Emma đã lên xe</p>
            <span className="time">07:45 AM</span>
          </div>
        </div>

        <div className="notify-card">
          <div className="icon blue"><FaChild /></div>
          <div>
            <p className="title">Mice đã lên xe</p>
            <span className="time">07:45 AM</span>
          </div>
        </div>

        <div className="notify-card purple-bg">
          <div className="icon purple"><FaChild /></div>
          <div>
            <p className="title">Emma đã đến trường</p>
            <span className="time">08:20 AM</span>
          </div>
        </div>

        <div className="notify-card purple-bg">
          <div className="icon purple"><FaChild /></div>
          <div>
            <p className="title">Mice đã đến trường</p>
            <span className="time">08:20 AM</span>
          </div>
        </div>
      </div>

      {/* Cột giữa: Thông báo đưa đón */}
      <div className="pickup-box">
        <div className="box-title"> 
          <FaBus className="inline mb-1 mr-2" /> Thông báo đưa đón
        </div>
        <p>Xe buýt đưa đón con của bạn đã sẵn sàng. Vui lòng chuẩn bị bé:</p>

        <ul>
          <li>Mice</li>
          <li>Emma</li>
        </ul>

        <p>Thời gian dự kiến đến: <strong>07:30 sáng</strong></p>
      </div>

      {/* Cột phải: Chi tiết chuyến xe */}
      <div className="trip-detail">
        <div className="box-title">Chi tiết chuyến xe</div>

        <p><strong>Điểm đón:</strong> Nhà riêng</p>
        <p><strong>Điểm trả:</strong> Trường tiểu học ABC</p>
        <p><strong>Tài xế:</strong> Nguyễn Văn An</p>
        <p>
          <strong>SĐT tài xế:</strong>
          <a href="tel:+84901234567"> +84 901 234 567</a>
        </p>
        <p><strong>Biển số xe:</strong> 123-12345</p>
      </div>

      <div className="close-btn">
        <div className="relative cursor-pointer group" 
              onClick={onTracking}>
          <h1 className="red-text">X</h1>
        </div>
      </div>

    </div>
    
  );
};

export default Notifications;
