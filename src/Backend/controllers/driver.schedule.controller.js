import ScheduleService from '../services/driver.schedule.service.js';

class ScheduleController {
    // GET /api/schedule/driver/:driverId?from=YYYY-MM-DD&to=YYYY-MM-DD
    static async getDriverSchedule(req, res) {
        try {
            const driverId = parseInt(req.params.driverId, 10);
            const from = req.query.from || new Date().toISOString().slice(0, 10);
            const to = req.query.to || from;

            const schedules = await ScheduleService.getDriverSchedulesBetween(driverId, from, to);
            res.json({ driver_id: driverId, from, to, schedules });
        } catch (err) {
            console.error('getDriverSchedule error', err);
            res.status(500).json({ message: 'Lỗi server khi lấy lịch', error: err.message });
        }
    }

    // GET /api/schedule/route/:routeId/detail
    static async getRouteDetail(req, res) {
        try {
            const routeId = parseInt(req.params.routeId, 10);
            const detail = await ScheduleService.getRouteDetail(routeId);
            res.json({ route_id: routeId, stops: detail });
        } catch (err) {
            console.error('getRouteDetail error', err);
            res.status(500).json({ message: 'Lỗi server khi lấy chi tiết tuyến', error: err.message });
        }
    }
}

// Chú ý: dùng export default để router import dễ dàng
export default ScheduleController;
