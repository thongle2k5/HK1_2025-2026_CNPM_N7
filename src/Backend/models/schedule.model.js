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
  getScheduleByStudentId: async (studentId) => {
    const data = await db.promise().query('select * from pickup_status left join schedule  on pickup_status.schedule_id = schedule.schedule_id where pickup_status.student_id =?', [studentId]);
    return data[0];
  },
  getScheduleByManager,
  createSchedule: async (data) => {

    const { route_id, bus_id, driver_id, date, start_time, manager_id, end_time } = data;
    const sql = `
      INSERT INTO schedule
      (route_id, bus_id, driver_id, date, start_time, manager_id, end_time, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `;
    const values = [route_id, bus_id, driver_id, date, start_time, manager_id, end_time];

    try {
      const [result] = await db.query(sql, values);
      return { schedule_id: result.insertId, ...data, status: 'pending' };

    } catch (error) {
      console.error("Lỗi khi INSERT schedule:", error);
      throw error;
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
  }

}