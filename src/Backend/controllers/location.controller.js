import { LocationService } from "../services/location.service.js";

export const LocationController = {
    getLocationsAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const keyword = req.query.keyword || "";

            const result = await LocationService.getLocationsAdmin(page, limit, keyword);

            return res.json({
                locations: result.locations,
                totalPages: result.totalPages,
                countBus: result.countBus,
                currentPage: page,
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};
