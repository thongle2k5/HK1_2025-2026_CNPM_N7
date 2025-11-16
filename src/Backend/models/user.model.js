import db from '../db/Connect_dtb.js';

export const UserModel ={

    getUserById: async (id) =>{
        const [row] = await db.query('select * from user where user_id = ?',[id]);
        return row[0];
    },

}