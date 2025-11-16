// import { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";

// export default function MapView({ start, end }) {
//     useEffect(() => {
//         // Khởi tạo map
//         const map = L.map("map").setView([start.lat, start.lng], 14);

//         // Lớp nền bản đồ (OpenStreetMap)
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             maxZoom: 19,
//             attribution: "&copy; OpenStreetMap contributors",
//         }).addTo(map);

//         // Hiển thị marker
//         const startMarker = L.marker([start.lat, start.lng]).addTo(map);
//         const endMarker = L.marker([end.lat, end.lng]).addTo(map);

//         startMarker.bindPopup("Vị trí xe").openPopup();
//         endMarker.bindPopup("Điểm đón học sinh");

//         // Gọi API HeiGIT (OpenRouteService)
//         const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;

//         const fetchRoute = async () => {
//             try {
//                 const response = await axios.post(
//                     "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
//                     {
//                         coordinates: [
//                             [start.lng, start.lat],
//                             [end.lng, end.lat],
//                         ],
//                     },
//                     {
//                         headers: {
//                             Authorization: ORS_API_KEY,
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );
//                 // Vẽ tuyến đường
//                 const route = L.geoJSON(response.data, {
//                     style: { color: "blue", weight: 4 },
//                 }).addTo(map);

//                 // Fit map vào tuyến
//                 map.fitBounds(route.getBounds());
//             } catch (err) {
//                 console.error("❌ Lỗi lấy route từ HeiGIT:", err);
//             }
//         };

//         fetchRoute();

//         // Cleanup khi rời trang
//         return () => {
//             map.remove();
//         };
//     }, [start, end]);

//     return (
//         <div
//             id="map"
//             style={{ height: "400px", width: "100%", borderRadius: "10px" }}
//         ></div>
//     );
// }



import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ position }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        if (!position) return; // Nếu position chưa có thì không render

        if (!mapRef.current) {
            // Tạo map lần đầu
            mapRef.current = L.map("map", {
                center: [position.lat, position.lng],
                zoom: 15,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);

            markerRef.current = L.marker([position.lat, position.lng])
                .addTo(mapRef.current)
                .bindPopup("Vị trí xe")
                .openPopup();
        } else {
            // Cập nhật vị trí marker nếu position thay đổi
            markerRef.current.setLatLng([position.lat, position.lng]);
            mapRef.current.setView([position.lat, position.lng], mapRef.current.getZoom());
        }

        // Buộc map resize để tránh lỗi hiển thị
        setTimeout(() => mapRef.current.invalidateSize(), 0);
    }, [position]);

    return (
        <div
            id="map"
            style={{ height: "400px", width: "100%", borderRadius: "10px" }}
        ></div>
    );
}
