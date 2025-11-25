import { ParentModel } from "../models/parent.model.js";
export const ParentService = {
    getParentsAdmin: async (page, limit, keyword = "") => {
        const offset = (page - 1) * limit;

        const [parents, totalParents] = await Promise.all([
            ParentModel.getParentsAdmin(offset, limit, keyword),
            ParentModel.countParents(keyword),
        ]);

        const parentsWithStudents = await Promise.all(
            parents.map(async (parent) => {
                const students = await ParentModel.getStudentsByParentId(parent.parent_id);
                return {
                    ...parent,
                    student_ids: students.map((s) => s.student_id),
                };
            })
        );

        return {
            parents: parentsWithStudents,
            totalPages: Math.ceil(totalParents / limit),
            countParent: totalParents,
        };
    },
    getParentByIdAdmin: async (parentId) => {
        const rows = await ParentModel.getParentByIdAdmin(+parentId);

        if (!rows || rows.length === 0) {
            return null;
        }

        const parent = {
            parent_name: rows[0].parent_name,
            parent_email: rows[0].parent_email,
            parent_phone: rows[0].parent_phone,
        };

        const students = rows
            .filter(row => row.student_id !== null)
            .map(row => ({
                student_id: row.student_id,
                student_name: row.student_name,
                student_class: row.class,
            }));

        return {
            parent,
            students,
        };
    },
    deleteParentByIdAdmin: async (parentId) => {
        const result = await ParentModel.deleteParentByIdAdmin(+parentId);
        return result;
    }
};