import Student from "../models/StudentList.model.js";
import db from "../db/Connect_dtb.js";

const studentModel = new Student(db);

export async function getAllStudentsService() {
  return await studentModel.getAllStudents();
}
