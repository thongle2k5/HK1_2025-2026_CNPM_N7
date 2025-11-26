import { useState, useEffect, useRef } from "react";
import {
  CalendarDays,
  Users,
  MapPin,
  AlertTriangle,
  Radio,
} from "lucide-react";
import MapView from "../../components/specific/driver/MapView";
import DriverHeader from "./components/Header";
import io from "socket.io-client";
import { getUserFromToken } from "../../utils/auth";
const socket = io.connect("http://localhost:5000");

export default function Home() {
  const [currentPos, setCurrentPos] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const driver = getUserFromToken();
  const busInfo = {
    license_plate: "51B-12345", // Biển số xe tài xế đang lái
    route_id: 1,
  };

  useEffect(() => {
    const sendLocation = (latitude, longitude) => {
      const locationData = {
        driver_id: driver.driverId,
        bus_license: busInfo.license_plate,
        lat: latitude,
        lng: longitude,
        status: "active",
        timestamp: new Date().toISOString(),
      };

      console.log("📍 Đang gửi vị trí:", locationData);
      socket.emit("send_location", locationData);
    };

    let watchId = null;

    if (navigator.geolocation) {
      // Bắt đầu theo dõi vị trí
      // watchPosition tự động chạy mỗi khi thiết bị di chuyển
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          // 1. Cập nhật giao diện Tài xế (để họ biết map đang chạy)
          setCurrentPos({ lat: latitude, lng: longitude });
          setIsTracking(true);

          // 2. Gửi dữ liệu đi
          sendLocation(latitude, longitude);
        },
        (err) => {
          console.error("Lỗi GPS:", err);
          setIsTracking(false);
          // Fallback: Nếu lỗi (do test trên PC không có GPS), gán vị trí mặc định ĐH Sài Gòn
          // setCurrentPos({ lat: 10.762622, lng: 106.660172 });
        },
        {
          enableHighAccuracy: true, // Cần độ chính xác cao
          timeout: 5000, // Thử lại sau 5s nếu lỗi
          maximumAge: 0, // Không dùng cache vị trí cũ
        }
      );
    } else {
      alert("Trình duyệt này không hỗ trợ GPS!");
    }

    // Dọn dẹp khi thoát trang (Tắt GPS để tiết kiệm pin)
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      // socket.disconnect(); // (Tùy chọn)
    };
  }, [driver]);

  // Dữ liệu giả lập thống kê (Giữ nguyên code cũ của bạn)
  const driverInfo = {
    name: "Tài xế",
    route: "Tuyến 1 - Quận 1/Bình Thạnh",
    pickedUp: 10,
    remaining: 5,
    alerts: [],
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <DriverHeader driverName={driver.name} />

      {/* Thanh trạng thái Tracking */}
      <div
        className={`p-3 rounded-lg flex items-center justify-center gap-2 font-bold text-white shadow-md transition-colors duration-500 ${
          isTracking ? "bg-green-500" : "bg-red-400"
        }`}
      >
        <Radio className={`w-5 h-5 ${isTracking ? "animate-pulse" : ""}`} />
        {isTracking ? "ĐANG PHÁT TÍN HIỆU VỊ TRÍ..." : "ĐANG DÒ TÌM GPS..."}
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center gap-3 shadow-sm">
          <CalendarDays className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Tuyến hôm nay</p>
            <p className="text-sm font-bold text-blue-700 truncate w-32">
              {driverInfo.route}
            </p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3 shadow-sm">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Đã đón</p>
            <p className="text-xl font-bold text-green-700">
              {driverInfo.pickedUp}
            </p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center gap-3 shadow-sm">
          <Users className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-sm text-gray-600">Chưa đón</p>
            <p className="text-xl font-bold text-yellow-700">
              {driverInfo.remaining}
            </p>
          </div>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <MapPin className="w-5 h-5 text-blue-500" /> Vị trí xe hiện tại
        </h2>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          {currentPos ? (
            <MapView position={currentPos} />
          ) : (
            <div className="h-[300px] flex items-center justify-center bg-gray-50 text-gray-400 animate-pulse">
              Đang lấy tọa độ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
