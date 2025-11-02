import { ScheduleService } from "../services/schedule.service.js";

export const ScheduleController ={
    getScheduleByStudentId: async (req,res) =>{
        try{
            const schedule = await ScheduleService.getScheduleByStudentId(req.params.studentId);
            res.json(schedule);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }
}
