import React, { useState } from "react";
import { toast } from "react-toastify";
import { createAssignmentAdmin } from "../../../api/assignmentApi";

function ModalCreateAssignment(props) {
    const [routeId, setRouteId] = useState("");
    const [busId, setBusId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!routeId || !busId || !driverId || !date || !startTime || !endTime) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            const data = {
                route_id: Number(routeId),
                bus_id: Number(busId),
                driver_id: Number(driverId),
                date: date,
                start_time: startTime,
                end_time: endTime,
            };

            const res = await createAssignmentAdmin(data);
            toast.success(res.data.message);

            setRouteId("");
            setBusId("");
            setDriverId("");
            setDate("");
            setStartTime("");
            setEndTime("");

            props.refresh && props.refresh();
            props.setIsOpen(false);

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <>
            {props.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div
                className={`fixed left-[65%] transform -translate-x-[65%]
          transition-all duration-500 ease-out p-12     
          ${props.isOpen
                        ? "top-2/3 -translate-y-2/3 opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"}
          bg-white rounded-lg shadow-2xl w-[50%] max-h-[80vh] overflow-y-auto`}
            >
                <p className="text-black text-3xl text-center mb-10">
                    Tạo phân công mới
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Route ID */}
                    <div>
                        <input
                            type="number"
                            placeholder="Route ID"
                            value={routeId}
                            onChange={(e) => setRouteId(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    {/* Bus ID */}
                    <div>
                        <input
                            type="number"
                            placeholder="Bus ID"
                            value={busId}
                            onChange={(e) => setBusId(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    {/* Driver ID */}
                    <div>
                        <input
                            type="number"
                            placeholder="Driver ID"
                            value={driverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày phân công
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian bắt đầu
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian kết thúc
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => props.setIsOpen(false)}
                            className="
                                px-4 py-2 rounded-lg border border-gray-300
                                text-gray-700 hover:bg-gray-100
                                text-sm font-medium
                                transition
                            "
                        >
                            Đóng
                        </button>

                        <button
                            type="submit"
                            className="
                                bg-blue-600 hover:bg-blue-700
                                text-white px-5 py-2 rounded-lg
                                text-sm font-semibold
                                shadow-sm
                                transition
                            "
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ModalCreateAssignment;
