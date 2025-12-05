import React, { useState, useEffect } from "react";
import { getStudentById, updateStudent } from "../../../api/studentApi";
import { toast } from 'react-toastify';

function ModalUpdateStudent(props) {
    const { isOpen, setIsOpen, studentId, refresh } = props;

    const [name, setName] = useState("");
    const [className, setClassName] = useState("");
    const [stopId, setStopId] = useState("");


    useEffect(() => {
        const fetchStudent = async () => {


            try {
                const res = await getStudentById(studentId);
                const data = res.data;
                setName(data.student_name || "");
                setClassName(data.class || "");
                setStopId(data.stop_id || "");
            } catch (error) {
                console.error("Lỗi khi lấy thông tin học sinh:", error);
            }
        };

        fetchStudent();
    }, [isOpen, studentId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                studentName: name,
                studentClass: className,
                stopId: Number(stopId),
            };

            const res = await updateStudent(studentId, data);

            toast.success(res.data.message);
            props.refresh();
            setIsOpen(false);

        } catch (error) {
            console.error("Lỗi khi cập nhật học sinh:", error);
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div
                className={`fixed left-[65%] transform -translate-x-[65%]
                    transition-all duration-500 ease-out p-12
                    ${isOpen
                        ? "top-[65%] -translate-y-[65%] opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"
                    }
                    bg-white rounded-lg shadow-lg w-[50%]`}
            >
                <p className="text-black text-3xl text-center mb-10">
                    Cập Nhật Thông Tin Học Sinh
                </p>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700">
                            Họ tên
                        </label>
                        <input
                            type="text"
                            placeholder="Họ Tên học sinh"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 mt-5">
                            Lớp
                        </label>
                        <input
                            type="text"
                            placeholder="Lớp"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 mt-5">
                            Mã trạm dừng
                        </label>
                        <input
                            type="number"
                            placeholder="Mã trạm dừng"
                            value={stopId}
                            onChange={(e) => setStopId(e.target.value)}
                            className="border p-2 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4 mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default ModalUpdateStudent;
