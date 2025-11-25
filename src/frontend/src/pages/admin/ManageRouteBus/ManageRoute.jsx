// src/pages/admin/DriversPage.jsx

import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye, FaRoad, FaPauseCircle } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";

import { PiStudentFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import ModalCreateRoute from "./ModalCreateRoute";
import ModalViewDetail from "./ModalViewDetail";
import ModalUpdateRoute from "./ModalUpdateRoute";
import ModalDelete from "./ModalDelete";
import ModalCreateStop from "./ModalCreateStop";

import { getRoutesAdmin } from '../../../api/routeApi'


function ManageRoute() {
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalView, setIsOpenModalView] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenModalCreateStop, setIsOpenModalCreateStop] = useState(false);

    const LIMIT_ROUTE = 10;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [listRoutes, setListRoutes] = useState([]);
    const [routeCount, setRouteCount] = useState(0);

    const [routeId, setRouteId] = useState(null);
    const [routeIdDelete, setRouteIdDelete] = useState(null);

    const [keyword, setKeyword] = useState("");
    const [keywordInput, setKeywordInput] = useState("");

    useEffect(() => {
        fetchListRoutesWithPaginate(1);
    }, []);

    const fetchListRoutesWithPaginate = async (page, kw = keyword) => {
        try {
            const res = await getRoutesAdmin(page, LIMIT_ROUTE, kw);
            setListRoutes(res.data.routes);
            setPageCount(res.data.totalPages);
            setRouteCount(res.data.countRoute);
            // console.log(res)
        } catch (error) {
            alert("ManageRoute.jsx ----- Lỗi ");
        }
    };



    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
        fetchListRoutesWithPaginate(selectedPage);
    };

    const handleDelete = (id) => {
        setIsOpenModalDelete(true)
        setRouteIdDelete(id);
    }


    const handleView = (id) => {
        setIsOpenModalView(true)
        setRouteId(id);
    }

    const refreshRoutes = () => {
        fetchListRoutesWithPaginate(currentPage);
    };

    const handleCreateStop = (id) => {
        setIsOpenModalCreateStop(true)
        setRouteId(id);
        // console.log("Route ID để tạo điểm dừng:", id);
    }

    const handleUpdate = (id) => {
        setIsOpenModalUpdate(true)
        setRouteId(id);
    };

    const handleSearchClick = () => {
        setKeyword(keywordInput);
        fetchListRoutesWithPaginate(1, keywordInput);
    };

    const handleRefreshClick = () => {
        setKeywordInput("");
        setKeyword("");
        setCurrentPage(1);

        fetchListRoutesWithPaginate(1, "");
    };


    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-4 bg-white">

            {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
            <div className="flex justify-between items-center border-b-2 mb-5 py-5">
                <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Tuyến Đường</p>

                <div className="flex items-center"  >


                    <div className='relative '>
                        <input
                            type="text" placeholder="Tìm kiếm tuyến đường..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                        />
                        <FaSearch
                            className="text-lg text-[#9CA3AF] absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={handleSearchClick}
                        />
                    </div>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors ml-5"
                        onClick={() => setIsOpenModalCreate(true)}>
                        <FaPlus className="mr-2" />
                        Thêm tuyến Mới
                    </button>
                    <FiRefreshCcw className="cursor-pointer text-lg ml-4" onClick={handleRefreshClick} />

                </div>
            </div>

            {/* Mấy cái cục thống kê số lượng cơ bản */}
            <div>
                <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
                    <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
                        <FaRoad className='text-5xl' />
                        <div className="">
                            <p className="text-black">Tổng số tuyến đường</p>
                            <p className="text-2xl font-bold">{routeCount}</p>
                        </div>
                    </div>


                    {/* <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
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
                    </div> */}
                </div>
            </div>

            {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
            <div className="bg-white rounded-xl mb-10">
                <div className="flex justify-between items-center mb-5">
                    {/* <div className='flex justify-between items-center space-x-4'>
                        <p className='text-black'>Lọc trạng thái:</p>
                        <button className='bg-[#EFEFEF] text-black py-2 px-4 rounded-md w-[160px]'>def</button>
                    </div> */}

                    {/* <div className="flex items-center" >
                        <input type="text" placeholder="Tìm kiếm tuyến đường..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
                        <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
                    </div> */}


                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="mb-20 h-[400px]">
                    <table className="w-full cursor-pointer">
                        <thead className="bg-[#EAF4FF] h-12 ">
                            <tr>
                                <th className=" text-left pl-3">Mã tuyến</th>
                                <th className=" text-left">Tên tuyến</th>
                                <th className=" text-left">Số xe buýt</th>
                                <th className=" text-left">Số tài xế</th>
                                <th className=" text-left">Số học sinh</th>
                                {/* <th className=" text-left">Trạng thái</th> */}
                                <th className=" text-left"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listRoutes && listRoutes.length > 0 ? (
                                    listRoutes.map((route, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black"
                                        >
                                            <td className="pl-3">{route.route_id}</td>
                                            <td>{route.name}</td>
                                            <td>{route.count_bus}</td>
                                            <td>{route.count_driver}</td>
                                            <td>{route.count_student}</td>

                                            {/* ACTION BUTTONS */}
                                            <td className="py-2 w-20">
                                                <div className="flex space-x-3 justify-center items-center">
                                                    <FaPlus
                                                        className="cursor-pointer text-[#28a745] text-lg"
                                                        onClick={() => handleCreateStop(+route.route_id)}

                                                    />
                                                    <FaRegEye
                                                        className="cursor-pointer text-[#007BFF] text-lg"
                                                        onClick={() => handleView(+route.route_id)}
                                                    />
                                                    <FaPen
                                                        className="cursor-pointer text-[#EAB308] text-lg"
                                                        onClick={() => handleUpdate(+route.route_id)}
                                                    />
                                                    <FaTrash
                                                        className="cursor-pointer text-[#dc3545] text-lg"
                                                        onClick={() => handleDelete(+route.route_id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-gray-500">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                        </tbody>

                    </table>
                </div>

                {pageCount > 1 && (<div className="my-10">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< prev"
                        containerClassName="flex justify-center items-center mt-4 space-x-2 text-sm"
                        pageClassName="border border-gray-300 rounded"
                        pageLinkClassName="px-3 py-1 block hover:bg-gray-200"
                        activeClassName="bg-blue-500 text-white"
                        forcePage={currentPage - 1}
                    />
                </div>
                )}


                {/* Biểu đồ thống kê */}
                {/* <div className="flex justify-between items-center space-x-7">
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

                
                </div> */}
            </div>
            <ModalCreateRoute isOpen={isOpenModalCreate} setIsOpen={setIsOpenModalCreate} refresh={refreshRoutes} />
            <ModalViewDetail isOpen={isOpenModalView} setIsOpen={setIsOpenModalView} routeId={routeId} />
            <ModalUpdateRoute isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} routeId={routeId} refresh={refreshRoutes} />
            <ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} routeId={routeIdDelete} refresh={refreshRoutes} />
            <ModalCreateStop isOpen={isOpenModalCreateStop} setIsOpen={setIsOpenModalCreateStop} routeId={routeId} refresh={refreshRoutes} />

        </div>
    );
}

export default ManageRoute;
