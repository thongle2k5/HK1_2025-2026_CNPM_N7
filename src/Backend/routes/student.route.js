import { StudentController } from "../controllers/student.controller.js";
import {PickupStatusController} from "../controllers/pickup.status.controller.js";
import { ScheduleController } from "../controllers/schedule.controller.js";
import express from "express";

const router = express.Router();


router.get('/user/:userId/detail',StudentController.getStudentsDataByUserId);
router.get("/:id",StudentController.getStudentById);

export default router;