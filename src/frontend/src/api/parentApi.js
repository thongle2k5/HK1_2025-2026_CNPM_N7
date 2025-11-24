import axios from "../utils/axiosCustomize"

const getParentsAdmin = (page, limit, keyword) => {
    return axios.get(`/api/parents/admin/parents?page=${page}&limit=${limit}&keyword=${keyword}`);
}

const getParentByIdAdmin = (parentId) => {
    return axios.get(`/api/parents/admin/${parentId}`);
}

const deleteParentByIdAdmin = (parentId) => {
    return axios.delete(`/api/parents/admin/${parentId}`);
}

export {
    getParentsAdmin,
    getParentByIdAdmin,
    deleteParentByIdAdmin
}