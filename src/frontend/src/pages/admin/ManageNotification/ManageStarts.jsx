import { AiFillNotification } from "react-icons/ai";
import { FaClock } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
function Starts({ data }) {
  return (
    <div>
      {data.map((item) => (
        <div className="grid grid-cols-4 space-x-5 mb-5 py-10 ">
          <div className="bg-[#EAF4FF] px-3 py-7 flex gap-7 rounded-md items-center shadow-lg">
            <AiFillNotification className="text-5xl" />
            <div>
              <div className="text-black">Tổng số thông báo</div>
              <div className="font-bold text-2xl">
                {item.totalNotifications}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#EAF4FF] px-3 py-7 flex gap-7 rounded-md items-center shadow-lg">
              <FaClock className="text-5xl" />
              <div>
                <div className="text-black">Thông báo trong tuần</div>
                <div className="font-bold text-2xl">{item.thisWeek}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#EAF4FF] px-3 py-7 flex gap-7 rounded-md items-center shadow-lg">
              <AiFillCheckCircle className="text-5xl" />
              <div>
                <div className="text-black">Đã gửi thành công</div>
                <div className="font-bold text-2xl">{item.published}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#EAF4FF] px-3 py-7 flex gap-7 rounded-md items-center shadow-lg">
              <RiErrorWarningFill className="text-5xl" />
              <div>
                <div className="text-black">Chưa đọc</div>
                <div className="font-bold text-2xl">{item.unread}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Starts;
