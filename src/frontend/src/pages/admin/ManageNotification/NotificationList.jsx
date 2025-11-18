import { format } from "date-fns";
function NotificationList({ data, onEdit, handleDeleteClick }) {
  return (
    <div>
      <table className="w-full rounded-lg">
        <thead className="bg-blue-200 text">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Mã thông báo
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Tiêu đề
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Nội dung tóm tắt
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Đối tượng nhận
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Thời gian gửi
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Trạng thái
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-left">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.notif_id}>
              <td className="p-3 text-sm text-gray-700">{item.notif_id}</td>
              <td className="p-3 text-sm text-gray-700">{item.title}</td>
              <td className="p-3 text-sm text-gray-700">{item.message}</td>
              <td className="p-3 text-sm text-gray-700">
                {item.target_audience}
              </td>
              <td className="p-3 text-sm text-gray-700">
                {item.created_at
                  ? format(new Date(item.created_at), "dd/MM/yyyy HH:mm")
                  : "—"}
              </td>
              <td className="p-3 text-sm text-gray-700">{item.status}</td>
              <td className="p-3 text-sm">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800 mr-3"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(item.notif_id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default NotificationList;
