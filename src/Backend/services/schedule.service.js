import { ScheduleModel } from "../models/schedule.model.js";


export const ScheduleService ={
    getScheduleByStudentId: async (studentId) =>{
        const schedule= await ScheduleModel.getScheduleByStudentId(studentId);
        return schedule;
    }

}