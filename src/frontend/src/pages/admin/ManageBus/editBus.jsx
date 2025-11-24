import React, { useState, useEffect } from "react";
export default function EditBus({ isOpen, onClose, busData, onSave }) {
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (busData) {
      setFormData(busData);
    }
  }, [busData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div
      style={{ zIndex: 4000 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    >
      <div
        style={{ zIndex: 4000 }}
        className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chỉnh sửa thông tin xe</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Mã xe
            </label>
            <input
              type="text"
              value={formData.bus_id || ""}
              disabled
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Biển số
            </label>
            <input
              type="text"
              name="license_plate"
              value={formData.license_plate || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Loại xe (Model)
            </label>
            <input
              type="text"
              name="model"
              value={formData.model || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sức chứa
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity || ""}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status || "idle"}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="active">Đang hoạt động</option>
              <option value="idle">Sẵn sàng</option>
              <option value="maintenance">Đang bảo trì</option>
              <option value="retired">Ngưng hoạt động</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
