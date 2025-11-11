// Backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// ... (các import khác như userRouter...)
import busRouter from './routes/bus.route.js';
import userRoute from './routes/user.route.js';
import studentRoute from './routes/student.route.js';
import stopRoute from './routes/stop.route.js';
import driverRouter from './routes/driver.route.js';
import login from './services/login.service.js';
import dashboardRouter from './routes/dashboard.router.js';
import studentRoutes from "./routes/StudentList.route.js";

//WebSocket Server 
import http from 'http';
import { Server } from 'socket.io';

import { fetchRoutePath } from '../frontend/src/api/map.path.js';
import { runBusAlongPath } from '../frontend/src/api/mock.bus.js';

const app = express();
// ... (các app.use khác...)
// --- THÊM DÒNG NÀY ---

app.use(cors());
app.use(express.json());
// Báo cho server: Bất cứ request nào đến /api/buses
// thì hãy đưa cho busRouter xử lý
app.use('/api/buses', busRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/login', login)
app.use('/api/dashboardata', dashboardRouter)
app.use('/api/students', studentRoutes);
// ----------------------
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);
app.use('/api/stops', stopRoute);


// Server WebSocket 
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join_bus", (busId) => {
    socket.join(`bus_${busId}`);
    console.log(`Client joined bus_${busId}`);
  });
});


// Lấy cổng từ file .env (của bạn là 5000)
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);

  //Giả lập xe buýt chạy trên tuyến đường
  try {
    const stopsRes = await fetch(`http://localhost:5000/api/stops/route/1`);
    const stops = await stopsRes.json();// Data về các Trạm dừng(Stop) trong một Tuyến đường(Route)
    const busPath = await fetchRoutePath(stops);//Lấy về mảng tọa độ của đường đi 

    //Chạy hàm giả lập và gửi Object(bus_location) vào room Socket
      runBusAlongPath(busPath, 60, 10, (lat, lng) => {
      io.to("bus_1").emit("bus_location_update", {
        bus_id: 1,
        latitude: lat,
        longitude: lng,
      });
    });
    

  } catch (err) {
    console.error("❌ Error fetching stops:", err);

  }

});





