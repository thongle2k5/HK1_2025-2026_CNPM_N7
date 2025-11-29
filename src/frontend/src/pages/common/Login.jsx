import React, { useState } from "react";
import { User, Bus, ShieldCheck, Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, SetError] = useState("");
  const roleConfig = {
    parent: {
      title: "Phụ huynh / Học sinh",
      icon: <User className="w-12 h-12 text-blue-600 mb-2" />,
      color: "bg-blue-600 hover:bg-blue-700",
      gradient: "from-blue-500 to-blue-200",
      welcome: "Smart School Bus Tracking",
      placeholderUser: "Mã số học sinh / SĐT phụ huynh",
    },
    driver: {
      title: "Tài xế đưa đón",
      icon: <Bus className="w-12 h-12 text-emerald-600 mb-2" />,
      color: "bg-emerald-600 hover:bg-emerald-700",
      gradient: "from-emerald-500 to-emerald-200",
      welcome: "Cổng thông tin Tài xế",
      placeholderUser: "Mã số tài xế / SĐT",
    },
    admin: {
      title: "Quản trị viên",
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600 mb-2" />,
      color: "bg-indigo-600 hover:bg-indigo-700",
      gradient: "from-indigo-600 to-blue-300",
      welcome: "Hệ thống Quản lý",
      placeholderUser: "Tài khoản quản trị",
    },
  };

  const currentConfig = roleConfig[role];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetError("");
    try {
      // 2. Gọi API (Dùng chung 1 endpoint hoặc switch case nếu endpoint khác nhau)
      // Giả sử backend của bạn dùng chung 1 đường dẫn login và trả về role
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // SỬA LỖI CÚ PHÁP TẠI ĐÂY:
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: role, // Gửi thêm role lên để backend biết đường check
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      switch (role) {
        case "admin":
          navigate("/admin/AdminLayout", { replace: true });
          break;
        case "driver":
          navigate("/driver", { replace: true });
          break;
        case "parent":
          navigate("/parentApp", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);

      alert(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${currentConfig.gradient} transition-all duration-500`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-gray-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-gray-100 rounded-full opacity-50 blur-xl"></div>

        {/* Role Switcher (Tabs) */}
        <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setRole("parent")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
              role === "parent"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Phụ huynh
          </button>
          <button
            onClick={() => setRole("driver")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
              role === "driver"
                ? "bg-white text-emerald-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tài xế
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
              role === "admin"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="flex justify-center transform transition-transform duration-300 hover:scale-110">
            {currentConfig.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentConfig.welcome}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{currentConfig.title}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <input
              type="text"
              name="username"
              placeholder={currentConfig.placeholderUser}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-300 outline-none"
              style={{
                "--tw-ring-color":
                  role === "driver"
                    ? "#10b981"
                    : role === "admin"
                    ? "#4f46e5"
                    : "#2563eb",
              }}
              onChange={handleInputChange}
            />
          </div>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu"
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-300 outline-none"
              style={{
                "--tw-ring-color":
                  role === "driver"
                    ? "#10b981"
                    : role === "admin"
                    ? "#4f46e5"
                    : "#2563eb",
              }}
              onChange={handleInputChange}
            />{" "}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${currentConfig.color}`}
          >
            <LogIn size={20} />
            Đăng nhập
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            Quên mật khẩu?
          </a>
          {/* Chỉ hiện Đăng ký cho Phụ huynh, Admin/Driver thường do hệ thống cấp */}
          {role === "parent" && (
            <a
              href="#"
              className={`font-medium hover:underline`}
              style={{ color: role === "driver" ? "#10b981" : "#2563eb" }}
            >
              Đăng ký ngay
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
