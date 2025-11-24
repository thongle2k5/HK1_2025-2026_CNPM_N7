// location.service.js
import { LocationModel } from "../models/location.model.js";

export const LocationService = {
    getLocationsAdmin: async (page, limit, keyword = "") => {
        const offset = (page - 1) * limit;

        const [buses, total] = await Promise.all([
            LocationModel.getBusesAdmin(offset, limit, keyword),
            LocationModel.countBuses(keyword),
        ]);

        const locations = await Promise.all(
            buses.map(async (bus) => {
                const latest = await LocationModel.getLatestLocationByBusId(bus.bus_id);

                return {
                    ...bus,
                    latitude: latest?.latitude ?? null,
                    longitude: latest?.longitude ?? null,
                    timestamp: latest?.timestamp ?? null,
                };
            })
        );

        return {
            locations,
            totalPages: Math.ceil(total / limit),
            countBus: total,
        };
    },
};
