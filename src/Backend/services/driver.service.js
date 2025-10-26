import pool from '../db/Connect_dtb.js';
const getAllDrivers = async ()=>{
const [rows]=await pool.query("select * from driver");
return rows
}
export const driverService = {
 getAllDrivers
}