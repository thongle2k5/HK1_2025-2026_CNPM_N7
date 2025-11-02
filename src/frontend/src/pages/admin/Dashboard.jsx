import React, { useState, useEffect } from "react";
import { FaBus } from "react-icons/fa";
import ReusableBarChart from "../../components/Chart/BaseBarChart";
import BaseHorizontalBarChart from "../../components/Chart/BaseHorizontalBarChart";
import BaseBarChart from "../../components/Chart/BaseBarChart";
import BaseLineChart from "../../components/Chart/BaseLineChart";
import BasePieChart from "../../components/Chart/BasePieChart";
function Dashboard() {
  //trích dữ liệu từ server
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: null,
    charts: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      //lấy dữ liệu start
      try {
        const [startResponse, chartResponse] = await Promise.all([
          fetch("http://localhost:5000/api/dashboardata/start"),
          fetch("http://localhost:5000/api/dashboardata/chart"),
        ]);
        if (!startResponse.ok) throw new Error("Lỗi API /start");
        if (!chartResponse.ok) throw new Error("Lỗi API /chart");
        const dataTotal = await startResponse.json();
        const chartData = await chartResponse.json();
        const transformedTripData = Object.values(
          chartData.tripStatus.reduce((acc, item) => {
            const { month, status, totalTrips } = item;
            if (!acc[month]) {
              acc[month] = { name: `Tháng ${month}` };
            }
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
        console.log("không lấy được dữ liệu start", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading || !stats.charts) {
    return (
      <div className="text-black font-bold flex items-center justify-center">
        Đang tải dữ liệu dashboard...
      </div>
    );
  }
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <div>
      <h1 className="px-4 text-xl font-bold">Tổng quan hệ thống</h1>
      <ul className="flex justify-between  h-[120px] m-4 ">
        <li className="flex items-center p-4 bg-blue-100 text-center text-xl rounded-lg shadow-lg w-[250px] ">
          🚍 tổng số xe bus {stats.total.totalBuses}
        </li>
        <li className="flex items-center text-xl p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          👨‍✈️ Tổng số tài xế {stats.total.totalActiveDrivers}
        </li>
        <li className="flex items-center text-xl  p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          🎓 Tổng số sinh viên {stats.total.totalStudents}
        </li>
        <li className="flex items-center text-xl  p-4 bg-blue-100 text-center rounded-lg shadow-lg w-[250px] ">
          🗺️ Tổng số tuyến đường {stats.total.totalSchedulesToday}
        </li>
      </ul>
      <div className="h-[600px] m-4 grid grid-cols-2 grid-rows-2 gap-4">
        <div className="border shadow-lg bg-white rounded-lg">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Số chuyến xe hoàn thành theo tháng
          </h1>
          <BaseBarChart
            data={stats.charts.tripStatus}
            dataKeyX="name"
            barKeys={[
              { key: "completed", color: "#0088FE", name: "Hoan thành" },
              { key: "pending", color: "#FF8042", name: "Đang chờ" },
            ]}
          />
        </div>
        <div className=" border shadow-lg bg-white rounded-lg col-start-1 row-start-2">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Tỉ lệ phân bố sinh viên theo tuyến đường
          </h1>
          <BasePieChart
            data={stats.charts.studentByRoute}
            nameKey="routeName"
            valueKey="studentCount"
            colors={COLORS}
          />
        </div>
        <div className=" border shadow-lg  bg-white rounded-lg col-start-2 row-start-1">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Tổng hợp xe hoạt động
          </h1>
          <BaseLineChart
            data={stats.charts.activeBuses}
            dataKeyX="name"
            linesKeys={[{ key: "số xe", name: "Số xe", color: "#82ca9d" }]}
          />
        </div>
        <div className="border shadow-lg bg-white rounded-lg row-start-2">
          <h1 className="px-4 py-2 text-blue-600 font-bold">
            Tình trạng tài xế (đang hoạt động/nghỉ phép)
          </h1>
          <BaseHorizontalBarChart
            data={stats.charts.driverStatus}
            dataKeyY="status"
            barKeys={[
              { key: "driver_count", name: "Trạng thái", color: "#8884d8" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
