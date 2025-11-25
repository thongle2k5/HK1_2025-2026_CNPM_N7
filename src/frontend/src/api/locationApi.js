import axios from "../utils/axiosCustomize"

const getAdminLocations = (page, limit, keyword) => {
    return axios.get(`/api/locations/admin/locations?page=${page}&limit=${limit}&keyword=${keyword}`);
};

export {
    getAdminLocations
}