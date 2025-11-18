
import pool from '../models/Connect_dtb.js';
const getAllDrivers = async ()=>{
const [rows]=await pool.query(`select d.driver_id , u.name , u.phone ,u.email,d.license_number,d.status,u.user_id
    from driver d 
    join user u on d.user_id = u.user_id 
    where d.status != 'Terminated'
    `);
return rows
}
const getTotalDrivers = async ()=>{
const [rows]=await pool.query(`
      SELECT
        COUNT(*) AS totalDrivers,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS activeDrivers,
        SUM(CASE WHEN status = 'On-Leave' THEN 1 ELSE 0 END) AS onLeaveDrivers,
        SUM(CASE WHEN status IN ('violation', 'needs_check') THEN 1 ELSE 0 END) AS problemDrivers
      FROM
        driver;
    `);
return rows
}
const getDriverDashboard = async (driverId) => {
  // Lấy thông tin tài xế + tuyến
  const [driver] = await pool.query(
    `SELECT d.name AS driverName, r.name AS route 
     FROM drivers d 
     JOIN routes r ON d.route_id = r.id 
     WHERE d.id = ?`,
    [driverId]
  );

  // Lấy thống kê học sinh hôm nay
  const [students] = await pool.query(
    `SELECT COUNT(*) AS total, 
            SUM(CASE WHEN picked_up = 1 THEN 1 ELSE 0 END) AS pickedUp
     FROM student_pickup
     WHERE driver_id = ? AND DATE(date) = CURDATE()`,
    [driverId]
  );

  const [alerts] = await pool.query(
    `SELECT id, type, time, location 
     FROM incident_reports 
     WHERE driver_id = ? 
     ORDER BY time DESC 
     LIMIT 3`,
    [driverId]
  );

  return { driver, students, alerts };
};
const deleteDriver = async (driverId) => {
  const [result] = await pool.query('update driver set status = "Terminated" where driver_id = ?', [driverId]);
  return result;
}
const update = async ( data) => {
  const {id, name, phone, email, license_number, status, user_id } = data;
  
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
  
    await connection.query(
      "UPDATE user SET name = ?, phone = ?, email = ? WHERE user_id = ?",
      [name, phone, email, user_id]
    );
    

    await connection.query(
      "UPDATE driver SET license_number = ?, status = ? WHERE driver_id = ?",
      [license_number, status, id]
    );
    
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    console.error("Lỗi transaction khi sửa tài xế:", err);
    throw err;
  } finally {
    connection.release();
  }
};
export const driverModel = {
 getAllDrivers,
 getTotalDrivers,
 getDriverDashboard,
 deleteDriver,
 update
}

 