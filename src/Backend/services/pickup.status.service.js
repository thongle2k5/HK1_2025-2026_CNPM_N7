import {PickupStatusModel} from '../models/pickup.status.model.js';

export const PickupStatusService ={
    getStatusByStudentId: async (studentId) =>{
        const status = await PickupStatusModel.getStatusByStudentId(studentId);
        return status;
    }
}