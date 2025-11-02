import { StopController } from "../controllers/stop.controller.js";
import express from "express";

const router = express.Router();


router.get('/', StopController.getAllStops);
router.get('/:id', StopController.getStopById);
router.get('/route/:routeId',StopController.getStopsByRouteId);
export default router;