import React from "react";
function BusSchedule() {
  return (
    <div>
      <div className="px-2 py-2 border-b flex justify-between items-center rounded-lg bg-white shadow-md">
        <div>
          <div className="px-4 font-bold text-xl ">Lịch xe buýt</div>
          <div className="px-4 text-xs">
            Quản lý lịch chạy xe, tài xế và đồng bộ dữ liệu lên hệ thống
          </div>
        </div>
        <div className="px-6">
          <button className="bg-blue-500 p-2 rounded-xl text-white">
            Đồng bộ lên hệ thống
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm theo tuyến,xe,tài xế..."
            className="w-[250px] m-4 border p-2 outline-none rounded-3xl text-black"
          />
        </div>
      </div>
      <div className="flex h-screen  mt-4 gap-4 px-4 bg-white">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default BusSchedule;
