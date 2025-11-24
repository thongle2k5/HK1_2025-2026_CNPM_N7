import axios from "../utils/axiosCustomize"

const getStudentsAdmin = (page, limit) => {
    return axios.get(`/api/students/admin/students?page=${page}&limit=${limit}`);
}

const getStudentByIdAdmin = (studentId) => {
    return axios.get(`/api/students/admin/${studentId}`);
}

const deleteStudentByIdAdmin = (studentId) => {
    return axios.delete(`/api/students/admin/${studentId}`);
}

export {
    getStudentsAdmin,
    getStudentByIdAdmin,
    deleteStudentByIdAdmin
}