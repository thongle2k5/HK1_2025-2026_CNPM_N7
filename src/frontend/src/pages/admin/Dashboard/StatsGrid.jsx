// src/pages/admin/Dashboard/StatsGrid.jsx
import React from "react";
import {
  FaBus,
  FaUserTie,
  FaUserGraduate,
  FaMapMarkedAlt,
} from "react-icons/fa";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800">{value || 0}</h3>
    </div>
    <div className={`p-4 rounded-full ${color.bg} ${color.text}`}>
      <Icon size={24} />
    </div>
  </div>
);

export default function StatsGrid({ totalData }) {
  if (!totalData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Tổng số xe buýt"
        value={totalData.totalBuses}
        icon={FaBus}
        color={{ bg: "bg-blue-100", text: "text-blue-600" }}
      />
      <StatCard
        title="Tài xế hoạt động"
        value={totalData.totalActiveDrivers}
        icon={FaUserTie}
        color={{ bg: "bg-green-100", text: "text-green-600" }}
      />
      <StatCard
        title="Học sinh đăng ký"
        value={totalData.totalStudents}
        icon={FaUserGraduate}
        color={{ bg: "bg-purple-100", text: "text-purple-600" }}
      />
      <StatCard
        title="Tuyến đường / Lịch"
        value={totalData.totalSchedulesToday}
        icon={FaMapMarkedAlt}
        color={{ bg: "bg-orange-100", text: "text-orange-600" }}
      />
    </div>
  );
}
