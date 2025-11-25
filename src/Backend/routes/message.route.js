import express from 'express';
import * as messageController from '../controllers/message.controller.js';

const router = express.Router();

// 1. Lấy lịch sử chat giữa 2 người (Admin & Tài xế)
// Gọi: GET /api/messages?user1=29&user2=26
router.get('/', messageController.getConversation);

// 2. Gửi tin nhắn mới
router.post('/', messageController.sendMessage);

export default router;