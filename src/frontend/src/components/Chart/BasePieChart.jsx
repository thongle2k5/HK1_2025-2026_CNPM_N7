import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BasePieChart = ({ data, nameKey, valueKey, colors }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // --- CHỈNH SỬA QUAN TRỌNG ---
          innerRadius={60} // Tạo lỗ tròn ở giữa (Donut chart) nhìn sang hơn
          outerRadius={80} // Thu nhỏ bán kính để không bị tràn
          paddingAngle={5} // Tạo khe hở giữa các miếng
          dataKey={valueKey}
          nameKey={nameKey}
          labelLine={false} // Tắt đường kẻ chỉ dẫn (rất rối)
          label={false} // Tắt nhãn đè lên hình (dùng Legend thay thế)
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => [`${value} học sinh`]} // Format nội dung tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
        />

        {/* Đưa chú thích xuống dưới đáy */}
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry) => (
            <span className="text-gray-600 text-xs ml-1">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BasePieChart;
