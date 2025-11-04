// import { useState } from "react";
// import { Search, MapPin, UserCheck, Clock } from "lucide-react";

// export default function StudentList() {
//   // Dữ liệu giả lập
//   const [filter, setFilter] = useState("Tất cả");
//   const [search, setSearch] = useState("");
//   const [students, setStudents] = useState([
//     { id: 1, name: "Nguyễn An", address: "12A Lê Lợi, Q.1", time: "06:35", status: "Chưa đón" },
//     { id: 2, name: "Trần Bình", address: "45 Nguyễn Văn Cừ, Q.5", time: "06:40", status: "Đã đón" },
//     { id: 3, name: "Lê Hương", address: "22 Nguyễn Trãi, Q.5", time: "06:50", status: "Chưa đón" },
//     { id: 4, name: "Phạm Minh", address: "88 Trần Hưng Đạo, Q.1", time: "07:10", status: "Đã trả" },
//   ]);

//   // Cập nhật trạng thái
//   const updateStatus = (id, newStatus) => {
//     setStudents((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
//     );
//   };

//   // Lọc + tìm kiếm
//   const filteredStudents = students
//     .filter((s) => (filter === "Tất cả" ? true : s.status === filter))
//     .filter((s) => s.name.toLowerCase().includes(search.trim().toLowerCase()));

//   // Màu trạng thái
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Đã đón":
//         return "bg-green-100 text-green-700";
//       case "Chưa đón":
//         return "bg-yellow-100 text-yellow-700";
//       case "Đã trả":
//         return "bg-blue-100 text-blue-700";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   // Làm mới (reset filter + search)
//   const handleRefresh = () => {
//     setFilter("Tất cả");
//     setSearch("");
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//           <UserCheck className="w-6 h-6 text-blue-600" />
//           Danh sách học sinh & điểm đón
//         </h1>
//         <p className="text-sm text-gray-600">
//           Tuyển: <strong>12A</strong> | Ngày: <strong>24/10/2025</strong>
//         </p>
//       </div>

//       {/* Thanh lọc & tìm kiếm */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
//         <div className="flex items-center gap-3 w-full md:w-auto">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border rounded-md p-2 text-sm"
//           >
//             <option>Tất cả</option>
//             <option>Đã đón</option>
//             <option>Chưa đón</option>
//             <option>Đã trả</option>
//           </select>

//           <div className="relative w-full md:w-64">
//             <Search className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Tìm học sinh..."
//               className="border rounded-md pl-8 p-2 text-sm w-full"
//             />
//           </div>
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={handleRefresh}
//             className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
//           >
//             Làm mới
//           </button>
//         </div>
//       </div>

//       {/* Bảng danh sách */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full border-collapse text-sm table-fixed">
//           <colgroup>
//             <col style={{ width: "6%" }} />
//             <col style={{ width: "24%" }} />
//             <col style={{ width: "38%" }} />
//             <col style={{ width: "12%" }} />
//             <col style={{ width: "12%" }} />
//             <col style={{ width: "8%" }} />
//           </colgroup>

//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-2 border">STT</th>
//               <th className="p-2 border">Tên học sinh</th>
//               <th className="p-2 border">Địa chỉ đón</th>
//               <th className="p-2 border">Giờ dự kiến</th>
//               <th className="p-2 border">Trạng thái</th>
//               <th className="p-2 border text-center">Thao tác</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="p-4 text-center text-gray-500">
//                   Không có học sinh phù hợp
//                 </td>
//               </tr>
//             ) : (
//               filteredStudents.map((s, idx) => (
//                 <tr key={s.id} className="hover:bg-gray-50">
//                   <td className="border p-2 text-center align-middle">{idx + 1}</td>

//                   {/* Tên (Đã thêm text-gray-900) */}
//                   <td className="border p-2 align-middle font-medium whitespace-nowrap text-gray-900">
//                     {s.name}
//                   </td>

//                   {/* Địa chỉ đón (Đã thêm text-gray-900 vào span) */}
//                   <td className="border p-2 align-middle">
//                     <span className="inline-flex items-center gap-2">
//                       <MapPin className="w-4 h-4 text-red-500" />
//                       <span className="text-sm text-gray-900">{s.address}</span>
//                     </span>
//                   </td>

//                   {/* Giờ dự kiến (Đã thêm text-gray-900 vào span) */}
//                   <td className="border p-2 align-middle text-sm whitespace-nowrap">
//                     <span className="inline-flex items-center gap-2">
//                       <Clock className="w-4 h-4 text-blue-500" />
//                       <span className="text-gray-900">{s.time}</span>
//                     </span>
//                   </td>

//                   {/* Trạng thái */}
//                   <td className={`border p-2 align-middle text-center font-medium ${getStatusColor(s.status)} whitespace-nowrap`}>
//                     {s.status}
//                   </td>

//                   {/* Thao tác (chỉ chứa nút) */}
//                   <td className="border p-2 text-center align-middle space-x-1">
//                     {s.status === "Chưa đón" && (
//                       <button
//                         onClick={() => updateStatus(s.id, "Đã đón")}
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
//                       >
//                         Đón xong
//                       </button>
//                     )}
//                     {s.status === "Đã đón" && (
//                       <button
//                         onClick={() => updateStatus(s.id, "Đã trả")}
//                         className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
//                       >
//                         Trả xong
//                       </button>
//                     )}
//                     {/* Nếu là "Đã trả" thì không hiện nút nào */}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Bản đồ & chú giải */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold mb-2 text-gray-800">Bản đồ điểm đón / trả</h3>
//           <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400">
//             (Google Map - mô phỏng tuyến đón trả)
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="font-semibold mb-2 text-gray-800">Chú giải trạng thái</h3>
//           <ul className="text-sm space-y-1">
//             <li>🟢 Đã đón: Học sinh đã lên xe</li>
//             <li>🟡 Chưa đón: Chưa đến điểm đón</li>
//             <li>🔵 Đã trả: Học sinh đã xuống xe</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Search, MapPin, UserCheck, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function StudentList() {
    const [filter, setFilter] = useState("Tất cả");
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 🔹 Fetch dữ liệu từ backend
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

    // 🔹 Cập nhật trạng thái
    const updateStatus = (id, newStatus) => {
        setStudents((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
    };

    // 🔹 Lọc + tìm kiếm
    const filteredStudents = students
        .filter((s) => (filter === "Tất cả" ? true : s.status === filter))
        .filter((s) => {
            const name = s.name || "";
            return name.toLowerCase().includes(search.trim().toLowerCase());
        });

    // 🔹 Phân trang logic
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    // 🔹 Màu trạng thái
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
        return (
            <div className="p-6 text-center text-gray-500">
                Đang tải danh sách học sinh...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-blue-600" />
                    Danh sách học sinh & điểm đón
                </h1>
                <p className="text-sm text-gray-600">
                    Tuyến: <strong>12A</strong> | Ngày: <strong>31/10/2025</strong>
                </p>
            </div>

            {/* Lọc & tìm kiếm */}
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

                <div className="flex gap-2">
                    <button
                        onClick={handleRefresh}
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                    >
                        Làm mới
                    </button>
                </div>
            </div>

            {/* Bảng */}
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
                                    <td className="border p-2">
                                        <span className="inline-flex items-center gap-2">

                                            <span>{s.class}</span>
                                        </span>
                                    </td>
                                    <td className="border p-2 text-sm">
                                        <span className="inline-flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-red-500" />                                            
                                            <span>{s.address}</span>
                                        </span>
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

            {/* Thanh phân trang */}
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
