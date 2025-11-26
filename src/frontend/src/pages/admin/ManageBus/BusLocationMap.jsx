import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import io from "socket.io-client";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
const socket = io.connect("http://localhost:5000");
function MapUpdater({ buses }) {
  const map = useMap();

  useEffect(() => {
    if (buses && buses.length > 0) {
      if (buses.length === 1) {
        const bus = buses[0];
        if (bus.current_latitude && bus.current_longitude) {
          map.setView([bus.current_latitude, bus.current_longitude], 16);
        }
      } else {
        map.setView([10.762622, 106.660172], 12);
      }
    }
  }, [buses, map]);

  return null;
}

function BusLocationMap({ buses }) {
  const defaultCenter = [10.762622, 106.660172];
  const [liveLocations, setLiveLocations] = useState({});
  useEffect(() => {
    socket.on("receive_location", (data) => {
      setLiveLocations((prev) => ({
        ...prev,
        [data.bus_license]: data,
      }));
    });
    return () => socket.off("receive_location");
  }, []);
  const getPosition = (bus) => {
    const live = liveLocations[bus.license_plate];
    // Ưu tiên vị trí từ Socket, nếu không có thì dùng vị trí tĩnh từ DB
    return live
      ? [live.lat, live.lng]
      : [bus.current_latitude, bus.current_longitude];
  };

  const busCount = buses.length;
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-700">
        {busCount === 1
          ? `📍 Đang theo dõi xe: ${buses[0].license_plate}`
          : `🗺️ Bản đồ tổng quan (${buses.length} xe)`}
      </h3>

      <MapContainer
        center={defaultCenter}
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Vẽ các xe lên bản đồ */}
        {buses.map((bus) => {
          const [lat, lng] = getPosition(bus);
          return (
            lat &&
            lng && (
              <Marker key={bus.bus_id} position={[lat, lng]}>
                <Popup>
                  <b>Biển số: {bus.license_plate}</b>
                  <br />
                  <span
                    className={
                      liveLocations[bus.license_plate]
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {liveLocations[bus.license_plate]
                      ? "Đang trực tuyến"
                      : "Vị trí tĩnh"}
                  </span>
                </Popup>
              </Marker>
            )
          );
        })}
        {/* // Chỉ vẽ nếu xe có tọa độ
            bus.current_latitude &&
            bus.current_longitude && (
              <Marker
                key={bus.bus_id}
                position={[bus.current_latitude, bus.current_longitude]}
              >
                <Popup>
                  <b>Biển số: {bus.license_plate}</b>
                  <br />
                  Loại xe: {bus.model}
                  <br />
                  <span
                    className={
                      bus.status === "active"
                        ? "text-green-600"
                        : "text-gray-500"
                    }
                  >
                    {bus.status}
                  </span>
                </Popup>
              </Marker>
            )
        )} */}

        <MapUpdater buses={buses} />
      </MapContainer>
    </div>
  );
}

export default BusLocationMap;
