import React from "react";
import { MoreHorizontal } from "lucide-react";
import DetailInfo from "./DetailInfo";

const students = [
  { name: "Emma", class: "1A", status: "Boarded" },
  { name: "Mice", class: "2B", status: "Waiting" },
  { name: "John", class: "3A", status: "Missed" },
];

const statusColor = {
  "Boarded": "bg-green-400",
  "Waiting": "bg-yellow-400",
  "Missed": "bg-red-500",
};

function StudentInfo() {
  return (
    <aside className="w-full h-full border-l border-gray-400 flex flex-col">
      <h2 className="text-3xl font-bold text-blue-800 p-4">Student Info</h2>
      <table className="text-left text-2xl m-4">
        <thead>
          <tr className="border-b-2 border-blue-700 h-12">
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-b text-xl h-12">
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>
                <div className="flex items-center gap-2">
                  <span className={`text-white px-2 py-1 rounded-md text-lg min-w-24 text-center ${statusColor[s.status]}`}>
                    {s.status}
                  </span>
                </div>
              </td>
              <td>
                <button className="flex justify-center items-center">
                  <MoreHorizontal className="text-gray-600 hover:text-gray-900 size-8" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
};

export default StudentInfo;
