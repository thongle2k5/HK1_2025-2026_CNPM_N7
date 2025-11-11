import db from '../db/Connect_dtb.js';

export const BusTrackingModel ={
    getCurrentBusLocationByBusId: async (busId) =>{
        const [row] = await db.query('select bl.* from location_track bl where bl.track_id = (select max(track_id) from location_track where bus_id = ?',[busId]);
        return row[0];
    },
    addBusLocation: async (busId,latitude,longitude) =>{
        const [row] = await db.execute('insert into location_track (bus_id,latitude,longitude) values (?,?,?)', [busId,latitude,longitude]);
        return row;
    },



}