// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import RoutePolyline from "../../Map/RoutePolyline";
// export default function MapView({ position, routeId }) {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (!position) return; // Nếu position chưa có thì không render

//     if (!mapRef.current) {
//       // Tạo map lần đầu
//       mapRef.current = L.map("map", {
//         center: [position.lat, position.lng],
//         zoom: 15,
//       });

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 19,
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(mapRef.current);

//       markerRef.current = L.marker([position.lat, position.lng])
//         .addTo(mapRef.current)
//         .bindPopup("Vị trí xe")
//         .openPopup();
//     } else {
//       markerRef.current.setLatLng([position.lat, position.lng]);
//       mapRef.current.setView(
//         [position.lat, position.lng],
//         mapRef.current.getZoom()
//       );
//     }

//     setTimeout(() => mapRef.current.invalidateSize(), 0);
//   }, [position]);

//   return (
//     <div
//       id="map"
//       style={{ height: "400px", width: "100%", borderRadius: "10px" }}
//     ></div>
//   );
// }
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import RoutePolyline from "../../Map/RoutePolyline_driver";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function AutoCenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
}

export default function MapView({ position, routeId }) {
  if (!position)
    return <div className="h-full bg-gray-100 animate-pulse"></div>;

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={15}
      style={{ height: "100%", width: "100%", borderRadius: "10px" }}
    >
      {/* Lớp nền bản đồ */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Marker vị trí xe */}
      <Marker position={[position.lat, position.lng]}>
        <Popup>Vị trí xe</Popup>
      </Marker>

      {/* TỰ ĐỘNG VẼ ĐƯỜNG NẾU CÓ routeId */}
      {routeId && <RoutePolyline routeId={routeId} currentPos={position} />}

      {/* Tự động di chuyển map */}
      <AutoCenterMap position={position} />
    </MapContainer>
  );
}
