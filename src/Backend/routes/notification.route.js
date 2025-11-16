import express from "express";
import { NotificationController } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/user/:userId", NotificationController.getNotificationsByUserId);

export default router;