import db from '../db/Connect_dtb.js';

export const PickupStatusModel ={
    getStatusByStudentId: async (studentId)=>{
        const [row] = await db.query('select * from pickup_status where student_id = ? '+
                                        'order by time desc limit 1',[studentId]);
        return row[0];
    },

    


}