import React, { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import InformationTable from "./informationTable";
import PasswordTable from "./passwordTable";
const Profile = () => {
  // Giả lập dữ liệu load từ API dựa trên bảng USER của bạn
  const [loading, setLoading] = useState(true);
  {
    ("---------------------------------lấy dữ liệu và hiển thị thông tin--------------------------------");
  }
  const [userData, setUserData] = useState({});
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/profileManagers"
      );
      if (!response.ok) throw new Error("Lỗi API /profileManager");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setUserData(data[0]);
      } else if (!Array.isArray(data)) {
        setUserData(data);
      }
    } catch (err) {
      console.log("không lấy được dữ liệu người dùng", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  {
    ("------------------------------xử lý thay đổi thông tin người dùng-------------------------------");
  }
  const [editedData, setEditedData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  if (loading)
    return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hồ sơ cá nhân</h1>
        <p className="text-gray-500">Quản lý thông tin tài khoản và bảo mật</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* LEFT COLUMN: Card tóm tắt */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 mb-4"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-500 text-sm mb-4">@{userData.username}</p>

            {/* Role Badge - Map theo Enum */}
            <span
              className={`px-4 py-1 rounded-full text-sm font-medium capitalize
              ${
                userData.role === "manager"
                  ? "bg-blue-100 text-blue-700"
                  : userData.role === "driver"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {userData.role}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Form chi tiết */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Thông tin chung */}
          <InformationTable data={userData} onChange={handleChange} />
          {/* Card 2: Bảo mật */}
          <PasswordTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;
