import express from 'express';
import ScheduleController from '../controllers/driver.schedule.controller.js';

const router = express.Router();

router.get('/driver/:driverId', ScheduleController.getDriverSchedule);

router.get('/route/:routeId/detail', ScheduleController.getRouteDetail);

export default router;




