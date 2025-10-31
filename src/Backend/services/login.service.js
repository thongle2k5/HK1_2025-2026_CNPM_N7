import pool from '../db/Connect_dtb.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();
router.post('/',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const [rows]= await pool.query('select * from user where username=?',[username])
        const user=rows[0];
        if(!user){
            return res.status(401).json({message:'Ten dang nhap khong dung'})
        }
        if(user.password!=password){
            return res.status(401).json({message:'mat khau khong dung!'})
        }
        if(user.role!='manager'){
            return res.status(401).json({message:'ban khong co quyen truy cap nay!'})
        }
        const payload = {
    userId: user.user_id,
    username: user.username,
    role: user.role
};
        const token=jwt.sign(
            payload,'you_secret_key',
            {expiresIn:'1h'}
        )
        res.json({
            message:'dang nhap thanh cong',
            token:token
        })
    }
    catch (error) {
          console.error("!!! LỖI ĐĂNG NHẬP:", error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
})
export default router;