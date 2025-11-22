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
const getTotalDrivers = async (req,res)=>{
    try{
   const drivers=await driverService.getTotalDrivers();
   res.status(200).json(drivers)
    }
    catch(error){
        console.error('Loi khi lay danh sach driver',error);
        res.status(500).json({message:'loi server'});
    };
}
const Delete = async(req,res)=>{
    const driverId=req.params.id;
    try{
        await driverService.deleteDriver(driverId);
        res.json({ message: "Xóa tài xế thành công" });
    }catch(error){
         console.error('xoac driver',error);
        res.status(500).json({message:'loi server'});
    }
}
const editDriver = async (req, res) => {
    const driver=req.body;
     try{
        await driverService.editDriver(driver);
        res.json({ message: "Sửa tài xế thành công" });
    }catch(error){
         console.error('xoac driver',error);
        res.status(500).json({message:'loi server'});
    }
}
export const driverController={
    getAlldrivers,
    getTotalDrivers,
    Delete,
    editDriver
}