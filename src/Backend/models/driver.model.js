import db from "../db/connect.js";

export const getDriverDashboard = async (driverId) => {
  // Lấy thông tin tài xế + tuyến
  const [driver] = await db.query(
    `SELECT d.name AS driverName, r.name AS route 
     FROM drivers d 
     JOIN routes r ON d.route_id = r.id 
     WHERE d.id = ?`,
    [driverId]
  );

  // Lấy thống kê học sinh hôm nay
  const [students] = await db.query(
    `SELECT COUNT(*) AS total, 
            SUM(CASE WHEN picked_up = 1 THEN 1 ELSE 0 END) AS pickedUp
     FROM student_pickup
     WHERE driver_id = ? AND DATE(date) = CURDATE()`,
    [driverId]
  );

  // Lấy 3 cảnh báo gần nhất
  const [alerts] = await db.query(
    `SELECT id, type, time, location 
     FROM incident_reports 
     WHERE driver_id = ? 
     ORDER BY time DESC 
     LIMIT 3`,
    [driverId]
  );

  return { driver, students, alerts };
};
