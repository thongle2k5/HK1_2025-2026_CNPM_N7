import { useState, useEffect } from "react";
import { Search, MapPin, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import DriverHeader from "./components/Header";

export default function StudentList() {
    const [filter, setFilter] = useState("Tất cả");
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const driverName = "Nguyễn Văn T"; // bạn có thể lấy từ context hoặc props

    useEffect(() => {
        fetch("http://localhost:5000/api/students")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map((s) => ({
                    id: s.student_id,
                    name: s.student_name,
                    class: s.class,
                    address: s.stop_id || "Chưa có điểm đón",
                    status: "Chưa đón",
                }));
                setStudents(formatted);
            })
            .catch((err) => console.error("Lỗi khi lấy danh sách học sinh:", err))
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = (id, newStatus) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
    };

    const filteredStudents = students
        .filter((s) => (filter === "Tất cả" ? true : s.status === filter))
        .filter((s) => s.name?.toLowerCase().includes(search.trim().toLowerCase()));

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status) => {
        switch (status) {
            case "Đã đón":
                return "bg-green-100 text-green-700";
            case "Chưa đón":
                return "bg-yellow-100 text-yellow-700";
            case "Đã trả":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const handleRefresh = () => {
        setFilter("Tất cả");
        setSearch("");
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Đang tải danh sách học sinh...</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen space-y-6">
            {/* Header dùng chung */}
            <DriverHeader driverName={driverName} />

            {/* Bộ lọc + tìm kiếm */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border rounded-md p-2 text-sm"
                    >
                        <option>Tất cả</option>
                        <option>Đã đón</option>
                        <option>Chưa đón</option>
                        <option>Đã trả</option>
                    </select>

                    <div className="relative w-full md:w-64">
                        <Search className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Tìm học sinh..."
                            className="border rounded-md pl-8 p-2 text-sm w-full"
                        />
                    </div>
                </div>

                <button
                    onClick={handleRefresh}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                >
                    Làm mới
                </button>
            </div>

            {/* Bảng danh sách học sinh */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full border-collapse text-sm table-fixed">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">STT</th>
                            <th className="p-2 border">Tên học sinh</th>
                            <th className="p-2 border">Lớp</th>
                            <th className="p-2 border">Địa điểm đón</th>
                            <th className="p-2 border">Trạng thái</th>
                            <th className="p-2 border text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    Không có học sinh phù hợp
                                </td>
                            </tr>
                        ) : (
                            currentStudents.map((s, idx) => (
                                <tr key={s.id} className="hover:bg-gray-50">
                                    <td className="border p-2 text-center">{startIndex + idx + 1}</td>
                                    <td className="border p-2 font-medium text-gray-900">{s.name}</td>
                                    <td className="border p-2">{s.class}</td>
                                    <td className="border p-2 text-sm flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        {s.address}
                                    </td>
                                    <td className={`border p-2 text-center font-medium ${getStatusColor(s.status)}`}>
                                        {s.status}
                                    </td>
                                    <td className="border p-2 text-center space-x-1">
                                        {s.status === "Chưa đón" && (
                                            <button
                                                onClick={() => updateStatus(s.id, "Đã đón")}
                                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                                            >
                                                Đón xong
                                            </button>
                                        )}
                                        {s.status === "Đã đón" && (
                                            <button
                                                onClick={() => updateStatus(s.id, "Đã trả")}
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                                            >
                                                Trả xong
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${currentPage === 1
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        <ChevronLeft className="w-4 h-4" /> Trước
                    </button>

                    <span className="text-gray-700 text-sm">
                        Trang <strong>{currentPage}</strong> / {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center gap-1 px-3 py-1 border rounded-md text-sm ${currentPage === totalPages
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        Sau <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
