
import {notificationModel} from '../models/notification.model.js';
import * as userModel from '../models/user.model.js';
// ========== NOTIFICATION SERVICES ==========

const getNotificationsByUserId = async (userId) => {
    return await notificationModel.getNotificationsByUserId(userId);
};

const getUnreadCountByUserId = async (userId) => {
    return await notificationModel.getUnreadCountByUserId(userId);
};

const markNotificationAsRead = async (notifId, userId) => {
    return await notificationModel.markNotificationAsRead(notifId, userId);
};

const markAllNotificationsAsRead = async (userId) => {
    return await notificationModel.markAllNotificationsAsRead(userId);
};

const getAllNotifi = async () => {
    return await notificationModel.getAllNotifi();
};

const getStartData = async () => {
    return await notificationModel.getStartData();
};

const deleteNotifi = async (id) => {
    return await notificationModel.deleteNotifi(id);
};

const update = async (id, data) => {
    return await notificationModel.update(id, data);
};

const create = async (data, userIds) => {
    return await notificationModel.create(data, userIds);
};

// ========== MESSAGE SERVICES ==========

const getMessagesByUserId = async (userId) => {
    return await notificationModel.getMessagesByUserId(userId);
};

const markMessageAsRead = async (messageId, userId) => {
    return await notificationModel.markMessageAsRead(messageId, userId);
};


const getUnreadMessageCount = async (userId) => {
    return await notificationModel.getUnreadMessageCount(userId);
};
 
// ========== EXPORT ==========

export const notificationService = {
       getNotificationsByUserId : async (userId) => {
  return await notificationModel.getByUserId(userId);
},
    getAllNotifi: async () =>{
        const data = await notificationModel.getAllNotifi();
        return data;
    },
    getStartData: async()=>{
        const data=await notificationModel.startData();
        return data;
    },
    deleteNotifi: async(id)=>{
        const data=await notificationModel.deleteNotifi(id);
        return data;
    },
    update: async (id, data) => {
       
  return await notificationModel.update(id, data);
},
 create : async (notificationData) => {
  const { target_audience } = notificationData;
  return await notificationModel
 },
    // Notification services
    getNotificationsByUserId,
    getUnreadCountByUserId,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getAllNotifi,
    getStartData,
    deleteNotifi,
    update,
    create,
    
    // Message services
    getMessagesByUserId,
    markMessageAsRead,
    getUnreadMessageCount
}