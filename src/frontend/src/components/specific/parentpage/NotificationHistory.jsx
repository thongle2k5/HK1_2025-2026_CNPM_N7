import React from "react";

const notifications = [
  { icon: "🚌", text: "Bus arrived at school at 8:15 AM.", time: "Today 8:15 AM" },
  { icon: "✅", text: "Emma was picked up from home at 7:45 AM.", time: "Today 7:45 AM" },
  { icon: "👧", text: "Emma boarded the bus at 7:50 AM.", time: "Today 7:50 AM" },
  { icon: "🏫", text: "Emma was dropped off at school at 8:20 AM.", time: "Today 8:20 AM" },
];

const NotificationHistory = () => {
  return (
    <div className="p-4 border-t">
      <h2 className="text-blue-800 font-semibold mb-2">Notification History</h2>
      <ul className="space-y-2 text-sm">
        {notifications.map((n, i) => (
          <li key={i} className="flex items-start gap-2">
            <span>{n.icon}</span>
            <div>
              <p>{n.text}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationHistory;
