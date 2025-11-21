// location.model.js
import db from '../db/Connect_dtb.js';

export const LocationModel = {

    getBusesAdmin: async (offset, limit) => {
        const sql = `
            SELECT
                bus.bus_id,
                user.name AS driver_name,
                route.name AS route_name,
                bus.status
            FROM bus
            LEFT JOIN schedule ON bus.bus_id = schedule.bus_id
            LEFT JOIN driver ON schedule.driver_id = driver.driver_id
            LEFT JOIN user ON driver.user_id = user.user_id
            LEFT JOIN route ON schedule.route_id = route.route_id
            GROUP BY bus.bus_id, user.name, route.name
            LIMIT ? OFFSET ?;
        `;
        const [rows] = await db.query(sql, [limit, offset]);
        return rows;
    },

    countBuses: async () => {
        const sql = `SELECT COUNT(*) AS total FROM bus;`
        const [rows] = await db.query(sql);
        return rows[0].total;
    },
    getLatestLocationByBusId: async (busId) => {
        const sql = `
            SELECT latitude, longitude, timestamp
            FROM location_track
            WHERE bus_id = ?
            ORDER BY timestamp DESC
            LIMIT 1;
        `;
        const [rows] = await db.query(sql, [busId]);
        return rows.length > 0 ? rows[0] : null;
    }
};
