import db from '../db/Connect_dtb.js';

export const getAllRoute ={
    getRoute: async ()=>{
        const [row] = await db.query('select * from route ');
        return row;
    },
}