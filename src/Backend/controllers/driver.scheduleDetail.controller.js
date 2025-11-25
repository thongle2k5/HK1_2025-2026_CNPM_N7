import Schedule from '../models/driver.scheduleDetail.model.js';

// Lấy danh sách lịch làm việc của tài xế
export const getScheduleByDriver = async (req, res) => {
    const { driverId } = req.params;
    try {
        const schedules = await Schedule.findByDriverId(driverId);
        res.json(schedules);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

// Xem chi tiết lịch làm việc của tài xế
export const getScheduleDetail = async (req, res) => {
    const { driverId, scheduleId } = req.params;



    try {
        const schedule = await Schedule.findById(scheduleId, driverId);
        if (!schedule) return res.status(404).json({ message: 'Không tìm thấy lịch làm việc' });
        res.json(schedule);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi server' });
    }
};




