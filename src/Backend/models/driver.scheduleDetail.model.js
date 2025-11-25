import db from '../db/Connect_dtb.js';

const Schedule = {
    findByDriverId: async (driverId) => {
        const [rows] = await db.query(
            `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.status,
                r.name AS route_name, b.license_plate AS bus_number
            FROM schedule s
            JOIN bus b ON s.bus_id = b.bus_id
            JOIN route r ON s.route_id = r.route_id
            WHERE s.driver_id = ? AND s.is_deleted = 0
            ORDER BY s.date, s.start_time`,
            [driverId]
        );
        return rows;
    },

    findById: async (scheduleId, driverId) => {
        const [scheduleRows] = await db.query(
            `SELECT s.schedule_id, s.date, s.start_time, s.end_time, s.status,  s.route_id,
                r.name AS route_name, r.description AS route_desc,
                b.license_plate AS bus_number, b.model, b.capacity
            FROM schedule s
            JOIN bus b ON s.bus_id = b.bus_id
            JOIN route r ON s.route_id = r.route_id
            WHERE s.schedule_id = ? AND s.driver_id = ? AND s.is_deleted = 0`,
            [scheduleId, driverId]
        );

        if (!scheduleRows.length) return null;
        const schedule = scheduleRows[0];


        const [stops] = await db.query(
            `SELECT sr.order AS stop_order, sr.expected_arrive_time, st.address AS stop_address
                FROM stop_route sr
                JOIN stop st ON sr.stop_id = st.stop_id
                WHERE sr.route_id = ?
                ORDER BY sr.order`,
            [schedule.route_id]
        );


        schedule.stops = stops;
        return schedule;
    }
};

export default Schedule;
