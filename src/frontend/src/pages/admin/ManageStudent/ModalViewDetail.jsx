import React, { useState, useEffect } from "react";
import { getStudentByIdAdmin } from "../../../api/studentApi";

function ModalViewDetail({ isOpen, setIsOpen, studentId }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!studentId) return;

                const res = await getStudentByIdAdmin(studentId);
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [studentId]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            )}

            <div
                className={`fixed left-[65%] transform -translate-x-[65%] transition-all duration-500 ease-out p-8
                ${isOpen ? "top-2/3 -translate-y-2/3 opacity-100 pointer-events-auto" : "top-0 opacity-0 pointer-events-none"}
                bg-white rounded-lg shadow-lg w-[50%] max-h-[80vh] flex flex-col`}
            >
                <p className="text-black text-2xl font-bold text-center mb-4">
                    Thông Tin Học Sinh
                </p>

                {/* BODY SCROLLABLE */}
                <div className="overflow-y-auto pr-1 flex-1">
                    {/* Nếu chưa có dữ liệu */}
                    {!data ? (
                        <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
                    ) : (
                        <>
                            {/* STUDENT INFO */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-2 text-blue-700">Thông tin học sinh</h3>
                                <div className="space-y-1 text-gray-800">
                                    <p><span className="font-medium">Mã học sinh:</span> {data.student.student_id}</p>
                                    <p><span className="font-medium">Tên:</span> {data.student.student_name}</p>
                                    <p><span className="font-medium">Lớp:</span> {data.student.student_class}</p>
                                    <p><span className="font-medium">Địa chỉ điểm đón:</span> {data.student.stop_address || "Chưa cập nhật"}</p>
                                </div>
                            </div>

                            {/* PARENT LIST */}
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-green-700">Thông tin phụ huynh</h3>

                                {data.parents && data.parents.length > 0 ? (
                                    data.parents.map((parent, index) => (
                                        <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                                            <p><span className="font-medium">Họ tên:</span> {parent.parent_name}</p>
                                            <p><span className="font-medium">Số điện thoại:</span> {parent.parent_phone}</p>
                                            <p><span className="font-medium">Email:</span> {parent.parent_email}</p>
                                            <p><span className="font-medium">Quan hệ:</span> {parent.relationship_info}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 italic">Không có thông tin phụ huynh</p>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* FOOTER */}
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
