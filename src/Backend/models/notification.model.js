
import pool from '../models/Connect_dtb.js';


const getNotificationsByUserId = async (userId) => {
  try {
    const [userRows] = await pool.query("SELECT role FROM user WHERE user_id = ?", [userId]);
    const role = userRows[0]?.role || '';

    const sql = `
            SELECT 
            n.notif_id, 
            n.title, 
            n.message, 
            n.created_at,
            COALESCE(rs.is_read, 0) as is_read
            FROM notification n
            LEFT JOIN notification_read_status rs 
            ON n.notif_id = rs.notif_id AND rs.user_id = ?
            WHERE 
            rs.user_id = ?
            OR n.target_audience = ?
            OR n.target_audience = 'all'
            ORDER BY n.created_at DESC
        `;
    const [rows] = await pool.query(sql, [userId, userId, role]);
    return rows;
  } catch (error) {
    console.error("Error in getByUserId:", error);
    throw error;
  }
};

const getUnreadCountByUserId = async (userId) => {
  try {
    const [data] = await pool.query(
      `SELECT COUNT(*) as unreadCount 
             FROM notification_read_status nrs
             JOIN notification n ON nrs.notif_id = n.notif_id
             WHERE nrs.user_id = ? AND nrs.is_read = FALSE AND n.status = 'published'`,
      [userId]
    );
    return data[0]?.unreadCount || 0;
  } catch (error) {
    console.error("Error in getUnreadCountByUserId:", error);
    throw error;
  }
};

const markNotificationAsRead = async (notifId, userId) => {
  try {
    const [result] = await pool.query(
      'UPDATE notification_read_status SET is_read = TRUE, read_at = NOW() WHERE notif_id = ? AND user_id = ?',
      [notifId, userId]
    );
    return result;
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    throw error;
  }
};

const markAllNotificationsAsRead = async (userId) => {
  try {
    const [result] = await pool.query(
      'UPDATE notification_read_status SET is_read = TRUE, read_at = NOW() WHERE user_id = ? AND is_read = FALSE',
      [userId]
    );
    return result;
  } catch (error) {
    console.error("Error in markAllNotificationsAsRead:", error);
    throw error;
  }
};

const getAllNotifi = async () => {
  try {
    const [data] = await pool.query('SELECT * FROM notification WHERE status != "archived"');
    return data;
  } catch (error) {
    console.error("Error in getAllNotifi:", error);
    throw error;
  }
};

const getStartData = async () => {
  try {
    const [data] = await pool.query(`SELECT
            (SELECT COUNT(*) FROM notification WHERE status != 'draft') AS totalNotifications,
            (SELECT COUNT(*) FROM notification WHERE status != 'draft' AND created_at >= NOW() - INTERVAL 7 DAY) AS thisWeek,
            (SELECT COUNT(*) FROM notification WHERE status = 'published') AS published,
            (SELECT COUNT(*) FROM notification_read_status WHERE is_read = FALSE) AS unread;`);
    return data;
  } catch (error) {
    console.error("Error in getStartData:", error);
    throw error;
  }
};

const deleteNotifi = async (id) => {
  try {
    const [data] = await pool.query('UPDATE notification SET status = "archived" WHERE notif_id = ?', [id]);
    return data;
  } catch (error) {
    console.error("Error in deleteNotifi:", error);
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const { title, message, target_audience } = data;
    const sql = `UPDATE notification SET title = ?, message = ?, target_audience = ? WHERE notif_id = ?`;
    await pool.query(sql, [title, message, target_audience, id]);
    return { id };
  } catch (error) {
    console.error("Error in update notification:", error);
    throw error;
  }
};

const create = async (data, userIds) => {
  const { title, message, admin_id, target_audience } = data;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const sqlNotif = `INSERT INTO notification (title, message, admin_id, target_audience, status) VALUES (?, ?, ?, ?, 'published')`;
    const [result] = await connection.query(sqlNotif, [title, message, admin_id, target_audience]);

    const newNotifId = result.insertId;
    if (userIds && userIds.length > 0) {
      const statusValues = userIds.map(userId => [newNotifId, userId]);
      const sqlStatus = `INSERT INTO notification_read_status (notif_id, user_id) VALUES ?`;
      await connection.query(sqlStatus, [statusValues]);
    }
    await connection.commit();
    return { id: newNotifId };
  } catch (error) {
    await connection.rollback();
    console.error("Error in create notification:", error);
    throw new Error("Lỗi khi lưu thông báo vào CSDL");
  } finally {
    connection.release();
  }
};

const getMessagesByUserId = async (userId) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.*, 
                    sender.name as sender_name,
                    sender.role as sender_role,
                    receiver.name as receiver_name
             FROM messages m
             JOIN user sender ON m.sender_id = sender.user_id
             JOIN user receiver ON m.receiver_id = receiver.user_id
             WHERE m.receiver_id = ?
             ORDER BY m.created_at DESC`,
      [userId, userId]
    );
    return rows;
  } catch (error) {
    console.error("Error in getMessagesByUserId:", error);
    throw error;
  }
};
const getBusNotiByIds = async (bus_id, stop_id, schedule_id, type) => {
  const query = "select * from bus_notification where bus_id=? and stop_id=? and schedule_id=? and type=?";
  const [data] = await pool.query(query, [bus_id, stop_id, schedule_id, type]);
  return data[0];
};
const createBusNoti = async (bus_id, stop_id, schedule_id, type) => {
  const query = "insert into bus_notification (bus_id, stop_id, schedule_id, type) " +
    "values (?,?,?,?)";
  const [data] = await pool.query(query, [bus_id, stop_id, schedule_id, type]);
  return data;

};

const markMessageAsRead = async (messageId, userId) => {
  try {
    const [result] = await pool.query(
      'UPDATE messages SET is_read = TRUE WHERE message_id = ? AND receiver_id = ?',
      [messageId, userId]
    );
    return result;
  } catch (error) {
    console.error("Error in markMessageAsRead:", error);
    throw error;
  }
};

const getUnreadMessageCount = async (userId) => {
  try {
    const [data] = await pool.query(
      'SELECT COUNT(*) as unreadCount FROM messages WHERE receiver_id = ? AND is_read = FALSE',
      [userId]
    );
    return data[0]?.unreadCount || 0;
  } catch (error) {
    console.error("Error in getUnreadMessageCount:", error);
    throw error;
  }
};
// const getByUserId = async (userId) => {

//   const [userRows] = await db.query("SELECT role FROM user WHERE user_id = ?", [userId]);
//   const role = userRows[0]?.role || '';

//   const sql = `
//     SELECT 
//       n.notif_id, 
//       n.title, 
//       n.message, 
//       n.created_at,
//       COALESCE(rs.is_read, 0) as is_read -- Nếu chưa có trong bảng read_status thì coi như chưa đọc
//     FROM notification n
//     LEFT JOIN notification_read_status rs 
//       ON n.notif_id = rs.notif_id AND rs.user_id = ?
//     WHERE 
//       -- Lấy tin nhắn gửi riêng cho user này
//       rs.user_id = ?
//       -- HOẶC lấy tin nhắn gửi chung cho role này (ví dụ 'driver')
//       OR n.target_audience = ?
//       OR n.target_audience = 'all'
//     ORDER BY n.created_at DESC
//   `;

//   const [rows] = await db.query(sql, [userId, userId, role]);
//   return rows;
// };
const getByUserId = async (userId) => {
  try {
    const [userRows] = await pool.query("SELECT role FROM user WHERE user_id = ?", [userId]);
    const role = userRows[0]?.role || '';

    const sql = `
            SELECT 
            n.notif_id, 
            n.title, 
            n.message, 
            n.created_at,
            COALESCE(rs.is_read, 0) as is_read
            FROM notification n
            LEFT JOIN notification_read_status rs 
            ON n.notif_id = rs.notif_id AND rs.user_id = ?
            WHERE 
            rs.user_id = ?
            OR n.target_audience = ?
            OR n.target_audience = 'all'
            ORDER BY n.created_at DESC
        `;
    const [rows] = await pool.query(sql, [userId, userId, role]);
    return rows;
  } catch (error) {
    console.error("Error in getByUserId:", error);
    throw error;
  }
};


const getBusNotiByUserId = async (userId) => {
  const query = `
    SELECT bus_notification.*, stop.address FROM parent
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
    join stop on bus_notification.stop_id = stop.stop_id
    where parent.user_id = ?
    order by timestamp desc ,type desc
    limit 30 `
  const [data] = await pool.query(query, [userId]);
  return data;
}

export const notificationModel = {
  getAllNotifi,
  getStartData,
  deleteNotifi,
  update,
  create,
  getMessagesByUserId,
  markMessageAsRead,
  getUnreadMessageCount,
  getNotificationsByUserId,
  getUnreadCountByUserId,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getByUserId,
  createBusNoti,
  getBusNotiByIds,
  getBusNotiByUserId
};
export const NotificationModel = notificationModel;