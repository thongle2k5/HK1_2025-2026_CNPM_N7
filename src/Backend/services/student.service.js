import { StudentModel } from "../models/student.model.js";
import { PickupStatusModel } from "../models/pickup.status.model.js";
import { StopModel } from "../models/stop.model.js";
import { ScheduleModel } from "../models/schedule.model.js";

export const StudentService = {
    getStudentById: async (id) => {
        const student = await StudentModel.getStudentById(id);
        return student;
    },


    getStudentsDataByUserId: async (userId) => {
        if (userId === null || userId === undefined) {
            console.log('user_id is null or undefined')
            return [];
        }
        const students = await StudentModel.getStudentsByUserId(userId);
        if (students === null || students === undefined) {
            console.log('students is null or undefined')
            return [];
        }
        if (students.length === 0) {
            console.log('students is empty')
            return;
        }
        const studentsData = await Promise.all(students.map(async (student) => {
            const pickupStatus = await PickupStatusModel.getStatusByStudentId(student.student_id);
            if (pickupStatus === null || pickupStatus === undefined) {
                console.log('pickup status is null or undefined or empty');
                return [];
            }
            const stop = await StopModel.getStopById(pickupStatus.stop_id);
            if (stop === null || stop === undefined) {
                console.log('stop is null or undefined');
                return [];
            }
            const schedule = await ScheduleModel.getScheduleById(pickupStatus.schedule_id);
            if (schedule === null || schedule === undefined) {
                console.log('schedule is null or undefined');
                return [];
            }
            return { student, pickup_status: pickupStatus, stop: stop, schedule: schedule };
        }));
        return studentsData;
    },
    getStudentByParentId: async (parentId) => {
        const students = await StudentModel.getStudentsByParentId(parentId);
        return students;
    },
    getStudentDetailInfoByStudentId: async (studentId) => {
        const studentDetailInfo = await StudentModel.getStudentDetailInfoByStudentId(studentId);
        return studentDetailInfo;


    },


}