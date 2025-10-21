//Đây là biểu đồ đường
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function BaseLineChart({ data, dataKeyX, linesKeys }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        {/* Trục X: Lấy dataKey động từ props */}
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Dùng .map để render động nhiều đường Line */}
        {linesKeys.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.key} // Key dữ liệu (ví dụ: 'users')
            stroke={line.color} // Màu sắc
            name={line.name} // Tên hiển thị
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
export default BaseLineChart;
