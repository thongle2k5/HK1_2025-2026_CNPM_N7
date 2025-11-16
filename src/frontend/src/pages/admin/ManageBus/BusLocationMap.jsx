// // src/pages/admin/ManageBus/BusLocationMap.jsx
// import React from "react";

// export default function BusLocationMap({ busId }) {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <h2 className="text-lg font-semibold text-gray-800">
//         Vị trí xe buýt hiện tại
//       </h2>

//       {/* Vùng bản đồ */}
//       <div className="h-96 bg-gray-200 mt-2 rounded-md flex items-center justify-center">
//         {busId ? (
//           <p className="text-gray-700">
//             Đang hiển thị bản đồ cho xe buýt ID:{" "}
//             <span className="font-bold">{busId}</span>
//             {/* Đây là nơi bạn sẽ tích hợp component bản đồ (vd: GoogleMapReact) */}
//           </p>
//         ) : (
//           <p className="text-gray-500">
//             Nhấn vào một xe buýt trong bảng để xem vị trí.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import iconMarker2x from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconMarker2x,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});
function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}
function BusLocationMap({ position, busInfo }) {
  if (!position || !position[0] || !position[1]) {
    return (
      <div
        style={{
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          color: "#888",
        }}
      >
        Nhấn vào một xe buýt trong bảng để xem vị trí.
      </div>
    );
  }
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white ">
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <b>Biển số: {busInfo.license_plate}</b>
            <br />
            Loại xe: {busInfo.model}
          </Popup>
        </Marker>
        <ChangeMapView coords={position} />
      </MapContainer>
    </div>
  );
}
export default BusLocationMap;
