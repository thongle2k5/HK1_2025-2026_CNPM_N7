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

    const { sender_id, receiver_id, content } = req.body;

    if (!content) return res.status(400).json({ message: "Nội dung trống" });

    await messageService.sendMessage({ sender_id, receiver_id, content });
    const io = req.app.get("socketio");
    const targetRoom = `user_${receiver_id}`; // Phải khớp tên phòng ở server.js

    // Tạo gói tin đầy đủ để Frontend hiển thị ngay
    const messagePayload = {
      message_id: Date.now(), // ID tạm
      sender_id,
      receiver_id,
      content,
      created_at: new Date().toISOString()
    };

    console.log(`🚀 Đang bắn tin tới phòng: ${targetRoom}`);
    io.to(targetRoom).emit("receive_message", messagePayload);
    res.status(201).json({ message: "Đã gửi và thông báo Real-time" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default { getConversation, sendMessage };