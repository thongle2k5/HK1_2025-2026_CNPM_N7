import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import StatusBadge from "./statusPage";
import { FaMessage } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
const getStatusBadge = (status) => {
  switch (status) {
    case "Active":
      return (
        <span className="bg-blue-500 px-2 py-1 rounded-xl">Hoạt động</span>
      );
    case "On-Leave":
      return (
        <span className="bg-orange-500 px-2 py-1 rounded-xl">Nghỉ phép</span>
      );
    case "violation":
      return (
        <span className="bg-green-500 px-2 py-1 rounded-xl">Vi phạm </span>
      );
    default:
      return <span className="bg-gray-500 px-2 py-1 rounded-xl">{status}</span>;
  }
};
function DriverTable({ data, onEdit, onDelete, onOpenChat }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg overflow-hidden shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 rounded-lg">
          <thead className="bg-blue-500 ">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Mã tài xế
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Họ và tên
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Số điện thoại
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Mã số bằng lái
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Trạng thái tài khoản
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((driver) => (
              <tr>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {driver.driver_id}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {driver.name}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {driver.phone}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {driver.email}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {driver.license_number}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {getStatusBadge(driver.status)}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => onDelete(driver.driver_id)}
                    className="text-red-600"
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <button onClick={() => onOpenChat(driver)} className="p-4">
                    <FaMessage className="text-green-600 " />
                  </button>
                  <button onClick={() => onEdit(driver)}>
                    <PiNotePencilBold />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DriverTable;
