import React from "react";
import { FaBus } from "react-icons/fa";
import ReusableBarChart from "../../components/Chart/BaseBarChart";
import BaseHorizontalBarChart from "../../components/Chart/BaseHorizontalBarChart";
import BaseBarChart from "../../components/Chart/BaseBarChart";
import BaseLineChart from "../../components/Chart/BaseLineChart";
import BasePieChart from "../../components/Chart/BasePieChart";
function Dashboard() {
  const data = [
    { name: "Chrome", value: 400 },
    { name: "Firefox", value: 300 },
    { name: "Edge", value: 300 },
    { name: "Safari", value: 200 },
  ];
  const data1 = [
    { name: "Tháng 1", DoanhThu: 4000, ChiPhi: 2400 },
    { name: "Tháng 2", DoanhThu: 3000, ChiPhi: 1398 },
    { name: "Tháng 3", DoanhThu: 2000, ChiPhi: 9800 },
    { name: "Tháng 4", DoanhThu: 2780, ChiPhi: 3908 },
    { name: "Tháng 5", DoanhThu: 1890, ChiPhi: 4800 },
    { name: "Tháng 6", DoanhThu: 2390, ChiPhi: 3800 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <h1 className="px-4 text-xl font-bold">Tổng quan hệ thống</h1>
      <ul className="flex justify-between  h-[120px] m-4 ">
        <li className="flex items-center p-4 bg-blue-100 text-center text-xl rounded-lg shadow-lg w-[250px] ">
          🚍 tổng số xe bus {/*số xe bus*/}
        </li>
        <li className="flex items-center text-xl p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          👨‍✈️ Tổng số tài xế {/*số tài xế*/}
        </li>
        <li className="flex items-center text-xl  p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          🎓 Tổng số sinh viên {/*số sinh viên*/}
        </li>
        <li className="flex items-center text-xl  p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          🗺️ Tổng số tuyến đường {/*số Tuyến đường*/}
        </li>
      </ul>
      <div className="h-[600px] m-4 grid grid-cols-2 grid-rows-2 gap-4">
        <div className="border shadow-lg bg-white rounded-lg">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Số chuyến xe hoàn thành theo tuần
          </h1>
          <BaseBarChart
            data={data1}
            dataKeyX="name"
            barKeys={[
              { key: "DoanhThu", color: "#0088FE", name: "Doanh Thu" },
              { key: "ChiPhi", color: "#FF8042", name: "Chi Phí" },
            ]}
          />
        </div>
        <div className=" border shadow-lg bg-white rounded-lg col-start-1 row-start-2">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Tỉ lệ phân bố sinh viên theo tuyến đường
          </h1>
          <BasePieChart
            data={data}
            nameKey="name"
            valueKey="value"
            colors={COLORS}
          />
        </div>
        <div className=" border shadow-lg  bg-white rounded-lg col-start-2 row-start-1">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Số xe hoạt động theo thời gian thực
          </h1>
          <BaseLineChart
            data={data1}
            dataKeyX="name"
            linesKeys={[
              { key: "DoanhThu", name: "Doanh thu", color: "#8884d8" },
              { key: "ChiPhi", name: "Chi phí", color: "#82ca9d" },
            ]}
          />
        </div>
        <div className="border shadow-lg bg-white rounded-lg row-start-2">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Tình trạng tài xế (đang hoạt động/nghỉ phép)
          </h1>
          <BaseHorizontalBarChart
            data={data1}
            dataKeyY="name"
            barKeys={[
              { key: "DoanhThu", name: "Doanh Thu", color: "#8884d8" },
              { key: "ChiPhi", name: "Chi Phí", color: "#82ca9d" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
