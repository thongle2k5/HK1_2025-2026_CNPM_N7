import { LocationController } from "../controllers/location.controller.js";

import express from "express";

const router = express.Router();

router.get('/admin/locations', LocationController.getLocationsAdmin);

export default router;