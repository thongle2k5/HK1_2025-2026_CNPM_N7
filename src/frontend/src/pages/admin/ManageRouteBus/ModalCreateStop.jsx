import React, { useState } from "react";
import { toast } from "react-toastify";
import { createStopAdmin } from "../../../api/routeApi";

function ModalCreateStop(props) {

    const [expectedArriveTime, setExpectedArriveTime] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    // Chuẩn hóa "HH:MM" -> "HH:MM:00"
    const normalizeTimeToHHMMSS = (timeStr) => {
        if (!timeStr) return timeStr;
        // input type="time" thường trả HH:MM
        if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
            return `${timeStr}:00`;
        }
        return timeStr; // phòng khi browser trả HH:MM:SS
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!address.trim()) {
            toast.error("Vui lòng nhập địa chỉ điểm dừng");
            return;
        }

        if (!latitude) {
            toast.error("Vui lòng nhập vĩ độ (Latitude)");
            return;
        }

        if (!longitude) {
            toast.error("Vui lòng nhập kinh độ (Longitude)");
            return;
        }

        if (!expectedArriveTime) {
            toast.error("Vui lòng chọn thời gian dự kiến đến");
            return;
        }

        const finalTime = normalizeTimeToHHMMSS(expectedArriveTime);

        try {
            const data = {
                route_id: props.routeId,
                expected_arrive_time: finalTime,
                address: address.trim(),
                latitude: latitude,
                longitude: longitude
            };

            const res = await createStopAdmin(data);

            if (res?.data) {
                toast.success(res.data.message);
                closeModal();
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Lỗi khi tạo điểm dừng");
        }
    };

    const closeModal = () => {
        setExpectedArriveTime("");
        setAddress("");
        setLatitude("");
        setLongitude("");
        props.refresh();
        props.setIsOpen(false);
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
                        ? "top-[70%] -translate-y-[70%] opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"
                    }
                    bg-white rounded-lg shadow-2xl w-[50%]`}
            >
                <p className="text-black text-3xl text-center mb-10">
                    Thêm Điểm Dừng
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={props.routeId ?? ""}
                            readOnly
                            className="
                                border border-gray-200 rounded-lg px-3 py-2.5 w-full
                                text-gray-500 bg-gray-100
                            "
                            placeholder="Route ID"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Địa chỉ điểm dừng"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Vĩ độ (Latitude)"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Kinh độ (Longitude)"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                    </div>

                    <div>
                        <input
                            type="time"
                            value={expectedArriveTime}
                            onChange={(e) => setExpectedArriveTime(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition
                            "
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Chọn thời gian dự kiến đến (định dạng HH:MM)
                        </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={closeModal}
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

export default ModalCreateStop;
