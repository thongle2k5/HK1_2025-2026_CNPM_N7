//đây là biểu đồ cột tái sử dụng được
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
function BaseBarChart({ data, dataKeyX, barKeys }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />

        {/* Trục X: Lấy dataKey động từ props */}
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Dùng .map để render động nhiều cột Bar */}
        {barKeys.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.key} // Lấy key dữ liệu (ví dụ: 'DoanhThu')
            fill={bar.color} // Lấy màu sắc
            name={bar.name} // Lấy tên hiển thị trong Legend/Tooltip
            // Nếu muốn làm stacked bar, thêm: stackId="a"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
export default BaseBarChart;
