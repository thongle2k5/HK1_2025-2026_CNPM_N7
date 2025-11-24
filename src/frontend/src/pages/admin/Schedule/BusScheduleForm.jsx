import React from "react";
function BusScheduleForm({
  formdata,
  onInputChange,
  onSubmit,
  driverData,
  busData,
  routeData,

  onReset,
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col m-4">
      <label htmlFor="date" className="text-gray-900 my-2">
        Nhập tuyến đường
      </label>
      <select
        name="route_id"
        id="route_id"
        className="text-black outline-none border p-2"
        value={formdata.route_id}
        onChange={onInputChange}
        required
      >
        <option value="">Chọn tuyến đường</option>
        {routeData.map((route) => (
          <option key={route.route_id} value={route.route_id}>
            {route.name}
          </option>
        ))}
      </select>
      <label htmlFor="" className="text-gray-900 my-2  ">
        Nhập xe buýt
      </label>
      <select
        name="bus_id"
        id="bus_id"
        className="text-black outline-none border p-2"
        value={formdata.bus_id}
        onChange={onInputChange}
        required
      >
        <option value="">Chọn xe buýt</option>
        {busData.map((bus) => (
          <option key={bus.bus_id} value={bus.bus_id}>
            {bus.license_plate}
          </option>
        ))}
      </select>
      <label htmlFor="" className="text-gray-900 my-2">
        Nhập tài xế
      </label>
      <select
        name="driver_id"
        id="driver_id"
        className="text-black outline-none border p-2"
        onChange={onInputChange}
        value={formdata.driver_id}
        required
      >
        <option value="">Chọn tài xế</option>
        {driverData.map((driver) => (
          <option key={driver.driver_id} value={driver.driver_id}>
            {driver.name}
          </option>
        ))}
      </select>
      <div className="my-2">
        <div className="text-gray-900">
          Chọn ngày:
          <input
            type="date"
            name="date"
            value={formdata.date}
            onChange={onInputChange}
            className="mx-2 border rounded-lg "
          />
        </div>

        <div className="text-gray-900 my-2">
          <div>
            <label htmlFor="start_time" className="text-gray-900 my-2">
              Chọn giờ bắt đầu:
            </label>
            <input
              type="time"
              name="start_time"
              id="start_time"
              className="text-black outline-none border p-1 m-2 rounded-xl"
              value={formdata.start_time}
              onChange={onInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="end_time" className="text-gray-900 my-2">
              Chọn giờ kết thúc:
            </label>
            <input
              type="time"
              name="end_time"
              id="end_time"
              className="text-black outline-none border p-1 mx-2  rounded-xl"
              value={formdata.end_time}
              onChange={onInputChange}
              required
            />
          </div>
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
          onClick={onReset}
          className="border p-2 bg-white border text-gray-900 rounded-lg mx-6"
        >
          Xoá form
        </button>
      </div>
    </form>
  );
}
export default BusScheduleForm;
