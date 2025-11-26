import { StopService } from "./services/stop.service.js";
import { fetchRoutePath } from '../frontend/src/api/map.path.js'
import { runBusAlongPath } from "./sockets/mock.bus.js";
import { io } from "socket.io-client";

// Kết nối đến server WebSocket
const socket = io("http://localhost:5000", {
    transports: ["websocket"], // optional nhưng nhanh hơn
});

// Khi kết nối thành công
socket.on("connect", () => {
    console.log("Driver connected, socket id:", socket.id);

    // Join vào bus mà driver quản lý
    const busId = 1;
    socket.emit("driver:join_bus", busId);
});

const stops = await StopService.getStopsByRouteId(1);
const path = await fetchRoutePath(stops);

await runBusAlongPath(path, 300, 5, (lat, lng) => {
    console.log("Sending pos: ", lat, lng);
    socket.emit("bus_location_update", {
        bus_id: 1,
        lat,
        lng,
    });
});

process.exit();




