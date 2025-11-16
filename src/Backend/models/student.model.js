import db from '../db/Connect_dtb.js';
export const StudentModel ={
    getStudentById: async (id) =>{
        const [row] = await db.query('select * from student where student_id = ?',[id]);
        return row[0];
    },

    getStudentsByUserId: async (userId) =>{
        const [rows] = await db.query('select student.* '+
                                        'from student left join student_parent on student.student_id = student_parent.student_id '+
                                        'left join parent on student_parent.parent_id = parent.parent_id '+
                                        'where parent.user_id = ?',[userId])
        return rows;
    },

}