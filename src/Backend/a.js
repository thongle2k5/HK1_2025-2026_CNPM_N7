// Sửa dòng này:
// const bcrypt = require('bcrypt');
// Thành dòng này:
import bcrypt from 'bcrypt'; 

const saltRounds = 10;

// Mật khẩu bạn muốn hash
const passwordToHash = '123456'; 

async function createHash() {
    try {
        const hash = await bcrypt.hash(passwordToHash, saltRounds);
        console.log('Mật khẩu gốc:', passwordToHash);
        console.log('Hash mới (để lưu vào CSDL):', hash);

        const isMatch = await bcrypt.compare(passwordToHash, hash);
        console.log("Kiểm tra lại ('123456' với hash mới):", isMatch); 

        // Kiểm tra với dấu cách (nguyên nhân lỗi của bạn)
        const isMatchWrong = await bcrypt.compare(' 123456 ', hash);
        console.log("Kiểm tra (' 123456 ' với hash mới):", isMatchWrong); 

    } catch (error) {
        console.error('Lỗi khi hash:', error);
    }
}

createHash();