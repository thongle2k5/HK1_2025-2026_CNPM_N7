// src/pages/admin/DriversPage.jsx
import io from "socket.io-client";
import React from "react";
import {
  FaBus,
  FaPlus,
  FaPen,
  FaTrash,
  FaSearch,
  FaSchool,
  FaChartPie,
  FaChartBar,
  FaRegEye,
  FaPauseCircle,
  FaToggleOn,
} from "react-icons/fa"; // Giả sử dùng React Icons
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { IoIosSchool, IoIosWarning } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { getAdminLocations } from "../../../api/locationApi";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import LiveMapSection from "./LiveMapSection";

const socket = io.connect("http://localhost:5000");
function ManageLocation() {
  const LIMIT_LOCATION = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [listLocations, setListLocations] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  useEffect(() => {
    fetchListLocationsWithPaginate(1);
  }, []);
  useEffect(() => {
    // Lắng nghe sự kiện nhận vị trí
    socket.on("receive_location", (data) => {
      console.log("Cập nhật xe:", data.bus_license);

      setBusLocations((prev) => ({
        ...prev,
        [data.bus_license]: data, // Cập nhật hoặc thêm mới xe vào danh sách
      }));
    });

    return () => {
      socket.off("receive_location");
    };
  }, []);
  const fetchListLocationsWithPaginate = async (page, kw = keyword) => {
    try {
      const res = await getAdminLocations(page, LIMIT_LOCATION, kw);
      setListLocations(res.data.locations);
      setPageCount(res.data.totalPages);
      setCurrentPage(page);
      // console.log(res)
    } catch (error) {
      alert("ManageLocation.jsx ----- Lỗi ");
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    fetchListLocationsWithPaginate(selectedPage);
  };

  const handleDelete = () => {};

  const handleSearchClick = () => {
    setKeyword(keywordInput);
    fetchListLocationsWithPaginate(1, keywordInput);
  };

  const handleRefreshClick = () => {
    setKeywordInput("");
    setKeyword("");
    setCurrentPage(1);

    fetchListLocationsWithPaginate(1, "");
  };

  return (
    // Component này chỉ tập trung vào nội dung trang Học sinh
    <div className="p-4 bg-white">
      {/* TIÊU ĐỀ TRANG VÀ NÚT THÊM MỚI */}
      <div className="flex justify-between items-center border-b-2 mb-5 py-5">
        <p className="font-bold text-2xl text-[#007BFF]">
          Cập Nhật Vị Trí Xe Buýt
        </p>

        <div className="flex items-center">
          <div className="relative ">
            <input
              type="text"
              placeholder="Tìm theo mã xe hoặc tài xế..."
              className=" rounded-lg p-2 w-[391px] border border-[#9CA3AF]"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
            />
            <FaSearch
              className="text-lg text-[#9CA3AF] absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition-colors ml-5">
            <FiRefreshCcw className="mr-2" />
            Làm mới vị trí
          </button>

          <FiRefreshCcw
            className="cursor-pointer text-lg ml-4"
            onClick={handleRefreshClick}
          />
        </div>
      </div>

      {/* Mấy cái cục thống kê số lượng cơ bản */}
      {/* <div>
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
            </div> */}

      {/* KHU VỰC CHỨA BẢNG VÀ CHỨC NĂNG */}
      <div className="bg-white rounded-xl mb-10">
        {/* Giả lập vị trí của Bảng Dữ liệu */}
        <div className="mb-20 h-[400px]">
          <table className="w-full cursor-pointer">
            <thead className="bg-[#EAF4FF] h-12">
              <tr>
                <th className=" text-left pl-3">Mã xe buýt</th>
                <th className=" text-left">Tài xế</th>
                <th className=" text-left">Tuyến đường</th>
                <th className=" text-left">Tọa độ hiện tại</th>
                <th className=" text-left">Trạng thái</th>
                <th className=" text-left">Thời gian cập nhật cuối</th>
                <th className=" text-left"></th>
              </tr>
            </thead>
            <tbody>
              {listLocations && listLocations.length > 0 ? (
                listLocations.map((loc, index) => {
                  const coordinates = `${loc.latitude}, ${loc.longitude}`;

                  const dateObj = new Date(loc.timestamp);
                  const formattedTime = dateObj.toLocaleTimeString("vi-VN", {
                    hour12: false,
                  });
                  const formattedDate = dateObj.toLocaleDateString("vi-VN");
                  const dateDisplay = `${formattedTime} ${formattedDate}`;

                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 border-b border-gray-300 last:border-0 h-10 text-black"
                    >
                      <td className="pl-3">{loc.bus_id}</td>
                      <td>{loc.driver_name}</td>
                      <td>{loc.route_name}</td>
                      <td>
                        {coordinates === "null, null"
                          ? "Chưa có tọa độ"
                          : coordinates}
                      </td>

                      <td>
                        <span
                          className={`rounded-md px-2 py-1 font-bold ${
                            loc.status === "active"
                              ? "bg-[#DCFCE7] text-[#15803D]"
                              : loc.status === "inactive"
                              ? "bg-[#F3F4F6] text-[#6B7280]"
                              : loc.status === "maintenance"
                              ? "bg-[#FEF9C3] text-[#A16207]"
                              : "bg-[#FEE2E2] text-[#B91C1C]"
                          }`}
                        >
                          {loc.status === "active"
                            ? "Đang di chuyển"
                            : loc.status === "inactive"
                            ? "Dừng"
                            : loc.status === "maintenance"
                            ? "Bảo trì"
                            : "Mất tín hiệu"}
                        </span>
                      </td>

                      <td>{dateDisplay}</td>

                      <td className="py-2 w-32">
                        <p
                          className="text-bold text-[#007BFF] cursor-pointer"
                          onClick={() => {}}
                        >
                          Xem trên bản đồ
                        </p>
                      </td>
                    </tr>
                  );
                })
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

        {pageCount > 1 && (
          <div className="my-10">
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

        <div className=" mb-5 w-full">
          {/* <div className='w-full  pt-2'>
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
                    </div> */}
          <LiveMapSection />
        </div>
      </div>
    </div>
  );
}

export default ManageLocation;
