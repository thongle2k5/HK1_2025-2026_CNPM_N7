import db from '../db/Connect_dtb.js';

export const PickupStatusModel ={
    getStatusByStudentId: async (studentId)=>{
        const [row] = await db.promise().query('select * from pickup_status where student_id =?',[studentId]);
        return row[0];
    },

    


}