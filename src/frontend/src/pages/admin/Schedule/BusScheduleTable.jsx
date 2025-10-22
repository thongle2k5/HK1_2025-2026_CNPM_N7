import React from "react";
function BusScheduleForm({ formdata, onDeleteAssignment }) {
  return (
    <div>
      <table className="table-auto text-gray-900 m-6">
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
            <tr key={item.td} className="hover:bg-gray-50 border-b">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.td}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.xe}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.tx}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.ngay}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.gio}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="rounded-lg bg-blue-200 text-blue-800 w-fit px-2">
                  Đã lên lịch
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
export default BusScheduleForm;
