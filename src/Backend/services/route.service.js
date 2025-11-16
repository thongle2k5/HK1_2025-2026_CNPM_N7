import {getAllRoute} from '../models/route.model.js';

export const getRoute ={
  
    getRoute: async () =>{
        const stops = await getAllRoute.getRoute();
        return stops;
    }
}