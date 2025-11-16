import React from "react";
function BusScheduleTable({ formdata, onDeleteAssignment }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-blue-500 px-2 py-1 rounded-xl">Đã lên lịch</span>
        );
      case "ongoing":
        return (
          <span className="bg-orange-500 px-2 py-1 rounded-xl">Đang chạy</span>
        );
      case "completed":
        return (
          <span className="bg-green-500 px-2 py-1 rounded-xl">Hoàn thành</span>
        );
      default:
        return (
          <span className="bg-gray-500 px-2 py-1 rounded-xl">{status}</span>
        );
    }
  };
  return (
    <div>
      <table className="w-full table-fixed  text-gray-900 m-6">
        <thead className="p-4 text-xs border-b text-gray-600">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tuyến đường
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Xe buýt
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tài xế
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Giờ khởi hành
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="">
          {formdata.map((item) => (
            <tr key={item.schedule_id} className="hover:bg-gray-50 border-b">
              <td
                className="w-4/12 px-4 truncate py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                title={item.tuyen_duong}
              >
                {item.tuyen_duong}
              </td>
              <td className="w-2/12 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.xe_buyt}
              </td>
              <td className="w-2/12 px-4 py-4  text-sm font-medium text-gray-900">
                {item.tai_xe}
              </td>
              <td className="w-1/12 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {new Date(item.date).toLocaleDateString("vi-VN")}
              </td>
              <td className="w-1/12 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.start_time.substring(0, 5)}
              </td>
              <td className="w-1/12 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {getStatusBadge(item.status)}
              </td>
              <td className="w-1/12 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <button
                  onClick={() => console.log("Sửa item", item.id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDeleteAssignment(item.td)}
                  className="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BusScheduleTable;
