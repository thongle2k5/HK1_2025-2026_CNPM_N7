import { useState } from "react";
import { User, Phone, Mail, Shield, Camera } from "lucide-react";

export default function Profile() {
    // Dữ liệu tạm thời mock
    const [user] = useState({
        name: "Nguyễn Văn A",
        username: "nguyenvana",
        phone: "0987654321",
        email: "nguyenvana@example.com",
        role: "driver",
        avatarUrl: "",
        licenseNumber: "123456789",

    });

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-100">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User size={24} className="text-blue-600" /> Thông tin tài xế
            </h2>

            {/* Avatar */}
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <img
                        src={user.avatarUrl || "https://via.placeholder.com/120"}
                        alt="Avatar"
                        className="w-28 h-28 rounded-full border border-gray-200"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
                        <Camera size={16} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Form thông tin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                    <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Số điện thoại */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            value={user.phone}
                            disabled
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên đăng nhập</label>
                    <input
                        value={user.username}
                        disabled
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Role */}
                <div className="space-y-2 ">
                    <label className="text-sm font-medium text-gray-700">Vai trò</label>
                    <div className="relative">
                        <Shield size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            value="Tài xế"
                            disabled
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* License */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Số GPLX</label>
                    <input
                        value={user.licenseNumber}
                        disabled
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                </div>


            </div>
        </div>
    );
}
