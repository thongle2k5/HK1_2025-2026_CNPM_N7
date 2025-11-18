import express from 'express'
import { driverController } from '../controllers/driver.controller.js'
const router =express.Router();
router.get('/',driverController.getAlldrivers);
router.get('/total',driverController.getTotalDrivers)
router.delete('/:id', driverController.Delete);
router.put('/:id', driverController.editDriver)
export default router;