//Biểu đồ tròn
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
const DEFAULT_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF0000",
];
function BasePieChart({ data, nameKey, valueKey, colors = DEFAULT_COLORS }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
        <Tooltip />
        {/* Vị trí Legend có thể được tùy chỉnh bằng props nếu cần */}
        <Legend layout="vertical" verticalAlign="middle" align="right" />

        <Pie
          data={data}
          dataKey={valueKey} // Lấy key giá trị động
          nameKey={nameKey} // Lấy key tên động
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {/* Lặp qua dữ liệu để gán màu sắc */}
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]} // Đảm bảo màu sắc lặp lại nếu thiếu
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
export default BasePieChart;
