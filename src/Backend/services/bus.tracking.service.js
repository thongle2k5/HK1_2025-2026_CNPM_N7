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
    getAllBuses: async ()=>{
        const getall= await BusTrackingModel.getAllBuses()
        return getall;
    },
   updateBus :async (id, busData) => {
  const { license_plate, model, capacity, status } = busData;
  if (!license_plate || !model || !capacity || !status) {
    const error = new Error("Vui lòng nhập đủ thông tin");
    error.statusCode = 400;
    throw error;
  }
  return await BusTrackingModel.updateBus(id, busData);
},
 deleteBus : async (id) => {
  return await BusTrackingModel.softDeleteBus(id);
}


}


