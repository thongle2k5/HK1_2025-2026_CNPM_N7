import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Quan trọng: import CSS của Leaflet

// Cần import hoặc định nghĩa lại icon mặc định của Leaflet
// Do React-Leaflet và webpack có thể không tìm thấy icon mặc định
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapDisplay = () => {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // 1. Lấy API Key từ Backend
        const response = await fetch(`${API_BASE_URL}/map/key`);
        const data = await response.json();

        if (data.error || !data.key) {
          throw new Error(data.error || "Không nhận được API Key từ Backend.");
        }

        setApiKey(data.key);
        setLoading(false); // Key đã được lấy, không cần loading nữa
      } catch (error) {
        console.error("Lỗi khi lấy OpenRouteService API Key:", error);
        setMapError(
          "Không thể tải bản đồ. Vui lòng kiểm tra console để biết chi tiết."
        );
        setLoading(false);
      }
    };

    fetchApiKey();
  }, []); // Chỉ chạy một lần khi component mount

  if (loading) {
    return (
      <div className="p-4 text-center text-blue-600 text-lg font-medium">
        Đang tải bản đồ...
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="p-4 text-center text-red-600 font-bold">{mapError}</div>
    );
  }

  // Khi đã có API Key, hiển thị bản đồ Leaflet
  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg shadow-xl overflow-hidden">
      {apiKey && ( // Chỉ render bản đồ khi có API Key
        <MapContainer
          center={[10.8231, 106.6297]} // Vị trí trung tâm ban đầu (TP.HCM)
          zoom={12}
          scrollWheelZoom={true} // Cho phép cuộn để zoom
          className="w-full h-full z-0" // z-0 để bản đồ nằm dưới các phần tử khác nếu có
        >
          {/* TileLayer định nghĩa nguồn của các "viên gạch" bản đồ */}
          {/* Chúng ta dùng OpenStreetMap mặc định */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // Nếu muốn dùng một tile server khác (ví dụ: của OpenRouteService nếu họ cung cấp)
            // url="https://tileserver.mem-server.de/tilegen/{z}/{x}/{y}.png" // Ví dụ
          />

          {/* Ví dụ một Marker */}
          <Marker position={[10.8231, 106.6297]}>
            <Popup>
              Đây là một địa điểm trên bản đồ Leaflet. <br /> (Data từ
              OpenStreetMap).
            </Popup>
          </Marker>

          {/* Bạn có thể thêm nhiều Marker, Polyline (đường đi) từ OpenRouteService ở đây */}
        </MapContainer>
      )}

      <p className="p-2 text-xs text-gray-500 bg-white border-t border-gray-200">
        * Key từ OpenRouteService đã được lấy thành công từ Backend:{" "}
        {apiKey.substring(0, 5)}...
      </p>
    </div>
  );
};

export default MapDisplay;
