import axios from "../utils/axiosCustomize"

const getAdminLocations = (page, limit) => {
    return axios.get(`/api/locations/admin/locations?page=${page}&limit=${limit}`);
};

export {
    getAdminLocations
}