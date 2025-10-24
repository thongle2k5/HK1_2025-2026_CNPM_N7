import pool from  '../db/Connect_dtb.js'
const getAllBuses= async () =>{
    const[rows] = await pool.query("SELECT * From bus");
    return rows;
}
export const busService={
 getAllBuses
}