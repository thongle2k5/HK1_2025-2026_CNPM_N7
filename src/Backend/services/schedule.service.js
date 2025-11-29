import { ScheduleModel } from "../models/schedule.model.js";


export const ScheduleService = {
  getScheduleByStudentId: async (studentId) => {
    const schedule = await ScheduleModel.getScheduleByStudentId(studentId);
    return schedule;
  },
  getScheduleByManager: async (page, limit) => {
    const schedule = await ScheduleModel.getScheduleByManager(page, limit);
    return schedule;
  },
  create: async (scheduleData) => {
    const { driver_id, bus_id, date, start_time } = scheduleData;
    const conflicts = await ScheduleModel.findConflict(driver_id, bus_id, date, start_time);
    if (conflicts.length > 0) {
      throw new Error('Xung đột lịch! Tài xế hoặc xe buýt đã được xếp lịch vào giờ này.');
    }
    const newSchedule = await ScheduleModel.createSchedule(scheduleData);

    return newSchedule;
  },
  update: async (id, scheduleData) => {
    const { driver_id, bus_id, date, start_time } = scheduleData;
    const conflicts = await ScheduleModel.findConflict(driver_id, bus_id, date, start_time);
    if (conflicts.length > 0) {
      throw new Error('Xung đột lịch! Tài xế hoặc xe buýt đã được xếp lịch vào giờ này.');
    }
    return await ScheduleModel.updateSchedule(id, scheduleData);
  },


  delete: async (id) => {
    return await ScheduleModel.deleteSchedule(id);
  },
  updateScheduleStatus: async (id, status) => {
    return await ScheduleModel.updateScheduleStatus(id, status);
  },
  getCurrentSchedule: async (id) =>{
    return await ScheduleModel.getCurrentSchedule(id);
  },



}