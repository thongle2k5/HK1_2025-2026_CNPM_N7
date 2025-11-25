import {notificationModel} from '../models/notification.model.js';
import * as userModel from '../models/user.model.js';
export const notificationService ={
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

  let userIds = [];
  try {
    if (target_audience === 'parent') {
      userIds = await userModel.findUserIdsByRole('parent'); 
    } else if (target_audience === 'driver') {
      userIds = await userModel.findUserIdsByRole('driver');
    } else if (target_audience === 'all') {
      userIds = await userModel.findAllUserIds();
    }
  } catch (err) {
    throw new Error("Không tìm thấy người dùng để gửi");
  }

  if (userIds.length === 0) {
    throw new Error("Không có người dùng nào trong nhóm này.");
  }


  return await notificationModel.create(notificationData, userIds);
}
 }
