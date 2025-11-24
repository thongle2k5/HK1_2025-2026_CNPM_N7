import { AssignmentService } from "../services/assignment.service.js";

export const AssignmentController = {
    getAssignmentsAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const assignments = await AssignmentService.getAssignmentsAdmin(page, limit);

            res.json({
                assignments: assignments.assignments,
                totalPages: assignments.totalPages,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Server error" });
        }
    },
    deleteAssignmentByIdAdmin: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const result = await AssignmentService.deleteAssignmentByIdAdmin(assignmentId);
            res.json({ message: 'Xóa thành công', result });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    createAssignmentAdmin: async (req, res) => {
        try {
            const { route_id, bus_id, driver_id, date, start_time, end_time } = req.body;
            const result = await AssignmentService.createAssignmentAdmin(route_id, bus_id, driver_id, date, start_time, end_time);
            res.status(201).json({ message: 'Tạo thành công', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAssignmentByIdAdmin: async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const assignment = await AssignmentService.getAssignmentByIdAdmin(assignmentId);
            res.json({ assignment });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    updateAssignmentAdmin: async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const { route_id, bus_id, driver_id, date, start_time, end_time, status } = req.body;
            const result = await AssignmentService.updateAssignmentAdmin(assignmentId, route_id, bus_id, driver_id, date, start_time, end_time, status);
            res.json({ message: 'Cập nhật thành công', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};