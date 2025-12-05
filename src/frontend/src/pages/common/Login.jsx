import React, { useState } from "react";
import {
  User,
  Bus,
  ShieldCheck,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // State quản lý chế độ: true = Đăng nhập, false = Đăng ký
  const [isLogin, setIsLogin] = useState(true);

  const [role, setRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mở rộng formData để chứa thêm thông tin đăng ký
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const roleConfig = {
    parent: {
      title: isLogin ? "Phụ huynh / Học sinh" : "Đăng ký tài khoản Phụ huynh",
      icon: <User className="w-12 h-12 text-blue-600 mb-2" />,
      color: "bg-blue-600 hover:bg-blue-700",
      gradient: "from-blue-500 to-blue-200",
      welcome: isLogin
        ? "Smart School Bus Tracking"
        : "Tham gia cùng chúng tôi",
      placeholderUser: "Tài khoản phụ huynh",
    },
    driver: {
      title: "Tài xế đưa đón",
      icon: <Bus className="w-12 h-12 text-emerald-600 mb-2" />,
      color: "bg-emerald-600 hover:bg-emerald-700",
      gradient: "from-emerald-500 to-emerald-200",
      welcome: "Cổng thông tin Tài xế",
      placeholderUser: "Tài khoản tài xế",
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

  // Hàm chuyển đổi chế độ
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegister = async () => {
    // 1. Validate cơ bản
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Mật khẩu nhập lại không khớp!");
    }
    if (!formData.fullName.trim()) {
      throw new Error("Vui lòng nhập họ tên!");
    }

    // 2. Gọi API Đăng ký
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        username: formData.username,
        password: formData.password,
        role: role,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Đăng ký thất bại");
    }

    // Đăng ký thành công -> Chuyển về login hoặc tự login luôn
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    toggleMode(); // Quay về trang đăng nhập
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        role: role,
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
        navigate("/parent", { state: { user: data.user }, replace: true });
        break;
      default:
        navigate("/", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (err) {
      console.error("Lỗi:", err);
      // Nếu có UI hiển thị lỗi thì set vào đây, tạm thời alert
      alert(err.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-b ${currentConfig.gradient} transition-all duration-500`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative overflow-hidden transition-all duration-300">
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-gray-100 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-gray-100 rounded-full opacity-50 blur-xl"></div>

        {/* Role Switcher (Chỉ hiện khi Đăng nhập để tránh rối khi đăng ký) */}
        {isLogin && (
          <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
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
        )}

        {/* Header Content */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="flex justify-center transform transition-transform duration-300 hover:scale-110">
            {currentConfig.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {currentConfig.welcome}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{currentConfig.title}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ô nhập Họ tên (Chỉ hiện khi Đăng ký) */}
          {!isLogin && (
            <div className="relative group animate-fade-in-up">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Họ và tên"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all outline-none"
                style={{ "--tw-ring-color": "#2563eb" }} // Mặc định màu xanh cho register
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          {/* Ô nhập User (SĐT/Mã số) */}
          <div className="relative group">
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder={currentConfig.placeholderUser}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 outline-none"
              style={{
                "--tw-ring-color":
                  role === "driver"
                    ? "#10b981"
                    : role === "admin"
                    ? "#4f46e5"
                    : "#2563eb",
              }}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Ô nhập Password */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Mật khẩu"
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 outline-none"
              style={{
                "--tw-ring-color":
                  role === "driver"
                    ? "#10b981"
                    : role === "admin"
                    ? "#4f46e5"
                    : "#2563eb",
              }}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Ô nhập lại Password (Chỉ hiện khi Đăng ký) */}
          {!isLogin && (
            <div className="relative group animate-fade-in-up">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Nhập lại mật khẩu"
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 outline-none"
                style={{ "--tw-ring-color": "#2563eb" }}
                onChange={handleInputChange}
                required={!isLogin}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          )}

          {/* Nút Submit */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
              !isLogin ? "bg-blue-600 hover:bg-blue-700" : currentConfig.color
            }`}
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
          </button>
        </form>

        {/* Footer Links (Chuyển đổi Login/Register) */}
        <div className="flex justify-center items-center mt-6 text-sm">
          {isLogin ? (
            <>
              {/* Chỉ hiện link Đăng ký nếu đang là role Parent (hoặc logic tùy bạn) */}
              {role === "parent" ? (
                <p className="text-gray-500">
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={toggleMode}
                    className="font-medium hover:underline text-blue-600 focus:outline-none"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              ) : (
                <a href="#" className="text-gray-500 hover:text-gray-800"></a>
              )}
            </>
          ) : (
            <p className="text-gray-500">
              Đã có tài khoản?{" "}
              <button
                onClick={toggleMode}
                className="font-medium hover:underline text-blue-600 focus:outline-none"
              >
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
