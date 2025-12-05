import express from "express";
import { StudentController } from "../controllers/StudentList.controller.js";
import { ScheduleController } from "../controllers/schedule.controller.js";
const router = express.Router();

router.get("/current/:driverId", ScheduleController.getCurrentSchedule);
router.get("/:scheduleId/students", StudentController.getStudents);
router.put("/:scheduleId/students/:studentId", StudentController.updateStatus);

export default router;
