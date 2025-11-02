import db from '../db/Connect_dtb.js';

export const ScheduleModel ={
    getScheduleByStudentId: async (studentId) =>{
        const data = await db.promise().query('select * from pickup_status left join schedule  on pickup_status.schedule_id = schedule.schedule_id where pickup_status.student_id =?',[studentId]);
        return data[0];
    }
}