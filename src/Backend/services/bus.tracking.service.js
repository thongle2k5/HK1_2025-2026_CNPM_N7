import { BusTrackingModel } from "../models/bus.tracking.model.js";

export const BusTrackingService = {
    getCurrentBusLocationByBusId: async (busId) => {
        const location = await BusTrackingModel.getCurrentBusLocationByBusId(busId);
        return location;
    },
    addBusLocation: async (busId, latitude, longitude) => {
        const result = await BusTrackingModel.addBusLocation(busId, latitude, longitude);
        return result;
    },


}
//=====================================================================================
import pool from '../models/Connect_dtb.js';
import { StopModel } from '../models/stop.model.js';
import { UserModel } from '../models/user.model.js';
const getAllBuses = async () => {
    const [rows] = await pool.query("SELECT * From bus");
    return rows;
}
const getBusById = async (busId) => {
    const [rows] = await pool.query('select * from bus where bus_id = ?', [busId]);
    return rows[0];
}
const getDriverById = async (driverId) => {
    const [rows] = await pool.query('select * from driver where driver_id = ?', [driverId]);
    return rows[0];
}
const getBusDataByScheduleIds = async (scheduleIds) => {
    if (scheduleIds === null || scheduleIds === undefined) {
        return [];
    }
    if (scheduleIds.length === 0) {
        return [];
    }

    const [schedules] = await pool.query('select * from schedule where schedule_id in (?)', [scheduleIds]);
    const busData = await Promise.all(schedules.map(async (schedule) => {
        const bus = await getBusById(schedule.bus_id);

        if(!bus === null || bus === undefined){
            console.log('bus is null or undefined');
            return [];
        }
        const stops = await StopModel.getStopsByRouteId(schedule.route_id);
        const driver = await getDriverById(schedule.driver_id);
        const user = await UserModel.getUserById(driver.user_id);
        return { bus_id: schedule.bus_id,schedule_id: schedule.schedule_id, status: schedule.status, license_plate: bus.license_plate, route_id: schedule.route_id, stops: stops, driver_name: user.name, driver_phone: user.phone };
    }))
    return busData;

}
export const busService = {
    getAllBuses,
    getBusDataByScheduleIds
}