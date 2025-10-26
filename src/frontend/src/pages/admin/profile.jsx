import React from "react";
function Profile() {
  return (
    <div className="h-full-screen bg-white p-4">
      <div className="font-bold text-2xl my-4 font-medium text-xl text-blue-500 ">
        Cài đặt tài khoản
      </div>
      <div className="hover:border-b border-blue-600 cursor-pointer">
        Thay đổi ảnh
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="" className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            className="border outline-none text-gray-900 rounded-lg  "
          />
        </div>
        <div>
          <label htmlFor="" className="block text-gray-700 font-medium text-sm">
            Email
          </label>
          <input
            type="text"
            className="border outline-none text-gray-900 rounded-lg "
          />
        </div>
        <div>
          <label htmlFor="" className="block text-gray-700 font-medium text-sm">
            Số điện thoại{" "}
          </label>
          <input
            type="text"
            className="border outline-none text-gray-900 rounded-lg "
          />
        </div>
        <div>
          <label htmlFor="" className="block text-gray-700 font-medium text-sm">
            Vai trò{" "}
          </label>
          <input
            type="text"
            placeholder="Quản trị viên"
            className="border outline-none text-gray-900 rounded-lg "
          />
        </div>
      </div>
      <div>
        <button className="px-4 py-2 my-4 mx-4 border bg-blue-500 rounded-xl text-white hover:bg-blue-600">
          Lưu thay đổi
        </button>
        <button className="px-4 py-2 my-4 mx-4 border bg-gray-300 rounded-xl text-black hover:bg-gray-400">
          Huỷ
        </button>
      </div>
      <div className="block">
        <div className="font-bold text-2xl my-4 font-medium text-xl text-blue-500 ">
          {" "}
          Bảo mật tài khoản{" "}
        </div>
        <div>
          <label htmlFor="" className="block text-gray-900">
            mật khẩu hiện tại
          </label>
          <input
            type="passowrd"
            className="border rounded-lg px-4 py-2 mb-4 outline-none text-gray-700"
          />
        </div>
        <div className="block text-gray-900">
          <label htmlFor="" className="block">
            mật khẩu mới
          </label>
          <input
            type="passowrd"
            className="border rounded-lg px-4 py-2 mb-4 outline-none text-gray-700"
          />
        </div>
        <div className="block text-gray-900">
          <label htmlFor="" className="block">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="passowrd"
            className="border rounded-lg px-4 py-2 mb-4 outline-none text-gray-700"
          />
        </div>
        <div className="flex items-center">
          <input type="checkbox" />
          <label htmlFor="" className="mx-2 text-gray-900">
            Hiển thị mật khẩu
          </label>
        </div>
        <div>
          <button className="bg-blue-500 rounded-lg text-white py-2 px-4 my-4 hover:bg-blue-600">
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
