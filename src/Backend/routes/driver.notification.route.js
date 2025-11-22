import express from "express";
import { getDriverNotifications } from "../controllers/driver.notification.controller.js";
const router = express.Router();

router.get("/:driverId", getDriverNotifications);

export default router;
