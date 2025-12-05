import React, { useState, useEffect } from "react";
import { getParentByIdAdmin } from "../../../api/parentApi";

function ModalViewDetail({ isOpen, setIsOpen, parentId }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!parentId) return;
                const res = await getParentByIdAdmin(parentId);
                setData(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [parentId]);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50"></div>}

            <div
                className={`fixed left-[65%] transform -translate-x-[65%] transition-all duration-500 ease-out 
                p-8 ${isOpen ? "top-1/2 -translate-y-1/2 opacity-100 pointer-events-auto"
                        : "top-0 opacity-0 pointer-events-none"}
                bg-white rounded-lg shadow-lg w-[50%] max-h-[80vh] flex flex-col`}
            >
                <p className="text-black text-2xl font-bold text-center mb-4">
                    Thông Tin Phụ Huynh
                </p>

                <div className="overflow-y-auto pr-1 flex-1">
                    {!data ? (
                        <p className="text-center text-gray-600">Đang tải dữ liệu...</p>
                    ) : (
                        <>

                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-2 text-blue-700">Thông tin phụ huynh</h3>
                                <div className="space-y-1 text-gray-800">
                                    <p><span className="font-medium">Họ tên:</span> {data.parent.parent_name}</p>
                                    <p><span className="font-medium">Email:</span> {data.parent.parent_email}</p>
                                    <p><span className="font-medium">Số điện thoại:</span> {data.parent.parent_phone}</p>
                                </div>
                            </div>


                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-green-700">Danh sách học sinh</h3>

                                {data.students && data.students.length > 0 ? (
                                    data.students.map((student, index) => (
                                        <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                                            <p><span className="font-medium">Mã học sinh:</span> {student.student_id}</p>
                                            <p><span className="font-medium">Tên:</span> {student.student_name}</p>
                                            <p><span className="font-medium">Lớp:</span> {student.student_class}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 italic">Chưa có thông tin học sinh</p>
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
