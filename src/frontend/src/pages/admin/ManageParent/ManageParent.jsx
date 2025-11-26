// src/pages/admin/DriversPage.jsx

import React from "react";
import { useState, useEffect } from "react";
import { FaBus, FaPlus, FaPen, FaTrash, FaSearch, FaSchool, FaChartPie, FaChartBar, FaUsers, FaCircle, FaRegEye, FaBell } from "react-icons/fa"; // Giả sử dùng React Icons
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { FiRefreshCcw } from "react-icons/fi";

import ModalCreateParent from "./ModalCreateParent";
import ModalViewDetail from "./ModalViewDetail";
import ModalUpdateParent from "./ModalUpdateParent";
import ModalDelete from "./ModalDelete";
import ChatBox from "./ChatBox";

import { getParentsAdmin } from '../../../api/parentApi';
import ReactPaginate from "react-paginate";

function ManageParent() {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalView, setIsOpenModalView] = useState(false);
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

  const LIMIT_PARENT = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParents, setListParents] = useState([]);

  const [parentId, setParentId] = useState(null);
  const [parentIdDelete, setParentIdDelete] = useState(null);

  const [parentCount, setParentCount] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [keywordInput, setKeywordInput] = useState("");


  useEffect(() => {
    fetchListParentsWithPaginate(1);
  }, []);

  const fetchListParentsWithPaginate = async (page, kw = keyword) => {
    try {
      const res = await getParentsAdmin(page, LIMIT_PARENT, kw);
      setListParents(res.data.parents);
      setPageCount(res.data.totalPages);
      if (res.data.countParent !== undefined) {
        setParentCount(res.data.countParent);
      }
      setCurrentPage(page);
    } catch (error) {
      alert("ManageParent.jsx ----- Lỗi ");
    }
  };



  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
    fetchListParentsWithPaginate(selectedPage);
  };

  const handleDelete = (id) => {
    setIsOpenModalDelete(true)
    setParentIdDelete(id);
  }

  const handleView = (id) => {
    setIsOpenModalView(true)
    setParentId(id);
  }

  const refreshParents = () => {
    fetchListParentsWithPaginate(currentPage);
  };


  const handleSearchClick = () => {
    setKeyword(keywordInput);
    fetchListParentsWithPaginate(1, keywordInput);
  };

  const handleRefreshClick = () => {
    setKeywordInput("");
    setKeyword("");
    setCurrentPage(1);

    fetchListParentsWithPaginate(1, "");
  };

  const [chatParent, setChatParent] = useState(null);

  const handleOpenChat = (parent) => {
    setChatParent(parent);
  };


  return (
    // Component này chỉ tập trung vào nội dung trang Phụ huynh
    <div className="p-4 bg-white">

      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center border-b-2 mb-5 py-5">
        <p className="font-bold text-2xl text-[#007BFF]">Quản Lý Phụ Huynh</p>

        <div className="flex items-center"  >
          <div className='relative '>
            <input type="text" placeholder="Tìm kiếm phụ huynh..."
              className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF] "
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
            <FaSearch
              className="text-lg text-[#9CA3AF] absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
          <FiRefreshCcw className="cursor-pointer text-lg ml-4" onClick={handleRefreshClick} />


          {/* <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors ml-5"
            onClick={() => setIsOpenModalCreate(true)}
          >
            <FaPlus className="mr-2" />
            Thêm phụ huynh mới
          </button> */}
        </div>
      </div>

      {/* Mấy cái cục thống kê số lượng cơ bản */}
      <div>
        <div className="grid grid-cols-4 py-10 space-x-5 mb-5">
          <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
            <FaUsers className='text-5xl' />
            <div className="">
              <p className="text-black">Tổng số phụ huynh</p>
              <p className="text-2xl font-bold">{parentCount}</p>
            </div>
          </div>


          {/* <div className="bg-[#EAF4FF] px-3 py-3 flex gap-7 rounded-md items-center">
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
          </div> */}
        </div>
      </div>

      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white rounded-xl mb-10">
        <div className="flex justify-between items-center mb-5">

          {/* <div className="flex items-center" >
            <input type="text" placeholder="Tìm kiếm phụ huynh trong bảng..." className=" border border-[#9CA3AF] rounded-lg p-2 w-[320px]" />
            <FaSearch className="-translate-x-8 text-lg text-[#9CA3AF]" />
            <FiRefreshCcw className="text-2xl" />
          </div> */}


        </div>

        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="mb-20 h-[400px]">
          <table className="w-full cursor-pointer">
            <thead className="bg-[#EAF4FF] h-12 ">
              <tr>
                <th className=" text-left pl-3 ">Mã phụ huynh</th>
                <th className=" text-left">Họ và tên</th>
                <th className=" text-left">Số điện thoại</th>
                <th className=" text-left">Email</th>
                <th className=" text-left">Học sinh liên kết</th>
                {/* <th className=" text-left">
                  Trạng thái
                </th> */}
                <th className=" text-left"></th>
              </tr>
            </thead>
            <tbody>
              {listParents && listParents.length > 0 ? (

                listParents.map((parent, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black">
                    <td className="pl-3">{parent.parent_id}</td>
                    <td>{parent.name}</td>
                    <td>{parent.phone}</td>
                    <td>{parent.email}</td>
                    <td>{parent.student_ids.join(", ")}</td>

                    <td className="py-2 w-20">
                      <div className="flex space-x-3 justify-center items-center">
                        <FaRegEye className="cursor-pointer text-[#007BFF] text-lg" onClick={() => handleView(+parent.parent_id)} />
                        {/* <FaPen className="cursor-pointer text-[#EAB308] text-lg" onClick={() => setIsOpenModalUpdate(true)} /> */}
                        <FaTrash className="cursor-pointer text-[#dc3545] text-lg" onClick={() => handleDelete(+parent.parent_id)} />
                        <IoChatbox className="cursor-pointer text-green-600 text-lg" onClick={() => handleOpenChat(parent)} />
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
      </div>

      {/* <ModalCreateParent isOpen={isOpenModalCreate} setIsOpen={setIsOpenModalCreate} /> */}
      <ModalViewDetail isOpen={isOpenModalView} setIsOpen={setIsOpenModalView} parentId={parentId} />
      <ModalUpdateParent isOpen={isOpenModalUpdate} setIsOpen={setIsOpenModalUpdate} />
      <ModalDelete isOpen={isOpenModalDelete} setIsOpen={setIsOpenModalDelete} parentId={parentIdDelete} refresh={refreshParents} />

      {chatParent && (
        <ChatBox parent={chatParent} onClose={() => setChatParent(null)} />
      )}
    </div>
  );
}

export default ManageParent;
