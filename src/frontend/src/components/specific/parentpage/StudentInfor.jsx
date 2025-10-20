import React from "react";

const students = [
  { name: "Emma", class: "1A", status: "Picked up" },
  { name: "Mice", class: "2B", status: "Waiting" },
  { name: "John", class: "3A", status: "Missed" },
];

const statusColor = {
  "Picked up": "bg-green-400",
  "Waiting": "bg-yellow-400",
  "Missed": "bg-red-500",
};

const StudentInfo = () => {
  return (
    <aside className="w-1/4 border-l p-4">
      <h2 className="text-lg font-semibold text-blue-800 mb-2">Student Info</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Class</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} className="border-b text-sm">
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>
                <span className={`text-white px-2 py-1 rounded-md text-xs ${statusColor[s.status]}`}>
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
};

export default StudentInfo;
