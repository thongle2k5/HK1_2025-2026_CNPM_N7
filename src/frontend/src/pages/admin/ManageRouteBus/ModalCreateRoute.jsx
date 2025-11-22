import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import { createRoute } from "../../../api/routeApi";

function ModalCreateRoute(props) {

    const [routeName, setRouteName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!routeName.trim()) {
            toast.error("Vui lòng nhập tên tuyến đường");
            return;
        }

        try {
            const payload = {
                name: routeName.trim(),
                description: description.trim(),
            };

            const res = await createRoute(payload);

            if (res?.data) {
                toast.success(res.data.message || "Tạo tuyến đường thành công");

                setRouteName("");
                setDescription("");
                props.refresh();
                props.setIsOpen(false);


            }
        } catch (error) {
            console.error(error);
            toast.error(res.data.message || "Tạo tuyến đường thất bại");
        }
    };

    return (
        <>
            {props.isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                ></div>
            )}

            <div
                className={`fixed left-1/2 transform -translate-x-1/2
          transition-all duration-500 ease-out p-12 
          ${props.isOpen ? "top-[40%] -translate-y-1/2 opacity-100 pointer-events-auto" : "top-0 opacity-0 pointer-events-none"}
          bg-white  rounded-lg shadow-2xl w-[50%] `}
            >
                <p className=" text-black text-3xl text-center mb-10">Thêm Tuyến Đường</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Tên tuyến đường"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
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
                            type="text"
                            placeholder="Mô tả tuyến đường"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="
                                border border-gray-300 rounded-lg px-3 py-2.5 w-full
                                text-gray-900 placeholder:text-gray-400
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

export default ModalCreateRoute;