import db from '../db/Connect_dtb.js';

export const BusTrackingModel ={
    getBusLocationByBusId: async (busId) =>{
        const [row] = await db.promise().query('select * from location_track where bus_id = ?',[busId]);
        return row[0];
    },
    addBusLocation: async (busId,longitude,latitude) =>{
        const [row] = await db.promise().execute('insert into location_track (bus_id,longitude,latitude) values (?,?,?)', [busId,longitude,latitude]);
        return row;
    
    },



}