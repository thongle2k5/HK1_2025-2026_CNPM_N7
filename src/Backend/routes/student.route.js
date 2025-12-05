import { StudentController } from "../controllers/student.controller.js";
import { PickupStatusController } from "../controllers/pickup.status.controller.js";
import { ScheduleController } from "../controllers/schedule.controller.js";
import express from "express";
const router = express.Router();
router.get("/parent/:parentId", StudentController.getStudentsByParentId);
router.get("/:studentId/status", PickupStatusController.getStatusByStudentId);
router.get("/:studentId/detail", StudentController.getStudentDetailInfoByStudentId);
router.get('/:studentId/schedule', ScheduleController.getScheduleByStudentId);
router.get('/user/:userId/detail', StudentController.getStudentsDataByUserId);
router.get("/:id", StudentController.getStudentById);
router.put("/:id", StudentController.updateStudent);
router.get('/admin/students', StudentController.getStudentsAdmin);
router.get('/admin/:studentId', StudentController.getStudentByIdAdmin);
router.delete('/admin/:studentId', StudentController.deleteStudentByIdAdmin);

export default router;