

export const statusColor = {
    "Đang di chuyển": "text-green-600",
    "Đang dừng": "text-yellow-600",
    "Chưa khởi hành": "text-gray-600",
    "Đã Kết thúc": "text-black-600",
    "Gặp sự cố": "text-red-600"
}

const BusInfo = ({ driver_name, license_plate, phone, next_stop, eta, status }) => {
    return (
        <div className=" absolute left-4 bottom-4 bg-white rounded-xl m-4  w-1/4 z-50 p-4 flex flex-col border border-gray-500 ">
            <span className="text-2xl font-semibold pb-2">Thông tin xe</span>
            <div className="grid grid-cols-2 gap-x-4 text-lg">
                <span>Biển số xe: </span>
                <span>{license_plate}</span>
                <span>Tài xế: </span>
                <span>{driver_name}</span>
                <span>Số điện thoại</span>
                <span>{phone}</span>
                {
                    next_stop !== null && (
                        <>
                            <span>Trạm dừng tiếp theo: </span>
                            <span>{next_stop.address}</span>
                            <span>Thời gian dự kiến:</span>
                            <span>{eta}</span>
                        </>
                    )
                }
                <span>Trạng thái: </span>
                <span className={`${statusColor[status]}`} >{status}</span>
            </div>

        </div>
    )
}
export default BusInfo;