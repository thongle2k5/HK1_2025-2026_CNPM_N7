import {StopModel} from '../models/stop.model.js';

export const StopService ={
    getAllStops: async () =>{
        const stops = await StopModel.getAllStops();
        return stops;
    },
    getStopById: async (id) =>{
        const stop = await StopModel.getStopById(id);
        return stop;
    },
    getStopsByRouteId: async (routeId) =>{
        const stops = await StopModel.getStopsByRouteId(routeId);
        return stops;
    }
}