import { AssignmentController } from "../controllers/assignment.controller.js";

import express from "express";

const router = express.Router();

router.get('/admin/assignments', AssignmentController.getAssignmentsAdmin);
router.get('/admin/:assignmentId', AssignmentController.getAssignmentByIdAdmin);
router.delete('/admin/:assignmentId', AssignmentController.deleteAssignmentByIdAdmin);
router.post('/admin', AssignmentController.createAssignmentAdmin);
router.put('/admin/:assignmentId', AssignmentController.updateAssignmentAdmin);


export default router;