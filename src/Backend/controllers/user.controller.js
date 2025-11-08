import {UserService} from "../services/user.service.js";

export const UserController ={
    getUserById: async (req,res)=>{
        try{
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        }catch(error){
            res.status(404).json({message: error.message});
        }
    }
}
