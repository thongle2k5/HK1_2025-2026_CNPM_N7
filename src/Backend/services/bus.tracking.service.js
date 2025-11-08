import { BusTrackingModel } from "../models/bus.tracking.model.js";

export const BusTrackingService = {
    getBusLocationByBusId: async (busId) => {
        const location = await BusTrackingModel.getBusLocationByBusId(busId);
        return location;
    },
    addBusLocation: async (busId, longitude, latitude) => {
        const result = await BusTrackingModel.addBusLocation(busId, longitude, latitude);
        return result;
    },


}