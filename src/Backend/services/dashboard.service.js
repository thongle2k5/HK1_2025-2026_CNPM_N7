import pool from '../models/Connect_dtb.js'
const getTotal = async ()=>{
    try{
    const [busCount,driverCount,studentCount,scheduleCount]= await Promise.all([
        pool.query('select count(*) as total from bus'),
        pool.query('select count(*) as total from driver where status="Active" '),
        pool.query('select count(*) as total from student'),
        pool.query('select count(*) as total from schedule')

    ])
    return {
        totalActiveDrivers: driverCount[0][0].total,
            totalStudents: studentCount[0][0].total,
            totalBuses: busCount[0][0].total,
            totalSchedulesToday: scheduleCount[0][0].total
        };
    }catch(err){
        console.log('lỗi không thể truy vấn!',err);
    }
}
const getChart =async ()=>{
    try{
        const tripStatusQuery=`select month(date) as month ,status,count(*) as totalTrips 
        from schedule 
        group by month(date) ,status 
        order by month`
        const activeBusesQuery=`SELECT MONTH(date) AS month, COUNT(DISTINCT bus_id) AS totalActiveBuses
            FROM schedule
            GROUP BY MONTH(date) 
            ORDER BY month;`
        const studentByRouteQuery=`SELECT r.name AS routeName, COUNT(s.student_id) AS studentCount
            FROM student s
            INNER JOIN stop_route sr ON s.stop_id = sr.stop_id
            INNER JOIN route r ON sr.route_id = r.route_id
            GROUP BY r.name;`
            const driverStatusQuery = `
            SELECT status, COUNT(*) AS driver_count
            FROM driver
            GROUP BY status;
        `;
        const [
            [tripStatusData],
            [activeBusesData],
            [studentByRouteData],
            [driverStatusData]
        ] = await Promise.all([
            pool.query(tripStatusQuery),
            pool.query(activeBusesQuery),
            pool.query(studentByRouteQuery),
            pool.query(driverStatusQuery)
        ]);

        return {
            tripStatus: tripStatusData,
            activeBuses: activeBusesData,
            studentByRoute: studentByRouteData,
            driverStatus: driverStatusData
        };
    }catch(err){
        console.log('lỗi khi lấy dữ liệu chart',err)
    }
}
export default {
    getTotal,
    getChart
}