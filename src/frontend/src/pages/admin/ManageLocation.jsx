// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye, FaPauseCircle, FaToggleOn } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";


function ManageLocation() {
    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-4 bg-white">

            {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
            <div className="flex justify-between items-center border-b-2 mb-5 py-5">
                <p className="font-bold text-2xl text-[#007BFF]">Cập Nhật Vị Trí Xe Buýt</p>

                <div className="flex items-center"  >
                    <input type="text" placeholder="Tìm theo mã xe hoặc tài xế..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]" />
                    <FaSearch className="-translate-x-12 text-lg text-[#9CA3AF]" />

                    <button className="bg-[#007BFF] text-white py-2 px-4 rounded-3xl flex items-center">
                        <FiRefreshCcw className="mr-2" />
                        Làm mới vị trí
                    </button>
                </div>
            </div>

            {/* Mấy cái cục thống kê số lượng cơ bản */}
            <div>
                <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaBus className='text-5xl' />
                        <div className="">
                            <p className="text-black">Tổng số xe hoạt động</p>
                            <p className="text-2xl font-bold">25</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaLocationDot className='text-5xl' />
                        <div className="">
                            <p className="text-black">Xe đang di chuyển</p>
                            <p className="text-2xl font-bold">22</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaPauseCircle className='text-5xl' />
                        <div className="">
                            <p className="text-black">Xe đang dừng/ chờ</p>
                            <p className="text-2xl font-bold">2</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <IoIosWarning className='text-5xl' />
                        <div className="">
                            <p className="text-black">Xe mất tín hiệu</p>
                            <p className="text-2xl font-bold">1</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
            <div className="bg-white rounded-xl mb-10 gap-2 flex items-start">
                <div className="flex items-center mb-5 w-[50%] ">
                    <div className='w-full border-t pt-2'>
                        <button className='text-lg flex items-center gap-3 mb-2 bg-[#007BFF] text-white p-2 rounded-md'><FaToggleOn className='' /> Bật theo dõi thời gian thực</button>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658461933!2d106.679683374517!3d10.75992235949896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1761320884245!5m2!1svi!2s"
                            width="670"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>


                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="mb-20 flex-1">
                    <table className="w-full ">
                        <thead className="bg-[#EAF4FF]  ">
                            <tr>
                                <th className=" text-left ">
                                    Mã xe buýt
                                </th>
                                <th className=" text-left">
                                    Tài xế
                                </th>
                                <th className=" text-left">
                                    Tuyến đường
                                </th>
                                <th className=" text-left">
                                    Tọa độ hiện tại
                                </th>
                                <th className=" text-left">
                                    Trạng thái
                                </th>
                                <th className=" text-left">
                                    Thời gian cập nhật cuối
                                </th>

                                <th className=" text-left">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">BUS001</td>
                                <td className=" ">Nguyễn Văn A</td>
                                <td className=" ">Q1 - Thủ Đức</td>
                                <td className=" ">10.762622, 106.660172</td>
                                <td><span className=" rounded-2xl  px-2 py-1 text-[#15803D]">Đang di chuyển</span></td>
                                <td className=" ">12:45:30 20/4/2025</td>


                                <td className=" py-2 w-20">
                                    <p className='text-bold text-[#007BFF]'>Xem trên bản đồ</p>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">BUS002</td>
                                <td className=" ">Trần Thị B</td>
                                <td className=" ">Q2 - Bình Thạnh</td>
                                <td className=" ">10.762622, 106.660172</td>
                                <td><span className=" rounded-2xl  px-2 py-1 text-[#A16207]">Dừng</span></td>
                                <td className=" ">12:45:30 20/4/2025</td>


                                <td className=" py-2 w-20">
                                    <p className='text-bold text-[#007BFF]'>Xem trên bản đồ</p>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">BUS003</td>
                                <td className=" ">Lê Văn C</td>
                                <td className=" ">Q3 - Gò Vấp</td>
                                <td className=" ">10.762622, 106.660172</td>
                                <td className=''><span className=" rounded-2xl px-2 py-1 text-[#B91C1C] ">Mất tín hiệu</span></td>
                                <td className=" ">12:45:30 20/4/2025</td>


                                <td className=" py-2 w-20">
                                    <p className='text-bold text-[#007BFF]'>Xem trên bản đồ</p>
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

            </div>

        </div>
    );
}

export default ManageLocation;
