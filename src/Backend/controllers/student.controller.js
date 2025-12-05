import { StudentService } from "../services/student.service.js";


export const StudentController = {
    getStudentById: async (req, res) => {
        try {
            const student = await StudentService.getStudentById(req.params.id);
            res.json(student);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },


    getStudentsDataByUserId: async (req, res) => {
        try {
            const studentsData = await StudentService.getStudentsDataByUserId(req.params.userId);
            res.json(studentsData);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getStudentsByParentId: async (req, res) => {
        try {
            const students = await StudentService.getStudentByParentId(req.params.parentId);
            res.json(students);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getStudentDetailInfoByStudentId: async (req, res) => {
        try {
            const studentDetailInfo = await StudentService.getStudentDetailInfoByStudentId(req.params.studentId);
            res.json(studentDetailInfo);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    getStudentsByParentId: async (req, res) => {
        try {
            const students = await StudentService.getStudentByParentId(req.params.parentId);
            res.json(students);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getStudentsAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status || 'all';
            const keyword = req.query.keyword || '';

            const result = await StudentService.getStudentsAdmin(page, limit, status, keyword);

            res.json({
                students: result.students,
                totalPages: result.totalPages,
                countStudent: result.countStudent,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    getStudentByIdAdmin: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const student = await StudentService.getStudentByIdAdmin(studentId);
            res.json(student);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    deleteStudentByIdAdmin: async (req, res) => {
        try {
            const studentId = req.params.studentId;
            const result = await StudentService.deleteStudentByIdAdmin(studentId);
            res.json({ message: 'Xóa thành công', result });

        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updateStudent: async (req, res) => {
        try {
            const studentId = req.params.id;
            const { studentName, studentClass, stopId } = req.body;

            const result = await StudentService.updateStudent(
                studentId,
                studentName,
                studentClass,
                stopId
            );

            if (!result.success) {
                return res.status(400).json({
                    success: false,
                    message: result.message
                });
            }

            return res.status(200).json({
                success: true,
                message: result.message,
                data: result.result
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }

}