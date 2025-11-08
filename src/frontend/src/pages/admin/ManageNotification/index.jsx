import Starts from "./ManageStarts";
import NotificationList from "./NotificationList";
import DatePicker from "react-datepicker";
function index() {
  return (
    <div>
      <div className="flex py-6 px-7 items-center justify-between bg-white rounded-lg shadow-lg">
        <div className="font-bold text-2xl text-blue-500">
          Quản lý thông báo
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm thông báo.."
          className="rounded-lg border outline-none pr-20 py-2 text-black"
        />
        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-1 rounded-lg">
          Tạo thông báo mới
        </button>
      </div>
      <div>
        <Starts />
      </div>
      <div className="bg-wwhite rounded-lg border shadow-lg bg-white p-3">
        <div className="m-3 flex items-canter">
          <label className="mr-1 ml-2 text-black">Từ:</label>
          <input type="date" className="text-black border rounded-lg px-2 " />
          <label className="mr-1 ml-2 text-black">Đến:</label>
          <input type="date" className="text-black border rounded-lg px-2 " />
        </div>
        <div>
          <NotificationList />
        </div>
      </div>
    </div>
  );
}
export default index;
