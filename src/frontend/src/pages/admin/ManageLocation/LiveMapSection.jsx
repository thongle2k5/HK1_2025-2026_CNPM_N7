// src/pages/admin/Dashboard/LiveMapSection.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import L from "leaflet";
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

export default function LiveMapSection() {
  const [buses, setBuses] = useState({});

  useEffect(() => {
    socket.on("receive_location", (data) => {
      setBuses((prev) => ({ ...prev, [data.bus_license]: data }));
    });
    return () => socket.off("receive_location");
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
          Bản đồ giám sát trực tuyến
        </h3>
        <span className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
          Đang hoạt động: {activeCount} xe
        </span>
      </div>

      <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200 relative z-0">
        <MapContainer
          center={[10.762622, 106.660172]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {Object.values(buses).map((bus) => (
            <Marker key={bus.bus_license} position={[bus.lat, bus.lng]}>
              <Popup>
                <div className="text-center">
                  <b className="text-blue-600">{bus.bus_license}</b> <br />
                  Tài xế ID: {bus.driver_id}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
