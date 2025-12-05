import db from '../db/Connect_dtb.js';

export const UserModel = {
  findByUsername: async (username) => {
    const query = "SELECT * FROM user WHERE username = ?";
    const [rows] = await db.query(query, [username]);
    return rows[0];
  },createUser: async (userData) => {
    const { username, password, fullName, role } = userData;
    const query = `
      INSERT INTO user (username, password, name, role) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [username, password, fullName, role]);
    return result.insertId;
  },
  createParent: async (userId) => {
   
    const query = "INSERT INTO parent (user_id, relationship_info) VALUES (?, ?)";
    await db.query(query, [userId, 'cha']);
  },
  getUserById: async (id) => {
    const [row] = await db.query('select * from user where user_id = ?', [id]);
    return row[0];
  }, findUserByRole: async (role) => {
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

export const getUserIdsToSendBusNoti = async (bus_id) => {
  const [rows] = await db.query("select user_id " +
    "from pickup_status join student_parent on pickup_status.student_id = student_parent.student_id " +
    "join parent on student_parent.parent_id = parent.parent_id " +
    "join schedule on pickup_status.schedule_id = schedule.schedule_id " +
    "where bus_id = ? and schedule.status = 'in progress'",[bus_id])
    return rows;
}