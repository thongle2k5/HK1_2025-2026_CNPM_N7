import {driverService} from '../services/driver.service.js';
const getAlldrivers = async (req,res)=>{
    try{
   const drivers=await driverService.getAllDrivers();
   res.status(200).json(drivers)
    }
    catch(error){
        console.error('Loi khi lay danh sach driver',error);
        res.status(500).json({message:'loi server'});
    };
}
export const driverController={
    getAlldrivers
}