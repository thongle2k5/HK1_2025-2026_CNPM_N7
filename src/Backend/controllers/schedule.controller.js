import { ScheduleService } from "../services/schedule.service.js";

export  const ScheduleController ={
    getScheduleByStudentId: async (req,res) =>{
        try{
            const schedule = await ScheduleService.getScheduleByStudentId(req.params.studentId);
            res.json(schedule);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }
      ,
   getScheduleByManager :async (req,res) =>{
        try{
           
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 7;
            const schedule = await ScheduleService.getScheduleByManager(page,limit);
            res.json(schedule);
        }catch(error){
            res.status(404).json({message: error.message});
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
  }
}
