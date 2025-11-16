import pool from '../models/Connect_dtb.js';
const getAllNotifi= asnyc ()=>{
    const [data]=await pool.query('select * from notification')
    return data
};
export const notificationModel={
    getAllNotifi
};