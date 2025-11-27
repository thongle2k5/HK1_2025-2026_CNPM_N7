import { useState, useEffect } from "react";
import { User, Phone, Mail, Shield, Camera } from "lucide-react";

export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        phone: "",
        email: "",
        role: "",
        avatarUrl: "",
        licenseNumber: "",
    });

    // useEffect(() => {
    //     // Lấy thông tin người dùng từ localStorage
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         const parsedUser = JSON.parse(storedUser);
    //         setUser({
    //             name: parsedUser.name || "",
    //             username: parsedUser.username || "",
    //             phone: parsedUser.phone || "",
    //             email: parsedUser.email || "",
    //             role: parsedUser.role || "",
    //             avatarUrl: parsedUser.avatarUrl || "",
    //             licenseNumber: parsedUser.licenseNumber || "",
    //         });
    //     }
    // }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Lấy userId từ localStorage token hoặc userId bạn lưu khi login
                const storedUser = localStorage.getItem("user");
                const userId = storedUser ? JSON.parse(storedUser).userId : null;
                if (!userId) return;

                const res = await fetch(`http://localhost:5000/api/profileDriver?userId=${userId}`);
                if (!res.ok) throw new Error("Không lấy được dữ liệu tài xế");

                const data = await res.json();
                setUser({
                    name: data.name || "",
                    username: data.username || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    role: data.role || "",
                    avatarUrl: data.avatarUrl || "", // nếu BE có avatar
                    licenseNumber: data.license_number || "",
                });
            } catch (err) {
                console.error("Lỗi lấy profile tài xế:", err);
            }
        };

        fetchProfile();
    }, []);


    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md border border-gray-100">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <User size={24} className="text-blue-600" /> Thông tin {user.role === "driver" ? "tài xế" : user.role}
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
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Vai trò</label>
                    <div className="relative">
                        <Shield size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input
                            value={user.role ? (user.role === "driver" ? "Tài xế" : user.role) : ""}
                            disabled
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>

                {/* License */}
                {user.role === "driver" && (
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Số GPLX</label>
                        <input
                            value={user.licenseNumber || ""}
                            disabled
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
