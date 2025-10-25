// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye, FaTelegramPlane, FaClock, FaChartLine } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";
import { IoIosSchool, IoIosWarning } from "react-icons/io";

function ManageAssignment() {
    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-4 bg-white">

            {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
            <div className="flex justify-between items-center border-b-2 mb-14 py-5">
                <p className="font-bold text-2xl text-[#007BFF]">Phân Công Tài Xế - Xe Buýt - Tuyến Đường</p>

                <div className="flex items-center"  >
                    <input type="text" placeholder="Tìm kiếm phân công..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]" />
                    <FaSearch className="-translate-x-12 text-lg text-[#9CA3AF]" />

                    <button className="bg-[#007BFF] text-white py-2 px-4 rounded-3xl flex items-center">
                        Thêm phân công mới
                    </button>
                </div>
            </div>

            {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
            <div className="bg-white rounded-xl mb-10">
                <div className="flex justify-between items-center mb-5">
                    <div className='flex justify-between items-center space-x-4'>
                        <button className='bg-[#EFEFEF] text-black py-2 px-4 rounded-md w-[160px]'>abc</button>
                        <button className='border border-[#9CA3AF] text-black py-2 px-4 rounded-md cursor-pointer'>Tất cả</button>
                        <button className='border border-[#9CA3AF] text-black py-2 px-4 rounded-md cursor-pointer'>Đang hoạt động</button>
                        <button className='border border-[#9CA3AF] text-black py-2 px-4 rounded-md cursor-pointer'>Hết hạn</button>
                        <button className='border border-[#9CA3AF] text-black py-2 px-4 rounded-md cursor-pointer'>Chưa phân công</button>
                        <button className='border border-[#9CA3AF] text-black py-2 px-4 rounded-md cursor-pointer'><FiRefreshCcw className="mr-2 inline" />Làm mới</button>
                    </div>
                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="mb-20">
                    <table className="w-full">
                        <thead className="bg-[#EAF4FF]  h-12">
                            <tr>
                                <th className=" text-left ">
                                    Mã phân công
                                </th>
                                <th className=" text-left">
                                    Tên tài xế
                                </th>
                                <th className=" text-left">
                                    Mã xe buýt
                                </th>
                                <th className=" text-left">
                                    Tên tuyến đường
                                </th>
                                <th className=" text-left">
                                    Ngày bắt đầu
                                </th>
                                <th className=" text-left">
                                    Ngày kết thúc
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
                                <td className=" ">PC001</td>
                                <td className=" ">Nguyễn Văn A</td>
                                <td className=" ">XB123</td>
                                <td className=" ">Tuyến 1</td>
                                <td className=" ">01/01/2025</td>
                                <td className=" ">31/12/2025</td>
                                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaPen className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                        <FaClock className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTelegramPlane className="cursor-pointer text-[#16A34A] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">PC002</td>
                                <td className=" ">Trần Thị B</td>
                                <td className=" ">XB456</td>
                                <td className=" ">Tuyến 2</td>
                                <td className=" ">01/01/2025</td>
                                <td className=" ">31/12/2025</td>
                                <td><span className=" rounded-md bg-[#FEE2E2] px-2 py-1 text-[#B91C1C] font-bold">Hết hạn</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaPen className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                        <FaClock className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTelegramPlane className="cursor-pointer text-[#16A34A] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">PC003</td>
                                <td className=" ">Lê Văn C</td>
                                <td className=" ">XB789</td>
                                <td className=" ">Tuyến 3</td>
                                <td className=" ">01/01/2025</td>
                                <td className=" ">31/12/2025</td>
                                <td><span className=" rounded-md bg-[#F3F4F6] px-2 py-1 font-bold text-[#6B7280]">Chưa kích hoạt</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaPen className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                        <FaClock className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTelegramPlane className="cursor-pointer text-[#16A34A] text-lg" />
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
                        <p className="text-xl mb-4 font-bold">Tỷ lệ phân công theo trạng thái</p>
                        <div className="">
                            <FaChartPie className="text-[300px] text-gray-600" />
                        </div>
                    </div>

                    <div>
                        <p className="text-xl mb-4 font-bold">Số tuyến được phân công theo tài xế</p>
                        <div className="">
                            <FaChartBar className="text-[300px] text-gray-600" />
                        </div>
                    </div>


                    <div>
                        <p className="text-xl mb-4 font-bold">Tổng số phân công theo thời gian</p>
                        <div className="">
                            <FaChartLine className="text-[300px] text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ManageAssignment;
