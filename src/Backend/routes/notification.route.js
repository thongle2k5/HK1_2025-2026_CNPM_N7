import express from "express";
import { NotificationController } from "../controllers/notification.controller.js";

const router = express.Router();


router.get('/',NotificationController.getAllNotifi);
router.get('/startData',NotificationController.getStartData);
router.get("/user/:userId", NotificationController.getNotificationsByUserId);
router.delete('/:id',NotificationController.deleteNotifi);
router.put('/:id',NotificationController.editNotifi);
router.post('/', NotificationController.create);
export default router ;

