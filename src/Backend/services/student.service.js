import { StudentModel } from "../models/student.model.js";

export const StudentService ={
    getStudentById: async (id) =>{
        const student = await StudentModel.getStudentById(id);
        return student;
    },
    getStudentByParentId: async (parentId) =>{
        const students = await StudentModel.getStudentsByParentId(parentId);
        return students;
    },
    getStudentDetailInfoByStudentId: async(parentId) =>{
        const studentDetailInfo = await StudentModel.getStudentDetailInfoByStudentId(parentId);
        return studentDetailInfo;
    }
}