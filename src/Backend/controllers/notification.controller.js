// import { notificationService } from '../services/notification.services.js';

import { get } from "http";
import { NotificationModel } from "../models/notification.model.js";
 import {notificationService} from '../services/notification.services.js';
// // ========== NOTIFICATION CONTROLLERS ==========

// const getNotificationsByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const notifications = await notificationService.getNotificationsByUserId(userId);
//         res.status(200).json(notifications);
//     } catch (error) {
//         console.error("Error in getNotificationsByUserId controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const getUnreadCount = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const unreadCount = await notificationService.getUnreadCountByUserId(userId);
//         res.status(200).json({ unreadCount });
//     } catch (error) {
//         console.error("Error in getUnreadCount controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const markAsRead = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { notif_id } = req.body;

//         if (!notif_id) {
//             return res.status(400).json({ message: 'Notification ID is required' });
//         }

//         const result = await notificationService.markNotificationAsRead(notif_id, userId);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Notification not found or already read' });
//         }

//         res.status(200).json({ message: 'Notification marked as read' });
//     } catch (error) {
//         console.error("Error in markAsRead controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const markAllAsRead = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const result = await notificationService.markAllNotificationsAsRead(userId);

//         res.status(200).json({ 
//             message: `Marked ${result.affectedRows} notifications as read` 
//         });
//     } catch (error) {
//         console.error("Error in markAllAsRead controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const getAllNotifi = async (req, res) => {
//     try {
//         const data = await notificationService.getAllNotifi();
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Error in getAllNotifi controller:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// const getStartData = async (req, res) => {
//     try {
//         const data = await notificationService.getStartData();
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Error in getStartData controller:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// const deleteNotifi = async (req, res) => {
//     const { id } = req.params;
//     try {
//         if (!id) {
//             return res.status(400).json({ message: 'Bad Request: Missing id' });
//         }
//         await notificationService.deleteNotifi(id);
//         res.status(200).json({ message: 'Notification deleted successfully' });
//     } catch (error) {
//         console.error("Error in deleteNotifi controller:", error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// const editNotifi = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const data = req.body;
//         await notificationService.update(id, data);
//         res.status(200).json({ message: "Cập nhật thông báo thành công" });
//     } catch (error) {
//         console.error("Error in editNotifi controller:", error);
//         res.status(500).json({ message: error.message || "Lỗi server" });
//     }
// };

// const create = async (req, res) => {
//     try {
//         const admin_id = req.user?.userId || 1;
//         const notificationData = {
//             ...req.body,
//             admin_id: admin_id,
//         };

//         const userIds = req.body.userIds || [];

//         await notificationService.create(notificationData, userIds);
//         res.status(201).json({ message: "Tạo thông báo thành công" });
//     } catch (error) {
//         console.error("Error in create controller:", error);
//         res.status(500).json({ message: error.message || "Lỗi server" });
//     }
// };

// // ========== MESSAGE CONTROLLERS ==========

// const getMessagesByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const messages = await notificationService.getMessagesByUserId(userId);
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error("Error in getMessagesByUserId controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const markMessageAsRead = async (req, res) => {
//     try {
//         const { messageId } = req.params;
//         const { userId } = req.body;

//         if (!userId) {
//             return res.status(400).json({ message: 'User ID is required' });
//         }

//         const result = await notificationService.markMessageAsRead(messageId, userId);

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Message not found or already read' });
//         }

//         res.status(200).json({ message: 'Message marked as read' });
//     } catch (error) {
//         console.error("Error in markMessageAsRead controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


// const getUnreadMessageCount = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const unreadCount = await notificationService.getUnreadMessageCount(userId);
//         res.status(200).json({ unreadCount });
//     } catch (error) {
//         console.error("Error in getUnreadMessageCount controller:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


// // ========== EXPORT ==========


// export const NotificationController = {
//   getNotificationsByUserId: async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const notifications = await NotificationModel.getNotificationsByUserId(userId);
//       res.json(notifications);
//     } catch (error) {
//       console.error("Error getting notifications:", error);
//       res.status(500).json({ error: error.message });
//     }
//   },
//   getAllNotifi,
//   getStartData,
//   deleteNotifi,
//   editNotifi,
//   create,
//    getNotificationsByUserId,
//     getUnreadCount,
//     markAsRead,
//     markAllAsRead,
//     getMessagesByUserId,
//     markMessageAsRead,
//     getUnreadMessageCount
// };


// ========== NOTIFICATION CONTROLLERS ==========

const getNotificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await notificationService.getNotificationsByUserId(userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error in getNotificationsByUserId controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const unreadCount = await notificationService.getUnreadCountByUserId(userId);
        res.status(200).json({ unreadCount });
    } catch (error) {
        console.error("Error in getUnreadCount controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        const { notif_id } = req.body;

        if (!notif_id) {
            return res.status(400).json({ message: 'Notification ID is required' });
        }

        const result = await notificationService.markNotificationAsRead(notif_id, userId);

        if (result.affectedRows === 0) {
            // Không tìm thấy không hẳn là lỗi 404, có thể đã đọc rồi, trả về 200 cho client đỡ báo đỏ
            return res.status(200).json({ message: 'Notification marked or already read' });
        }

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (error) {
        console.error("Error in markAsRead controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await notificationService.markAllNotificationsAsRead(userId);
        res.status(200).json({
            message: `Marked ${result.affectedRows} notifications as read`
        });
    } catch (error) {
        console.error("Error in markAllAsRead controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const getAllNotifi = async (req, res) => {
    try {
        const data = await notificationService.getAllNotifi();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getAllNotifi controller:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getStartData = async (req, res) => {
    try {
        const data = await notificationService.getStartData();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error in getStartData controller:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBusNotiByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await NotificationModel.getBusNotiByUserId(userId);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error getting bus notifications:", error);
        res.status(500).json({ error: error.message });
    }
};



const deleteNotifi = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ message: 'Bad Request: Missing id' });
        }
        await notificationService.deleteNotifi(id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error("Error in deleteNotifi controller:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const editNotifi = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await notificationService.update(id, data);
        res.status(200).json({ message: "Cập nhật thông báo thành công" });
    } catch (error) {
        console.error("Error in editNotifi controller:", error);
        res.status(500).json({ message: error.message || "Lỗi server" });
    }
};

const create = async (req, res) => {
    try {
        const admin_id = req.user?.userId || 1;
        const notificationData = {
            ...req.body,
            admin_id: admin_id,
        };
        const userIds = req.body.userIds || [];
        await notificationService.create(notificationData, userIds);
        res.status(201).json({ message: "Tạo thông báo thành công" });
    } catch (error) {
        console.error("Error in create controller:", error);
        res.status(500).json({ message: error.message || "Lỗi server" });
    }
};

// ========== MESSAGE CONTROLLERS ==========

const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await notificationService.getMessagesByUserId(userId);
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessagesByUserId controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const markMessageAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const result = await notificationService.markMessageAsRead(messageId, userId);
        res.status(200).json({ message: 'Message marked as read' });
    } catch (error) {
        console.error("Error in markMessageAsRead controller:", error);
        res.status(500).json({ error: error.message });
    }
};

const getUnreadMessageCount = async (req, res) => {
    try {
        const { userId } = req.params;
        const unreadCount = await notificationService.getUnreadMessageCount(userId);
        res.status(200).json({ unreadCount });
    } catch (error) {
        console.error("Error in getUnreadMessageCount controller:", error);
        res.status(500).json({ error: error.message });
    }
};

// ========== EXPORT ==========
// Chỉ export các hàm đã định nghĩa ở trên, KHÔNG viết lại logic ở đây để tránh lỗi
export const NotificationController = {
    getNotificationsByUserId,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    getAllNotifi,
    getStartData,
    deleteNotifi,
    editNotifi,
    create,
    getBusNotiByUserId,
    getMessagesByUserId,
    markMessageAsRead,
    getUnreadMessageCount
};