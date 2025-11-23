import { reportModel } from '../models/report.model.js';
export const getAllReports = async () => {
  return await reportModel.findAll();
};

export const countPending = async () => {
  return await reportModel.countPending();
};

export const updateStatus = async (id, status) => {
  return await reportModel.updateStatus(id, status);
};
export const createReport = async (data) => {
  // (Sau này bạn có thể thêm logic bắn Socket.io thông báo cho Admin ở đây)
  return await reportModel.create(data);
};
export const getHistoryByDriver = async (driverId) => {
  return await reportModel.findByDriverId(driverId);
};