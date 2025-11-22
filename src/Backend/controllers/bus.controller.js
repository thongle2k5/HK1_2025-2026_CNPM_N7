import { busService } from "../services/bus.tracking.service.js";
const getAllBuses =async (req,res)=>{
    try{
        const buses=await busService.getAllBuses();
        res.status(200).json(buses)
    }
    catch(error){
     console.error('Lỗi khi lấy danh sách bus:',error);
     res.status(500).json({message:'Lỗi server'});
    };
    
}
const getBusDataByScheduleIds =async (req,res)=>{
    try{
        const {scheduleIds} = req.body;
        const data = await busService.getBusDataByScheduleIds(scheduleIds);
        res.json(data)
    }catch(error){
        console.error('Lỗi khi lấy danh sách bus:',error);
        res.status(500).json({message:'Lỗi server'});
    }
}


export const busController={
getAllBuses,
getBusDataByScheduleIds,

};