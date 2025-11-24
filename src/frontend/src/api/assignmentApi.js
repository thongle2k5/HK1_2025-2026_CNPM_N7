import axios from "../utils/axiosCustomize"

const getAssignmentsAdmin = (page, limit) => {
    return axios.get(`/api/assignments/admin/assignments?page=${page}&limit=${limit}`);
}

const deleteAssignment = (id) => {
    return axios.delete(`/api/assignments/admin/${id}`);
}

const createAssignmentAdmin = (data) => {
    return axios.post("/api/assignments/admin", data);
}

const getAssignmentByIdAdmin = (id) => {
    return axios.get(`/api/assignments/admin/${id}`);
}

const updateAssignmentAdmin = (id, data) => {
    return axios.put(`/api/assignments/admin/${id}`, data);
}

export {
    getAssignmentsAdmin,
    deleteAssignment,
    createAssignmentAdmin,
    getAssignmentByIdAdmin,
    updateAssignmentAdmin
}