import { useState, useEffect } from "react";
import { Search, MapPin, ChevronLeft, ChevronRight, User } from "lucide-react";
import DriverHeader from "./components/Header";
import { getUserFromToken } from "../../utils/auth"; // Hàm lấy token của bạn

export default function StudentList() {
  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const driver = getUserFromToken();

  // 1. LẤY LỊCH TRÌNH HIỆN TẠI & DANH SÁCH HỌC SINH
  useEffect(() => {
    const fetchData = async () => {
      if (!driver?.driverId) return;

      try {
        // Bước A: Tìm lịch trình hiện tại của tài xế
        const resSchedule = await fetch(
          `http://localhost:5000/api/studentsList/current/${driver.driverId}`
        );
        const dataSchedule = await resSchedule.json();

        if (dataSchedule.found) {
          const schedule = dataSchedule.schedule;
          setCurrentSchedule(schedule);

          // Bước B: Nếu có lịch, lấy danh sách học sinh của lịch đó
          const resStudents = await fetch(
            `http://localhost:5000/api/studentsList/${schedule.schedule_id}/students`
          );
          const dataStudents = await resStudents.json();
          setStudents(dataStudents);
        } else {
          setStudents([]); // Không có lịch thì không có học sinh
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driver]);

  // 2. HÀM CẬP NHẬT TRẠNG THÁI (GỌI API)
  const updateStatus = async (studentId, newStatusDB) => {
    if (!currentSchedule) return;

    try {
      // Gọi API update Backend
      const res = await fetch(
        `http://localhost:5000/api/studentsList/${currentSchedule.schedule_id}/students/${studentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatusDB }),
        }
      );

      if (res.ok) {
        // Update Client State ngay lập tức để không phải reload
        setStudents((prev) =>
          prev.map((s) =>
            s.student_id === studentId ? { ...s, status: newStatusDB } : s
          )
        );
      } else {
        alert("Lỗi cập nhật trạng thái!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // 3. MAP TRẠNG THÁI DB (English) -> UI (Tiếng Việt)
  const mapStatusToVN = (status) => {
    switch (status) {
      case "waiting":
        return "Chưa đón";
      case "boarded":
        return "Đã lên xe";
      case "dropped_off":
        return "Đã trả";
      case "missed":
        return "Vắng mặt";
      default:
        return "Khác";
    }
  };

  const mapStatusToColor = (status) => {
    switch (status) {
      case "boarded":
        return "bg-green-100 text-green-700";
      case "waiting":
        return "bg-yellow-100 text-yellow-700";
      case "dropped_off":
        return "bg-blue-100 text-blue-700";
      case "missed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 4. XỬ LÝ LỌC VÀ TÌM KIẾM
  const filteredStudents = students
    .filter((s) => {
      if (filter === "Tất cả") return true;
      // Map filter tiếng Việt về status DB để so sánh
      if (filter === "Chưa đón") return s.status === "waiting";
      if (filter === "Đã lên xe") return s.status === "boarded";
      if (filter === "Đã trả") return s.status === "dropped_off";
      return true;
    })
    .filter((s) =>
      s.student_name?.toLowerCase().includes(search.trim().toLowerCase())
    );

  // Phân trang
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading)
    return <div className="p-6 text-center">⏳ Đang tải danh sách...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <DriverHeader driverName={driver?.name || "Tài xế"} />

      {/* Thông báo nếu không có chuyến */}
      {!currentSchedule ? (
        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 text-center text-yellow-800">
          🚧 Bạn chưa bắt đầu chuyến đi nào. Hãy quay lại trang chủ để nhận
          lịch.
        </div>
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
            <h2 className="font-bold text-gray-800">
              🚌 Chuyến hiện tại: {currentSchedule.route_name}
            </h2>
            <p className="text-sm text-gray-500">
              Học sinh cần đón: {students.length}
            </p>
          </div>

          {/* Bộ lọc */}
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex gap-3 w-full md:w-auto">
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md p-2 text-sm bg-white"
              >
                <option>Tất cả</option>
                <option>Chưa đón</option>
                <option>Đã lên xe</option>
                <option>Đã trả</option>
              </select>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm tên học sinh..."
                  className="border rounded-md pl-8 p-2 text-sm w-full"
                />
              </div>
            </div>
            <button
              onClick={() => {
                setFilter("Tất cả");
                setSearch("");
              }}
              className="bg-gray-200 px-3 py-2 rounded text-sm hover:bg-gray-300"
            >
              Reset
            </button>
          </div>

          {/* Bảng danh sách */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="p-3 border">STT</th>
                  <th className="p-3 border">Học sinh</th>
                  <th className="p-3 border">Điểm đón</th>
                  <th className="p-3 border text-center">Trạng thái</th>
                  <th className="p-3 border text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      Không tìm thấy học sinh.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((s, idx) => (
                    <tr key={s.student_id} className="hover:bg-gray-50">
                      <td className="p-3 text-center border-r">
                        {startIndex + idx + 1}
                      </td>

                      <td className="p-3 border-r">
                        <div className="font-bold text-gray-800">
                          {s.student_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Lớp: {s.class}
                        </div>
                      </td>

                      <td className="p-3 border-r">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                          <span>
                            {s.stop_name} <br />{" "}
                            <span className="text-xs text-gray-400">
                              {s.address}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="p-3 text-center border-r">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${mapStatusToColor(
                            s.status
                          )}`}
                        >
                          {mapStatusToVN(s.status)}
                        </span>
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          {/* Nút logic: Nếu đang 'waiting' -> Hiện nút Đón. Nếu 'boarded' -> Hiện nút Trả */}

                          {s.status === "waiting" && (
                            <button
                              onClick={() =>
                                updateStatus(s.student_id, "boarded")
                              }
                              className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 text-xs shadow-sm transition"
                            >
                              Lên xe
                            </button>
                          )}

                          {s.status === "boarded" && (
                            <button
                              onClick={() =>
                                updateStatus(s.student_id, "dropped_off")
                              }
                              className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-xs shadow-sm transition"
                            >
                              Trả khách
                            </button>
                          )}

                          {(s.status === "dropped_off" ||
                            s.status === "missed") && (
                            <span className="text-gray-400 text-xs">
                              Hoàn tất
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang (Giữ nguyên logic của bạn) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {/* ... code phân trang cũ của bạn ... */}
              <span className="text-sm py-1">
                Trang {currentPage}/{totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
