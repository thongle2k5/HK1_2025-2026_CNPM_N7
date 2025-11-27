import pool from '../db/Connect_dtb.js';
// 1. Lấy danh sách kèm tên tài xế
const findAll = async () => {
  // Chúng ta cần JOIN bảng 'incident_reports' với 'driver' và 'user'
  // để lấy được tên thật của tài xế (user.name) thay vì chỉ hiện ID.
  const sql = `
    SELECT 
      r.*, 
      u.name AS driver_name,
      u.phone AS driver_phone
    FROM incident_reports r
    JOIN driver d ON r.driver_id = d.driver_id
    JOIN user u ON d.user_id = u.user_id
    ORDER BY 
      CASE WHEN r.status = 'pending' THEN 1 ELSE 2 END, -- Ưu tiên 'pending' lên đầu
      r.created_at DESC
  `;
  const [rows] = await pool.query(sql);
  return rows;
};
const findByDriverId = async (driverId) => {
  const sql = `
    SELECT 
      report_id,
      title AS type,
      priority,
      description,
      address,
      status,
      created_at
    FROM incident_reports
    WHERE driver_id = ?
    ORDER BY created_at DESC
    LIMIT 10
  `;
  const [rows] = await pool.query(sql, [driverId]);
  return rows;
};

// 2. Đếm số lượng pending
const countPending = async () => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) as count FROM incident_reports WHERE status = 'pending'"
  );
  return rows[0].count;
};

// 3. Cập nhật trạng thái
const updateStatus = async (id, status) => {
  await pool.query(
    "UPDATE incident_reports SET status = ? WHERE report_id = ?",
    [status, id]
  );
  return true;
};
const create = async (data) => {
  const { driver_id, type, priority, description, location } = data;

  const sql = `
    INSERT INTO incident_reports 
    (driver_id, title, priority, description, address, status) 
    VALUES (?, ?, ?, ?, ?, 'pending')
  `;

  const [result] = await pool.query(sql, [
    driver_id,
    type,       // title bên DB
    priority,
    description,
    location    // address bên DB
  ]);

  // Trả về ID vừa tạo và data để frontend hiển thị ngay
  return {
    notif_id: result.insertId, // Frontend bạn đang dùng key 'notif_id' để hiển thị
    ...data
  };
};

export const reportModel = {
  findAll,
  countPending,
  updateStatus,
  create,
  findByDriverId
};