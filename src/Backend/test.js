// busEmulator.js
import { StopService } from "./services/stop.service.js";
import { fetchRoutePath } from '../frontend/src/api/map.path.js'
import { runBusAlongPath } from "./sockets/mock.bus.js";
import { io } from "socket.io-client";

// Kết nối đến server
const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

socket.on("connect", async () => {
    console.log("✅ Emulator Connected:", socket.id);

    // Dữ liệu giả lập
    const BUS_LICENSE = "51B-12345"; // Biển số xe (Phải khớp với DB để Admin hiển thị đúng)
    const DRIVER_ID = 1;
    const ROUTE_ID = 1;

    try {
        // 1. Lấy trạm dừng từ DB
        const stops = await StopService.getStopsByRouteId(ROUTE_ID);
        
        // 2. Lấy đường đi thực tế
        const path = await fetchRoutePath(stops);
        console.log(`📍 Lộ trình có ${path.length} điểm. Bắt đầu chạy...`);

        // 3. Chạy xe
        await runBusAlongPath(path, 100, 5, (lat, lng) => {
            // --- SỬA LẠI ĐOẠN NÀY ---
            
            // Code cũ của bạn (Sai sự kiện):
            // socket.emit("bus_location_update", { bus_id: 1, ... });

            // Code MỚI (Đúng chuẩn Server):
            const payload = {
                driver_id: DRIVER_ID,
                bus_license: BUS_LICENSE, // Server cần cái này để định danh xe
                lat: lat,
                lng: lng,
                status: 'active',
                timestamp: new Date().toISOString()
            };

            // Gửi sự kiện 'send_location' để Server hiểu
            socket.emit("send_location", payload);
            
            process.stdout.write("."); // Hiệu ứng loading
        });

        console.log("\n🏁 Kết thúc hành trình.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Lỗi:", error);
        process.exit(1);
    }
});