import express from "express";
import { NotificationController } from "../controllers/notification.controller.js";

const router = express.Router();

// ========== NOTIFICATION ROUTES ==========
router.get('/', NotificationController.getAllNotifi);
router.get('/startData', NotificationController.getStartData);
router.get('/user/:userId', NotificationController.getNotificationsByUserId);
router.get('/unread-count/:userId', NotificationController.getUnreadCount);
router.delete('/:id', NotificationController.deleteNotifi);
router.put('/:id', NotificationController.editNotifi);
router.post('/', NotificationController.create);
router.post('/mark-as-read/:userId', NotificationController.markAsRead);
router.post('/mark-all-read/:userId', NotificationController.markAllAsRead);
// ========= BUS NOTIFICATION ROUTES =======
router.get('/:userId/busNoti', NotificationController.getBusNotiByUserId);
// ========== MESSAGE ROUTES ==========
router.get('/messages/:userId', NotificationController.getMessagesByUserId);
router.get('/messages/unread-count/:userId', NotificationController.getUnreadMessageCount);
router.put('/messages/mark-read/:messageId', NotificationController.markMessageAsRead);

export default router;
