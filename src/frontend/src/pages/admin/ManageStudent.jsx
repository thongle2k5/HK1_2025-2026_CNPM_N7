// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoIosSchool, IoIosWarning } from "react-icons/io";

function ManageStudent() {
  return (
    // Component này chỉ tập trung vào nội dung trang Học sinh
    <div className="p-4 bg-white">

      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center border-b-2 mb-5 py-5">
        <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Học Sinh</p>

        <div className="flex items-center"  >
          <input type="text" placeholder="Tìm kiếm học sinh..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]" />
          <FaSearch className="-translate-x-12 text-lg text-[#9CA3AF]" />

          <button className="bg-[#007BFF] text-white py-2 px-4 rounded-3xl flex items-center">
            Thêm Học sinh mới
          </button>
        </div>
      </div>

      {/* Mấy cái cục thống kê số lượng cơ bản */}
      <div>
        <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <IoIosSchool className='text-5xl' />
            <div className="">
              <p className="text-black">Tổng số học sinh</p>
              <p className="text-2xl font-bold">1200</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <FaBus className='text-5xl' />
            <div className="">
              <p className="text-black">Số học sinh đang được đưa đón</p>
              <p className="text-2xl font-bold">1050</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <FaSchool className='text-5xl' />
            <div className="">
              <p className="text-black">Số học sinh nghỉ học hôm nay</p>
              <p className="text-2xl font-bold">80</p>
            </div>
          </div>


          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <IoIosWarning className='text-5xl' />
            <div className="">
              <p className="text-black">Số học sinh chưa có chuyến xe</p>
              <p className="text-2xl font-bold">70</p>
            </div>
          </div>
        </div>
      </div>

      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white rounded-xl mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className='flex justify-between items-center space-x-4'>
            <button className='bg-[#EFEFEF] text-black py-2 px-4 rounded-md w-[160px]'>abc</button>
            <button className='bg-[#EFEFEF] text-black py-2 px-4 rounded-md w-[160px]'>def</button>
          </div>

          <div className="flex items-center" >
            <input type="text" placeholder="Tìm kiếm học sinh trong bảng..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
            <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
          </div>


        </div>

        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="mb-20">
          <table className="w-full ">
            <thead className="bg-[#EAF4FF]  ">
              <tr>
                <th className=" text-left ">
                  Mã học sinh
                </th>
                <th className=" text-left">
                  Họ và tên
                </th>
                <th className=" text-left">
                  Lớp
                </th>
                <th className=" text-left">
                  Tuyến đường
                </th>
                <th className=" text-left">
                  Xe buýt
                </th>
                <th className=" text-left">
                  Tình trạng
                </th>
                <th className=" text-left">
                  Liên hệ phụ huynh
                </th>
                <th className=" text-left">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">HS001</td>
                <td className=" ">Nguyễn Văn A</td>
                <td className=" ">10A1</td>
                <td className=" ">Tuyến 1</td>
                <td className=" ">Xe 12</td>
                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Đang trên xe</span></td>
                <td>0000000000</td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">HS002</td>
                <td className=" ">Trần Thị B</td>
                <td className=" ">10A2</td>
                <td className=" ">Tuyến 2</td>
                <td className=" ">Xe 5</td>
                <td><span className=" rounded-md bg-[#E6F3FF] px-2 py-1 text-[#1D4ED8] font-bold">Đã đón</span></td>

                <td>0000000000</td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                <td className=" ">HS003</td>
                <td className=" ">Lê Văn C</td>
                <td className=" ">12A3</td>
                <td className=" ">Tuyến 3</td>
                <td className=" ">Xe 8</td>
                <td><span className=" rounded-md bg-[#F3F4F6] px-2 py-1 font-bold text-[#6B7280]">Nghỉ</span></td>
                <td>0000000000</td>
                <td className=" py-2 w-20">
                  <div className="flex space-x-3 justify-center items-center">
                    <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                    <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                    <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
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
            <p className="text-xl mb-4 font-bold">Tỷ lệ học sinh theo tuyến đường</p>
            <div className="">
              <FaChartPie className="text-[300px] text-gray-600" />
            </div>
          </div>

          <div>
            <p className="text-xl mb-4 font-bold">Số học sinh theo lớp học</p>
            <div className="">
              <FaChartBar className="text-[300px] text-gray-600" />
            </div>
          </div>


          <div>
            <p className="text-xl mb-4 font-bold">Vị trí xe buýt hiện tại đang chở học sinh</p>
            <div className="">
              <FaChartPie className="text-[300px] text-gray-600" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ManageStudent;
