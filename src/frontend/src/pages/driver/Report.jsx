import { useState, useEffect } from "react";
import { MapPin, Send, AlertTriangle, Clock } from "lucide-react";

export default function Report() {
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Kẹt xe nhẹ",
      time: "06:50",
      location: "Nguyễn Văn Cừ, Q.5",
      status: "Đã gửi",
    },
  ]);

  // 🗓️ Lấy ngày hiện tại
  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !priority) {
      alert("⚠️ Vui lòng chọn loại cảnh báo và mức độ ưu tiên!");
      return;
    }

    const newReport = {
      id: reports.length + 1,
      type,
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: "273 An Dương Vương, Q.5",
      status: "Đã gửi",
    };

    setReports([newReport, ...reports]);
    setType("");
    setPriority("");
    setDescription("");
    alert("✅ Báo cáo đã được gửi thành công!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-blue-700">
          <AlertTriangle className="w-6 h-6 text-red-500" /> Báo cáo sự cố
        </h1>

        {/* Góc phải: tên tài xế & ngày */}
        <div className="text-right text-sm text-gray-600">
          <p>
            Tài xế: <strong>Nguyễn Văn T</strong>
          </p>
          <p className="text-gray-500 flex items-center justify-end gap-1">
            <Clock className="w-4 h-4 text-blue-500" /> {currentDate}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-6 items-start"
      >
        {/* Khối bên trái - Form báo cáo */}
        <div className="col-span-2 bg-white p-5 rounded-lg shadow space-y-5">
          {/* Vị trí */}
          <div className="bg-blue-50 border p-3 rounded-md flex items-center gap-2">
            <MapPin className="text-green-600" />
            <p className="text-sm text-gray-700">
              <strong>Vị trí hiện tại:</strong> 273 An Dương Vương, P.4, Q.5
            </p>
          </div>

          {/* Loại cảnh báo */}
          <div>
            <h2 className="font-semibold mb-2 text-gray-700">
              Chọn loại cảnh báo
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["Kẹt xe", "Xe bị hỏng", "Trễ giờ", "Sự cố học sinh", "Khác"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setType(item)}
                    className={`p-2 border rounded-md transition ${
                      type === item
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 hover:bg-blue-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mức độ ưu tiên */}
          <div>
            <h2 className="font-semibold mb-2 text-gray-700">Mức độ ưu tiên</h2>
            <div className="flex gap-3">
              {["Cao", "Trung bình", "Thấp"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPriority(lvl)}
                  className={`px-4 py-2 border rounded-full ${
                    priority === lvl
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

          {/* Mô tả */}
          <div>
            <h2 className="font-semibold mb-2 text-gray-700">Mô tả chi tiết</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả ngắn gọn sự cố..."
              className="w-full h-28 border rounded-md p-2 resize-none focus:outline-blue-400"
            />
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700"
          >
            <Send className="w-4 h-4" /> Gửi cảnh báo
          </button>
        </div>

        {/* Khối bên phải - Lịch sử báo cáo */}
        <div className="bg-white p-5 rounded-lg shadow">
          <h2 className="font-semibold text-gray-800 mb-4">
            Lịch sử báo cáo gần đây
          </h2>
          {reports.length > 0 ? (
            <ul className="space-y-3">
              {reports.map((r) => (
                <li
                  key={r.id}
                  className="border-l-4 border-red-500 bg-red-50 p-3 rounded shadow-sm"
                >
                  <p className="font-medium text-red-700 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {r.type}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {r.time} | {r.location}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              Chưa có báo cáo nào được gửi.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
