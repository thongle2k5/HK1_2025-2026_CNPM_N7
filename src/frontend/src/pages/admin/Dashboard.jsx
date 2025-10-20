import React from "react";
import { FaBus } from "react-icons/fa";
function Dashboard() {
  return (
    <div>
      <ul className="flex w-full h-[120px] border bg-white m-4 shadow-lg rounded-lg">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="h-[600px] m-4 bg-white grid grid-cols-2 grid-rows-2 gap-4">
        <div className="border shadow-lg rounded-lg">1</div>
        <div className=" border shadow-lg rounded-lg col-start-1 row-start-2">
          2
        </div>
        <div className=" border shadow-lg rounded-lg col-start-2 row-start-1">
          3
        </div>
        <div className="border shadow-lg rounded-lg row-start-2">4</div>
      </div>
    </div>
  );
}
export default Dashboard;
