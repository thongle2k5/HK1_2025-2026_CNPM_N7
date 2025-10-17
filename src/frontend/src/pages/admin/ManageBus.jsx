// src/pages/admin/DriversPage.jsx

import React from 'react';
import { FaBus, FaPlus, FaPen, FaTrash } from 'react-icons/fa'; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

function ManageBus() {
    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-8">

            {/* Tiêu đề Trang */}
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center">
                <FaBus className="mr-3 text-blue-600" />
                Quản lý Xe Buýt
            </h1>

            {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
            <div className="bg-white p-6 shadow-xl rounded-xl">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600 text-lg">Danh sách xe buýt</p>
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center">
                        <FaPlus className="mr-2" /> Thêm Xe Buýt
                    </button>
                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="border border-dashed border-gray-300 h-96  text-black">
                    <table className="border-collapse border border-gray-300 w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left">STT</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Biển Số</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Tài Xế</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Số Ghế</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Trạng Thái</th>
                                <th className="border border-gray-300 py-2 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50 " >
                                <td className="border border-gray-300 px-4 py-2 ">1</td>
                                <td className="border border-gray-300 px-4 py-2 ">51B-12345</td>
                                <td className="border border-gray-300 px-4 py-2 ">Nguyễn Văn Tài</td>
                                <td className="border border-gray-300 px-4 py-2 ">29</td>
                                <td className="border border-gray-300 px-4 py-2 ">Đang Hoạt Động</td>
                                <td className="border border-gray-300 py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaPen className="cursor-pointer text-[#0d6efd] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 ">2</td>
                                <td className="border border-gray-300 px-4 py-2 ">50F-67890</td>
                                <td className="border border-gray-300 px-4 py-2 ">Trần Thị Minh</td>
                                <td className="border border-gray-300 px-4 py-2 ">45</td>
                                <td className="border border-gray-300 px-4 py-2 ">Đang Hoạt Động</td>
                                <td className="border border-gray-300 py-2 w-20">
                                    <div className="flex space-x-3 justify-center items-center">
                                        <FaPen className="cursor-pointer text-[#0d6efd] text-lg" />
                                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center items-center space-x-10 text-gray-600 mt-3 text-lg ">
                    <FcPrevious className='cursor-pointer' />
                    <p className='cursor-pointer'>1</p>
                    <p className='cursor-pointer'>2</p>
                    <p className='cursor-pointer'>3</p>
                    <FcNext className='cursor-pointer' />
                </div>
            </div>



        </div >
    );
}

export default ManageBus;