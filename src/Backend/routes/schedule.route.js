import express from 'express'
import { ScheduleController } from '../controllers/schedule.controller.js'
const router=express.Router();
router.get('/manager',ScheduleController.getScheduleByManager)
router.post('/', ScheduleController.createSchedule);
router.put('/:id', ScheduleController.updateSchedule);   
router.delete('/:id', ScheduleController.deleteSchedule); 
router.patch('/:id/status', ScheduleController.updateScheduleStatus);
export default router