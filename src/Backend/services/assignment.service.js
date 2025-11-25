import { AssignmentModel } from "../models/assignment.model.js";

export const AssignmentService = {
    getAssignmentsAdmin: async (page, limit, status = "all", keyword = "") => {
        const offset = (page - 1) * limit;

        const [assignments, total] = await Promise.all([
            AssignmentModel.getAssignmentsAdmin(offset, limit, status, keyword),
            AssignmentModel.countAssignments(status, keyword),
        ]);

        return {
            assignments,
            totalPages: Math.ceil(total / limit),
            countAssignment: total,
        };
    },
    deleteAssignmentByIdAdmin: async (assignmentId) => {
        const result = await AssignmentModel.deleteAssignmentByIdAdmin(+assignmentId);
        return result;
    },
    createAssignmentAdmin: async (route_id, bus_id, driver_id, date, start_time, end_time) => {
        const status = "pending";

        const route = await AssignmentModel.isRouteExist(route_id);
        if (!route) throw new Error("Mã tuyến đường không tồn tại");

        const bus = await AssignmentModel.isBusExist(bus_id);
        if (!bus) throw new Error("Mã xe buýt không tồn tại");

        const driver = await AssignmentModel.isDriverExist(driver_id);
        if (!driver) throw new Error("Mã tài xế không tồn tại");


        const result = await AssignmentModel.createAssignmentAdmin(
            route_id,
            bus_id,
            driver_id,
            date,
            start_time,
            end_time,
            status
        );

        return result;
    },
    getAssignmentByIdAdmin: async (assignmentId) => {
        const assignment = await AssignmentModel.getAssignmentByIdAdmin(+assignmentId);
        return assignment;
    },
    updateAssignmentAdmin: async (schedule_id, route_id, bus_id, driver_id, date, start_time, end_time, status) => {
        const result = await AssignmentModel.updateAssignmentAdmin(
            schedule_id,
            route_id,
            bus_id,
            driver_id,
            date,
            start_time,
            end_time,
            status
        );
        return result;
    }
}