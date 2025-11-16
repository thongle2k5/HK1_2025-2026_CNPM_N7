import express from 'express'
import { driverController } from '../controllers/driver.controller.js'
const router =express.Router();
router.get('/',driverController.getAlldrivers);
router.get('/total',driverController.getTotalDrivers)
export default router;