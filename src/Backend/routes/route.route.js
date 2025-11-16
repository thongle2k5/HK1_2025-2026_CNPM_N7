import express from 'express'
import { routeConTroller } from '../controllers/route.controller.js'
const router =express.Router();
router.get('/',routeConTroller.getRoute);
export default router;