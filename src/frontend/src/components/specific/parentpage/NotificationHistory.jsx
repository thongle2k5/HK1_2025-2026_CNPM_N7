import React from "react";
const notifications = [
  { icon: "🚌", text: "Bus arrived at school at 8:15 AM.", time: "Today 8:15 AM" },
  { icon: "✅", text: "Emma was picked up from home at 7:45 AM.", time: "Today 7:45 AM" },
  { icon: "👧", text: "Emma boarded the bus at 7:50 AM.", time: "Today 7:50 AM" },
  { icon: "🏫", text: "Emma was dropped off at school at 8:20 AM.", time: "Today 8:20 AM" },
  { icon: "❌", text: "John missed the bus this morning.", time: "Today 7:30 AM" },

];

const NotificationHistory = () => {
  return (
    <div className=" border-t border-gray-400 max-h-60 flex flex-col">
      <h2 className="text-blue-800 text-xl font-semibold p-4">Notification History</h2>
      <ul className="space-y-2 text-lg overflow-y-auto overscroll-contain p-4 border-y border-gray-400">
        {notifications.map((n, i) => (
          <li key={i} className="flex items-start">
            <span>{n.icon}</span>
            <div>
              <p>{n.text}</p>
              <p className="text-base text-gray-500">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationHistory;
