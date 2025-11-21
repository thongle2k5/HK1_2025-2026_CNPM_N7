import { StudentModel } from "../models/student.model.js";

export const StudentService = {
    getStudentById: async (id) => {
        const student = await StudentModel.getStudentById(id);
        return student;
    },
    getStudentByParentId: async (parentId) => {
        const students = await StudentModel.getStudentsByParentId(parentId);
        return students;
    },
    getStudentDetailInfoByStudentId: async (parentId) => {
        const studentDetailInfo = await StudentModel.getStudentDetailInfoByStudentId(parentId);
        return studentDetailInfo;
    },
    getStudentsAdmin: async (page, limit) => {
        const offset = (page - 1) * limit;

        const [students, total] = await Promise.all([
            StudentModel.getStudentsAdmin(offset, limit),
            StudentModel.countStudents(),
        ]);
        return { students, totalPages: Math.ceil(total / limit), countStudent: total };
    },
    getStudentByIdAdmin: async (studentId) => {
        const rows = await StudentModel.getStudentByIdAdmin(studentId);

        if (!rows || rows.length === 0) return null;

        const studentInfo = {
            student_id: rows[0].student_id,
            student_name: rows[0].student_name,
            student_class: rows[0].student_class,
            stop_address: rows[0].stop_address,
        };

        const parents = rows
            .filter(row => row.parent_id !== null)
            .map(row => ({
                parent_id: row.parent_id,
                parent_name: row.parent_name,
                parent_phone: row.parent_phone,
                parent_email: row.parent_email,
                relationship_info: row.relationship_info
            }));

        return {
            student: studentInfo,
            parents
        };
    },
    deleteStudentByIdAdmin: async (studentId) => {
        const result = await StudentModel.deleteStudentByIdAdmin(+studentId);
        return result;
    }
}