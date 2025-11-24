import { messageModel } from '../models/message.model.js';

export const getConversation = async (user1, user2) => {
  return await messageModel.getConversation(user1, user2);
};

export const sendMessage = async (data) => {
  return await messageModel.create(data);
};