import { BusTrackingService } from "../services/bus.tracking.service.js";

export const BusTrackingController = {
    getCurrentLocationByBusId: async (req, res) => {
        try {
            const location = await BusTrackingService.getCurrentBusLocationByBusId(req.params.busId);
            res.json(location);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    addLocation: async (req, res) => {
        try {
            const {bus_id,latitude,longitude} = req.body;
            const result = await BusTrackingService.addBusLocation(bus_id,latitude,longitude);
            io.to(`bus_${bus_id}`).emit('bus_location_update',{
                bus_id,
                latitude,
                longitude,
            })
            res.json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },


}