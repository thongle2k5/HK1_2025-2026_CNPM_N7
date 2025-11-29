import { useState, useEffect } from "react";
import { MapPin, Send, AlertTriangle, Clock } from "lucide-react";
import DriverHeader from "./components/Header";

export default function Report() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const driverId = user.driverId || user.id || user.userId || user.user_id;
  const driverName = user.name || user.username || "Tài xế";

  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState([]);

  const [position] = useState({
    lat: 10.762622,
    lng: 106.68266,
    address: "Đại học Sài Gòn, TP. Hồ Chí Minh",
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/report/driver/${driverId}`);
        if (res.ok) {
          const data = await res.json();
          setReports(data);
        }
      } catch (err) {
        console.error("Lỗi tải lịch sử:", err);
      }
    };
    fetchHistory();
  }, [driverId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !priority) {
      alert("Vui lòng chọn loại cảnh báo và mức độ ưu tiên!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/report/post/${driverId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driver_id: driverId,
          type,
          priority,
          description,
          location: position.address,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Lỗi server");

      // Thêm báo cáo mới vào đầu danh sách
      const newReport = {
        id: data.notif_id || Date.now(),
        type: type,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        location: position.address,
        status: "Đã gửi",
      };

      setReports([newReport, ...reports]);
      setType("");
      setPriority("");
      setDescription("");
      alert("✅ Báo cáo đã được gửi thành công!");
    } catch (error) {
      alert("❌ Gửi báo cáo thất bại: " + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <DriverHeader driverName={driverName} />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-blue-700">
          <AlertTriangle className="w-6 h-6 text-red-500" /> Báo cáo sự cố
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 items-start">
          {/* Form bên trái */}
          <div className="col-span-2 bg-white p-5 rounded-lg shadow space-y-5">
            <div className="bg-blue-50 border p-3 rounded-md flex items-center gap-2">
              <MapPin className="text-green-600" />
              <p className="text-sm text-gray-700">
                <strong>Vị trí hiện tại:</strong> {position.address}
              </p>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Chọn loại cảnh báo</h2>
              <div className="grid grid-cols-2 gap-3">
                {["Kẹt xe", "Xe bị hỏng", "Trễ giờ", "Sự cố học sinh", "Khác"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setType(item)}
                    className={`p-2 border rounded-md transition ${type === item
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 hover:bg-blue-100"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Mức độ ưu tiên</h2>
              <div className="flex gap-3">
                {["Cao", "Trung bình", "Thấp"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPriority(lvl)}
                    className={`px-4 py-2 border rounded-full ${priority === lvl
                      ? lvl === "Cao"
                        ? "bg-red-500 text-white"
                        : "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                      }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-2 text-gray-700">Mô tả chi tiết</h2>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả ngắn gọn sự cố..."
                className="w-full h-28 border rounded-md p-2 resize-none focus:outline-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700"
            >
              <Send className="w-4 h-4" /> Gửi cảnh báo
            </button>
          </div>

          {/* Lịch sử bên phải */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="font-semibold text-gray-800 mb-4">
              Lịch sử báo cáo gần đây
            </h2>
            {reports.length > 0 ? (
              <ul className="space-y-3">
                {reports.map((r) => (
                  <li
                    key={r.id || r.report_id}
                    className="border-l-4 border-red-500 bg-red-50 p-3 rounded shadow-sm"
                  >
                    <p className="font-medium text-red-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {r.type || r.title}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />{" "}
                      {r.time || (r.created_at ? new Date(r.created_at).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "N/A")} |{" "}
                      {r.location || r.address || "Chưa xác định"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Chưa có báo cáo nào được gửi.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}