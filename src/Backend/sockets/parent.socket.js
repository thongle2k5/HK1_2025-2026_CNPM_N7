import * as  turf from '@turf/turf';
import { notificationService } from '../services/notification.services.js';
import { ScheduleService } from '../services/schedule.service.js';
import { UserService } from '../services/user.service.js';

// Hàm trả về quãng đường đã đi của xe
export function getPassedPath(fullPath, currentPos) {

    // Tìm điểm trên path gần với vị trí hiện tại nhất
    let minDist = Infinity;
    let idx = 0;

    fullPath.forEach((point, i) => {
        const dist = Math.hypot(point[0] - currentPos[0], point[1] - currentPos[1]);
        if (dist < minDist) {
            minDist = dist;
            idx = i;
        }
    });

    // Trả về quãng đường đã đi: từ đầu đến index gần nhất
    return fullPath.slice(0, idx + 1);
}

const paths = new Map();//  Cache lưu lại các tuyến đường khi client join server, bao gồm path: [lat,lng], và stops: các trạm dừng của 1 tuyến của mỗi xe 

export default function parentSocket(io, socket) {

    socket.on("parent:join_bus", ({ bus_id, path, stops, schedule_id, status }) => {
        socket.join(`bus_${bus_id}`);
        console.log(`Parent joined bus_${bus_id}`);
        paths.set(bus_id, { path: path, stops: stops, nearNextStop: false, schedule_id: schedule_id, status: status });
    });

    socket.on("parent:join_bus_notification", ({ bus_id }) => {
        if (socket.rooms.has(`bus_${bus_id}_notification`))
            return;
        socket.join(`bus_${bus_id}_notification`);
        console.log(`Parent joined bus_${bus_id}_notification`);

    });

    // Hàm xử lý dữ liệu khi driver gửi vị trí đến server 
    const handleBusPos = async (data) => {
        const { bus_id, lat, lng } = data;
        const path = paths.get(bus_id);
        if (!paths || paths.length === 0 || path === undefined)
            return;
        const passedPath = getPassedPath(path.path, [lat, lng]);// Quãng đường đã đi được tính từ điểm xuất phát (Trạm 0)

        let eta = null;// Thời gian dự kiến xe sẽ đến trạm tiếp theo 
        let nextStop = path.nextStop; //Trạm tiếp theo xe sẽ đến 
        let pathToStop = null; //Quãng đường tính từ trạm 0 đến trạm đang xét 
        let status = path.status;
        if (nextStop === undefined) {// Chạy nếu chưa có trạm tiếp theo trong cache 
            let stop = null;
            path.stops.forEach((st, i) => {
                pathToStop = getPassedPath(path.path, [st.latitude, st.longitude])
                if (passedPath.length >= pathToStop.length) {
                    const s = path.stops[i + 1];
                    if (s !== undefined) {
                        stop = s;
                    }
                }
            })
            nextStop = stop;
        }
        else if (nextStop !== null) {
            pathToStop = getPassedPath(path.path, [nextStop.latitude, nextStop.longitude])

            if (passedPath.length >= pathToStop.length) {
                const arrivedBusNoti = await notificationService.getBusNotiByIds(bus_id, nextStop.stop_id, path.schedule_id, "arrived");
                if (arrivedBusNoti === undefined) {
                    console.log("No arrived bus noti found, creating one.");
                    const createArrivedBusNotiRes = await notificationService.createBusNoti(bus_id, nextStop.stop_id, path.schedule_id, "arrived");
                    io.to(`bus_${bus_id}_notification`).emit("parent:bus_notification", createArrivedBusNotiRes);
                }
                const idx = path.stops.indexOf(nextStop);
                const s = path.stops[idx + 1];


                if (s !== undefined) { /// Cập nhật trạm tiếp theo sau khi xe đã đi qua trạm hiện tại
                    nextStop = s;
                    path.nearNextStop = false;
                } else {

                    nextStop = null;
                }

            }
        }

        if (nextStop !== null) {// Nếu có trạm tiếp theo thì tính eta (thời gian dự kiến)
            pathToStop = getPassedPath(path.path, [nextStop.latitude, nextStop.longitude]);

            const avrSpeed = 300 * 1000 / 3600; // Giả sử tốc độ trung bình 100km/h => m/s
            let dist = 0;

            const p = pathToStop.slice(passedPath.length);
            for (let i = 0; i < p.length - 1; i++) {
                const from = turf.point([p[i][1], p[i][0]]);
                const to = turf.point([p[i + 1][1], p[i + 1][0]]);
                dist += turf.distance(from, to, { units: 'meters' });

            }

            const time = dist / avrSpeed;
            if (time <= 300 && !path.nearNextStop) {
                const closeToBusNoti = await notificationService.getBusNotiByIds(bus_id, nextStop.stop_id, path.schedule_id, "close to");
                if (closeToBusNoti === undefined) {
                    console.log("No close to bus noti found, creating one.");
                    const createCloseToBusNotiRes = await notificationService.createBusNoti(bus_id, nextStop.stop_id, path.schedule_id, "close to");
                    io.to(`bus_${bus_id}_notification`).emit("parent:bus_notification", createCloseToBusNotiRes);
                    path.nearNextStop = true;
                }
            }

            const now = new Date();

            const etaTime = new Date(now.getTime() + time * 1000);

            const hours = etaTime.getHours().toString().padStart(2, '0');
            const minutes = etaTime.getMinutes().toString().padStart(2, '0');

            eta = hours + ":" + minutes;

        } else {
            console.log("No next stop for bus ", bus_id);
            // await ScheduleService.updateScheduleStatus(path.schedule_id, 'completed');
            status = 'completed';

        }
        paths.set(bus_id, { ...path, nextStop: nextStop, nearNextStop: path.nearNextStop, status: status });//Lưu vào cache trạm tiếp theo 

        const proccessedData = {// Data gửi đến client (parent)
            bus_id: bus_id,
            pos: [lat, lng],
            passed_path: passedPath,
            next_stop: nextStop,
            eta: eta,
            status: status
        }
        io.to(`bus_${bus_id}`).emit("parent:bus_data", proccessedData);
    }
    socket.on("bus_location_update", handleBusPos);


}