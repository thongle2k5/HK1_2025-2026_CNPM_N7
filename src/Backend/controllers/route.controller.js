import { getRoute } from '../services/route.service.js';

export const routeConTroller = {
    getRoutes: async (req, res) => {
    try {
      const routes = await getRoute.getAllRoutes();
      return res.status(200).json(routes);
    } catch (error) {
      console.error("Lỗi lấy danh sách tuyến:", error);
      return res.status(500).json({ message: "Lỗi server khi lấy tuyến đường." });
    }
  },
  getStops: async (req, res) => {
    try {
      const { routeId } = req.params;
      const stops = await getRoute.getStopsByRoute(routeId);
      return res.status(200).json(stops);
    } catch (error) {
      console.error("Lỗi lấy danh sách trạm:", error);
      return res.status(500).json({ message: error.message });
    }
  },
    getRouteStops: async (req, res) => {
    try {
      const { id } = req.params;
      const stops = await getRoute.getRouteStops(id); 
      res.json(stops);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
    getRoute: async (req, res) => {
        try {
            const getData = await getRoute.getRoute();
            res.json(getData);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    getRoutesAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const keyword = req.query.keyword || "";

            const result = await getRoute.getRoutesAdmin(page, limit, keyword);

            res.json({
                routes: result.routes,
                totalPages: result.totalPages,
                countRoute: result.countRoute
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    getRouteByIdAdmin: async (req, res) => {
        try {
            const routeId = req.params.routeId;
            const routeDetails = await getRoute.getRouteByIdAdmin(routeId);

            res.json(routeDetails);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },
    deleteRouteByIdAdmin: async (req, res) => {
        try {
            const routeId = req.params.routeId;
            const result = await getRoute.deleteRouteByIdAdmin(routeId);
            res.json({ message: 'Xóa thành công', result });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    createRouteAdmin: async (req, res) => {
        try {
            const { name, description } = req.body;
            const result = await getRoute.createRouteAdmin(name, description);
            res.status(201).json({ message: 'Tạo tuyến đường thành công' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createStopAdmin: async (req, res) => {
        try {
            const { route_id, expected_arrive_time, address, latitude, longitude } = req.body;
            const result = await getRoute.createStopAdmin(route_id, expected_arrive_time, address, latitude, longitude);
            res.status(201).json({ message: 'Tạo điểm dừng thành công', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // -------------------------------------------- DÙNG CHO UPDATE ---------------------------------------------
    updateRouteAdmin: async (req, res) => {
        try {
            const routeIdParam = req.params.routeId;
            const {
                route_id,
                route_name,
                route_description,
                stops,
            } = req.body;

            const finalRouteId = Number(routeIdParam || route_id);

            if (!finalRouteId || isNaN(finalRouteId)) {
                return res.status(400).json({
                    success: false,
                    message: "route_id không hợp lệ",
                });
            }

            if (!route_name || !route_name.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Tên tuyến đường không được để trống",
                });
            }

            const payload = {
                route_id: finalRouteId,
                route_name: route_name.trim(),
                route_description: route_description ? route_description.trim() : "",
                stops: Array.isArray(stops) ? stops : [],
            };

            const result = await getRoute.updateRouteWithStops(payload);

            return res.status(200).json({
                success: true,
                message: result.message,
            });
        } catch (error) {
            console.error("updateRouteAdmin error:", error.message);
            return res.status(500).json({
                success: false,
                message: error.message || "Lỗi server khi cập nhật tuyến đường",
            });
        }
    },
    // -------------------------------------------- end UPDATE ---------------------------------------------
}