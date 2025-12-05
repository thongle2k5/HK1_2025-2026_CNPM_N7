import React, { useState, useEffect } from "react";
import { getStudentById, updateStudent } from "../../../api/studentApi"; // Giữ nguyên API cũ của bạn
import { toast } from "react-toastify";

function ModalUpdateStudent(props) {
  const { isOpen, setIsOpen, studentId, refresh } = props;

  // State dữ liệu học sinh
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [stopId, setStopId] = useState("");

  // State cho Dropdown Tuyến & Trạm
  const [routes, setRoutes] = useState([]); // Danh sách tất cả tuyến
  const [stops, setStops] = useState([]); // Danh sách trạm của tuyến đang chọn
  const [selectedRoute, setSelectedRoute] = useState(""); // ID tuyến đang chọn

  // 1. Load danh sách TUYẾN ĐƯỜNG ngay khi mở Modal (hoặc khi component mount)
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // Gọi API lấy danh sách tuyến (API chúng ta vừa tạo bên RouteController)
        const res = await fetch("http://localhost:5000/api/route/forstudent");
        const data = await res.json();
        setRoutes(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách tuyến:", error);
      }
    };
    fetchRoutes();
  }, []);

  // 2. Load thông tin HỌC SINH khi mở Modal
  useEffect(() => {
    if (!isOpen || !studentId) return;

    const fetchStudent = async () => {
      try {
        const res = await getStudentById(studentId);
        const data = res.data; // Giả sử API trả về data object

        setName(data.student_name || data.name || "");
        setClassName(data.class || "");
        setStopId(data.stop_id || "");

        // Lưu ý: Lúc này ta chưa biết stop_id này thuộc tuyến nào để set selectedRoute.
        // UX: Ta cứ để Dropdown Tuyến trống. Nếu Admin muốn đổi trạm, họ sẽ chọn lại Tuyến.
        // Nếu họ không đụng vào Dropdown, stopId cũ vẫn được giữ nguyên khi bấm Lưu.
      } catch (error) {
        console.error("Lỗi khi lấy thông tin học sinh:", error);
      }
    };

    fetchStudent();
  }, [isOpen, studentId]);

  // 3. Xử lý khi chọn TUYẾN -> Load danh sách TRẠM tương ứng
  const handleRouteChange = async (e) => {
    const routeId = e.target.value;
    setSelectedRoute(routeId);

    // Reset trạm đang chọn vì tuyến đã đổi
    setStopId("");
    setStops([]);

    if (routeId) {
      try {
        const res = await fetch(
          `http://localhost:5000/api/route/${routeId}/stops`
        );
        const data = await res.json();
        setStops(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách trạm:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        studentName: name,
        studentClass: className,
        stopId: Number(stopId), // Backend cần kiểu số
      };

      // Kiểm tra nếu chưa chọn trạm (trường hợp người dùng chọn Tuyến mà quên chọn Trạm)
      if (!data.stopId) {
        toast.warning("Vui lòng chọn điểm đón!");
        return;
      }

      const res = await updateStudent(studentId, data);

      toast.success(res.data.message || "Cập nhật thành công!");
      props.refresh(); // Load lại danh sách bên ngoài
      setIsOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật học sinh:", error);
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    transition-all duration-300 ease-out z-50
                    ${
                      isOpen
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    }
                    bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg`}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Cập Nhật Thông Tin Học Sinh
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* HỌ TÊN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              required
              placeholder="Nhập họ tên học sinh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* LỚP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lớp
            </label>
            <input
              type="text"
              required
              placeholder="Nhập lớp (VD: 10A1)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* --- PHẦN MỚI: CHỌN TUYẾN & TRẠM --- */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-4">
            <p className="text-sm font-semibold text-gray-600 border-b pb-2">
              📍 Thiết lập đưa đón
            </p>

            {/* Dropdown 1: Chọn Tuyến */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Chọn Tuyến Đường
              </label>
              <select
                value={selectedRoute}
                onChange={handleRouteChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="">-- Chọn tuyến để lọc trạm --</option>
                {routes.map((r) => (
                  <option key={r.route_id} value={r.route_id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown 2: Chọn Trạm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                2. Chọn Điểm Đón
              </label>
              <select
                value={stopId}
                onChange={(e) => setStopId(e.target.value)}
                disabled={!selectedRoute && !stopId} // Khóa nếu chưa chọn tuyến (trừ khi đang có sẵn ID cũ)
                className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none 
                                    ${
                                      !selectedRoute && !stopId
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-white"
                                    }`}
              >
                <option value="">-- Chọn điểm đón --</option>
                {stops.length > 0
                  ? stops.map((s) => (
                      <option key={s.stop_id} value={s.stop_id}>
                        {s.stop_name || s.address}
                      </option>
                    ))
                  : // Trường hợp đang hiển thị ID cũ mà chưa chọn Tuyến mới
                    stopId && (
                      <option value={stopId}>
                        Đang giữ điểm đón cũ (ID: {stopId})
                      </option>
                    )}
              </select>
              {!selectedRoute && stopId && (
                <p className="text-xs text-orange-500 mt-1">
                  * Đang dùng điểm đón cũ. Hãy chọn Tuyến nếu muốn thay đổi.
                </p>
              )}
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium shadow-md transition transform active:scale-95"
            >
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalUpdateStudent;
