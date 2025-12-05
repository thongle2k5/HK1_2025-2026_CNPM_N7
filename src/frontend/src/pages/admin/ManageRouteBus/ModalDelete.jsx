import React from "react";
import { toast } from 'react-toastify';
import { deleteRouteByIdAdmin } from "../../../api/routeApi";

function ModalDelete(props) {

    const handleDelete = async (routeId) => {
        try {
            const res = await deleteRouteByIdAdmin(routeId);

            toast.success(res.data.message);
            props.refresh();
            props.setIsOpen(false);

        } catch (error) {
            toast.error(error.response?.data?.message || "Xóa thất bại. Vui lòng thử lại!");
            console.error("Lỗi khi xóa tuyến đường:", error);
        }
    };

    return (
        <>
            {props.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div
                className={`fixed left-[55%] transform -translate-x-[55%]
          transition-all duration-500 ease-out 
          ${props.isOpen
                        ? "top-[20%] -translate-y-[20%] opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"
                    }
          bg-white rounded-lg shadow-lg z-50
        `}
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 px-6 pt-10 pb-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-6">
                        <h1 className="font-bold text-2xl text-gray-900">
                            Xác nhận xóa tuyến đường
                        </h1>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                        Bạn có chắc chắn muốn xóa tuyến đường có ID:{" "}
                        <span className="font-semibold text-gray-900">
                            {props.routeId}
                        </span>
                        ?
                    </p>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={() => props.setIsOpen(false)}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                        >
                            Đóng
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(props.routeId)}
                            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 shadow-sm transition"
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalDelete;
