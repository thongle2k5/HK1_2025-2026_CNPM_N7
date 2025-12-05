import { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  MapPin,
  AlertTriangle,
  Radio,
  Play,
  Square,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RoutePolyline from "../../components/Map/RoutePolyline";
import MapView from "../../components/specific/driver/MapView";
import DriverHeader from "./components/Header";
import io from "socket.io-client";
import { getUserFromToken } from "../../utils/auth";
const socket = io.connect("http://localhost:5000");

export default function Home() {
  const [currentPos, setCurrentPos] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const driver = getUserFromToken();
  useEffect(() => {
    const checkSchedule = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/schedules/current/${driver.driverId}`
        );
        const data = await res.json();

        if (data.found) {
          setCurrentSchedule(data.schedule);
          if (data.schedule.status === "in progress") {
            setIsTracking(true);
          }
        }
      } catch (err) {
        console.error("Lỗi lấy lịch:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSchedule();
  }, [driver]);
  useEffect(() => {
    let watchId = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          setCurrentPos({ lat: latitude, lng: longitude });

          if (isTracking && currentSchedule) {
            const locationData = {
              driver_id: driver.driverId,
              bus_license: currentSchedule.license_plate || "UNKNOWN",
              lat: latitude,
              lng: longitude,
              status: "active",
              timestamp: new Date().toISOString(),
            };
            socket.emit("send_location", locationData);
          }
        },
        (err) => {
          console.error("Lỗi GPS:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Trình duyệt này không hỗ trợ GPS!");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isTracking, currentSchedule, driver]);

  const driverInfo = {
    name: "Tài xế",
    route: "Tuyến 1 - Quận 1/Bình Thạnh",
    pickedUp: 10,
    remaining: 5,
    alerts: [],
  };
  if (loading)
    return <div className="p-6 text-center">Đang kiểm tra lịch trình...</div>;
  const handleTripAction = async () => {
    if (!currentSchedule) return;

    const action = isTracking ? "stop" : "start";
    const newStatus = action === "start" ? "in progress" : "completed";

    try {
      const res = await fetch(
        `http://localhost:5000/api/schedules/${currentSchedule.schedule_id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Lỗi cập nhật trạng thái");

      if (action === "start") {
        setIsTracking(true);
        setCurrentSchedule((prev) => ({ ...prev, status: "in progress" }));
      } else {
        setIsTracking(false);
        setCurrentSchedule(null);
        alert("🎉 Chuyến đi đã hoàn thành! Cảm ơn tài xế.");
      }
    } catch (err) {
      alert("Lỗi: " + err.message);
    }
  };
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <DriverHeader driverName={driver.name} />

      {currentSchedule ? (
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            📅 Lịch trình hôm nay
          </h2>
          <div className="mb-4 text-gray-600">
            <p>
              <strong>Tuyến:</strong> {currentSchedule.route_name}
            </p>
            <p>
              <strong>Thời gian:</strong> {currentSchedule.start_time} -{" "}
              {currentSchedule.end_time}
            </p>
          </div>

          <button
            onClick={() => handleTripAction(isTracking ? "stop" : "start")}
            className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition text-white shadow-lg
      ${
        isTracking
          ? "bg-red-600 hover:bg-red-700 ring-4 ring-red-100"
          : "bg-green-600 hover:bg-green-700 ring-4 ring-green-100"
      }
    `}
          >
            {isTracking ? (
              <Square fill="currentColor" size={20} />
            ) : (
              <Play fill="currentColor" size={20} />
            )}

            {isTracking ? "KẾT THÚC CHUYẾN" : "BẮT ĐẦU CHẠY"}
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center text-yellow-800 font-medium">
          😴 Hiện tại bạn không có lịch trình nào.
        </div>
      )}

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
        <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200">
          {currentPos ? (
            <MapView
              position={currentPos}
              routeId={currentSchedule?.route_id}
            />
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
