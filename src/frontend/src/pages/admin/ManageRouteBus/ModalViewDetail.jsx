import React, { useState, useEffect } from "react";
import { getRouteByIdAdmin } from "../../../api/routeApi";

function ModalViewDetail({ isOpen, setIsOpen, routeId }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!routeId) return;
                const res = await getRouteByIdAdmin(routeId);
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [routeId, isOpen]);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50"></div>}

            <div
                className={`fixed left-[65%] transform -translate-x-[65%] transition-all duration-500 ease-out 
                p-8 ${isOpen ? "top-2/3 -translate-y-2/3 opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"}
                bg-white rounded-lg shadow-lg w-[50%] max-h-[80vh] flex flex-col`}
            >
                <p className="text-black text-2xl font-bold text-center mb-4">
                    Thông Tin Tuyến Đường
                </p>

                <div className="overflow-y-auto pr-1 flex-1">
                    {!data ? (
                        <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            {/* ROUTE INFO */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-2 text-blue-700">Thông tin tuyến</h3>
                                <div className="space-y-1 text-gray-800">
                                    <p><span className="font-medium">Mã tuyến:</span> {data.route.route_id}</p>
                                    <p><span className="font-medium">Tên tuyến:</span> {data.route.route_name}</p>
                                    <p><span className="font-medium">Mô tả:</span> {data.route.route_description}</p>
                                </div>
                            </div>

                            {/* STOP LIST */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-green-700">Danh sách điểm dừng</h3>

                                {data.stops && data.stops.length > 0 ? (
                                    data.stops.map((stop, index) => (
                                        <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                                            <p><span className="font-medium">Thứ tự điểm dừng:</span> {stop.stop_order}</p>
                                            <p><span className="font-medium">Mã điểm dừng:</span> {stop.stop_id}</p>
                                            <p><span className="font-medium">Địa chỉ:</span> {stop.address}</p>
                                            <p><span className="font-medium">Vĩ độ:</span> {stop.latitude}</p>
                                            <p><span className="font-medium">Kinh độ:</span> {stop.longitude}</p>
                                            <p><span className="font-medium">Thời gian dự kiến đến:</span> {stop.expected_arrive_time}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 italic">Chưa có điểm dừng</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <div className="mt-4 text-right">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </>
    );
}

export default ModalViewDetail;
