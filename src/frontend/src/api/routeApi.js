import axios from "../utils/axiosCustomize"

const getRoutesAdmin = (page, limit, keyword) => {
    return axios.get(`/api/route/admin/routes?page=${page}&limit=${limit}&keyword=${keyword}`);
}

const getRouteByIdAdmin = (routeId) => {
    return axios.get(`/api/route/admin/${routeId}`);
}

const deleteRouteByIdAdmin = (routeId) => {
    return axios.delete(`/api/route/admin/${routeId}`);
}

const createRoute = (data) => {
    return axios.post(`/api/route/admin`, data);
}

const createStopAdmin = (data) => {
    return axios.post(`/api/route/admin/stop`, data);
}


export const updateRouteAdmin = (data) => {
    return axios.put(`/api/route/admin/${data.route_id}`, data);
};


export {
    getRoutesAdmin,
    getRouteByIdAdmin,
    deleteRouteByIdAdmin,
    createRoute,
    createStopAdmin
}