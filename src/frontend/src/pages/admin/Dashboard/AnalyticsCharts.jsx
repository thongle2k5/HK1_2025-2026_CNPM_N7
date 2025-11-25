// src/pages/admin/Dashboard/AnalyticsCharts.jsx
import React from "react";
import { FaChartBar, FaChartPie, FaUserTie } from "react-icons/fa";
import BaseBarChart from "../../../components/Chart/BaseBarChart";
import BaseHorizontalBarChart from "../../../components/Chart/BaseHorizontalBarChart";
import BasePieChart from "../../../components/Chart/BasePieChart";

export default function AnalyticsCharts({ chartData }) {
  if (!chartData) return null;
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Chart 1: Chiếm 2 phần - Hiệu suất chuyến xe */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <FaChartBar className="text-blue-500" /> Hiệu suất chuyến xe theo
            tháng
          </h3>
        </div>
        <div className="h-[350px]">
          <BaseBarChart
            data={chartData.tripStatus}
            dataKeyX="name"
            barKeys={[
              { key: "completed", color: "#3B82F6", name: "Hoàn thành" },
              { key: "pending", color: "#F59E0B", name: "Đang chờ" },
            ]}
          />
        </div>
      </div>

      {/* Chart 2: Chiếm 1 phần - Phân bố học sinh */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
          <FaChartPie className="text-purple-500" /> Phân bố học sinh
        </h3>
        <div className="h-[350px]">
          <BasePieChart
            data={chartData.studentByRoute}
            nameKey="routeName"
            valueKey="studentCount"
            colors={COLORS}
          />
        </div>
      </div>

      {/* Chart 3: Tình trạng tài xế */}
      <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">
          <FaUserTie className="text-indigo-500" /> Tình trạng tài xế
        </h3>
        <div className="h-[250px]">
          <BaseHorizontalBarChart
            data={chartData.driverStatus}
            dataKeyY="status"
            barKeys={[
              { key: "driver_count", name: "Số lượng", color: "#6366F1" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
