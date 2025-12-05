// src/pages/admin/DriversPage.jsx

import { useState, useEffect } from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye, FaTelegramPlane, FaClock, FaChartLine } from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { FiRefreshCcw } from "react-icons/fi";

import { IoIosSchool, IoIosWarning } from "react-icons/io";
import ReactPaginate from "react-paginate";

import ModalCreateAssignment from "./ModalCreateAssignment";
import ModalUpdateAssignment from "./ModalUpdateAssignment"
import ModalDelete from "./ModalDelete"

import { getAssignmentsAdmin } from '../../../api/assignmentApi'

function ManageAssignment() {

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalView, setIsOpenModalView] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);



    const LIMIT_ASSIGNMENT = 10;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [listAssignments, setListAssignments] = useState([]);
    const [assignmentIdDelete, setAssignmentIdDelete] = useState(null);
    const [id, setId] = useState(null);

    const [statusFilter, setStatusFilter] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [keywordInput, setKeywordInput] = useState("");

    useEffect(() => {
        fetchListAssignmentsWithPaginate(1);
    }, []);

    const fetchListAssignmentsWithPaginate = async (page, status = statusFilter, kw = keyword) => {
        try {
            const res = await getAssignmentsAdmin(page, LIMIT_ASSIGNMENT, status, kw);
            setListAssignments(res.data.assignments);
            setPageCount(res.data.totalPages);
            // console.log(res)
            setCurrentPage(page);
        } catch (error) {
            alert("ManageAssignment.jsx ----- Lỗi ");
        }
    };


    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        setCurrentPage(selectedPage);
        fetchListAssignmentsWithPaginate(selectedPage);
    };
    const handleDelete = (id) => {
        setIsOpenModalDelete(true)
        setAssignmentIdDelete(id);
    }

    const refreshAssignments = () => {
        fetchListAssignmentsWithPaginate(currentPage);
    };

    const handleUpdate = (id) => {
        setIsOpenModalUpdate(true);
        setId(id);
    };

    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setStatusFilter(value);
        fetchListAssignmentsWithPaginate(1, value);
    };

    const handleSearchClick = () => {
        setKeyword(keywordInput);
        fetchListAssignmentsWithPaginate(1, statusFilter, keywordInput);
    };

    const handleRefreshClick = () => {
        setKeywordInput("");
        setKeyword("");
        setCurrentPage(1);

        fetchListAssignmentsWithPaginate(1, statusFilter, "");
    };


    return (
        // Component này chỉ tập trung vào nội dung trang Học sinh
        <div className="p-4 bg-white">

            {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
            <div className="flex justify-between items-center border-b-2 mb-14 py-5">
                <p className="font-bold text-2xl text-[#007BFF]">Phân Công Tài Xế - Xe Buýt - Tuyến Đường</p>

                <div className="flex items-center"  >
                    <div className='relative '>
                        <input
                            type="text" placeholder="Tìm kiếm phân công..." className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)} />
                        <FaSearch
                            className="text-lg text-[#9CA3AF] absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={handleSearchClick} />
                    </div>

                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors ml-5"
                        onClick={() => setIsOpenModalCreate(true)}>
                        <FaPlus className="mr-2" />
                        Thêm phân công mới
                    </button>

                    <FiRefreshCcw className="cursor-pointer text-lg ml-4" onClick={handleRefreshClick} />

                </div>
            </div>

            {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
            <div className="bg-white rounded-xl mb-10">
                <div className="flex justify-between items-center mb-5">
                    <div className='flex justify-between items-center space-x-4'>
                        <select
                            className="border px-3 py-2 rounded cursor-pointer"
                            value={statusFilter}
                            onChange={handleChangeStatus}
                        >
                            <option value="all">Tất cả</option>
                            <option value="pending">Đang chờ</option>
                            <option value="in progress">Đang tiến hành</option>
                            <option value="completed">Hoàn thành</option>
                        </select>
                    </div>
                </div>

                {/* Giả lập vị trí của Bảng Dữ liệu */}
                <div className="mb-20 h-[400px]">
                    <table className="w-full cursor-pointer">
                        <thead className="bg-[#EAF4FF]  h-12 ">
                            <tr>
                                <th className=" text-left pl-3">Mã phân công</th>
                                <th className=" text-left">Tên tài xế</th>
                                <th className=" text-left">Mã xe buýt</th>
                                <th className=" text-left">Tên tuyến đường</th>
                                <th className=" text-left">Ngày</th>
                                <th className=" text-left">Giờ bắt đầu</th>
                                <th className=" text-left">Giờ kết thúc</th>
                                <th className=" text-left">Trạng thái</th>
                                <th className=" text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listAssignments && listAssignments.length > 0 ? (
                                listAssignments.map((assignment, index) => (
                                    <tr key={index} className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                                        <td className="pl-3">{assignment.schedule_id}</td>
                                        <td>{assignment.driver_name}</td>
                                        <td>{assignment.bus_id}</td>
                                        <td>{assignment.route_name}</td>
                                        <td>{assignment.date}</td>
                                        <td>{assignment.start_time}</td>
                                        <td>{assignment.end_time}</td>
                                        <td>
                                            <span
                                                className={`
                                                rounded-md px-2 py-1 font-bold inline-block w-[150px]
                                                ${assignment.status === "pending"
                                                        ? "bg-[#F3F4F6] text-[#6B7280]"
                                                        : assignment.status === "in progress"
                                                            ? "bg-[#E6F3FF] text-[#1D4ED8]"
                                                            : "bg-[#DCFCE7] text-[#15803D]"
                                                    }
                                            `}
                                            >
                                                {assignment.status === "pending"
                                                    ? "Đang chờ"
                                                    : assignment.status === "in progress"
                                                        ? "Đang tiến hành"
                                                        : "Hoàn thành"}
                                            </span>
                                        </td>

                                        <td className="py-2 w-20">
                                            <div className="flex space-x-3 justify-center items-center">
                                                <FaPen className="cursor-pointer text-[#007BFF] text-lg" onClick={() => handleUpdate(+assignment.schedule_id)} />
                                                <FaTrash className="cursor-pointer text-[#dc3545] text-lg" onClick={() => handleDelete(+assignment.schedule_id)} />
                                                {/* <FaClock className="cursor-pointer text-[#EAB308] text-lg" /> */}
                                                {/* <FaTelegramPlane className="cursor-pointer text-[#16A34A] text-lg" /> */}
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
                        <p className="text-xl mb-4 font-bold">Tỷnom  lệ phân công theo trạng thái</p>
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
                </div> */}
            </div>

            <ModalCreateAssignment isOpen={isOpenModalCreate} setIsOpen={setIsOpenModalCreate} refresh={refreshAssignments} />
            <ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} assignmentId={assignmentIdDelete} refresh={refreshAssignments} />
            <ModalUpdateAssignment isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} assignmentId={id} refresh={refreshAssignments} />
        </div>
    );
}

export default ManageAssignment;
