import { ScheduleService } from "../services/schedule.service.js";

export const ScheduleController = {
  getScheduleByStudentId: async (req, res) => {
    try {

      const schedule = await ScheduleService.getScheduleByStudentId(req.params.studentId);
      res.json(schedule);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  ,
  getScheduleByManager: async (req, res) => {
    try {

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 7;
      const schedule = await ScheduleService.getScheduleByManager(page, limit);
      res.json(schedule);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  createSchedule: async (req, res) => {
    const scheduleData = req.body;
    if (!scheduleData.route_id || !scheduleData.bus_id) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    try {
      const newSchedule = await ScheduleService.create(scheduleData);
      res.status(201).json({
        message: 'Tạo lịch trình thành công!',
        data: newSchedule
      });

    } catch (error) {
      if (error.message.includes('Xung đột lịch')) {
        return res.status(409).json({ error: error.message });
      }
      console.error('Lỗi controller:', error);
      res.status(500).json({ error: 'Lỗi máy chủ nội bộ.' });
    }
  },
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      await ScheduleService.update(id, updatedData);
      res.status(200).json({ message: 'Cập nhật thành công' });
    } catch (error) {
      console.error('Lỗi update:', error);
      res.status(500).json({ error: 'Lỗi server khi cập nhật' });
    }
  },


  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      await ScheduleService.delete(id);
      res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
      console.error('Lỗi delete:', error);

      res.status(400).json({ error: error.message });
    }
  },
  updateScheduleStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await ScheduleService.updateScheduleStatus(id, status);
      res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
    } catch (error) {
      console.error('Lỗi update trạng thái:', error);
      res.status(500).json({ error: 'Lỗi server khi cập nhật trạng thái' });
    }
  },
  getCurrentSchedule: async (req, res) => {
  try {
    const { driverId } = req.params;
    
   
    
    const schedule = await ScheduleService.getCurrentSchedule(driverId);

    if (!schedule) {
      return res.json({ found: false, message: "Không có lịch chạy vào lúc này" });
    }

    res.json({ found: true, schedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},
}
