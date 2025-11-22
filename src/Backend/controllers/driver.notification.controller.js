import db from "../db/Connect_dtb";

export const getDriverNotifications = async (req, res) => {
    const { driverId } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT n.notif_id, n.title, n.message, n.created_at, r.is_read
       FROM notification n
       JOIN notification_read_status r 
       ON n.notif_id = r.notif_id
       WHERE r.user_id = ? 
       ORDER BY n.created_at DESC`,
            [driverId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
