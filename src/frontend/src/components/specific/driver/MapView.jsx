import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ position, routeId }) {
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
      markerRef.current.setLatLng([position.lat, position.lng]);
      mapRef.current.setView(
        [position.lat, position.lng],
        mapRef.current.getZoom()
      );
    }

    setTimeout(() => mapRef.current.invalidateSize(), 0);
  }, [position]);

  return (
    <div
      id="map"
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    ></div>
  );
}
