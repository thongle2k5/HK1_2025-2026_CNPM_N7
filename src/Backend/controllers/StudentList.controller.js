import { StudentService } from "../services/StudentList.service.js";

export const StudentController = {
  getStudents: async (req, res) => {
    try {
      const { scheduleId } = req.params;

      const students = await StudentService.getStudentList(scheduleId);
      
      return res.status(200).json(students);
    } catch (error) {
      console.error("Lỗi Controller:", error);
      return res.status(500).json({ message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { scheduleId, studentId } = req.params;
      const { status } = req.body;

     
      await StudentService.updateStatus(scheduleId, studentId, status);

      return res.status(200).json({ message: "Cập nhật trạng thái thành công!" });
    } catch (error) {
     
      if (error.message.includes("không hợp lệ") || error.message.includes("không tồn tại")) {
          return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Lỗi server nội bộ." });
    }
  }
};
