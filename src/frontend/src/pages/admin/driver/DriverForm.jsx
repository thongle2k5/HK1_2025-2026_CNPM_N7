import { FaUserCircle, FaUpload, FaTimes } from "react-icons/fa";
function DriverForm() {
  return (
    <div className="p-4">
      <div className="font-bold text-xl border-b">Thêm tài xế</div>
      <form>
        <div className="flex justify-between grid grid-cols-2   gap-6 border-b">
          <div className="flex  item-center justify-center ">
            <div>
              <div className="w-32 h-32 mx-6 rounded-full bg-gray-100 flex items-center justify-center shadow-md ">
                <FaUserCircle className="text-gray-400 text-7xl" />
              </div>
              <button className=" flex items-center justify-center m-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">
                Thêm ảnh mới
                <FaUpload className="mx-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-left m-2">
              <label htmlFor="" className="text-black block text-sm">
                Họ và tên
              </label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 mr-3 outline-none"
                placeholder="Nguyễn Văn A..."
              />
            </div>
            <div className=" m-2">
              <label htmlFor="" className="text-black block text-sm">
                Số điện thoại
              </label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 mr-3 outline-none"
                placeholder="0987..."
              />
            </div>
            <div className=" m-2">
              <label htmlFor="" className="text-black block text-sm">
                Số giấy phép lái xe
              </label>
              <input
                type="text"
                className="border rounded-lg px-4 py-2 mr-3 outline-none"
                placeholder="A1-123..."
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button className="text-white bg-blue-500 py-1 px-4 rounded-lg hover:bg-blue-600">
            Thêm tài xế mới
          </button>
          <button className="text-black bg-gray-300 py-1 px-4 rounded-lg hover:bg-gray-400 mx-2">
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}
export default DriverForm;
