import pool from '../models/Connect_dtb.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';
import { register } from 'module';
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('select * from user where username=?', [username])
        const user = rows[0];
        const cleanPassword = password.trim()
        if (!user) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' })
        }
        const isMatch = await bcrypt.compare(cleanPassword, user.password)

        if (!isMatch) {
            return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' })
        }
        if (user.role != 'manager') {
            return res.status(401).json({ message: 'Bạn không có quyền truy cập!' })
        }
        const payload = {
            userId: user.user_id,
            username: user.username,
            role: user.role,
            name: user.name

        };
        const token = jwt.sign(
            payload, 'you_secret_key',
            { expiresIn: '1h' }
        )
        res.json({
            message: 'dang nhap thanh cong',
            token: token,
            user: payload
        })
    }
    catch (error) {
        console.error("!!! LỖI ĐĂNG NHẬP:", error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
})
export default router;
