
import db from '../db/Connect_dtb.js';
import pool from '../models/Connect_dtb.js';
export const NotificationModel = {

  getNotificationsByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM notification join notification_read_status '+
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

const getAllNotifi = async ()=>{
    const [data]=await pool.query('select * from notification where status!="archived"')
    return data
};
const startData= async()=>{
    const [data]=await pool.query(`SELECT
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
const deleteNotifi= async(id)=>{
    const [data]=await pool.query('update notification set status="archived" where notif_id=?',[id]);
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
export const notificationModel={
    getAllNotifi,
    startData,
    deleteNotifi,
    update,
    create
};