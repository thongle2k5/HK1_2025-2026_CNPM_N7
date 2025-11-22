import db from '../db/Connect_dtb.js';

export const StopModel ={
    getAllStops: async () =>{
        const [rows] = await db.query('select * from stop');
        return rows;
    },
    getStopById: async (id) =>{
        const [row] = await db.query('select * from stop where stop_id = ?',[id]);
        return row[0];
    },
    getStopsByRouteId: async (routeId) =>{
        const [rows] = await db.query('select stop.*,stop_route.order,stop_route.expected_arrive_time '+
                                        'from stop_route left join stop on stop_route.stop_id = stop.stop_id where stop_route.route_id = ? '+
                                        'order by stop_route.order',[routeId]);
        return rows;
    }


}