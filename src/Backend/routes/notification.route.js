import notificationController from '../controllers/notification.controller.js';
import express from 'express';
const router = express.Router();
router.get('/',notificationController.getAllNotifi);
router.get('/startData',notificationController.getStartData);
router.delete('/:id',notificationController.deleteNotifi);
router.put('/:id',notificationController.editNotifi);
router.post('/', notificationController.create);
export default router ;