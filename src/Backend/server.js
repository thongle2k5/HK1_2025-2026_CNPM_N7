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
import ScheduleRouter from './routes/schedule.route.js';
import route from './routes/route.route.js'
import studentRoutes from "./routes/StudentList.route.js";
import notificationRoute from './routes/notification.route.js';
import reportRouter from './routes/report.route.js';
//WebSocket Server 
import http from 'http';
import { Server } from 'socket.io';

import driverSocket from './sockets/driver.socket.js';
import parentSocket from './sockets/parent.socket.js';

import notificationRouter from './routes/notification.route.js';

import parentRoute from './routes/parent.route.js';
import assignmentRouter from './routes/assignment.route.js';
import locationRouter from './routes/location.route.js';

import MessageRoutter from './routes/message.route.js';
import schedule from "./routes/driver.schedule.route.js";
import scheduleDetail from "./routes/driver.scheduleDetail.route.js";
import profileDriverRouter from './routes/profileDriver.route.js';



const app = express();
// ... (các app.use khác...)
// --- THÊM DÒNG NÀY ---

app.use(cors());
app.use(express.json());
// Báo cho server: Bất cứ request nào đến /api/buses
// thì hãy đưa cho busRouter xử lý
app.use('/api/buses', busRouter);
app.use('/api/route', route)

app.use('/api/notifications', notificationRouter);



app.use('/api/drivers', driverRouter);
app.use('/api/login', login)
app.use('/api/dashboardata', dashboardRouter)
app.use('/api/studentsList', studentRoutes);
app.use('/api/report', reportRouter);
// ----------------------
app.use('/api/schedules', ScheduleRouter)
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);
app.use('/api/stops', stopRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/messages', MessageRoutter);

// Server WebSocket 
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);
  parentSocket(io, socket);
  driverSocket(io, socket);
 socket.on("join_chat", (userId) => {
    const roomName = `user_${userId}`;
    socket.join(roomName);
    console.log(` User ${userId} đã vào phòng chat: ${roomName}`);
  });
  parentSocket(io, socket);
  driverSocket(io, socket);

  socket.on("join_room", (userId) => {
    socket.join(String(userId));
    console.log(`User ${userId} đã vào phòng chat riêng`);
    console.log("Phòng hiện tại của Socket này:", socket.rooms);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });

});

app.use('/api/parents', parentRoute);
app.use('/api/assignments', assignmentRouter);
app.use('/api/locations', locationRouter);


app.use('/api/driverschedule', schedule);
app.use('/api/scheduleDetail', scheduleDetail);
app.use('/api/profileDriver', profileDriverRouter);



// Lấy cổng từ file .env (của bạn là 5000)
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);

});


