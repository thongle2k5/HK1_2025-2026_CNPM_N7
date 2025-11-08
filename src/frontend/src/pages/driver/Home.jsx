import { useState, useEffect } from "react";
import { CalendarDays, Users, MapPin, AlertTriangle } from "lucide-react";
import MapView from "../../components/specific/driver/MapView";
import DriverHeader from "./components/Header";

export default function Home() {
  const [currentPos, setCurrentPos] = useState(null);

  // Lấy vị trí hiện tại
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentPos({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Không thể lấy vị trí GPS:", err);
          setCurrentPos({ lat: 10.762622, lng: 106.660172 }); // vị trí mặc định
        }
      );
    } else {
      console.error("Trình duyệt không hỗ trợ Geolocation");
      setCurrentPos({ lat: 10.762622, lng: 106.660172 });
    }
  }, []);

  const driverInfo = {
    name: "Nguyễn Văn T",
    route: "Tuyến 12A",
    date: "24/10/2025",
    totalStudents: 15,
    pickedUp: 10,
    remaining: 5,
    alerts: [
      { id: 1, type: "Kẹt xe nhẹ", time: "06:50", location: "Nguyễn Văn Cừ, Q.5" },
    ],
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header chung */}
      <DriverHeader driverName={driverInfo.name} />

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Tuyến hôm nay</p>
            <p className="text-lg font-semibold text-blue-700">{driverInfo.route}</p>
          </div>
        </div>

        <div className="bg-green-100 p-4 rounded-lg flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Đã đón</p>
            <p className="text-lg font-semibold text-green-700">{driverInfo.pickedUp}</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg flex items-center gap-3">
          <Users className="w-8 h-8 text-yellow-600" />
          <div>
            <p className="text-sm text-gray-600">Chưa đón</p>
            <p className="text-lg font-semibold text-yellow-700">{driverInfo.remaining}</p>
          </div>
        </div>
      </div>

      {/* Bản đồ */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" /> Vị trí xe hiện tại
        </h2>
        {currentPos ? <MapView position={currentPos} /> : <p>Đang xác định vị trí...</p>}
      </div>

      {/* Cảnh báo gần nhất */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" /> Cảnh báo gần nhất
        </h2>
        {driverInfo.alerts.length > 0 ? (
          <ul className="space-y-2">
            {driverInfo.alerts.map((a) => (
              <li
                key={a.id}
                className="flex justify-between items-center bg-red-50 border-l-4 border-red-500 p-3 rounded"
              >
                <div>
                  <p className="font-medium text-red-700">{a.type}</p>
                  <p className="text-sm text-gray-600">
                    {a.time} - {a.location}
                  </p>
                </div>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Xem chi tiết
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Không có cảnh báo nào.</p>
        )}
      </div>
    </div>
  );
}
