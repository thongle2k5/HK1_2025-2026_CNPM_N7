// // backend/models/notification.model.js
// import pool from "../db/Connect_dtb.js"; // giả sử bạn đã tạo pool MySQL

// // Thêm thông báo báo cáo sự cố từ tài xế
// export const createReport = async ({ title, message, driver_id }) => {
//     const conn = await pool.getConnection();
//     try {
//         await conn.beginTransaction();

//         // 1. Insert vào notification
//         const [notifResult] = await conn.query(
//             `INSERT INTO notification (title, message, admin_id, status, target_audience)
//        VALUES (?, ?, ?, 'published', 'admin')`,
//             [title, message, driver_id]
//         );
//         const notif_id = notifResult.insertId;

//         // 2. Lấy tất cả admin để gán trạng thái đọc
//         const [admins] = await conn.query(`SELECT user_id FROM user WHERE role='admin'`);
//         const values = admins.map(a => [notif_id, a.user_id, false]);

//         // 3. Insert vào notification_read_status
//         if (values.length > 0) {
//             await conn.query(
//                 `INSERT INTO notification_read_status (notif_id, user_id, is_read) VALUES ?`,
//                 [values]
//             );
//         }

//         await conn.commit();
//         return notif_id;
//     } catch (err) {
//         await conn.rollback();
//         throw err;
//     } finally {
//         conn.release();
//     }
// };

// // Lấy tất cả thông báo dành cho admin
// export const getAdminNotifications = async (adminId) => {
//     const [rows] = await pool.query(
//         `SELECT n.notif_id, n.title, n.message, n.created_at, n.status, n.admin_id, r.is_read
//      FROM notification n
//      JOIN notification_read_status r ON n.notif_id = r.notif_id
//      WHERE r.user_id = ?
//      ORDER BY n.created_at DESC`,
//         [adminId]
//     );
//     return rows;
// };

// // Đánh dấu thông báo là đã đọc
// export const markAsRead = async (notif_id, adminId) => {
//     const [result] = await pool.query(
//         `UPDATE notification_read_status SET is_read = TRUE, read_at = NOW()
//      WHERE notif_id = ? AND user_id = ?`,
//         [notif_id, adminId]
//     );
//     return result;
// };
