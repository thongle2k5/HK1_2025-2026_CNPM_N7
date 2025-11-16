function NotificationList({ data }) {
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
          {/* {data.map(() => (
            <tr>
              <td>{}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
export default NotificationList;
