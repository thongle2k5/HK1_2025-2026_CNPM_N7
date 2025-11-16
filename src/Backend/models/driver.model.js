import pool from '../models/Connect_dtb.js';
const getAllDrivers = async ()=>{
const [rows]=await pool.query(`select d.driver_id , u.name , u.phone ,u.email,d.license_number,d.status
    from driver d 
    join user u on d.user_id = u.user_id `);
return rows
}
const getTotalDrivers = async ()=>{
const [rows]=await pool.query(`
      SELECT
        COUNT(*) AS totalDrivers,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS activeDrivers,
        SUM(CASE WHEN status = 'on_leave' THEN 1 ELSE 0 END) AS onLeaveDrivers,
        SUM(CASE WHEN status IN ('violation', 'needs_check') THEN 1 ELSE 0 END) AS problemDrivers
      FROM
        driver;
    `);
return rows
}
export const driverModel = {
 getAllDrivers,
 getTotalDrivers
}