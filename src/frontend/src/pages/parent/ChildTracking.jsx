import React from "react";
import StudentInfo from "../../components/specific/parentpage/StudentInfor.jsx";
import NotificationHistory from "../../components/specific/parentpage/NotificationHistory.jsx";

const ChildTracking = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div className="w-3/4 bg-gray-200 flex items-center justify-center text-4xl text-gray-500 font-bold">
          Interactive Map
        </div>
        <StudentInfo />
      </div>
      <NotificationHistory />
    </div>
  );
};

export default ChildTracking;
