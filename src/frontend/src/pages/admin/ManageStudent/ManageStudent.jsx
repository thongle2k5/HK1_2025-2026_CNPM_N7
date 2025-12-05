
import React from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaRegEye } from "react-icons/fa"; // Giả sử dùng React Icons
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";

import ModalCreateStudent from "./ModalCreateStudent";
import ModalViewDetail from "./ModalViewDetail";
import ModalUpdateStudent from "./ModalUpdateStudent";
import ModalDelete from "./ModalDelete";

import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { getStudentsAdmin } from '../../../api/studentApi'

function ManageStudent() {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalView, setIsOpenModalView] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const LIMIT_STUDENT = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listStudents, setListStudents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);


  const [studentId, setStudentId] = useState(null);
  const [studentIdDelete, setStudentIdDelete] = useState(null);

  const [statusFilter, setStatusFilter] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    fetchListStudentsWithPaginate(1);
  }, []);

  const fetchListStudentsWithPaginate = async (page, status = statusFilter, kw = keyword) => {
    try {
      const res = await getStudentsAdmin(page, LIMIT_STUDENT, status, kw);
      setListStudents(res.data.students);
      setPageCount(res.data.totalPages);
      setStudentCount(res.data.countStudent);
      setCurrentPage(page);
    } catch (error) {
      alert("ManageStudent.jsx ----- Lỗi ");
    }
  };



  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    fetchListStudentsWithPaginate(selectedPage);
  };

  const handleDelete = (id) => {
    setIsOpenModalDelete(true)
    setStudentIdDelete(id);
  }

  const handleView = (id) => {
    setIsOpenModalView(true)
    setStudentId(id);
  }

  const refreshStudents = () => {
    fetchListStudentsWithPaginate(currentPage);
  };

  const handleChangeStatus = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    fetchListStudentsWithPaginate(1, value);
  };

  const handleSearchClick = () => {
    setKeyword(keywordInput);
    fetchListStudentsWithPaginate(1, statusFilter, keywordInput);
  };

  const handleRefreshClick = () => {
    setKeywordInput("");
    setKeyword("");
    setCurrentPage(1);

    fetchListStudentsWithPaginate(1, statusFilter, "");
  };

  const handleUpdate = (studentId) => {
    setIsOpenModalUpdate(true)
    setStudentId(studentId);
  }

  return (
    // Component này chỉ tập trung vào nội dung trang Học sinh
    <div className="p-4 bg-white">

      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center border-b-2 mb-5 py-5">
        <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Học Sinh</p>

        <div className="flex items-center"  >
          <div className='relative '>
            <input
              type="text"
              placeholder="Tìm kiếm tên học sinh..."
              className="rounded-lg p-2 w-[391px] border border-[#9CA3AF]"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
            <FaSearch
              className="text-lg text-[#9CA3AF] absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleSearchClick} />
          </div>

          <FiRefreshCcw className="cursor-pointer text-lg ml-4" onClick={handleRefreshClick} />



          {/* <button
            onClick={() => setIsOpenModalCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors ml-5"
          >
            <FaPlus className="mr-2" />
            Thêm Học sinh mới
          </button> */}
        </div>
      </div>

      {/* Mấy cái cục thống kê số lượng cơ bản */}
      <div>
        <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <IoIosSchool className='text-5xl' />
            <div className="">
              <p className="text-black">Tổng số học sinh</p>
              <p className="text-2xl font-bold">{studentCount}</p>
            </div>
          </div>


          {/* <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
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
          </div> */}
        </div>
      </div>

      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white rounded-xl mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className='flex justify-between items-center space-x-4 '>
            <select
              className="border px-3 py-2 rounded cursor-pointer"
              value={statusFilter}
              onChange={handleChangeStatus}
            >
              <option value="all">Tất cả</option>
              <option value="boarded">Đang trên xe</option>
              <option value="waiting">Chờ đón</option>
              <option value="missed">Lỡ xe</option>
              <option value="dropped_off">Đã xuống xe</option>
            </select>

          </div>

          {/* <div className="flex items-center" >
            <input type="text" placeholder="Tìm kiếm học sinh trong bảng..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
            <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
          </div> */}


        </div>

        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="mb-20 h-[400px]">
          <table className="w-full ">
            <thead className="bg-[#EAF4FF] cursor-pointer h-12">
              <tr>
                <th className=" text-left pl-3"> Mã học sinh</th>
                <th className=" text-left">Họ và tên</th>
                <th className=" text-left">Lớp</th>
                <th className=" text-left">Tuyến đường</th>
                <th className=" text-left">Xe buýt</th>
                <th className=" text-left">Tình trạng</th>
                <th className=" text-left">Liên hệ phụ huynh</th>
                <th className=" text-left"></th>
              </tr>
            </thead>
            <tbody>
              {listStudents && listStudents.length > 0 ? (
                listStudents.map((student, index) => (
                  <tr
                    key={student.student_id || index}
                    className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black cursor-pointer"
                  >
                    <td className="pl-3">{student.student_id}</td>
                    <td>{student.student_name}</td>
                    <td>{student.class}</td>
                    <td>{student.route_name}</td>
                    <td>{student.license_plate}</td>

                    <td>
                      <span
                        className={`rounded-md px-2 py-1 font-bold w-[120px] inline-block ${student.pickup_status === "boarded"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : student.pickup_status === "missed"
                            ? "bg-[#FEE2E2] text-[#B91C1C]"
                            : student.pickup_status === "waiting"
                              ? "bg-[#E6F3FF] text-[#1D4ED8]"
                              : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                      >
                        {student.pickup_status === "boarded"
                          ? "Đang trên xe"
                          : student.pickup_status === "missed"
                            ? "Lỡ xe"
                            : student.pickup_status === "waiting"
                              ? "Chờ đón"
                              : "Đã xuống xe"
                        }
                      </span>
                    </td>
                    <td>{student.parent_phone}</td>

                    <td className="py-2 w-20">
                      <div className="flex space-x-3 justify-center items-center">
                        <FaRegEye
                          className="cursor-pointer text-[#007BFF] text-lg"
                          onClick={() => handleView(+student.student_id)}
                        />
                        <FaPen
                          className="cursor-pointer text-[#EAB308] text-lg"
                          onClick={() => handleUpdate(+student.student_id)}
                        />
                        <FaTrash
                          className="cursor-pointer text-[#dc3545] text-lg"
                          onClick={() => handleDelete(+student.student_id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Không có dữ liệu học sinh
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
      </div>

      <ModalViewDetail isOpen={isOpenModalView} setIsOpen={setIsOpenModalView} studentId={studentId} />
      <ModalUpdateStudent isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} studentId={studentId} refresh={refreshStudents} />
      {/* <ModalCreateStudent isOpen={isOpenModalCreate} setIsOpen={setIsOpenModalCreate} /> */}
      <ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} studentId={studentIdDelete} refresh={refreshStudents} />


    </div>


  );
}

export default ManageStudent;
