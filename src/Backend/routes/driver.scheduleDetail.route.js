import express from 'express';
import { getScheduleByDriver, getScheduleDetail } from '../controllers/driver.scheduleDetail.controller.js';

const router = express.Router();

router.get('/driver/:driverId', getScheduleByDriver);

router.get('/driver/:driverId/schedule/:scheduleId', getScheduleDetail);

export default router;
