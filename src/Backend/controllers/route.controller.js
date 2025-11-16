import {getRoute} from '../services/route.service.js';

export const routeConTroller ={
    getRoute: async (req,res) =>{
        try{
            const getData = await getRoute.getRoute();
            res.json(getData);
        }catch(error)
        {
            res.status(404).json({message: error.message});
        }
    }
}