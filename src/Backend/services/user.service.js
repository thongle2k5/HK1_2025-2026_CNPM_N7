import {getUserIdsToSendBusNoti, UserModel} from "../models/user.model.js";
import bcrypt from "bcryptjs";
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
    },
    register: async (data) => {
    const { username, password, fullName, role } = data;


    if (!username || !password || !fullName || !role) {
      throw new Error("Vui lòng điền đầy đủ thông tin.");
    }

 
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      throw new Error("Tên đăng nhập đã tồn tại.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = await UserModel.createUser({
      username,
      password: hashedPassword,
      fullName,
      role
    });

      await UserModel.createParent(userId);
   

    return { userId, username, role, message: "Đăng ký thành công!" };
  }
}
