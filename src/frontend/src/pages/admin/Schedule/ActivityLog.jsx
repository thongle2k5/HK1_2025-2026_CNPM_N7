import React from "react";

function ActivityLog({ activities }) {
  const getActivityStyle = (type) => {
    switch (type) {
      case "CREATE":
        return { icon: "➕", color: "text-green-600" };
      case "DELETE":
        return { icon: "❌", color: "text-red-600" };
      default:
        return { icon: "ℹ️", color: "text-gray-500" };
    }
  };
  if (activities.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic py-2">
        Chưa có hoạt động nào gần đây.
      </p>
    );
  }

  return (
    <div className="space-y-3 pt-2">
      {activities.map((activity) => {
        const { icon, color } = getActivityStyle(activity.type);
        return (
          <div
            key={activity.id}
            className="flex items-start text-sm border-l-2 border-gray-200 pl-3"
          >
            <span className={`mr-2 ${color} text-lg font-semibold`}>
              {icon}
            </span>
            <div className="flex-1">
              <p className="text-gray-800 leading-tight">{activity.message}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {activity.timestamp}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ActivityLog;
