import db from '../db/Connect_dtb.js';

export const UserModel ={

    getUserById: async (id) =>{
        const [row] = await db.query('select * from user where user_id = ?',[id]);
        return row[0];
    }, findUserByRole: async(role)=>{
    const [rows] = await db.query("SELECT * FROM user WHERE role = ?", [role]);
    return rows;
}

}
export const findUserIdsByRole = async (role) => {
  const [rows] = await db.query("SELECT user_id FROM user WHERE role = ?", [role]);
  return rows.map(row => row.user_id);
};

export const findAllUserIds = async () => {
  const [rows] = await db.query("SELECT user_id FROM user");
  return rows.map(row => row.user_id);
};