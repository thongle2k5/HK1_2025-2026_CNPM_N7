import pool from "../models/Connect_dtb.js";

export const getDriverProfile = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) return res.status(400).json({ message: "Thiếu userId" });

        const [userRows] = await pool.query(`
      SELECT user_id, username, name, email, phone, role
      FROM user
      WHERE user_id = ?
    `, [userId]);

        if (userRows.length === 0) return res.status(404).json({ message: "Không tìm thấy user" });

        const [driverRows] = await pool.query(`
      SELECT license_number
      FROM driver
      WHERE user_id = ?
    `, [userId]);

        const profile = { ...userRows[0], ...(driverRows[0] || {}) };

        return res.json(profile);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi server" });
    }
};
