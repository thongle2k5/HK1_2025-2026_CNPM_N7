import pool from '../db/Connect_dtb.js';

const getConversation = async (user1, user2) => {
  // Lấy tin nhắn chiều đi VÀ chiều về
  const sql = `
    SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?)
    ORDER BY created_at ASC
  `;
  const [rows] = await pool.query(sql, [user1, user2, user2, user1]);
  return rows;
};

const create = async ({ sender_id, receiver_id, content }) => {
  const sql = `
    INSERT INTO messages (sender_id, receiver_id, content) 
    VALUES (?, ?, ?)
  `;
  try {
    await pool.query(sql, [sender_id, receiver_id, content]);
    return true;
  } catch (error) {
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.errno === 1452) {
        throw new Error('Người gửi hoặc người nhận không tồn tại trong hệ thống người dùng (user).');
    }
    throw error; 
  }
};

export const messageModel = { getConversation, create };