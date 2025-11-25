// driver.schedule.service.js
import db from '../db/Connect_dtb.js';

class ScheduleService {
    /**
     * Lấy lịch theo driver trong khoảng date (from..to)
     * trả về mảng các schedule kèm thông tin route + bus + danh sách stops + students count (tuỳ chọn)
     */
    static async getDriverSchedulesBetween(driverId, fromDate, toDate) {
        const sql = `
      SELECT 
        s.schedule_id,
        s.route_id,
        r.name AS route_name,
        r.description AS route_description,
        s.bus_id,
        b.license_plate,
        b.model AS bus_model,
        b.status AS bus_status,
        s.driver_id,
        s.date,
        DATE_FORMAT(s.start_time, '%H:%i:%s') AS start_time,
        DATE_FORMAT(s.end_time, '%H:%i:%s') AS end_time,
        s.status
      FROM schedule s
      LEFT JOIN route r ON s.route_id = r.route_id
      LEFT JOIN bus b ON s.bus_id = b.bus_id
      WHERE s.driver_id = ?
        AND s.date BETWEEN ? AND ?
      ORDER BY s.date, s.start_time;
    `;
        const [rows] = await db.query(sql, [driverId, fromDate, toDate]);
        return rows;
    }

    /**
     * Lấy chi tiết tuyến: stops + expected_arrive_time + students at each stop
     */
    static async getRouteDetail(routeId) {
        const sql = `
      SELECT 
        sr.route_id,
        sr.stop_id,
        sr.\`order\` AS stop_order,
        sr.expected_arrive_time,
        st.address,
        st.latitude,
        st.longitude,
        (SELECT COUNT(*) FROM student stu WHERE stu.stop_id = st.stop_id) AS students_count
      FROM stop_route sr
      JOIN stop st ON sr.stop_id = st.stop_id
      WHERE sr.route_id = ?
      ORDER BY sr.\`order\` ASC;
    `;
        const [rows] = await db.query(sql, [routeId]);
        return rows;
    }
}

export default ScheduleService;
