import * as messageService from '../services/message.service.js';

export const getConversation = async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    if (!user1 || !user2) return res.status(400).json({message: "Thiếu ID người dùng"});
    
    const messages = await messageService.getConversation(user1, user2);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    // sender_id: ID Admin, receiver_id: ID Tài xế
    const { sender_id, receiver_id, content } = req.body;
    
    if(!content) return res.status(400).json({message: "Nội dung trống"});

    await messageService.sendMessage({ sender_id, receiver_id, content });
    res.status(201).json({ message: "Đã gửi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};