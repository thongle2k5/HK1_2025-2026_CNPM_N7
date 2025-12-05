import db from '../db/Connect_dtb.js';
export const StudentModel = {
 
  getStudentsBySchedule: async (scheduleId) => {
    const query = `
      SELECT 
        s.student_id, 
        s.student_name AS student_name, 
        s.class,  
        st.address, 
        ps.status,
        ps.time AS last_update
      FROM pickup_status ps
      JOIN student s ON ps.student_id = s.student_id
      JOIN stop st ON ps.stop_id = st.stop_id
      WHERE ps.schedule_id = ?
    `;
    const [rows] = await db.query(query, [scheduleId]);
    return rows;
  },

  
  updatePickupStatus: async (scheduleId, studentId, status) => {
    const query = `
      UPDATE pickup_status 
      SET status = ?, time = NOW() 
      WHERE schedule_id = ? AND student_id = ?
    `;
    const [result] = await db.query(query, [status, scheduleId, studentId]);
    return result;
  },
  
 
  checkStudentInSchedule: async (scheduleId, studentId) => {
      const query = `SELECT 1 FROM pickup_status WHERE schedule_id = ? AND student_id = ?`;
      const [rows] = await db.query(query, [scheduleId, studentId]);
      return rows.length > 0;
  }
};