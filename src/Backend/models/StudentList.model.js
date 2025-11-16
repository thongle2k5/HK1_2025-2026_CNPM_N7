class Student {
  constructor(db) {
    this.db = db;
  }

  async getAllStudents() {
    const sql = "SELECT * FROM student";
    const [rows] = await this.db.query(sql);
    return rows;
  }
}

export default Student;
