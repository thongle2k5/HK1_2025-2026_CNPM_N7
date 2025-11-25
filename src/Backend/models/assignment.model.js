import db from '../db/Connect_dtb.js';

export const AssignmentModel = {
  getAssignmentsAdmin: async (offset, limit, status, keyword) => {
    let sql = `
      SELECT
        schedule.schedule_id,
        user.name AS driver_name,
        schedule.bus_id,
        route.name AS route_name,
        DATE_FORMAT(schedule.date, '%Y-%m-%d') AS date,
        schedule.start_time,
        schedule.end_time,
        schedule.status
      FROM schedule
      JOIN driver 
        ON schedule.driver_id = driver.driver_id
      JOIN user 
        ON driver.user_id = user.user_id
      JOIN route 
        ON schedule.route_id = route.route_id
      WHERE schedule.is_deleted = 0
    `;

    const params = [];

    if (status && status !== "all") {
      sql += ` AND schedule.status = ?`;
      params.push(status);
    }

    if (keyword && keyword.trim() !== "") {
      sql += ` AND user.name LIKE ?`;
      params.push(`%${keyword.trim()}%`);
    }

    sql += `
      ORDER BY schedule.date DESC
      LIMIT ? OFFSET ?;
    `;

    params.push(Number(limit), Number(offset));

    const [rows] = await db.query(sql, params);
    return rows;
  },

  countAssignments: async (status, keyword) => {
    let sql = `
      SELECT COUNT(*) AS total
      FROM schedule
      JOIN driver 
        ON schedule.driver_id = driver.driver_id
      JOIN user 
        ON driver.user_id = user.user_id
      WHERE schedule.is_deleted = 0
    `;

    const params = [];

    if (status && status !== "all") {
      sql += ` AND schedule.status = ?`;
      params.push(status);
    }

    if (keyword && keyword.trim() !== "") {
      sql += ` AND user.name LIKE ?`;
      params.push(`%${keyword.trim()}%`);
    }

    const [rows] = await db.query(sql, params);
    return rows[0].total;
  },
  deleteAssignmentByIdAdmin: async (assignmentId) => {
    const sql = `
            UPDATE schedule
            SET is_deleted = 1
            WHERE schedule_id = ?;
        `;
    const [result] = await db.query(sql, [assignmentId]);
    return result;
  },
  createAssignmentAdmin: async (route_id, bus_id, driver_id, date, start_time, end_time, status) => {
    const sql = `
      INSERT INTO schedule
        (route_id, bus_id, driver_id, date, start_time, end_time, status, is_deleted)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, 0);
    `;

    const [result] = await db.query(sql, [
      route_id,
      bus_id,
      driver_id,
      date,
      start_time,
      end_time,
      status,
    ]);

    return result;
  },
  isRouteExist: async (route_id) => {
    const sql = `SELECT route_id FROM route WHERE route_id = ? AND is_deleted = 0`;
    const [rows] = await db.query(sql, [route_id]);
    return rows[0] || null;
  },
  isBusExist: async (bus_id) => {
    const sql = `SELECT bus_id FROM bus WHERE bus_id = ?`;
    const [rows] = await db.query(sql, [bus_id]);
    return rows[0] || null;
  },
  isDriverExist: async (driver_id) => {
    const sql = `SELECT driver_id FROM driver WHERE driver_id = ?`;
    const [rows] = await db.query(sql, [driver_id]);
    return rows[0] || null;
  },

  getAssignmentByIdAdmin: async (assignmentId) => {
    const sql = `
      SELECT
        s.schedule_id,
        s.route_id,
        s.bus_id,
        s.driver_id,
        DATE_FORMAT(s.date, '%Y-%m-%d') AS date,
        s.start_time,
        s.end_time,
        s.status
      FROM schedule s
      JOIN driver d 
        ON s.driver_id = d.driver_id
      JOIN user u
        ON d.user_id = u.user_id
      JOIN route r
        ON s.route_id = r.route_id
      WHERE s.is_deleted = 0 
        AND s.schedule_id = ?;
    `;

    const [rows] = await db.query(sql, [assignmentId]);
    return rows[0];
  },
  updateAssignmentAdmin: async (schedule_id, route_id, bus_id, driver_id, date, start_time, end_time, status) => {
    const sql = `
      UPDATE schedule
      SET
        route_id = ?,
        bus_id = ?,
        driver_id = ?,
        date = ?,
        start_time = ?,
        end_time = ?,
        status = ?
      WHERE schedule_id = ? AND is_deleted = 0;
    `;

    const [result] = await db.query(sql, [route_id, bus_id, driver_id, date, start_time, end_time, status, schedule_id]);

    return result;
  },
};