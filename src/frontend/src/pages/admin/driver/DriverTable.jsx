import React from "react";
function DriverTable() {
  return (
    <div className="bg-white rounded-lg shadow-lg my-4 ">
      <div className="flex items-center justify-between py-3 ">
        <div className="flex text-gray-900">
          Lọc trạng thái:
          <div className="bg-gray-400 px-20 py-2 rounded-lg mx-2"></div>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm tài xế trong bảng..."
          className="outline-none border mx-4 rounded-3xl p-2"
        />
      </div>
      <div className="">
        <table className="w-full rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white rounded-lg">
              <td>Mã tài xế</td>
              <td>Họ và tên</td>
              <td>Số điện thoại</td>
              <td>Tuyến đường phụ trách</td>
              <td>Trạng thái</td>
              <td>Vị trí hiện tại</td>
              <td>Hành động</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
export default DriverTable;
