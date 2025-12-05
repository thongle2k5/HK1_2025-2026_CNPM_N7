import { StudentModel } from "../models/StudentList.model.js";

export const StudentService = {

  getStudentList: async (scheduleId) => {
    if (!scheduleId) {
        throw new Error("Mã chuyến đi (Schedule ID) là bắt buộc.");
    }
    
    const students = await StudentModel.getStudentsBySchedule(scheduleId);
    
    
    return students; 
  },


  updateStatus: async (scheduleId, studentId, status) => {

    const validStatuses = ['waiting', 'boarded', 'dropped_off', 'missed'];
    if (!validStatuses.includes(status)) {
        throw new Error(`Trạng thái '${status}' không hợp lệ.`);
    }

    const exists = await StudentModel.checkStudentInSchedule(scheduleId, studentId);
    if (!exists) {
        throw new Error("Học sinh không tồn tại trong chuyến đi này.");
    }


    const result = await StudentModel.updatePickupStatus(scheduleId, studentId, status);
    
    return result.affectedRows > 0;
  }
};