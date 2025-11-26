import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet";
import RoutePolyline from "../../../components/Map/RoutePolyline"; // Component vẽ đường

// Fix lỗi icon Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const socket = io.connect("http://localhost:5000");

// Các tuyến đường cần vẽ (Lấy ví dụ tuyến 1 và 2)
const ACTIVE_ROUTES = [1, 2];

export default function LiveMapSection() {
  const [buses, setBuses] = useState({});
  const [loading, setLoading] = useState(true);
  const busesRef = useRef({});
  // 1. Lấy dữ liệu xe ban đầu từ API (Để bản đồ không bị trống lúc đầu)
  useEffect(() => {
    const fetchInitialLocations = async () => {
      try {
        // Gọi API lấy danh sách xe (có chứa tọa độ mới nhất)
        const res = await fetch("http://localhost:5000/api/buses");
        if (res.ok) {
          const data = await res.json();

          // Chuyển đổi array thành object để dễ cập nhật theo socket
          const initialMap = {};
          data.forEach((bus) => {
            // Chỉ lấy xe nào đã từng có vị trí
            if (bus.current_latitude && bus.current_longitude) {
              initialMap[bus.license_plate] = {
                bus_license: bus.license_plate,
                driver_id: bus.driver_id || "Chưa rõ",
                // Lưu ý: DB dùng key khác Socket, cần map lại cho chuẩn
                lat: bus.current_latitude,
                lng: bus.current_longitude,
                isLive: false, // Đánh dấu là dữ liệu cũ
                status: bus.status,
              };
            }
          });

          // Cập nhật ngay lập tức
          busesRef.current = initialMap;
          setBuses(initialMap);
        }
      } catch (err) {
        console.error("Lỗi tải vị trí ban đầu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLocations();
  }, []);
  useEffect(() => {
    // Hàm xử lý tin nhắn socket
    const handleSocketData = (data) => {
      // Cập nhật vào Ref (Không gây render lại trang)
      busesRef.current = {
        ...busesRef.current,
        [data.bus_license]: {
          ...busesRef.current[data.bus_license], // Giữ thông tin cũ
          bus_license: data.bus_license,
          lat: data.lat,
          lng: data.lng,
          driver_id: data.driver_id,
          isLive: true,
        },
      };
    };
    socket.on("bus_offline", (data) => {
      console.log("Xe Offline:", data.bus_license);

      setBuses((prev) => {
        const currentBus = prev[data.bus_license];
        if (!currentBus) return prev; // Nếu không tìm thấy xe thì thôi

        return {
          ...prev,
          [data.bus_license]: {
            ...currentBus,
            isLive: false, // <--- Nguyên lý: Chuyển về trạng thái tĩnh (Xám)
          },
        };
      });
    });
    // Lắng nghe
    socket.on("receive_location", handleSocketData);

    // Bộ đếm nhịp (Throttling): Cập nhật giao diện mỗi 1 giây
    const interval = setInterval(() => {
      setBuses({ ...busesRef.current }); // Copy từ Ref sang State để vẽ lại map
    }, 1000);

    // Dọn dẹp
    return () => {
      socket.off("receive_location", handleSocketData);
      socket.off("bus_offline");
      clearInterval(interval);
    };
  }, []);

  const activeCount = Object.keys(buses).length;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Giám sát trực tuyến
        </h3>
        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          Hiển thị: {activeCount} xe
        </span>
      </div>

      <div className="h-[500px] rounded-lg overflow-hidden border border-gray-200 relative z-0">
        {loading ? (
          <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400">
            Đang tải bản đồ...
          </div>
        ) : (
          <MapContainer
            center={[10.762622, 106.660172]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Vẽ Tuyến đường */}
            {ACTIVE_ROUTES.map((routeId) => (
              <RoutePolyline key={routeId} routeId={routeId} />
            ))}

            {/* Vẽ Xe */}
            {Object.values(buses).map((bus) => (
              <Marker key={bus.bus_license} position={[bus.lat, bus.lng]}>
                <Popup>
                  <div className="text-center p-2">
                    <strong className="text-blue-600 text-lg">
                      🚌 {bus.bus_license}
                    </strong>
                    <div className="text-sm text-gray-600 mt-1">
                      Tài xế ID: <b>{bus.driver_id}</b>
                    </div>
                    <div
                      className={`text-xs mt-2 font-bold ${
                        bus.isLive ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {bus.isLive ? "● Đang di chuyển" : "○ Vị trí cuối cùng"}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
