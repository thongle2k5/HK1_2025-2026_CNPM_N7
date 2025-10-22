import React from "react";
function BusScheduleForm({ formdata, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col m-4">
      <label htmlFor="" className="text-gray-900 my-2">
        Nhập tuyến đường
      </label>
      <input
        type="text"
        name="td"
        value={formdata.td}
        onChange={onInputChange}
        className="outline-none bg-gray-200 rounded-lg p-2 text-gray-900 "
      />
      <label htmlFor="" className="text-gray-900 my-2  ">
        Nhập xe buýt
      </label>
      <input
        type="text"
        name="xe"
        value={formdata.xe}
        onChange={onInputChange}
        className="outline-none bg-gray-200 rounded-lg p-2 text-gray-900 "
      />
      <label htmlFor="" className="text-gray-900 my-2">
        Nhập tài xế
      </label>
      <input
        type="text"
        name="tx"
        value={formdata.tx}
        onChange={onInputChange}
        className="outline-none bg-gray-200 rounded-lg p-2  text-gray-900"
      />
      <div className="my-2">
        <div className="text-gray-900">
          Chọn ngày:
          <input
            type="date"
            name="ngay"
            value={formdata.ngay}
            onChange={onInputChange}
            className="mx-2 border rounded-lg "
          />
        </div>

        <div className="text-gray-900 my-2">
          chọn giờ:
          <input
            type="time"
            name="gio"
            value={formdata.gio}
            onChange={onInputChange}
            className="mx-2 text-gray-900 rounded-lg border"
          />
        </div>
      </div>
      <div className="">
        <button
          type="submit"
          className="border p-2 bg-blue-500 rounded-lg text-white"
        >
          Lưu lịch trình
        </button>
        <button
          type="reset"
          className="border p-2 bg-white border text-gray-900 rounded-lg mx-6"
        >
          Xoá form
        </button>
      </div>
    </form>
  );
}
export default BusScheduleForm;
