import {getUserIdsToSendBusNoti, UserModel} from "../models/user.model.js";

export const UserService ={

    getUserById: async (id) =>{
        const user = await UserModel.getUserById(id);
        return user;
    },getManagers: async () => {
        return await UserModel.findUserByRole('manager');
    },
    getUserIdsToSendBusNoti: async (bus_id) => {
        const userIds = await getUserIdsToSendBusNoti(bus_id);
        return userIds
    }
}
