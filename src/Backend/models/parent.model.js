import db from '../db/Connect_dtb.js';

export const ParentModel = {
    getParentsAdmin: async (offset, limit, keyword) => {
        let sql = `
            SELECT 
                p.parent_id,
                u.name,
                u.phone,
                u.email,
                u.user_id
            FROM parent p
            JOIN user u ON p.user_id = u.user_id
            WHERE p.is_deleted = 0
        `;

        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND u.name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        sql += `
            LIMIT ? OFFSET ?;
        `;
        params.push(Number(limit), Number(offset));

        const [rows] = await db.query(sql, params);
        return rows;
    },

    getStudentsByParentId: async (parent_id) => {
        const sql = `
            SELECT s.student_id
            FROM student_parent sp
            JOIN student s ON sp.student_id = s.student_id
            WHERE sp.parent_id = ?;
        `;

        const [rows] = await db.query(sql, [parent_id]);
        return rows;
    },

    countParents: async (keyword) => {
        let sql = `
            SELECT COUNT(*) AS total
            FROM parent p
            JOIN user u ON p.user_id = u.user_id
            WHERE p.is_deleted = 0
        `;
        const params = [];

        if (keyword && keyword.trim() !== "") {
            sql += ` AND u.name LIKE ?`;
            params.push(`%${keyword.trim()}%`);
        }

        const [rows] = await db.query(sql, params);
        return rows[0].total;
    },
    getParentByIdAdmin: async (parentId) => {
        const sql = `
            SELECT
                u.name AS parent_name,
                u.email AS parent_email,
                u.phone AS parent_phone,

                s.student_id,
                s.student_name,
                s.class 
            FROM parent p
            LEFT JOIN user u 
                ON p.user_id = u.user_id
            LEFT JOIN student_parent sp
                ON p.parent_id = sp.parent_id
            LEFT JOIN student s
                ON sp.student_id = s.student_id
            WHERE p.parent_id = ?;
            `;

        const [rows] = await db.query(sql, [parentId])
        return rows;
    },
    deleteParentByIdAdmin: async (parentId) => {
        const sql = `
            UPDATE parent
            SET is_deleted = 1
            WHERE parent_id = ?;
        `;
        const [result] = await db.query(sql, [parentId]);
        return result;
    }


}