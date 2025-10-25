import React from "react";
import StudentInfo from "../../components/specific/parentpage/StudentInfo.jsx";
import NotificationHistory from "../../components/specific/parentpage/NotificationHistory.jsx";

function ChildTracking(){
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col shrink-0 h-full w-3/4">
        <div className="w-full h-3/4 bg-gray-200 flex items-center justify-center text-4xl text-gray-500 font-bold shrink-0">
          Interactive Map
        </div>
        <NotificationHistory/>
      </div>
      <StudentInfo/>

    </div>
  );
};

export default ChildTracking;
