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

    getStudentsAdmin: async (page, limit, status = 'all', keyword = '') => {
        const offset = (page - 1) * limit;

        const [students, total] = await Promise.all([
            StudentModel.getStudentsAdmin(offset, limit, status, keyword),
            StudentModel.countStudents(status, keyword),
        ]);

        return {
            students,
            totalPages: Math.ceil(total / limit),
            countStudent: total,
        };
    },
    getStudentByIdAdmin: async (studentId) => {
        const rows = await StudentModel.getStudentByIdAdmin(studentId);

        if (!rows || rows.length === 0) return null;

        const studentInfo = {
            student_id: rows[0].student_id,
            student_name: rows[0].student_name,
            student_class: rows[0].student_class,
            stop_address: rows[0].stop_address,
        };

        const parents = rows
            .filter(row => row.parent_id !== null)
            .map(row => ({
                parent_id: row.parent_id,
                parent_name: row.parent_name,
                parent_phone: row.parent_phone,
                parent_email: row.parent_email,
                relationship_info: row.relationship_info
            }));

        return {
            student: studentInfo,
            parents
        };
    },
    deleteStudentByIdAdmin: async (studentId) => {
        const result = await StudentModel.deleteStudentByIdAdmin(+studentId);
        return result;
    },
    updateStudent: async (studentId, studentName, studentClass, stopId) => {
        const stopExists = await StudentModel.checkStopExists(stopId);

        if (!stopExists) {
            return {
                success: false,
                message: `Stop ID ${stopId} không tồn tại`
            };
        }

        const result = await StudentModel.updateStudent(
            studentId,
            studentName,
            studentClass,
            stopId
        );

        return {
            success: true,
            message: "Cập nhật thành công",
            result
        };
    }
}