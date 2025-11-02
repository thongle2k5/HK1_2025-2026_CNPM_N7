import {PickupStatusService} from '../services/pickup.status.service.js';

export const PickupStatusController ={
    getStatusByStudentId: async (req,res) =>{
        try{
            const status = await PickupStatusService.getStatusByStudentId(req.params.studentId);
            res.json(status);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    }
}