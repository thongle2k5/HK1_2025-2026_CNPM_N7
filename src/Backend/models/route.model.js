import db from '../db/Connect_dtb.js';
import pool from '../models/Connect_dtb.js'
export const getAllRoute = {
    findAll: async () => {
    const query = "SELECT route_id, name FROM route";
    const [rows] = await db.query(query);
    return rows;
  },
  findStopsByRouteId: async (routeId) => {
   
    const query = `
      SELECT 
        s.stop_id, 
        s.address,
        sr.order
      FROM stop s
      JOIN stop_route sr ON s.stop_id = sr.stop_id
      WHERE sr.route_id = ?
      ORDER BY sr.order ASC
    `;
    const [rows] = await db.query(query, [routeId]);
    return rows;
  },
     getRouteStops : async (routeId) => {
  const sql = `
    SELECT s.latitude, s.longitude, s.address, sr.\`order\`
        FROM stop s
        JOIN stop_route sr ON s.stop_id = sr.stop_id
        WHERE sr.route_id = ?
        ORDER BY sr.\`order\` ASC;
  `;
  const [rows] = await pool.query(sql, [routeId]);
  return rows;
},
    getRoute: async () => {
        const [row] = await db.query('select * from route ');
        return row;
    },
    getRoutesAdmin: async (offset, limit, keyword) => {
        let sql = `
            SELECT 
                route.route_id,
                route.name,
                COUNT(DISTINCT schedule.bus_id)   AS count_bus,
                COUNT(DISTINCT schedule.driver_id) AS count_driver,
                COUNT(DISTINCT student.student_id) AS count_student
            FROM route
            LEFT JOIN schedule 
                ON route.route_id = schedule.route_id
            LEFT JOIN stop_route 
                ON route.route_id = stop_route.route_id
            LEFT JOIN student 
                ON stop_route.stop_id = student.stop_id
            WHERE route.is_deleted = 0
        `;

        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND route.name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        sql += `
            GROUP BY 
                route.route_id,
                route.name
            LIMIT ? OFFSET ?;
        `;

        params.push(Number(limit), Number(offset));

        const [rows] = await db.query(sql, params);
        return rows;
    },

    countRoutes: async (keyword) => {
        let sql = `
            SELECT COUNT(*) AS total
            FROM route
            WHERE is_deleted = 0
        `;
        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        const [rows] = await db.query(sql, params);
        return rows[0].total;
    },
    getRouteByIdAdmin: async (routeId) => {
        const sql = `
            SELECT
                r.route_id,
                r.name        AS route_name,
                r.description AS route_description,

                s.stop_id,
                s.address,
                s.latitude,
                s.longitude,

                sr.expected_arrive_time,
                sr.\`order\`  AS stop_order
            FROM route r
            LEFT JOIN stop_route sr
                ON r.route_id = sr.route_id
            LEFT JOIN stop s
                ON sr.stop_id = s.stop_id
            WHERE r.route_id = ?
            ORDER BY sr.\`order\` ASC;
            `;
        const [rows] = await db.query(sql, [routeId]);
        return rows;

    },
    deleteRouteByIdAdmin: async (routeId) => {
        const sql = `
            UPDATE route
            SET is_deleted = 1
            WHERE route_id = ?;
        `;
        const [result] = await db.query(sql, [routeId]);
        return result;
    },
    createRouteAdmin: async (name, description) => {
        const sql = `
            INSERT INTO route (name, description)
            VALUES (?, ?);
        `;
        const [result] = await db.query(sql, [name, description]);
        return result;         // result.insertId là route_id mới tạo
    },
    createStopAdmin: async (route_id, expected_arrive_time, address, latitude, longitude) => {

        const sqlGetMaxOrder = `
            SELECT COALESCE(MAX(\`order\`), 0) AS maxOrder
            FROM stop_route
            WHERE route_id = ?;
            `;

        const [orderRows] = await db.query(sqlGetMaxOrder, [route_id]);
        const nextOrder = (orderRows[0]?.maxOrder || 0) + 1;

        const sqlInsertStop = `
            INSERT INTO stop (latitude, longitude, address)
            VALUES (?, ?, ?);
            `;

        const [stopResult] = await db.query(sqlInsertStop, [
            latitude,
            longitude,
            address
        ]);

        const stop_id = stopResult.insertId;

        const sqlInsertStopRoute = `
            INSERT INTO stop_route (route_id, stop_id, \`order\`, expected_arrive_time)
            VALUES (?, ?, ?, ?);
            `;

        const [stopRouteResult] = await db.query(sqlInsertStopRoute, [
            route_id,
            stop_id,
            nextOrder,
            expected_arrive_time
        ]);

        return {
            stop_id,
            route_id,
            order: nextOrder,
            affectedRowsStop: stopResult.affectedRows,
            affectedRowsStopRoute: stopRouteResult.affectedRows
        };
    },


    // -------------------------------------------- DÙNG CHO UPDATE ---------------------------------------------

    updateRouteInfo: async (conn, routeId, name, description) => {
        const [result] = await conn.query(
            `
            UPDATE route
            SET name = ?, description = ?
            WHERE route_id = ? AND is_deleted = 0
            `,
            [name, description, routeId]
        );
        return result.affectedRows; // để biết route có tồn tại + chưa bị xóa không
    },

    deleteStopRoutesByRouteId: async (conn, routeId) => {
        await conn.query(
            `
            DELETE FROM stop_route
            WHERE route_id = ?
            `,
            [routeId]
        );
    },

    updateStopById: async (conn, stop) => {
        const { stop_id, address, latitude, longitude } = stop;
        await conn.query(
            `
            UPDATE stop
            SET address = ?, latitude = ?, longitude = ?
            WHERE stop_id = ?
            `,
            [address, latitude, longitude, stop_id]
        );
    },

    insertStop: async (conn, stop) => {
        const { address, latitude, longitude } = stop;
        const [result] = await conn.query(
            `
            INSERT INTO stop (latitude, longitude, address)
            VALUES (?, ?, ?)
            `,
            [latitude, longitude, address]
        );
        return result.insertId;
    },

    insertStopRoute: async (conn, routeId, stop) => {
        const { stop_id, stop_order, expected_arrive_time } = stop;
        await conn.query(
            `
            INSERT INTO stop_route (route_id, stop_id, \`order\`, expected_arrive_time)
            VALUES (?, ?, ?, ?)
            `,
            [routeId, stop_id, stop_order, expected_arrive_time]
        );
    },
    // -------------------------------------------- end UPDATE ---------------------------------------------
}