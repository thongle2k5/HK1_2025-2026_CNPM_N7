// location.model.js
import db from '../db/Connect_dtb.js';

export const LocationModel = {
    getBusesAdmin: async (offset, limit, keyword) => {
        let sql = `
            SELECT
                bus.bus_id,
                user.name AS driver_name,
                route.name AS route_name,
                bus.status
            FROM bus
            LEFT JOIN schedule ON bus.bus_id = schedule.bus_id
            LEFT JOIN driver   ON schedule.driver_id = driver.driver_id
            LEFT JOIN user     ON driver.user_id = user.user_id
            LEFT JOIN route    ON schedule.route_id = route.route_id
            WHERE 1 = 1
        `;

        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND user.name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        sql += `
            GROUP BY bus.bus_id, user.name, route.name
            LIMIT ? OFFSET ?;
        `;

        params.push(Number(limit), Number(offset));

        const [rows] = await db.query(sql, params);
        return rows;
    },

    countBuses: async (keyword) => {
        let sql = `
            SELECT COUNT(DISTINCT bus.bus_id) AS total
            FROM bus
            LEFT JOIN schedule ON bus.bus_id = schedule.bus_id
            LEFT JOIN driver   ON schedule.driver_id = driver.driver_id
            LEFT JOIN user     ON driver.user_id = user.user_id
            WHERE 1 = 1
        `;
        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND user.name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        const [rows] = await db.query(sql, params);
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
