import express from 'express';
import * as reportController from '../controllers/report.controller.js';

const router = express.Router();

// 1. Lấy danh sách sự cố (cho bảng Admin)
router.get('/', reportController.getAllReports);

// 2. Đếm số lượng chờ xử lý (cho cái Chuông)
router.get('/count-pending', reportController.countPending);
router.get('/driver/:driverId', reportController.getHistoryByDriver);
// 3. Cập nhật trạng thái (Xử lý xong/Đang xử lý)
router.post('/post/:id',reportController.createReport)
router.put('/:id', reportController.updateStatus);
export default router;