import db from '../db/Connect_dtb.js';
export const StudentModel ={
    getStudentById: async (id) =>{
        const [row] = await db.promise().query('select * from student where student_id = ?',[id]);
        return row[0];
    },
    getStudentsByParentId: async (parentId) => {
        const [rows] = await db.promise().query('select * from student left join student_parent on student.student_id = student_parent.student_id where student_parent.parent_id = ?',[parentId]);
        return rows;
    },
    getStudentDetailInfoByStudentId: async(studentId)=>{
        const [rows] = await db.promise().query(
            'select stop.*,d.*,bus.*,schedule.* '+
            'from student join pickup_status on student.student_id = pickup_status.student_id '+
                'join stop on pickup_status.stop_id = stop.stop_id '+
                'join schedule on student.student_id = schedule.schedule_id '+
                'join driver on schedule.driver_id = driver.driver_id '+
                'join user d on driver.user_id = d.user_id '+
                'join bus on schedule.bus_id = bus.bus_id '+
            'where student.student_id =?',[studentId]);
        return rows[0];
    }
}