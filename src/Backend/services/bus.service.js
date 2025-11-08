import pool from  '../models/Connect_dtb.js'
const getAllBuses= async () =>{
    const[rows] = await pool.promise().query("SELECT * From bus");
    return rows;
}
export const busService={
 getAllBuses,
}