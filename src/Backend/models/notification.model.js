import db from '../db/Connect_dtb.js';
import pool from '../models/Connect_dtb.js';

// ========== NOTIFICATION MODELS ==========

const getNotificationsByUserId = async (userId) => {
    try {
        const [rows] = await db.query(
            `SELECT n.*, nrs.is_read, nrs.read_at 
             FROM notification n 
             JOIN notification_read_status nrs ON n.notif_id = nrs.notif_id 
             WHERE nrs.user_id = ? AND n.status = 'published'
             ORDER BY n.created_at DESC`,
            [userId]
        );
        return rows;
    } catch (error) {
        console.error("Error in getNotificationsByUserId:", error);
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

    } catch (error) {
        await connection.rollback();
        console.error("Error in create notification:", error);
        throw new Error("Lỗi khi lưu thông báo vào CSDL");
    } finally {
        connection.release();
    }
};

// ========== MESSAGE MODELS ==========

const getMessagesByUserId = async (userId) => {
    try {
        const [rows] = await db.query(
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

const markMessageAsRead = async (messageId, userId) => {
    try {
        const [result] = await db.query(
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
        const [data] = await db.query(
            'SELECT COUNT(*) as unreadCount FROM messages WHERE receiver_id = ? AND is_read = FALSE',
            [userId]
        );
        return data[0]?.unreadCount || 0;
    } catch (error) {
        console.error("Error in getUnreadMessageCount:", error);
        throw error;
    }
};

// ========== EXPORT ==========

export const notificationModel = {
    // Notification functions
    getNotificationsByUserId,
    getUnreadCountByUserId,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getAllNotifi,
    getStartData,
    deleteNotifi,
    update,
    create,
    
    // Message functions
    getMessagesByUserId,
    markMessageAsRead,
    getUnreadMessageCount
};