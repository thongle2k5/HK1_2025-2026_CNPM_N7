
import db from '../db/Connect_dtb.js';
import pool from '../models/Connect_dtb.js';
export const NotificationModel = {

  getNotificationsByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM notification join notification_read_status ' +
        'on notification.notif_id = notification_read_status.notif_id WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Error in NotificationModel:", error);
      throw error;
    }
  }
}

const getAllNotifi = async () => {
  const [data] = await pool.query('select * from notification where status!="archived"')
  return data
};
const startData = async () => {
  const [data] = await pool.query(`SELECT
    (
        SELECT COUNT(*) 
        FROM notification 
        WHERE status != 'draft'
    ) AS totalNotifications,
    
    (
        SELECT COUNT(*) 
        FROM notification 
        WHERE status != 'draft' AND created_at >= NOW() - INTERVAL 7 DAY
    ) AS thisWeek,
    
    (
        SELECT COUNT(*) 
        FROM notification 
        WHERE status = 'published'
    ) AS published,
    
    (
        SELECT COUNT(*) 
        FROM notification_read_status 
        WHERE is_read = FALSE
    ) AS unread;`);
  return data;
}
const deleteNotifi = async (id) => {
  const [data] = await pool.query('update notification set status="archived" where notif_id=?', [id]);
  return data;
}
const update = async (id, data) => {
  const { title, message, target_audience } = data;
  const sql = `
    UPDATE notification
    SET 
      title = ?,
      message = ?,
      target_audience = ?
    WHERE
      notif_id = ?
  `;
  await pool.query(sql, [title, message, target_audience, id]);
  return { id };
};
const create = async (data, userIds) => {
  const { title, message, admin_id, target_audience } = data;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const sqlNotif = `
      INSERT INTO notification (title, message, admin_id, target_audience, status)
      VALUES (?, ?, ?, ?, 'published')
    `;
    const [result] = await connection.query(sqlNotif, [
      title, message, admin_id, target_audience
    ]);
    const newNotifId = result.insertId;
    const statusValues = userIds.map(userId => [newNotifId, userId]);
    const sqlStatus = `
      INSERT INTO notification_read_status (notif_id, user_id)
      VALUES ? 
    `;

    await connection.query(sqlStatus, [statusValues]);


    await connection.commit();
    return { id: newNotifId };

  } catch (err) {

    await connection.rollback();
    console.error("Lỗi transaction khi tạo thông báo:", err);
    throw new Error("Lỗi khi lưu thông báo vào CSDL");
  } finally {

    connection.release();
  }
};
const createBusNoti = async (bus_id, stop_id, schedule_id, type) => {
  const query = "insert into bus_notification (bus_id, stop_id, schedule_id, type) " +
    "values (?,?,?,?)";
  const [data] = await pool.query(query, [bus_id, stop_id, schedule_id, type]);
  return data;

};
const getBusNotiByIds = async (bus_id, stop_id, schedule_id, type) => {
  const query = "select * from bus_notification where bus_id=? and stop_id=? and schedule_id=? and type=?";
  const [data] = await pool.query(query, [bus_id, stop_id, schedule_id, type]);
  return data[0];
};
const getByUserId = async (userId) => {

  const [userRows] = await db.query("SELECT role FROM user WHERE user_id = ?", [userId]);
  const role = userRows[0]?.role || '';

  const sql = `
    SELECT 
      n.notif_id, 
      n.title, 
      n.message, 
      n.created_at,
      COALESCE(rs.is_read, 0) as is_read -- Nếu chưa có trong bảng read_status thì coi như chưa đọc
    FROM notification n
    LEFT JOIN notification_read_status rs 
      ON n.notif_id = rs.notif_id AND rs.user_id = ?
    WHERE 
      -- Lấy tin nhắn gửi riêng cho user này
      rs.user_id = ?
      -- HOẶC lấy tin nhắn gửi chung cho role này (ví dụ 'driver')
      OR n.target_audience = ?
      OR n.target_audience = 'all'
    ORDER BY n.created_at DESC
  `;

  const [rows] = await db.query(sql, [userId, userId, role]);
  return rows;
};
const getBusNotiByUserId = async (userId) => {
  const query = `
SELECT bus_notification.* FROM parent
join student_parent on parent.parent_id = student_parent.parent_id 
join (
    SELECT ps.*,
           ROW_NUMBER() OVER (
               PARTITION BY ps.schedule_id 
               ORDER BY ps.time DESC
           ) AS rn
    FROM pickup_status ps
    JOIN student_parent sp ON ps.student_id = sp.student_id
    JOIN parent p ON sp.parent_id = p.parent_id
) ups on ups.student_id = student_parent.student_id and ups.rn=1
right join bus_notification on ups.schedule_id = bus_notification.schedule_id
where parent.user_id = ?
order by timestamp desc ,type desc
limit 30 `
  const [data] = await pool.query(query, [userId]);
  return data;
}

export const notificationModel = {
  getAllNotifi,
  startData,
  deleteNotifi,
  update,
  create,
  getByUserId,
  createBusNoti,
  getBusNotiByIds,
  getBusNotiByUserId
};

