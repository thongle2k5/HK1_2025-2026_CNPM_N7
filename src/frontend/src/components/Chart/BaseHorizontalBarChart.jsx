//Biểu đồ cột ngang
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

const BaseHorizontalBarChart = ({ data, dataKeyY, barKeys }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey={dataKeyY} type="category" />

        <XAxis type="number" />

        <Tooltip />
        <Legend />
        {barKeys.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key} // Key dữ liệu (ví dụ: 'Usage')
            fill={bar.color} // Màu sắc
            name={bar.name} // Tên hiển thị
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BaseHorizontalBarChart;
