// backend/server.js (Dùng ES Modules - import)
import 'dotenv/config';
import express from 'express';
import cors from 'cors'; // Cần thiết để frontend truy cập

const app = express();
const PORT = 5000;

// ==========================================================
// 1. MIDDLEWARE CHUNG: Cần được định nghĩa TRƯỚC CÁC ROUTES
// ==========================================================
app.use(express.json()); // Đảm bảo dòng này nằm ĐẦU TIÊN trong số các middleware
app.use(cors({
    origin: 'http://localhost:5173' // Cho phép Frontend truy cập
})); 
// ==========================================================
// 2. ĐỊNH NGHĨA CÁC API ENDPOINTS
// (Cần nằm SAU middleware và TRƯỚC bất kỳ catch-all/error handler nào)
// ==========================================================
app.get('/api/map/key', (req, res) => {
    // 1. Lấy Key từ biến môi trường mới
    const apiKey = process.env.OPENROUTESERVICE_API_KEY; 
    
    if (!apiKey) {
        return res.status(500).json({ error: "OpenRouteService API Key chưa được cấu hình trên server." });
    }

    // 2. Trả về Key dưới dạng JSON cho Frontend
    res.json({ key: apiKey });
});
// ==========================================================
// 3. KHỞI ĐỘNG SERVER (LUÔN Ở CUỐI CÙNG)
// ==========================================================
app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});