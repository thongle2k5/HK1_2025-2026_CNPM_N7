import pool from '../db/Connect_dtb.js';
const getAllDrivers = async ()=>{
const [rows]=await pool.query("select d.driver_id , u.name , u.phone from driver d join user u on d.user_id = u.user_id ");
return rows
}
export const driverService = {
 getAllDrivers
}