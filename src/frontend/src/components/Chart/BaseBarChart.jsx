import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BaseBarChart = ({ data, dataKeyX, barKeys }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        {/* Lưới nét đứt mờ */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />

        <XAxis
          dataKey={dataKeyX}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />

        <Legend wrapperStyle={{ paddingTop: "10px" }} />

        {barKeys.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key}
            fill={bar.color}
            name={bar.name}
            // --- CHỈNH SỬA QUAN TRỌNG Ở ĐÂY ---
            barSize={40} // 1. Cố định chiều rộng cột (không bị mập)
            radius={[4, 4, 0, 0]} // 2. Bo tròn 2 góc trên đầu cột
            maxBarSize={50} // 3. Giới hạn độ rộng tối đa
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseBarChart;
