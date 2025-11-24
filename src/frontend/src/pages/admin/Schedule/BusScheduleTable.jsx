import React from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";

// Nhận thêm prop 'onEdit'
function BusScheduleTable({ formdata, onDeleteAssignment, onEdit }) {
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-blue-100 text-blue-800 border border-blue-200",
      "in progress": "bg-orange-100 text-orange-800 border border-orange-200",
      completed: "bg-green-100 text-green-800 border border-green-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    };
    // Fallback nếu status lạ
    const style = styles[status] || "bg-gray-100 text-gray-800";

    // Dịch sang tiếng Việt
    const labels = {
      pending: "Chờ chạy",
      "in progress": "Đang chạy",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };

    return (
      <span
        className={`
      inline-flex items-center justify-center 
      px-3 py-1 rounded-full text-xs font-bold border 
      min-w-[100px] whitespace-nowrap shadow-sm
      ${style}
    `}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="overflow-auto max-h-[600px]">
      {" "}
      {/* Thêm scroll dọc nếu bảng quá dài */}
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
          <tr>
            {/* Tăng độ rộng cho Tuyến đường */}
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[30%] min-w-[200px]">
              Tuyến đường
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
              Xe / Tài xế
            </th>
            {/* Gộp Ngày & Giờ */}
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
              Thời gian
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%] text-center">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[10%] text-center">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {formdata.map((item) => (
            <tr
              key={item.schedule_id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3">
                <div
                  className="text-sm font-medium text-gray-900 truncate max-w-[250px]"
                  title={item.tuyen_duong}
                >
                  {item.tuyen_duong}
                </div>
              </td>

              {/* Gộp Xe và Tài xế vào 1 ô cho gọn */}
              <td className="px-4 py-3">
                <div className="text-sm font-bold text-gray-800">
                  {item.xe_buyt}
                </div>
                <div className="text-xs text-gray-500">{item.tai_xe}</div>
              </td>

              {/* Gộp Ngày và Giờ */}
              <td className="px-4 py-3">
                <div className="text-sm font-bold text-blue-600">
                  {item.start_time?.substring(0, 5)}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString("vi-VN")}
                </div>
              </td>

              <td className="px-4 py-3 text-center">
                {getStatusBadge(item.status)}
              </td>

              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition"
                    title="Sửa"
                  >
                    <PiNotePencilBold size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteAssignment(item.schedule_id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition"
                    title="Xóa"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusScheduleTable;
