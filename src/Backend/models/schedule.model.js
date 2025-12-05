import db from '../db/Connect_dtb.js';
const getScheduleByManager = async (page, limit) => {
  const offset = (page - 1) * limit;
  const [countResult] = await db.query(
    `SELECT COUNT(*) as total FROM schedule`
  );
  const totalItems = countResult[0].total;
  const totalPages = Math.ceil(totalItems / limit);
  const [data] = await db.query(`SELECT
        c.schedule_id,
        c.route_id,   
        c.bus_id,     
        c.driver_id, 
        c.end_time,  
        a.name AS tuyen_duong,
        b.license_plate AS xe_buyt,
        u.name AS tai_xe,         
        c.date,
        c.start_time,
        c.status
    FROM schedule AS c
    INNER JOIN route AS a ON a.route_id = c.route_id
    INNER JOIN bus AS b ON b.bus_id = c.bus_id
    INNER JOIN driver AS d ON c.driver_id = d.driver_id 
    INNER JOIN user AS u ON d.user_id = u.user_id 
    LIMIT ? OFFSET ?`,
    [limit, offset])
  return { data, totalPages, currentPage: page };
}
export const ScheduleModel = {
  getScheduleById: async (scheduleId) => {
    const [rows] = await db.query('select * from schedule where schedule_id = ?', [scheduleId]);
    return rows[0];
  },
  getCurrentSchedule : async(id)=>{
    const [row]= await db.query(`SELECT
    c.schedule_id,
    c.route_id,   
    c.bus_id,     
    c.driver_id, 
    c.end_time,
    
    a.name AS tuyen_duong,
    
    -- Lấy thông tin chi tiết xe buýt
    b.license_plate AS license_plate,   -- Biển số xe
    b.model AS model,           -- Loại xe
    b.capacity AS capacity,       -- Sức chứa
    
    u.name AS name,
    c.date,
    c.start_time,
    c.status

FROM schedule AS c
INNER JOIN route AS a ON a.route_id = c.route_id
INNER JOIN bus AS b ON b.bus_id = c.bus_id
INNER JOIN driver AS d ON c.driver_id = d.driver_id
INNER JOIN user AS u ON d.user_id = u.user_id

WHERE c.driver_id = ?
  AND c.date = CURDATE()
  AND c.status IN ('pending', 'in progress');`,[id]);
    return row[0];
  },
  getScheduleByStudentId: async (studentId) => {
    const data = await db.promise().query('select * from pickup_status left join schedule  on pickup_status.schedule_id = schedule.schedule_id where pickup_status.student_id =?', [studentId]);
    return data[0];
  },
  getScheduleByManager,
  createSchedule: async (data) => {
    const { route_id, bus_id, driver_id, date, start_time, end_time } = data;
    
    // BƯỚC 1: Tạo Lịch trình (Schedule)
    const querySchedule = `
      INSERT INTO schedule (route_id, bus_id, driver_id, date, start_time, end_time, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `;
    
    // Dùng Transaction để đảm bảo cả 2 việc cùng thành công hoặc cùng thất bại
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      const [resSchedule] = await connection.query(querySchedule, [
        route_id, bus_id, driver_id, date, start_time, end_time
      ]);
      
      const newScheduleId = resSchedule.insertId;

      // BƯỚC 2: Tìm học sinh thuộc tuyến này
      // Logic: Học sinh -> Stop -> Stop_Route -> Route
      const queryStudents = `
        SELECT s.student_id, s.stop_id
        FROM student s
        JOIN stop_route sr ON s.stop_id = sr.stop_id
        WHERE sr.route_id = ?
      `;
      const [students] = await connection.query(queryStudents, [route_id]);

      // BƯỚC 3: Tạo danh sách điểm danh (Pickup Status)
      if (students.length > 0) {
        const pickupValues = students.map(st => [
            newScheduleId, // ID chuyến vừa tạo
            st.student_id,
            st.stop_id,
            'waiting',     // Mặc định là chưa đón
            new Date()     // Thời gian tạo
        ]);

        const queryPickup = `
          INSERT INTO pickup_status (schedule_id, student_id, stop_id, status, time)
          VALUES ?
        `;
        // insert dạng Bulk (nhiều dòng 1 lúc)
        await connection.query(queryPickup, [pickupValues]);
      }

      await connection.commit(); // Lưu tất cả
      return newScheduleId;

    } catch (error) {
      await connection.rollback(); // Nếu lỗi thì hoàn tác
      throw error;
    } finally {
      connection.release(); // Trả kết nối
    }
  }, findConflict: async (driver_id, bus_id, date, start_time) => {
    const sql = `
      SELECT * FROM schedule
      WHERE (driver_id = ? OR bus_id = ?) 
      AND date = ? 
      AND start_time = ?
      AND status != 'cancelled' 
    `;
    const [rows] = await db.query(sql, [driver_id, bus_id, date, start_time]);
    return rows;
  },
  updateSchedule: async (id, data) => {
    const { route_id, bus_id, driver_id, date, start_time, end_time } = data;
    const sql = `
        UPDATE schedule 
        SET route_id=?, bus_id=?, driver_id=?, date=?, start_time=?, end_time=?
        WHERE schedule_id=?
    `;
    await db.query(sql, [route_id, bus_id, driver_id, date, start_time, end_time, id]);
    return { schedule_id: id, ...data };
  },
  deleteSchedule: async (id) => {

    const [rows] = await db.query("SELECT status FROM schedule WHERE schedule_id = ?", [id]);

    if (rows.length === 0) return null;

    const currentStatus = rows[0].status;


    if (currentStatus === 'completed' || currentStatus === 'in progress') {
      throw new Error("Không thể xóa lịch trình đã hoạt động! Hãy dùng chức năng Hủy chuyến.");
    }


    const sql = `DELETE FROM schedule WHERE schedule_id = ?`;
    await db.query(sql, [id]);
    return { id };
  },
  updateScheduleStatus: async (id, status) =>{
    const query = "update schedule set status = ? where schedule_id = ?";
    await db.query(query, [status, id]);
    return { schedule_id: id, status };
  },


}