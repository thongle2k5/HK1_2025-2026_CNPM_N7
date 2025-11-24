// src/pages/admin/Dashboard/index.jsx
import React, { useState, useEffect } from "react";
import StatsGrid from "./StatsGrid";
import LiveMapSection from "./LiveMapSection";
import AnalyticsCharts from "./AnalyticsCharts";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: null, charts: null });

  // --- Fetch Data (Giữ nguyên logic cũ của bạn) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startResponse, chartResponse] = await Promise.all([
          fetch("http://localhost:5000/api/dashboardata/start"),
          fetch("http://localhost:5000/api/dashboardata/chart"),
        ]);

        if (!startResponse.ok || !chartResponse.ok) throw new Error("Lỗi API");

        const dataTotal = await startResponse.json();
        const chartData = await chartResponse.json();

        // Xử lý dữ liệu biểu đồ (Transformation)
        const transformedTripData = Object.values(
          chartData.tripStatus.reduce((acc, item) => {
            const { month, status, totalTrips } = item;
            if (!acc[month]) acc[month] = { name: `Tháng ${month}` };
            acc[month][status] = totalTrips;
            return acc;
          }, {})
        );

        const transformedBusesData = chartData.activeBuses.map((item) => ({
          name: `Tháng ${item.month}`,
          "số xe": item.totalActiveBuses,
        }));

        setStats({
          total: dataTotal,
          charts: {
            tripStatus: transformedTripData,
            activeBuses: transformedBusesData,
            studentByRoute: chartData.studentByRoute,
            driverStatus: chartData.driverStatus,
          },
        });
      } catch (err) {
        console.error("Lỗi tải Dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Đang tải dữ liệu hệ thống...
      </div>
    );
  }

  return (
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Tổng quan hệ thống
          </h1>
          <p className="text-gray-500 text-sm">
            Báo cáo hoạt động thời gian thực
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-md border shadow-sm">
          📅{" "}
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* 1. Hàng Thống kê (Trên cùng) */}
      <StatsGrid totalData={stats.total} />

      {/* 2. Bản đồ Giám sát (Ưu tiên thứ 2) */}
      <LiveMapSection />

      {/* 3. Biểu đồ phân tích (Cuối cùng) */}
      <AnalyticsCharts chartData={stats.charts} />
    </div>
  );
}

export default Dashboard;
