import React, { useEffect, useState } from "react";
import { Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import polyline from "@mapbox/polyline"; // Import thư viện giải mã

// API Key của bạn (Đăng ký tại openrouteservice.org)
const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjExOWEwNTA1NTQxNDRkNDM5MWI0MjBiZmRjN2NlMjAyIiwiaCI6Im11cm11cjY0In0=";

export default function RoutePolyline({ routeId }) {
  const [routePositions, setRoutePositions] = useState([]); // Tọa độ đường đi (bám đường)
  const [stops, setStops] = useState([]); // Tọa độ trạm dừng (để vẽ icon)

  useEffect(() => {
    if (!routeId) return;

    const fetchRouteData = async () => {
      try {
        // 1. Lấy danh sách trạm từ Backend của bạn
        const res = await fetch(
          `http://localhost:5000/api/route/${routeId}/stops/admin`
        );
        const stopData = await res.json();

        if (!stopData || stopData.length < 2) return;
        setStops(stopData);

        // 2. Chuẩn bị dữ liệu gửi lên OpenRouteService
        // Lưu ý: ORS yêu cầu thứ tự [Longitude, Latitude] (Ngược với Leaflet)
        const coordinates = stopData.map((stop) => [
          stop.longitude,
          stop.latitude,
        ]);

        // 3. Gọi API OpenRouteService để lấy đường đi thực tế
        const orsResponse = await fetch(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: ORS_API_KEY,
            },
            body: JSON.stringify({
              coordinates: coordinates,
              instructions: false, // Không cần chỉ đường chi tiết, chỉ cần hình vẽ
            }),
          }
        );

        const orsData = await orsResponse.json();

        // 4. Xử lý dữ liệu trả về để vẽ
        // ORS trả về GeoJSON, ta cần lấy coordinates của feature đầu tiên
        if (orsData.features && orsData.features.length > 0) {
          const geometry = orsData.features[0].geometry.coordinates;

          // Đảo ngược lại thành [Lat, Lng] để Leaflet hiểu
          const leafletPositions = geometry.map((coord) => [
            coord[1],
            coord[0],
          ]);

          setRoutePositions(leafletPositions);
        }
      } catch (err) {
        console.error("Lỗi vẽ tuyến đường:", err);
      }
    };

    fetchRouteData();
  }, [routeId]);

  if (routePositions.length === 0) return null;

  return (
    <>
      {/* 1. Vẽ đường bám theo mặt đất (Màu xanh đậm) */}
      <Polyline
        positions={routePositions}
        pathOptions={{
          color: "#2563EB",
          weight: 5,
          opacity: 0.8,
          lineJoin: "round",
        }}
      />

      {/* 2. Vẽ các Trạm dừng (Màu đỏ) */}
      {stops.map((stop, index) => (
        <Marker
          key={`stop-${index}`}
          position={[stop.latitude, stop.longitude]}
          icon={L.divIcon({
            className:
              "bg-white border-2 border-red-500 rounded-full font-bold text-xs flex items-center justify-center",
            html: `<span style="margin-top: 1px;">${stop.order}</span>`,
            iconSize: [24, 24],
          })}
        >
          <Popup>
            <b>Trạm số {stop.order}</b>
            <br />
            {stop.address}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
