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


    getStudentsDataByUserId: async (req,res) =>{
        try{
            const studentsData = await StudentService.getStudentsDataByUserId(req.params.userId);
            res.json(studentsData);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    },


}