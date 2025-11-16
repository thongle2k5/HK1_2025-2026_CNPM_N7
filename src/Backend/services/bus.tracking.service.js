import { BusTrackingModel } from "../models/bus.tracking.model.js";

export const BusTrackingService = {
    getCurrentBusLocationByBusId: async (busId) => {
        const location = await BusTrackingModel.getCurrentBusLocationByBusId(busId);
        return location;
    },
    addBusLocation: async (busId, latitude, longitude) => {
        const result = await BusTrackingModel.addBusLocation(busId, latitude, longitude);
        return result;
    },
    
    // Hàm trả về quãng đường đã đi của xe
    getPassedPath(fullPath, currentPos) {

        // Tìm điểm trên path gần với vị trí hiện tại nhất
        let minDist = Infinity;
        let idx = 0;

        fullPath.forEach((point, i) => {
            const dist = Math.hypot(point[0] - currentPos[0], point[1] - currentPos[1]);
            if (dist < minDist) {
                minDist = dist;
                idx = i;
            }
        });

        // Trả về quãng đường đã đi: từ đầu đến index gần nhất
        return fullPath.slice(0, idx + 1);
    }



}