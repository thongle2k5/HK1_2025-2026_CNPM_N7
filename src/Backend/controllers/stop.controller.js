import { StopService } from "../services/stop.service.js";

export const StopController ={
    getAllStops: async (req,res) =>{
        try{
            const stops = await StopService.getAllStops();
            res.json(stops);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    },
    getStopById: async (req,res) =>{
        try{
            const stop = await StopService.getStopById(req.params.id);
            res.json(stop);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    },
    getStopsByRouteId: async (req,res) =>{
        try{
            const stops = await StopService.getStopsByRouteId(req.params.routeId);
            res.json(stops);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    }

}