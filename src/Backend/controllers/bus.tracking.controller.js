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
     getAllBuses: async (req, res) => {
        try {
            const result = await BusTrackingService.getAllBuses();
            res.json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updateBus :async (req, res) => {
  try {
    const { id } = req.params;
    const busData = req.body;
    const updatedBus = await BusTrackingService.updateBus(id, busData);
    res.json({ message: "Cập nhật xe thành công", data: updatedBus });
  } catch (err) {
    console.error("Lỗi controller updateBus:", err);
    if (err.statusCode) { 
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: "Lỗi server" });
  }
},
 deleteBus: async (req, res) => {
  try {
    const { id } = req.params;
    
    await BusTrackingService.deleteBus(id);
    
    res.json({ message: "Xe đã được chuyển sang 'Ngưng hoạt động'" });
  } catch (err) {
    console.error("Lỗi controller deleteBus:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

}

