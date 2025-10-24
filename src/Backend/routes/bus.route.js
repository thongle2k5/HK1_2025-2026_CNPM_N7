import express from 'express';
import { busController } from '../controllers/bus.controller.js';
const router = express.Router();
router.get('/', busController.getAllBuses);
export default router;