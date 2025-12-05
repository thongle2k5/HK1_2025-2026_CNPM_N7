import db from '../db/Connect_dtb.js';
export const StudentModel = {
    getStudentById: async (id) => {
        const [row] = await db.query('select * from student where student_id = ?', [id]);
        return row[0];
    },

    getStudentsByUserId: async (userId) => {
        const [rows] = await db.query('select student.* ' +
            'from student left join student_parent on student.student_id = student_parent.student_id ' +
            'left join parent on student_parent.parent_id = parent.parent_id ' +
            'where parent.user_id = ?', [userId])
        return rows;
    },

    getStudentsByParentId: async (parentId) => {
        const [rows] = await db.query('select * from student left join student_parent on student.student_id = student_parent.student_id where student_parent.parent_id = ?', [parentId]);
        return rows;
    },
    getStudentDetailInfoByStudentId: async (studentId) => {
        const [rows] = await db.query(
            'select stop.*,d.*,bus.*,schedule.* ' +
            'from student join pickup_status on student.student_id = pickup_status.student_id ' +
            'join stop on pickup_status.stop_id = stop.stop_id ' +
            'join schedule on student.student_id = schedule.schedule_id ' +
            'join driver on schedule.driver_id = driver.driver_id ' +
            'join user d on driver.user_id = d.user_id ' +
            'join bus on schedule.bus_id = bus.bus_id ' +
            'where student.student_id =?', [studentId]);
        return rows[0];
    },

    getStudentsByParentId: async (parentId) => {
        const [rows] = await db.query('select * from student left join student_parent on student.student_id = student_parent.student_id where student_parent.parent_id = ?', [parentId]);
        return rows;
    },
    getStudentsAdmin: async (offset, limit, status, keyword) => {
        let sql = `
        SELECT
            s.student_id,
            s.class,
            s.student_name,

            (
                SELECT r2.name
                FROM stop_route sr2
                JOIN route r2 ON r2.route_id = sr2.route_id
                WHERE sr2.stop_id = s.stop_id
                ORDER BY sr2.\`order\` ASC
                LIMIT 1
            ) AS route_name,

            (
                SELECT b2.license_plate
                FROM schedule sch2
                JOIN bus b2 ON b2.bus_id = sch2.bus_id
                WHERE sch2.route_id = (
                    SELECT sr3.route_id
                    FROM stop_route sr3
                    WHERE sr3.stop_id = s.stop_id
                    ORDER BY sr3.\`order\` ASC
                    LIMIT 1
                )
                ORDER BY sch2.date DESC, sch2.start_time DESC
                LIMIT 1
            ) AS license_plate,

            (
                SELECT ps2.status
                FROM pickup_status ps2
                WHERE ps2.student_id = s.student_id
                ORDER BY ps2.\`time\` DESC
                LIMIT 1
            ) AS pickup_status,

            (
                SELECT u2.phone
                FROM student_parent sp2
                JOIN parent p2 ON p2.parent_id = sp2.parent_id
                JOIN \`user\` u2 ON u2.user_id = p2.user_id
                WHERE sp2.student_id = s.student_id
                ORDER BY (p2.relationship_info='mẹ') DESC,
                         (p2.relationship_info='cha') DESC,
                         u2.phone ASC
                LIMIT 1
            ) AS parent_phone

        FROM student s
        WHERE s.is_deleted = 0
    `;

        const params = [];

        if (status && status !== 'all') {
            sql += `
            AND (
                SELECT ps2.status
                FROM pickup_status ps2
                WHERE ps2.student_id = s.student_id
                ORDER BY ps2.\`time\` DESC
                LIMIT 1
            ) = ?
        `;
            params.push(status);
        }

        if (keyword && keyword.trim() !== '') {
            sql += ` AND s.student_name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        sql += `
        ORDER BY s.student_id
        LIMIT ? OFFSET ?;
    `;
        params.push(Number(limit), Number(offset));

        const [rows] = await db.query(sql, params);
        return rows;
    },

    countStudents: async (status, keyword) => {
        let sql = `
        SELECT COUNT(*) AS total
        FROM student s
        WHERE s.is_deleted = 0
    `;
        const params = [];

        if (status && status !== 'all') {
            sql += `
            AND (
                SELECT ps2.status
                FROM pickup_status ps2
                WHERE ps2.student_id = s.student_id
                ORDER BY ps2.\`time\` DESC
                LIMIT 1
            ) = ?
        `;
            params.push(status);
        }

        if (keyword && keyword.trim() !== '') {
            sql += ` AND s.student_name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        const [rows] = await db.query(sql, params);
        return rows[0].total;
    },
    getStudentByIdAdmin: async (studentId) => {
        const sql = `
            SELECT
                s.student_id,
                s.student_name        AS student_name,
                s.class       AS student_class,
                st.address    AS stop_address,

                p.parent_id,
                u.name        AS parent_name,
                u.phone       AS parent_phone,
                u.email       AS parent_email,
                p.relationship_info
            FROM student s
            LEFT JOIN stop st
                ON s.stop_id = st.stop_id
            LEFT JOIN student_parent sp
                ON s.student_id = sp.student_id
            LEFT JOIN parent p
                ON sp.parent_id = p.parent_id
            LEFT JOIN user u
                ON p.user_id = u.user_id
            WHERE s.student_id = ?;
            `;

        const [rows] = await db.query(sql, [studentId]);
        return rows;
    },
    deleteStudentByIdAdmin: async (studentId) => {
        const sql = `
            UPDATE student
            SET is_deleted = 1
            WHERE student_id = ?;
        `;
        const [result] = await db.query(sql, [studentId]);
        return result;

    },
    updateStudent: async (studentId, studentName, studentClass, stopId) => {
        const sql = `
            UPDATE student
            SET student_name = ?, class = ?, stop_id = ?
            WHERE student_id = ?;
        `;
        const [result] = await db.query(sql, [studentName, studentClass, stopId, studentId]);
        return result;
    },
    checkStopExists: async (stopId) => {
        const sql = `
        SELECT stop_id
        FROM stop
        WHERE stop_id = ?
        LIMIT 1;
    `;
        const [rows] = await db.query(sql, [stopId]);
        return rows.length > 0;
    },

}