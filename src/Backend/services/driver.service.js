import {driverModel} from '../models/driver.model.js'
export const driverService ={
    getAllDrivers: async () =>{
        const status = await driverModel.getAllDrivers();
        return status;
    },
    getTotalDrivers : async () =>{
        const data= await driverModel.getTotalDrivers();
        return data;
    }
}