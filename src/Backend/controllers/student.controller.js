import { StudentService } from "../services/student.service.js";


export const StudentController ={
    getStudentById: async (req,res) =>{
        try{
            const student = await StudentService.getStudentById(req.params.id);
            res.json(student);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },
    getStudentsByParentId: async (req,res) =>{
        try{
            const students = await StudentService.getStudentByParentId(req.params.parentId);
            res.json(students);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },
    getStudentDetailInfoByStudentId: async (req,res) =>{
        try{
            const studentDetailInfo = await StudentService.getStudentDetailInfoByStudentId(req.params.studentId);
            res.json(studentDetailInfo);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }



}