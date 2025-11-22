import { runBusAlongPath } from "./mock.bus.js";
import { StopService } from "../services/stop.service.js";
import { fetchRoutePath } from "../../frontend/src/api/map.path.js";

export default async function driverSocket(io, socket) {

  socket.on("driver:join_bus", (busId) => {
    socket.join(`bus_${busId}`);
    console.log(`Driver joined bus_${busId}`);
  });
}