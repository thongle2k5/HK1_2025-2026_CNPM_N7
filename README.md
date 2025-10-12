# 🚀 DỰ ÁN QUẢN LÝ SSB (Frontend: React + TailwindCSS | Backend: Node.js + Express)

## 📦 1. Giới thiệu

Dự án gồm 2 phần chính:

- **Frontend**: Xây dựng bằng **React + Vite + TailwindCSS**
- **Backend**: Xây dựng bằng **Node.js + Express + dotenv + cors**

---

## 🗂 2. Cấu trúc thư mục

```
HK1_2025-2026_CNPM_N7/
│
├── diagrams/
├── Docs/
├── src/
│   ├── Backend/               # Mã nguồn backend (Node.js + Express) - SỬ DỤNG N-LAYERED
│   │   ├── controllers/       # Xử lý HTTP Request/Response
│   │   ├── services/          # Logic Nghiệp vụ chính (Business Logic)
│   │   ├── models/            # Tương tác với Cơ sở Dữ liệu (MySQL)
│   │   ├── routes/            # Định nghĩa các API Endpoint (GET/POST/...)
│   │   ├── tests/             # Kiểm thử Backend (Unit Test, Integration Test)
│   │   ├── server.js          # File khởi động server
│   │   ├── package.json
│   │   └── .env               # CHỨA KEY API SERVER (NHẠY CẢM)
│   │
│   └── frontend/              # Mã nguồn frontend (React + Vite + Tailwind)
│       ├── src/               # Code chính của React App
│       │   ├── api/           # Logic gọi API Backend
│       │   ├── components/    # Các UI Components (Button, Card,...)
│       │   ├── hooks/         # Custom Hooks (Logic tái sử dụng)
│       │   ├── pages/         # CÁC TRANG CHÍNH (Đã chia theo vai trò)
│       │   │   ├── admin/     # Trang dành cho vai trò ADMIN
│       │   │   ├── driver/    # Trang dành cho vai trò DRIVER
│       │   │   ├── parent/    # Trang dành cho vai trò PARENT
│       │   │   └── common/    # Trang chung (Login, 404,...)
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── public/
│       ├── package.json
│       ├── .env               # CHỨA KEY API CLIENT (CÔNG KHAI)
│       └── ... (các file cấu hình Vite/Tailwind)
│
└── README.md
```

---

## ⚙️ 3. Yêu cầu môi trường

Cần cài đặt trước:

- [Node.js](https://nodejs.org/) (phiên bản ≥ 18)
- npm (cài cùng Node)
- VSCode hoặc IDE tương tự
- MySQL/XAMPP

---

## 🧱 4. Cài đặt Backend

### 🔹 Bước 1: Di chuyển vào thư mục Backend

```bash
cd src/Backend
```

### 🔹 Bước 2: Cài đặt các thư viện cần thiết

```bash
npm install
```

Nếu chưa có `node_modules`, chạy thêm:

```bash
npm install express cors dotenv nodemon
```

### 🔹 Bước 3: Tạo file `.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=testdb
```

> ⚠️ Lưu ý:
>
> - `DB_PASSWORD` để trống nếu bạn dùng **XAMPP mặc định**
> - Nếu đã đổi mật khẩu MySQL, hãy cập nhật lại tại đây.

---

### 4 Tạo cơ sở dữ liệu MySQL

Mở [http://localhost/phpmyadmin](http://localhost/phpmyadmin) → tạo database mới tên:

```
testdb
```

Rồi chạy lệnh SQL sau (tạo bảng mẫu):

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES
('Le Pro', 'lepro@gmail.com'),
('Nguyen Van A', 'vana@example.com');
```

---

### 🔹 Bước 5: Chạy server

```bash
npm run dev
```

Server mặc định chạy tại:  
👉 [http://localhost:5000](http://localhost:5000)

---

## 🎨 5. Cài đặt Frontend

### 🔹 Bước 1: Di chuyển vào thư mục frontend

```bash
cd src/frontend
```

### 🔹 Bước 2: Cài đặt các thư viện cần thiết

```bash
npm install
```

Nếu chưa có TailwindCSS:

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npx tailwindcss init -p
```

### 🔹 Bước 3: Cấu hình Tailwind

Mở file `tailwind.config.js` và thêm:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Trong file `src/index.css`, thêm:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🔹 Bước 4: Chạy frontend

```bash
npm run dev
```

Ứng dụng chạy tại:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 🔄 6. Kết nối Frontend & Backend

- Backend mặc định chạy port **5000**
- Frontend chạy port **5173**

Khi gọi API từ frontend (VD: React), dùng URL:

```js
http://localhost:5000/api/...
```

---

## 🧠 7. Các công nghệ sử dụng

| Thành phần           | Công nghệ                  |
| -------------------- | -------------------------- |
| **Frontend**         | React + Vite + TailwindCSS |
| **Backend**          | Node.js + Express          |
| **Server Reload**    | Nodemon                    |
| **Giao tiếp API**    | CORS + dotenv              |
| **Quản lý mã nguồn** | Git + GitHub               |

---

## 👥 8. Hướng dẫn thành viên nhóm

1. Clone repo:
   ```bash
   git clone <link-repo>
   ```
2. Mở thư mục project trong VSCode.
3. Làm theo phần **Cài đặt Backend** và **Frontend**.
4. Mỗi khi làm việc:
   - Pull code mới nhất: `git pull`
   - Tạo branch riêng khi phát triển:
     ```bash
     git checkout -b feature/<tên-chức-năng>
     ```
   - Commit & push sau khi hoàn tất.

---

## ✅ 9. Ghi chú

- Nếu lỗi Tailwind, thử xoá thư mục `node_modules` và `package-lock.json`, rồi chạy:
  ```bash
  npm install
  ```
- Nếu backend không chạy, kiểm tra file `.env` có PORT hay chưa.
- Nếu frontend không hiển thị CSS, chắc chắn đã thêm dòng `@tailwind` trong `index.css`.
- Mọi thành viên cần **cài Node.js, npm và XAMPP** trước khi chạy.
- Nếu bị lỗi `Access denied` → kiểm tra lại mật khẩu MySQL hoặc database name.
- Khi push code lên GitHub, **không push file `.env`**.

---

**© Nhóm CNPM N7 – Trường Đại học Sài Gòn, Học kỳ 1 năm học 2025–2026**
