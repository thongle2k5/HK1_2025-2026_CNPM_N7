
import { NotificationModel } from "../models/notification.model.js";
import {notificationService} from '../services/notification.services.js';
  const getAllNotifi = async (req, res) => {
    try {
        const data = await notificationService.getAllNotifi();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
  const getStartData= async (req, res) => {
    try {
        const data = await notificationService.getStartData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
const deleteNotifi= async(req,res)=>{
  const { id } = req.params;
    try {
        if(!id){
          return  res.status(400).json({ message: 'Bad Request: Missing id' });
        }
        const data = await notificationService.deleteNotifi(id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    }catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  const editNotifi= async(req,res)=>{
    try {
    const { id } = req.params;
    const data = req.body;
    await notificationService.update(id, data);
    res.json({ message: "Cập nhật thông báo thành công" });
  } catch (err) {
    console.error("Lỗi controller update notification:", err);
    res.status(500).json({ message: err.message || "Lỗi server" });
  }
  } 
  const create = async (req, res) => {
  try {
  
    const admin_id = req.user?.userId || 1; 
    
    const notificationData = {
      ...req.body, 
      admin_id: admin_id,
    };

    await notificationService.create(notificationData);
    
    res.status(201).json({ message: "Tạo thông báo thành công" });
  } catch (err) {
    console.error("Lỗi controller create notification:", err);
    res.status(500).json({ message: err.message || "Lỗi server" });
  }
};


  

export const NotificationController = {
  getNotificationsByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await NotificationModel.getNotificationsByUserId(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error getting notifications:", error);
      res.status(500).json({ error: error.message });
    }
  },
  getAllNotifi,
  getStartData,
  deleteNotifi,
  editNotifi,
  create
};


