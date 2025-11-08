import {UserModel} from "../models/user.model.js";

export const UserService ={

    getUserById: async (id) =>{
        const user = await UserModel.getUserById(id);
        return user;
    },
}
