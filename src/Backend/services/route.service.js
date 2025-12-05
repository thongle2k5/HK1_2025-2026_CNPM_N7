import { getAllRoute } from '../models/route.model.js';
import db from '../db/Connect_dtb.js';

export const getRoute = {
    getAllRoutes: async () => {
    const routes = await getAllRoute.findAll();
    return routes;
  },
  getStopsByRoute: async (routeId) => {
    if (!routeId) {
      throw new Error("Mã tuyến đường (Route ID) là bắt buộc.");
    }
    const stops = await getAllRoute.findStopsByRouteId(routeId);
    return stops;
  },
getRouteStops: async (id) => {
        const stops = await getAllRoute.getRouteStops(id);
        return stops;
    },
    getRoute: async () => {
        const stops = await getAllRoute.getRoute();
        return stops;
    },
    getRoutesAdmin: async (page, limit, keyword = "") => {
        const offset = (page - 1) * limit;

        const [routes, total] = await Promise.all([
            getAllRoute.getRoutesAdmin(offset, limit, keyword),
            getAllRoute.countRoutes(keyword),
        ]);

        return {
            routes,
            totalPages: Math.ceil(total / limit),
            countRoute: total,
        };
    },
    getRouteByIdAdmin: async (routeId) => {
        const rows = await getAllRoute.getRouteByIdAdmin(+routeId);

        if (!rows || rows.length === 0) return null;

        const route = {
            route_id: rows[0].route_id,
            route_name: rows[0].route_name,
            route_description: rows[0].route_description
        };

        const stops = rows
            .filter(row => row.stop_id !== null)
            .map(row => ({
                stop_id: row.stop_id,
                address: row.address,
                latitude: row.latitude,
                longitude: row.longitude,
                expected_arrive_time: row.expected_arrive_time,
                stop_order: row.stop_order
            }))
            .sort((a, b) => a.stop_order - b.stop_order);

        return {
            route,
            stops
        };
    },
    deleteRouteByIdAdmin: async (routeId) => {
        const result = await getAllRoute.deleteRouteByIdAdmin(+routeId);
        return result;
    },
    createRouteAdmin: async (name, description) => {
        const result = await getAllRoute.createRouteAdmin(name, description);
        return result;
    },
    createStopAdmin: async (route_id, expected_arrive_time, address, latitude, longitude) => {
        const result = await getAllRoute.createStopAdmin(route_id, expected_arrive_time, address, latitude, longitude);
        return result;
    },


    // -------------------------------------------- DÙNG CHO UPDATE ---------------------------------------------

    updateRouteWithStops: async (payload) => {
        const { route_id, route_name, route_description, stops } = payload;

        const conn = await db.getConnection();

        try {
            await conn.beginTransaction();

            const affected = await getAllRoute.updateRouteInfo(
                conn,
                route_id,
                route_name,
                route_description
            );

            if (affected === 0) {
                throw new Error("Tuyến đường không tồn tại hoặc đã bị xóa");
            }

            await getAllRoute.deleteStopRoutesByRouteId(conn, route_id);

            const incomingStops = Array.isArray(stops) ? stops : [];

            for (const stop of incomingStops) {
                const stopData = {
                    stop_id: stop.stop_id ?? null,
                    address: stop.address?.trim() || "",
                    latitude:
                        stop.latitude !== undefined && stop.latitude !== null
                            ? parseFloat(stop.latitude)
                            : null,
                    longitude:
                        stop.longitude !== undefined && stop.longitude !== null
                            ? parseFloat(stop.longitude)
                            : null,
                    stop_order: stop.stop_order || 1,
                    expected_arrive_time: stop.expected_arrive_time || null,
                };

                if (stopData.stop_id) {
                    await getAllRoute.updateStopById(conn, stopData);
                } else {
                    const newStopId = await getAllRoute.insertStop(conn, stopData);
                    stopData.stop_id = newStopId;
                }


                await getAllRoute.insertStopRoute(conn, route_id, stopData);
            }

            await conn.commit();

            return {
                success: true,
                message: "Cập nhật tuyến đường thành công",
            };
        } catch (error) {
            await conn.rollback();
            console.error("Error in updateRouteWithStops:", error.message);
            throw error;
        } finally {
            conn.release();
        }
    },

    // -------------------------------------------- end UPDATE ---------------------------------------------
}