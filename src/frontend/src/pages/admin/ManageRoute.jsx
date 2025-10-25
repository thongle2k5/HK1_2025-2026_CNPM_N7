// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye, FaRoad, FaPauseCircle } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";


function ManageRoute() {
    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-4 bg-white">

            {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
            <div className="flex justify-between items-center border-b-2 mb-5 py-5">
                <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Tuyến Đường</p>

                <div className="flex items-center"  >
                    <input type="text" placeholder="Tìm kiếm tuyến đường..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]" />
                    <FaSearch className="-translate-x-12 text-lg text-[#9CA3AF]" />

                    <button className="bg-[#007BFF] text-white py-2 px-4 rounded-3xl flex items-center">
                        Thêm tuyến Mới
                    </button>
                </div>
            </div>

            {/* Mấy cái cục thống kê số lượng cơ bản */}
            <div>
                <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaRoad className='text-5xl' />
                        <div className="">
                            <p className="text-black">Tổng số tuyến đường</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaBus className='text-5xl' />
                        <div className="">
                            <p className="text-black">Số tuyến đang hoạt động</p>
                            <p className="text-2xl font-bold">10</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaPauseCircle className='text-5xl' />
                        <div className="">
                            <p className="text-black">Số tuyến tạm ngưng</p>
                            <p className="text-2xl font-bold">2</p>
                        </div>
                    </div>


                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <PiStudentFill className='text-5xl' />
                        <div className="">
                            <p className="text-black">Số học sinh được đưa đón</p>
                            <p className="text-2xl font-bold">1200</p>
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
                        <input type="text" placeholder="Tìm kiếm tuyến đường..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
                        <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
                    </div>


                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="mb-20">
                    <table className="w-full ">
                        <thead className="bg-[#EAF4FF]  ">
                            <tr>
                                <th className=" text-left ">
                                    Mã tuyến
                                </th>
                                <th className=" text-left">
                                    Tên tuyến
                                </th>
                                <th className=" text-left">
                                    Số xe buýt
                                </th>
                                <th className=" text-left">
                                    Số tài xế
                                </th>
                                <th className=" text-left">
                                    Số học sinh
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
                                <td className=" ">TX001</td>
                                <td className=" ">Tuyến 1-Trung tâm</td>
                                <td className=" ">3</td>
                                <td className=" ">3</td>
                                <td className=" ">150</td>
                                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">TX002</td>
                                <td className=" ">Tuyến 2-Bắc</td>
                                <td className=" ">2</td>
                                <td className=" ">2</td>
                                <td className=" ">120</td>
                                <td><span className=" rounded-md bg-[#FEF9C3] px-2 py-1 text-[#A16207] font-bold">Tạm ngưng</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">TX003</td>
                                <td className=" ">Tuyến 3-Nam</td>
                                <td className=" ">4</td>
                                <td className=" ">4</td>
                                <td className=" ">180</td>
                                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">TX004</td>
                                <td className=" ">Tuyến 4-Đông</td>
                                <td className=" ">1</td>
                                <td className=" ">1</td>
                                <td className=" ">90</td>
                                <td><span className=" rounded-md bg-[#DCFCE7] px-2 py-1 text-[#15803D] font-bold">Hoạt động</span></td>
                                <td className=" py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" />
                                        <FaPen className="cursor-pointer text-[#EAB308] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                <td className=" ">TX005</td>
                                <td className=" ">Tuyến 5-Tây</td>
                                <td className=" ">2</td>
                                <td className=" ">2</td>
                                <td className=" ">110</td>
                                <td><span className=" rounded-md bg-[#FEF9C3] px-2 py-1 text-[#A16207] font-bold">Tạm ngưng</span></td>
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
                        <p className="text-xl mb-4 font-bold">Bản đồ tuyến xe</p>
                        <div className="">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669658461933!2d106.679683374517!3d10.75992235949896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTw6BpIEfDsm4!5e0!3m2!1svi!2s!4v1761320884245!5m2!1svi!2s"
                                width="500x"
                                height="300px"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                        </div>
                    </div>

                    <div>
                        <p className="text-xl mb-4 font-bold">Phân bố số học sinh theo tuyến</p>
                        <div className="">
                            <FaChartBar className="text-[300px] text-gray-600" />
                        </div>
                    </div>


                    <div>
                        <p className="text-xl mb-4 font-bold">Số chuyến hoàn thành theo chuyến</p>
                        <div className="">
                            <FaChartPie className="text-[300px] text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ManageRoute;
