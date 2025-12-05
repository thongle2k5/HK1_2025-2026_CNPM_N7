import {UserController} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();
router.get('/profileManagers',UserController.getManagers)
router.get("/:id", UserController.getUserById);
router.post("/register", UserController.register);
export default router;