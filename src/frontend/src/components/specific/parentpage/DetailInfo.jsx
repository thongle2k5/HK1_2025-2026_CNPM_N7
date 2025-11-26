import React from "react";
const statusColor = {
    "boarded": "bg-green-500/20",
    "waiting": "bg-yellow-500/20",
    "missed": "bg-red-500/20",
    "dropped_off": "",
};

function DetailInfo({ studentData ,onTrackBus}) {
    console.log("DetailInfo studentData:", studentData);
    return <div className="flex flex-col w-auto h-auto rounded-xl bg-gray-100 m-4 border-2 border-gray-300">
        <div className={`p-2 flex flex-row border-b border-gray-300 pb-2 justify-between items-center text-blue-700 ${statusColor[studentData.pickup_status.status]}`}>
            <div className="text-2xl font-semibold">Thông tin</div>
            <div className="text-3xl">{studentData.student.student_name}</div>
        </div>
        <div className="grid grid-cols-[170px,1fr] gap-y-2 text-lg p-2">
            {
                studentData.pickup_status.status === "boarded" ? (
                    <div className="font-semibold">Đã lên xe vào lúc: </div>
                ) : studentData.pickup_status.status === "dropped_off" ? (
                    <div className="font-semibold">Đã xuống xe vào lúc: </div>
                ) : (<></>)
            }
            {/* <div>
                {studentData.pickup_status.time
                    ? (() => {
                        const d = new Date(studentData.pickup_status.time);
                        return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`;
                    })()
                    : "N/A"}
            </div> */}
            <div className="font-semibold">Trạm dừng:</div>
            <div>{studentData.stop.address}</div>
            <button className="bg-blue-600 text-white rounded-lg p-2 mt-4 self-center hover:bg-blue-700"
            onClick={()=>{
                onTrackBus(studentData.schedule.bus_id);
            }}>
             Theo dõi xe buýt        
            </button>
        </div>

    </div>

}
export default DetailInfo;