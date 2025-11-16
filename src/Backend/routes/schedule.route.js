import express from 'express'
import { ScheduleController } from '../controllers/schedule.controller.js'
const router=express.Router();
router.get('/manager',ScheduleController.getScheduleByManager)
router.post('/', ScheduleController.createSchedule);
export default router