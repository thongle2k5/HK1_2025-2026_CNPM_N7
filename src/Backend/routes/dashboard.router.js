import express from 'express'
import dashboardController from '../controllers/dashboard.controller.js'
const router =express.Router();
router.get('/start',dashboardController.getAllTotal)
router.get('/chart',dashboardController.getChartData)
export default router
