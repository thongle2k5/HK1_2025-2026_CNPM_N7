import db from '../db/Connect_dtb.js';

export const BusTrackingModel ={
    getBusLocationByBusId: async (busId) =>{
        const [row] = await db.query('select * from location_track where bus_id = ?',[busId]);
        return row[0];
    },
    addBusLocation: async (busId,longitude,latitude) =>{
        const [row] = await db.promise().execute('insert into location_track (bus_id,longitude,latitude) values (?,?,?)', [busId,longitude,latitude]);
        return row;
    
    },
    getAllBuses: async()=>{
        const [getall]=await db.query("SELECT * FROM bus WHERE status != 'retired' ORDER BY bus_id ASC ")
        return getall
    },
    editBus: async(bus)=>{
        const data=await db.query('update bus set ')
    },
     updateBus :async (id, busData) => {
  const { license_plate, model, capacity, status } = busData;
  const sql = `
    UPDATE bus 
    SET 
      license_plate = ?, 
      model = ?, 
      capacity = ?, 
      status = ?
    WHERE 
      bus_id = ?
  `;
  await db.query(sql, [license_plate, model, capacity, status, id]);
  return { bus_id: id, ...busData };
},


 softDeleteBus : async (id) => {
  const sql = "UPDATE bus SET status = 'retired' WHERE bus_id = ?";
  await db.query(sql, [id]);
  return { id: id };
},


}