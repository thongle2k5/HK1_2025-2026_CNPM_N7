import { useState, useEffect, useRef } from "react";
import {
  CalendarDays,
  Users,
  MapPin,
  AlertTriangle,
  Radio,
  Play,
  Square,
} from "lucide-react";
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
      // Gọi API Backend mới tạo
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
        // Bắt đầu chạy
        setIsTracking(true);
        setCurrentSchedule((prev) => ({ ...prev, status: "in progress" }));
        // (Có thể bắn socket 'start_trip' ở đây nếu muốn thông báo cho phụ huynh ngay)
      } else {
        // Kết thúc chuyến
        setIsTracking(false);
        setCurrentSchedule(null); // Ẩn lịch trình đi vì đã xong
        alert("🎉 Chuyến đi đã hoàn thành! Cảm ơn tài xế.");
        // (Có thể reload trang hoặc fetch lại lịch mới)
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

          {/* SỬ DỤNG 1 NÚT DUY NHẤT (Thay đổi style và text) */}
          <button
            onClick={handleTripAction}
            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg
              ${
                isTracking
                  ? "bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-200" // Style KẾT THÚC
                  : "bg-green-600 hover:bg-green-700 text-white ring-4 ring-green-200" // Style BẮT ĐẦU
              }
            `}
          >
            {isTracking ? (
              <>
                <Square fill="currentColor" /> KẾT THÚC CHUYẾN
              </>
            ) : (
              <>
                <Play fill="currentColor" /> BẮT ĐẦU CHẠY
              </>
            )}
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
// import { useState, useEffect } from "react";
// import { MapPin, Radio, Play, Square } from "lucide-react"; // Thêm icon Play/Stop
// import DriverHeader from "./components/Header";
// import io from "socket.io-client";
// import { getUserFromToken } from "../../utils/auth";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import RoutePolyline from "../../components/Map/RoutePolyline";

// // Fix lỗi icon Leaflet
// import iconMarker from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// let DefaultIcon = L.icon({
//   iconUrl: iconMarker,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// const socket = io.connect("http://localhost:5000");

// export default function Home() {
//   const [currentPos, setCurrentPos] = useState(null);
//   const [currentSchedule, setCurrentSchedule] = useState(null); // Lưu lịch trình hiện tại
//   const [isTracking, setIsTracking] = useState(false); // Trạng thái có đang gửi GPS không
//   const [loading, setLoading] = useState(true);

//   const driver = getUserFromToken();

//   useEffect(() => {
//     const checkSchedule = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/schedules/current/${driver.driverId}`
//         );
//         const data = await res.json();

//         if (data.found) {
//           setCurrentSchedule(data.schedule);
//           // Nếu trạng thái là 'in progress' (đang chạy) -> Tự động bật Tracking luôn
//           if (data.schedule.status === "in progress") {
//             setIsTracking(true);
//           }
//         }
//       } catch (err) {
//         console.error("Lỗi lấy lịch:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkSchedule();
//   }, [driver]);

//   // 2. XỬ LÝ TRACKING (Chỉ chạy khi isTracking = true)
//   useEffect(() => {
//     if (!isTracking || !currentSchedule) return;

//     const sendLocation = (lat, lng) => {
//       socket.emit("send_location", {
//         driver_id: driver.driverId,
//         bus_license: currentSchedule.bus_license || "UNKNOWN", // Lấy biển số từ lịch
//         lat,
//         lng,
//         status: "active",
//         timestamp: new Date().toISOString(),
//       });
//     };

//     let watchId = null;
//     if (navigator.geolocation) {
//       watchId = navigator.geolocation.watchPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setCurrentPos({ lat: latitude, lng: longitude });
//           sendLocation(latitude, longitude);
//         },
//         (err) => console.error("GPS Error:", err),
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     }

//     return () => {
//       if (watchId) navigator.geolocation.clearWatch(watchId);
//     };
//   }, [isTracking, driver.driverId, currentSchedule]);

//   // 3. HÀM BẮT ĐẦU / KẾT THÚC CHUYẾN
//   const handleTripAction = async (action) => {
//     if (!currentSchedule) return;

//     const newStatus = action === "start" ? "in progress" : "completed";

//     try {
//       // Gọi API cập nhật trạng thái lịch trình
//       await fetch(
//         `http://localhost:5000/api/schedules/${currentSchedule.schedule_id}/status`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       // Cập nhật State
//       if (action === "start") {
//         setIsTracking(true);
//         setCurrentSchedule((prev) => ({ ...prev, status: "in progress" }));
//       } else {
//         setIsTracking(false);
//         setCurrentSchedule(null); // Xóa lịch khỏi màn hình vì đã xong
//         alert("Chuyến đi đã hoàn thành!");
//       }
//     } catch (err) {
//       alert("Lỗi cập nhật trạng thái: " + err.message);
//     }
//   };

//   if (loading)
//     return <div className="p-6 text-center">Đang kiểm tra lịch trình...</div>;

//   return (
//     <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
//       <DriverHeader />

//       {/* --- KHỐI ĐIỀU KHIỂN CHUYẾN XE --- */}
//       {currentSchedule ? (
//         <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
//           <h2 className="text-xl font-bold text-gray-800 mb-2">
//             📅 Lịch trình hôm nay
//           </h2>
//           <div className="mb-4 text-gray-600">
//             <p>
//               <strong>Tuyến:</strong>{" "}
//               {currentSchedule.route_name ||
//                 `Tuyến ${currentSchedule.route_id}`}
//             </p>
//             <p>
//               <strong>Thời gian:</strong> {currentSchedule.start_time} -{" "}
//               {currentSchedule.end_time}
//             </p>
//             <p>
//               <strong>Xe:</strong>{" "}
//               {currentSchedule.bus_license || "Chưa gán xe"}
//             </p>
//           </div>

//           {/* Nút bấm Bắt đầu / Kết thúc */}
//           <div className="flex gap-4">
//             {!isTracking ? (
//               <button
//                 onClick={() => handleTripAction("start")}
//                 className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition"
//               >
//                 <Play fill="currentColor" /> BẮT ĐẦU CHẠY
//               </button>
//             ) : (
//               <button
//                 onClick={() => handleTripAction("stop")}
//                 className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition"
//               >
//                 <Square fill="currentColor" /> KẾT THÚC CHUYẾN
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center text-yellow-800">
//           Hiện tại bạn không có lịch trình nào cần chạy.
//         </div>
//       )}

//       {/* --- BẢN ĐỒ (Chỉ hiện khi đang chạy hoặc chuẩn bị chạy) --- */}
//       {currentSchedule && (
//         <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
//           <div className="flex justify-between items-center mb-3">
//             <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
//               <MapPin className="w-5 h-5 text-blue-500" /> Bản đồ dẫn đường
//             </h2>
//             {isTracking && (
//               <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
//                 <Radio size={14} /> LIVE
//               </span>
//             )}
//           </div>

//           <div className="rounded-lg overflow-hidden border border-gray-200 h-[400px]">
//             {/* Nếu chưa có GPS thì hiện Loading, có rồi thì hiện Map */}
//             {currentPos || !isTracking ? (
//               <MapContainer
//                 center={
//                   currentPos
//                     ? [currentPos.lat, currentPos.lng]
//                     : [10.762622, 106.660172]
//                 }
//                 zoom={15}
//                 style={{ height: "100%", width: "100%" }}
//               >
//                 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//                 {/* Vị trí xe (Chỉ hiện khi đã lấy được GPS) */}
//                 {currentPos && (
//                   <Marker position={[currentPos.lat, currentPos.lng]}>
//                     <Popup>Vị trí của bạn</Popup>
//                   </Marker>
//                 )}

//                 {/* Tuyến đường cần đi (Luôn hiện để tài xế biết đường) */}
//                 <RoutePolyline routeId={currentSchedule.route_id} />
//               </MapContainer>
//             ) : (
//               <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400">
//                 Đang lấy tín hiệu GPS...
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
