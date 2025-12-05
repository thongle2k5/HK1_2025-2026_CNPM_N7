import axios from "../utils/axiosCustomize"

const getStudentsAdmin = (page, limit, status, keyword) => {
    return axios.get(`/api/students/admin/students?page=${page}&limit=${limit}&status=${status}&keyword=${keyword}`);
}

const getStudentByIdAdmin = (studentId) => {
    return axios.get(`/api/students/admin/${studentId}`);
}

const deleteStudentByIdAdmin = (studentId) => {
    return axios.delete(`/api/students/admin/${studentId}`);
}

const getStudentById = (studentId) => {
    return axios.get(`/api/students/${studentId}`);
}

const updateStudent = (studentId, data) => {
    return axios.put(`/api/students/${studentId}`, data);
}

export {
    getStudentsAdmin,
    getStudentByIdAdmin,
    deleteStudentByIdAdmin,
    getStudentById,
    updateStudent
}