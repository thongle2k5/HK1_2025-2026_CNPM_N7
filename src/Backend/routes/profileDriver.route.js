import express from "express";
import { getDriverProfile } from "../controllers/profileDriver.controller.js";

const router = express.Router();

router.get("/", getDriverProfile);

export default router;
