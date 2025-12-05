
import pool from '../db/Connect_dtb.js'; 
export default function driverSocket(io, socket) {

  
  socket.on("send_location", async (data) => {
  
    
    try {
      
      const updateQuery = `
        UPDATE bus 
        SET 
          current_latitude = ?, 
          current_longitude = ?, 
          last_update = NOW(),
          status = 'active'
        WHERE license_plate = ?
      `;
      
  
      await pool.query(updateQuery, [data.lat, data.lng, data.bus_license]);
    
      socket.broadcast.emit("receive_location", data);

    } catch (err) {
      console.error("❌ Lỗi lưu vị trí từ Socket:", err);
    }
  });

  
  socket.on("start_trip", async (data) => {
      // Logic lưu DB trạng thái 'dang_chay'...
      // Logic báo cho phụ huynh...
  });
}