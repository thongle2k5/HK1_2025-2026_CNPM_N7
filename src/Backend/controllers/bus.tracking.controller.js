import { BusTrackingService } from "../services/bus.tracking.service.js";

export const BusTrackingController = {
    getLocationByBusId: async (req, res) => {
        try {
            const location = await BusTrackingService.getBusLocationByBusId(req.params.busId);
            res.json(location);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    addLocation: async (req, res) => {
        try {
            const result = await BusTrackingService.addBusLocation(req.body.busId, req.body.longitude, req.body.latitude);
            res.json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },


}