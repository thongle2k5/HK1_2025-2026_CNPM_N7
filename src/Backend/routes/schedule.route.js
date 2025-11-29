import express from 'express'
import { ScheduleController } from '../controllers/schedule.controller.js'
const router=express.Router();
router.get('/manager',ScheduleController.getScheduleByManager)
router.get('/current/:driverId', ScheduleController.getCurrentSchedule)
router.post('/', ScheduleController.createSchedule);
router.put('/:id', ScheduleController.updateSchedule);   
router.delete('/:id', ScheduleController.deleteSchedule); 
router.put('/:id/status', ScheduleController.updateScheduleStatus);
export default router