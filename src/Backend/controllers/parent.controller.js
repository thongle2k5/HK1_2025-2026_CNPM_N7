import { ParentService } from "../services/parent.service.js";

export const ParentController = {
    getParentsAdmin: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const keyword = req.query.keyword || "";

            const result = await ParentService.getParentsAdmin(page, limit, keyword);

            res.json({
                parents: result.parents,
                totalPages: result.totalPages,
                countParent: result.countParent,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Internal server error" });
        }
    },
    getParentByIdAdmin: async (req, res) => {
        try {
            const parentId = req.params.parentId;
            const parentDetails = await ParentService.getParentByIdAdmin(parentId);
            res.json(parentDetails);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },
    deleteParentByIdAdmin: async (req, res) => {
        try {
            const parentId = req.params.parentId;
            const result = await ParentService.deleteParentByIdAdmin(parentId);
            res.json({ message: 'Xóa thành công', result });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}
