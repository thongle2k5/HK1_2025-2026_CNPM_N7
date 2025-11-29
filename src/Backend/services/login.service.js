import pool from '../models/Connect_dtb.js'; // Đảm bảo đường dẫn đúng
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // 1. Kiểm tra input đầu vào cơ bản
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
        }

        // 2. Tìm user trong database
        const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
        const user = rows[0];

        // 3. Nếu không thấy user
        if (!user) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }

        // 4. So khớp mật khẩu
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
        }

        // 5. KIỂM TRA QUYỀN (Logic quan trọng nhất)
        // Logic: Role người dùng chọn (req.body.role) phải khớp với Role trong DB (user.role)
        // Lưu ý: DB bạn dùng 'manager', nhưng Frontend gửi lên 'admin', cần map lại.
        
        let isValidRole = false;

        if (role === 'admin' && user.role === 'manager') {
            isValidRole = true;
        } else if (role === 'driver' && user.role === 'driver') {
            isValidRole = true;
        } else if (role === 'parent' && user.role === 'parent') {
            isValidRole = true;
        }

        if (!isValidRole) {
           console.log('role:',role,'\nuser.role',user.role)
            return res.status(403).json({ 
                
                message: 'Bạn không có quyền truy cập vào vai trò này!' 
            });
        }

        // 6. Tạo Token (Payload không nên chứa thông tin nhạy cảm)
        const payload = {
            userId: user.user_id,
            username: user.username,
            role: user.role,
            name: user.name
        };
        if (user.role === 'driver') {
    // Query bảng driver để tìm driver_id dựa trên user_id
    const [driverRows] = await pool.query('SELECT driver_id FROM driver WHERE user_id = ?', [user.user_id]);
    if (driverRows.length > 0) {
        payload.driverId = driverRows[0].driver_id; // Thêm driverId vào payload
    }
}
        // Nên dùng proc  ess.env.JWT_SECRET thay vì hardcode string
        const secretKey = process.env.JWT_SECRET || 'you_secret_key_safe_fallback';

        const token = jwt.sign(payload, secretKey, { expiresIn: '12h' });
     
        // 7. Trả về kết quả
        return res.json({
            message: 'Đăng nhập thành công',
            token: token,
            user: payload
        });


    } catch (error) {
        console.error("!!! LỖI ĐĂNG NHẬP:", error);
        return res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

export default router;