import { BusTrackingModel } from "../models/bus.tracking.model.js";

export const BusTrackingService = {
    getCurrentBusLocationByBusId: async (busId) => {
        const location = await BusTrackingModel.getCurrentBusLocationByBusId(busId);
        return location;
    },
    addBusLocation: async (busId,latitude,longitude) => {
        const result = await BusTrackingModel.addBusLocation(busId,latitude,longitude);
        return result;
    },


}