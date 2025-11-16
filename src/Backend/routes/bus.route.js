import express from 'express';
import { busController } from '../controllers/bus.controller.js';
import { BusTrackingController } from '../controllers/bus.tracking.controller.js';

const router = express.Router();
router.get('/', busController.getAllBuses);
router.get('/:busId/location', BusTrackingController.getCurrentLocationByBusId);
router.post('/location',BusTrackingController.addLocation);
router.post('/schedule/detail',busController.getBusDataByScheduleIds);
export default router;