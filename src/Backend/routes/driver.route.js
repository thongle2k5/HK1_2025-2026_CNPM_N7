import express from 'express'
import { driverController } from '../controllers/driver.controller.js'
const router =express.Router();
router.get('/',driverController.getAlldrivers);
export default router;