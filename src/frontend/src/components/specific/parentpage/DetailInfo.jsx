import React from "react";
const statusColor = {
  "Boarded": "bg-green-500/20",
  "Waiting": "bg-yellow-500/20",
  "Missed": "bg-red-500/20",
};
function DetailInfo(props){
    const {name,stop,address,driver,phone,plate,status,time}=props;
    return <div className="flex flex-col w-auto h-auto rounded-xl bg-gray-100 m-4 border-2 border-gray-300">
            <div className={`p-2 flex flex-row border-b border-gray-300 pb-2 justify-between items-center text-blue-700 ${statusColor[status]}`}>
                <div className="text-2xl font-semibold">Thông tin</div>
                <div className="text-3xl">{name}</div>
            </div>
            <div className="grid grid-cols-[140px,1fr] gap-y-2 text-lg p-2">
                <div className="font-semibold">Trạm dừng:</div>
                <div>{stop}</div>
                <div className ="font-semibold">Địa chỉ:</div>
                <div>{address}</div>
                <div className="font-semibold">Tài xế:</div>
                <div>{driver}</div>
                <div className="font-semibold">Số điện thoại:</div>
                <div>{phone}</div>
                <div className="font-semibold">Biển số xe:</div>
                <div>{plate}</div>
                {
                    status ==="Waiting" ? (
                        <div className="font-semibold">Thời gian dự kiến:</div>
                    ) : (
                        <div className="font-semibold">Thời gian:</div>
                    )
                }
                <div>{time}</div>
                
            </div>

        </div>
    
}
export default DetailInfo;