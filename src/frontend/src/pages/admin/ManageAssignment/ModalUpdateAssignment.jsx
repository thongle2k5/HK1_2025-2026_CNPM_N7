// src/pages/admin/ModalUpdateAssignment.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getAssignmentByIdAdmin, updateAssignmentAdmin } from "../../../api/assignmentApi";

function ModalUpdateAssignment(props) {
    const { isOpen, setIsOpen, assignmentId, refresh } = props;

    const [scheduleId, setScheduleId] = useState("");
    const [routeId, setRouteId] = useState("");
    const [busId, setBusId] = useState("");
    const [driverId, setDriverId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [status, setStatus] = useState("");

    const [initialData, setInitialData] = useState(null);

    const normalizeTimeToHHMMSS = (timeStr) => {
        if (!timeStr) return timeStr;
        if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
            return `${timeStr}:00`;
        }
        return timeStr;
    };

    // Fetch data khi mở modal
    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen || !assignmentId) return;

            try {
                const res = await getAssignmentByIdAdmin(assignmentId);
                const assignment = res.data?.assignment;
                if (!assignment) return;

                setScheduleId(assignment.schedule_id);
                setRouteId(assignment.route_id?.toString() || "");
                setBusId(assignment.bus_id?.toString() || "");
                setDriverId(assignment.driver_id?.toString() || "");
                setDate(assignment.date || "");

                const start = assignment.start_time ? assignment.start_time.slice(0, 5) : "";
                const end = assignment.end_time ? assignment.end_time.slice(0, 5) : "";
                setStartTime(start);
                setEndTime(end);
                setStatus(assignment.status || "");

                setInitialData({
                    schedule_id: assignment.schedule_id,
                    route_id: assignment.route_id?.toString() || "",
                    bus_id: assignment.bus_id?.toString() || "",
                    driver_id: assignment.driver_id?.toString() || "",
                    date: assignment.date || "",
                    start_time: start,
                    end_time: end,
                    status: assignment.status || "",
                });
            } catch (error) {
                console.error("Error fetching assignment:", error);
                toast.error("Không tải được dữ liệu phân công");
            }
        };

        fetchData();
    }, [isOpen, assignmentId]);


    const hasChanged = () => {
        if (!initialData) return false;

        const current = {
            schedule_id: scheduleId,
            route_id: routeId.toString().trim(),
            bus_id: busId.toString().trim(),
            driver_id: driverId.toString().trim(),
            date: date,
            start_time: startTime,
            end_time: endTime,
            status: status.trim(),
        };

        return JSON.stringify(current) !== JSON.stringify(initialData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!routeId || !busId || !driverId || !date || !startTime || !endTime || !status) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!hasChanged()) {
            toast.info("Không có thay đổi nào để lưu");
            setIsOpen(false);
            return;
        }

        const payload = {
            route_id: Number(routeId),
            bus_id: Number(busId),
            driver_id: Number(driverId),
            date: date,
            start_time: normalizeTimeToHHMMSS(startTime),
            end_time: normalizeTimeToHHMMSS(endTime),
            status: status.trim(),
        };

        try {
            const res = await updateAssignmentAdmin(scheduleId, payload);
            toast.success(res?.data?.message);

            refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating assignment:", error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50"></div>}

            <div
                className={`
          fixed left-[65%] top-2/3 transform -translate-x-[65%] -translate-y-2/3
          transition-all duration-300 ease-out p-10
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
          bg-white rounded-lg shadow-lg w-[50%] max-h-[80vh] overflow-y-auto
        `}
            >
                <p className="text-black text-3xl text-center mb-8">
                    Cập Nhật Phân Công
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Mã phân công */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Mã phân công
                        </label>
                        <input
                            type="text"
                            value={scheduleId}
                            disabled
                            className="border p-2 w-full rounded bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Route ID */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Route ID
                        </label>
                        <input
                            type="number"
                            value={routeId}
                            onChange={(e) => setRouteId(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Bus ID */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Bus ID
                        </label>
                        <input
                            type="number"
                            value={busId}
                            onChange={(e) => setBusId(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Driver ID */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Driver ID
                        </label>
                        <input
                            type="number"
                            value={driverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Ngày */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Ngày
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Giờ bắt đầu */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Giờ bắt đầu
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Giờ kết thúc */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Giờ kết thúc
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Trạng thái
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border p-2 w-full rounded"
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={!hasChanged()}
                            className={`
                px-4 py-2 rounded text-white
                ${hasChanged()
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 cursor-not-allowed"}
              `}
                        >
                            Lưu
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ModalUpdateAssignment;
