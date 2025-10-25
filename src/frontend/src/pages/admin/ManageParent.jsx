// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaUsers, FaCircle, FaRegEye, FaBell } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { FiRefreshCcw } from "react-icons/fi";


function ManageParent() {
  return (
    // Component này chỉ tập trung vào nội dung trang Phụ huynh
    <div className="p-4 bg-white">

      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center border-b-2 mb-5 py-5">
        <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Phụ Huynh</p>

        <div className="flex items-center"  >
          <input type="text" placeholder="Tìm kiếm phụ huynh..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]" />
          <FaSearch className="-translate-x-12 text-lg text-[#9CA3AF]" />

          <button className="bg-[#007BFF] text-white py-2 px-4 rounded-3xl flex items-center">
            Thêm phụ huynh mới
          </button>
        </div>
      </div>

      {/* Mấy cái cục thống kê số lượng cơ bản */}
      <div>
        <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <FaUsers className='text-5xl' />
            <div className="">
              <p className="text-black">Tổng số phụ huynh</p>
              <p className="text-2xl font-bold">600</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <PiStudentFill className='text-5xl' />
            <div className="">
              <p className="text-black">Tổng số học sinh liên kết</p>
              <p className="text-2xl font-bold">1200</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            < FaCircle className='text-5xl text-[#22C55E]' />
            <div className="">
              <p className="text-black">Phụ huynh đang hoạt động</p>
              <p className="text-2xl font-bold text-[#22C55E]">580</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            < FaCircle className='text-5xl text-[#EF4444]' />

            <div className="">
              <p className="text-black">Phụ huynh chưa kích hoạt tài khoản</p>
              <p className="text-2xl font-bold text-[#EF4444]">20</p>
            </div>
          </div>
        </div>
      </div>

      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white rounded-xl mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className='flex justify-between items-center space-x-4'>
            <p className='text-black'>Lọc trạng thái:</p>
            <button className='bg-[#EFEFEF] text-black py-2 px-4 rounded-md w-[160px]'>def</button>
          </div>

          <div className="flex items-center" >
            <input type="text" placeholder="Tìm kiếm phụ huynh trong bảng..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
            <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
            <FiRefreshCcw className="text-2xl" />
          </div>


        </div>

        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="mb-20">
          <table className="w-full ">
            <thead className="bg-[#EAF4FF] h-12 ">
              <tr>
                <th className=" text-left ">
                  Mã phụ huynh
                </th>
                <th className=" text-left">
                  Họ và tên
                </th>
                <th className=" text-left">
                  Số điện thoại
                </th>
                <th className=" text-left">
                  Email
                </th>
                <th className=" text-left">
                  Học sinh liên kết
                </th>
                <th className=" text-left">
                  Trạng thái
                </th>
                <th className=" text-left">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">PH001</td>
                <td className=" ">Nguyễn Văn A</td>
                <td className=" ">0901234567</td>
                <td className=" ">nguyenvana@gmail.com</td>
                <td className=" ">HS001, HS002</td>
                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                    <FaBell className="cursor-pointer text-[#007BFF] text-lg" />
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">PH002</td>
                <td className=" ">Trần Thị B</td>
                <td className=" ">0901234568</td>
                <td className=" ">tranthib@gmail.com</td>
                <td className=" ">HS003</td>
                <td><span className=" rounded-md bg-[#FEE2E2] px-2 py-1 text-[#B91C1C] font-bold">Chưa kích hoạt</span></td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                    <FaBell className="cursor-pointer text-[#007BFF] text-lg" />

                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">PH003</td>
                <td className=" ">Lê Văn C</td>
                <td className=" ">0901234569</td>
                <td className=" ">levanc@gmail.com</td>
                <td className=" ">HS004</td>
                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                    <FaBell className="cursor-pointer text-[#007BFF] text-lg" />

                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center items-center space-x-10 text-gray-600 mt-3 text-lg ">
            <FcPrevious className="cursor-pointer" />
            <p className="cursor-pointer">1</p>
            <p className="cursor-pointer">2</p>
            <p className="cursor-pointer">3</p>
            <FcNext className="cursor-pointer" />
          </div>
        </div>


        {/* Biểu đồ thống kê */}
        <div className="flex justify-between items-center space-x-7">
          <div>
            <p className="text-xl mb-4 font-bold">Tỷ lệ phụ huynh theo trạng thái tài khoản</p>
            <div className="">
              <FaChartPie className="text-[300px] text-gray-600" />
            </div>
          </div>

          <div>
            <p className="text-xl mb-4 font-bold">Số học sinh trung bình trên mỗi phụ huynh</p>
            <div className="">
              <FaChartBar className="text-[300px] text-gray-600" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ManageParent;
