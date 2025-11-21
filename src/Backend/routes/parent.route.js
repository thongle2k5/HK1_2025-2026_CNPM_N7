import { ParentController } from "../controllers/parent.controller.js";

import express from "express";

const router = express.Router();

router.get('/admin/parents', ParentController.getParentsAdmin);
router.get('/admin/:parentId', ParentController.getParentByIdAdmin);
router.delete('/admin/:parentId', ParentController.deleteParentByIdAdmin);

export default router;