import { Camera, User, Phone, Mail, Shield, Save } from "lucide-react";
import PasswordTable from "./passwordTable";
function InformationTable({ data, onChange }) {
  if (!data || typeof data !== "object") {
    return null;
  }
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User size={20} className="text-blue-600" /> Thông tin chung
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên hiển thị */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        {/* Số điện thoại */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <User size={20} className="text-blue-600" /> Thông tin
                      chung
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tên hiển thị */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={onchange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <Phone
                          size={18}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={data.phone}
                          onChange={onChange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={onchange}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Role & Username (Read Only) */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Tên đăng nhập
                      </label>
                      <input
                        disabled
                        value={data.username}
                        className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Vai trò
                      </label>
                      <div className="relative">
                        <Shield
                          size={18}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <input
                          disabled
                          value={
                            data.role === "manager"
                              ? "Quản trị viên"
                              : data.role
                          }
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-200">
                      <Save size={18} /> Lưu thay đổi
                    </button>
                  </div>
                </div>
              }
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
        </div>

        {/* Role & Username (Read Only) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tên đăng nhập
          </label>
          <input
            disabled
            value={data.username}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vai trò</label>
          <div className="relative">
            <Shield size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              disabled
              value={data.role === "manager" ? "Quản trị viên" : data.role}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-200">
          <Save size={18} /> Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
export default InformationTable;
