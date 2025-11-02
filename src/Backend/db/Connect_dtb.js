
import dotenv from 'dotenv';
import path from 'path'; // path là thư viện có sẵn của Node
import { fileURLToPath } from 'url';

import mysql from 'mysql2/promise';


// Lấy đường dẫn thư mục hiện tại (ví dụ: .../Backend/db)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// chỉ đường dẫn tường minh đến file .env 
// (đi lùi 1 cấp từ /db ra /Backend)
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
