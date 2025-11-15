import db from '../db/Connect_dtb.js';

export const NotificationModel = {
  getNotificationsByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        'SELECT * FROM notification WHERE user_id = ? ORDER BY timestamp DESC',
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Error in NotificationModel:", error);
      throw error;
    }
  }
};