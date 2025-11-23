import * as reportService from '../services/report.service.js';
export const getHistoryByDriver = async (req, res) => {
  try {
    const { driverId } = req.params;
    const history = await reportService.getHistoryByDriver(driverId);
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi lấy lịch sử" });
  }
};
export const createReport = async (req, res) => {
  try {
    // Dữ liệu từ Frontend gửi lên: { driver_id, type, priority, description, location }
    const reportData = req.body;

    if (!reportData.driver_id || !reportData.type) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const newReport = await reportService.createReport(reportData);

    res.status(201).json(newReport);
  } catch (err) {
    console.error("Lỗi create report:", err);
    res.status(500).json({ message: "Lỗi server khi gửi báo cáo" });
  }
};
export const getAllReports = async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.json(reports);
  } catch (err) {
    console.error("Lỗi getAllReports:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đếm số lượng pending
export const countPending = async (req, res) => {
  try {
    const count = await reportService.countPending();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật trạng thái
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'processing' hoặc 'resolved'
    
    await reportService.updateStatus(id, status);
    res.json({ message: "Cập nhật trạng thái thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};