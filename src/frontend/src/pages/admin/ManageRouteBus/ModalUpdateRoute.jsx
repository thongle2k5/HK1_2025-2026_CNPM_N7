// src/pages/admin/ModalUpdateRoute.jsx
import React, { useState, useEffect } from "react";
import { updateRouteAdmin, getRouteByIdAdmin } from "../../../api/routeApi";
import { toast } from 'react-toastify';

function ModalUpdateRoute(props) {
    const { isOpen, setIsOpen, routeId } = props;

    const [routeName, setRouteName] = useState("");
    const [description, setDescription] = useState("");
    const [stops, setStops] = useState([]);
    const [initialData, setInitialData] = useState(null);

    const normalizeTimeToHHMMSS = (timeStr) => {
        if (!timeStr) return timeStr;
        if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeStr)) {
            return `${timeStr}:00`;
        }
        return timeStr;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isOpen || !routeId) return;

            try {
                const res = await getRouteByIdAdmin(routeId);
                const data = res?.data;
                if (!data) return;

                const route = data.route;
                const stopsFromApi = data.stops

                setRouteName(route.route_name || "");
                setDescription(route.route_description || "");

                const mappedStops = stopsFromApi.map((s) => {
                    const time =
                        s.expected_arrive_time && typeof s.expected_arrive_time === "string"
                            ? s.expected_arrive_time.slice(0, 5)
                            : "";

                    const lat =
                        s.latitude !== null && s.latitude !== undefined
                            ? String(s.latitude)
                            : "";
                    const lng =
                        s.longitude !== null && s.longitude !== undefined
                            ? String(s.longitude)
                            : "";

                    return {
                        stop_id: s.stop_id,
                        address: s.address || "",
                        latitude: lat,
                        longitude: lng,
                        expected_arrive_time: time,
                        stop_order: s.stop_order,
                    };
                });

                setStops(mappedStops);

                setInitialData({
                    route_name: route.route_name || "",
                    route_description: route.route_description || "",
                    stops: mappedStops.map((s) => ({
                        stop_id: s.stop_id ?? null,
                        address: s.address,
                        latitude: s.latitude,
                        longitude: s.longitude,
                        expected_arrive_time: s.expected_arrive_time,
                        stop_order: s.stop_order,
                    })),
                });
            } catch (error) {
                console.error("Error fetching route:", error);
            }
        };

        fetchData();
    }, [isOpen, routeId]);

    const handleChangeStop = (index, field, value) => {
        setStops((prev) => {
            const newStops = [...prev];
            newStops[index] = {
                ...newStops[index],
                [field]: value,
            };
            return newStops;
        });
    };

    const handleRemoveStop = (index) => {
        setStops((prev) => {
            const newStops = prev.filter((_, i) => i !== index);
            return newStops.map((s, idx) => ({
                ...s,
                stop_order: idx + 1,
            }));
        });
    };

    const hasChanged = () => {
        if (!initialData) return false;

        const current = {
            route_name: routeName.trim(),
            route_description: description.trim(),
            stops: stops.map((s) => ({
                stop_id: s.stop_id ?? null,
                address: s.address,
                latitude: s.latitude,
                longitude: s.longitude,
                expected_arrive_time: s.expected_arrive_time,
                stop_order: s.stop_order,
            })),
        };

        return JSON.stringify(current) !== JSON.stringify(initialData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!routeName.trim()) {
            toast.error("Vui lòng nhập tên tuyến đường");
            return;
        }

        if (!hasChanged()) {
            toast.info("Không có thay đổi nào để lưu");
            setIsOpen(false);
            return;
        }

        const payload = {
            route_id: routeId,
            route_name: routeName.trim(),
            route_description: description.trim(),
            stops: stops.map((s, index) => ({
                stop_id: s.stop_id ?? null,
                address: s.address,
                latitude: s.latitude?.toString().trim(),
                longitude: s.longitude?.toString().trim(),
                expected_arrive_time: normalizeTimeToHHMMSS(
                    s.expected_arrive_time
                ),
                stop_order: s.stop_order || index + 1,
            })),
        };

        try {
            const res = await updateRouteAdmin(payload);

            toast.success(res?.data?.message || "Cập nhật tuyến đường thành công");

            if (props.refresh) {
                props.refresh();
            }

            setIsOpen(false);
        } catch (error) {
            console.error("Error updating route:", error);
            toast.error(
                error?.response?.data?.message ||
                "Cập nhật tuyến đường thất bại"
            );
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div
                className={`
                    fixed left-[70%] top-[80%] transform -translate-x-[70%] -translate-y-[80%]
                    transition-all duration-300 ease-out p-12
                    ${isOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }
                    bg-white rounded-lg shadow-lg w-[60%] max-h-[80vh] overflow-y-auto
                `}
            >
                <p className="text-black text-3xl text-center mb-10">
                    Cập Nhật Thông Tin Tuyến Đường
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Thông tin tuyến đường */}
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-gray-700">
                            Tên tuyến đường
                        </label>
                        <input
                            type="text"
                            placeholder="Tên tuyến đường"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block mb-2 font-semibold text-gray-700">
                            Mô tả tuyến đường
                        </label>
                        <textarea
                            placeholder="Mô tả tuyến đường"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 w-full rounded min-h-[80px]"
                        />
                    </div>

                    {/* Danh sách điểm dừng – chỉ cho chỉnh sửa / xóa, không thêm mới */}
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Danh sách điểm dừng
                        </h3>
                        {/* ĐÃ BỎ NÚT "+ Thêm điểm dừng" */}
                    </div>

                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full text-sm border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-3 py-2 border text-center">Thứ tự</th>
                                    <th className="px-3 py-2 border text-left">Địa chỉ</th>
                                    <th className="px-3 py-2 border text-center">
                                        Thời điểm đến
                                    </th>
                                    <th className="px-3 py-2 border text-center">Vĩ độ</th>
                                    <th className="px-3 py-2 border text-center">Kinh độ</th>
                                    <th className="px-3 py-2 border text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stops.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Chưa có điểm dừng nào
                                        </td>
                                    </tr>
                                )}

                                {stops.map((stop, index) => (
                                    <tr
                                        key={stop.stop_id ?? `new-${index}`}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-2 py-2 border text-center">
                                            <input
                                                type="number"
                                                className="border p-1 w-16 text-center rounded"
                                                value={stop.stop_order}
                                                onChange={(e) =>
                                                    handleChangeStop(
                                                        index,
                                                        "stop_order",
                                                        Number(e.target.value)
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="px-2 py-2 border">
                                            <input
                                                className="border p-1 w-full rounded"
                                                value={stop.address}
                                                onChange={(e) =>
                                                    handleChangeStop(
                                                        index,
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="px-2 py-2 border text-center">
                                            <input
                                                type="time"
                                                className="border p-1 rounded"
                                                value={stop.expected_arrive_time || ""}
                                                onChange={(e) =>
                                                    handleChangeStop(
                                                        index,
                                                        "expected_arrive_time",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="px-2 py-2 border text-center">
                                            <input
                                                className="border p-1 w-full rounded"
                                                value={stop.latitude}
                                                onChange={(e) =>
                                                    handleChangeStop(
                                                        index,
                                                        "latitude",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="px-2 py-2 border text-center">
                                            <input
                                                className="border p-1 w-full rounded"
                                                value={stop.longitude}
                                                onChange={(e) =>
                                                    handleChangeStop(
                                                        index,
                                                        "longitude",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td className="px-2 py-2 border text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveStop(index)}
                                                className="text-red-500 text-sm"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <button
                            type="submit"
                            disabled={!hasChanged()}
                            className={`
                                px-4 py-2 rounded text-white
                                ${hasChanged()
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 cursor-not-allowed"
                                }
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

export default ModalUpdateRoute;
