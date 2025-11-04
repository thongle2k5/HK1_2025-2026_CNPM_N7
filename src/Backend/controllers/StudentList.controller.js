import { getAllStudentsService } from "../services/StudentList.service.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudentsService();
    res.status(200).json(students);
  } catch (err) {
    console.error("Lỗi lấy danh sách học sinh:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};



