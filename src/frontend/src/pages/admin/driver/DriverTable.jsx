import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import StatusBadge from "./statusPage";
import { FaMessage } from "react-icons/fa6";
import { PiNotePencilBold } from "react-icons/pi";
function DriverTable({ data }) {
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
                Tuyến đường phụ trách
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-white"
              >
                Vị trí hiện tại
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
                  {}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900"></td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  {}
                </td>
                <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900">
                  <button className="text-red-600">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="p-4">
                    <FaMessage className="text-green-600 " />
                  </button>
                  <button>
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
