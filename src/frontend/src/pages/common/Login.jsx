import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to="/admin/AdminLayout" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    SetError("");

    try {
      const reponse = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await reponse.json();
      if (!reponse.ok) {
        throw new Error(data.message || "Có lỗi xảy ra");
      }

      console.log("Login success:", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/admin/AdminLayout", { replace: true });
    } catch (err) {
      SetError(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-200 ">
      <div className="w-[500px] h-[400px] bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 shadow-lg ">
        <h1 className="flex justify-center pt-4 font-bold text-2xl">
          Smart School Bus Tracking
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-[400px] h-[150px] m-auto mt-10">
            <input
              type="text"
              value={username}
              placeholder="Nhập tài khoản"
              onChange={(e) => SetUserName(e.target.value)}
              className="w-full px-4 py-4  border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="password"
              value={password}
              placeholder="Nhập mật khẩu"
              onChange={(e) => SetPassword(e.target.value)}
              className="w-full border px-4 py-4 my-4 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 "
            >
              Đăng nhập
            </button>

            <div className="flex py-2 justify-between  ">
              <div className="hover:underline text-blue-500 cursor-pointer">
                Quên mật khẩu ?
              </div>
              <div className="hover:underline text-blue-500 cursor-pointer">
                Đăng ký
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
