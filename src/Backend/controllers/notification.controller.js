import { NotificationModel } from "../models/notification.model.js";

export const NotificationController = {
  getNotificationsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await NotificationModel.getNotificationsByUserId(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error getting notifications:", error);
      res.status(500).json({ error: error.message });
    }
  }
};