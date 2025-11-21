import React from "react";
import { useState } from "react";

function ModalCreateParent(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [relationship, setRelationship] = useState("");
    const [studentId, setStudentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

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
          ${props.isOpen ? "top-1/2 -translate-y-1/2 opacity-100 pointer-events-auto" : "top-0 opacity-0 pointer-events-none"}
          bg-white  rounded-lg shadow-lg w-[50%]`}
            >
                <p className=" text-black text-3xl text-center mb-10">Thêm Phụ Huynh</p>
                <form onSubmit={handleSubmit} >
                    <input
                        type="text"
                        placeholder="Họ Tên phụ huynh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border p-2 w-full mt-5"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mt-5"
                    />
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border p-2 w-full mt-5"
                    />
                    <input
                        type="text"
                        placeholder="Mối quan hệ với học sinh"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="border p-2 w-full mt-5"
                    />
                    <input
                        type="number"
                        placeholder="Mã học sinh"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border p-2 w-full mt-5"
                    />
                    <div className="flex items-center gap-4 mt-10">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Lưu
                        </button>
                        <button
                            onClick={() => props.setIsOpen(false)}
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

export default ModalCreateParent;