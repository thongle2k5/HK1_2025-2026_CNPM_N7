// Backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// ... (các import khác như userRouter...)
import busRouter from './routes/bus.route.js';
import driverRouter from './routes/driver.route.js'
import studentRoutes from "./routes/StudentList.route.js";


const app = express();
// ... (các app.use khác...)
// --- THÊM DÒNG NÀY ---
app.use(cors());
app.use(express.json());

// ✅ Thêm route test ở đây
app.get("/", (req, res) => {
  res.send("✅ Backend đang hoạt động bình thường!");
});

// Báo cho server: Bất cứ request nào đến /api/buses
// thì hãy đưa cho busRouter xử lý
app.use('/api/buses', busRouter);
app.use('/api/drivers', driverRouter);
app.use('/api/students', studentRoutes);
// ----------------------

// Lấy cổng từ file .env (của bạn là 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});



