CREATE DATABASE  IF NOT EXISTS `ssb`;
USE `ssb`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` enum('parent','driver','manager','admin') NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `user` VALUES (1,'parent01','123456','parent','Nguyễn Minh Tâm','0901000001'),(2,'parent02','123456','parent','Trần Thị Hoa','0901000002'),(3,'parent03','123456','parent','Lê Văn Nam','0901000003'),(4,'parent04','123456','parent','Phạm Thị Hương','0901000004'),(5,'parent05','123456','parent','Hoàng Văn Dũng','0901000005'),(6,'parent06','123456','parent','Vũ Thị Lan','0901000006'),(7,'parent07','123456','parent','Đỗ Minh Đức','0901000007'),(8,'parent08','123456','parent','Nguyễn Thị Mai','0901000008'),(9,'parent09','123456','parent','Trần Quốc Huy','0901000009'),(10,'parent10','123456','parent','Lê Thị Ngọc','0901000010'),(11,'parent11','123456','parent','Phan Văn Bình','0901000011'),(12,'parent12','123456','parent','Đinh Thị Yến','0901000012'),(13,'parent13','123456','parent','Bùi Anh Tuấn','0901000013'),(14,'parent14','123456','parent','Mai Thị Hạnh','0901000014'),(15,'parent15','123456','parent','Võ Văn Hải','0901000015'),(16,'parent16','123456','parent','Ngô Thị Vân','0901000016'),(17,'parent17','123456','parent','Tạ Văn Long','0901000017'),(18,'parent18','123456','parent','Cao Thị Huệ','0901000018'),(19,'parent19','123456','parent','Phùng Văn Quý','0901000019'),(20,'parent20','123456','parent','Trương Thị Liên','0901000020'),(21,'parent21','123456','parent','Lý Minh Khôi','0901000021'),(22,'parent22','123456','parent','Đoàn Thị Hòa','0901000022'),(23,'parent23','123456','parent','Huỳnh Văn Tài','0901000023'),(24,'parent24','123456','parent','Nguyễn Thị Nga','0901000024'),(25,'parent25','123456','parent','Trần Minh Khang','0901000025'),(26,'driver01','123456','driver','Nguyễn Văn Lợi','0912000001'),(27,'driver02','123456','driver','Trần Quốc Bảo','0912000002'),(28,'driver03','123456','driver','Lê Minh Phúc','0912000003'),(29,'manager01','123456','manager','Phạm Thị Thu','0913000001'),(30,'manager02','123456','manager','Hoàng Anh Tuấn','0913000002'),(31,'manager03','123456','manager','Vũ Ngọc Lan','0913000003');

DROP TABLE IF EXISTS `bus`;
CREATE TABLE `bus` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(20) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `bus` VALUES (1,'51B-12345',40,'Hyundai County'),(2,'51C-67890',45,'Thaco Town'),(3,'51D-24680',40,'Ford Transit');

DROP TABLE IF EXISTS `driver`;
CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `license_number` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  status ENUM('Active', 'On-Leave', 'Suspended', 'Terminated') NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`driver_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `location_track`;
CREATE TABLE `location_track` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `bus_id` int DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`track_id`),
  KEY `bus_id` (`bus_id`),
  CONSTRAINT `location_track_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `notif_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` text,
  `timestamp` datetime DEFAULT NULL,
  `type` text,
  PRIMARY KEY (`notif_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent` (
  `parent_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `relationship_info` enum('ông','bà','cha','mẹ','anh','chị','cô/dì','chú/bác') DEFAULT NULL,
  PRIMARY KEY (`parent_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `parent` VALUES (1,1,'cha'),(2,2,'mẹ'),(3,3,'cha'),(4,4,'mẹ'),(5,5,'cha'),(6,6,'mẹ'),(7,7,'cha'),(8,8,'mẹ'),(9,9,'cha'),(10,10,'mẹ'),(11,11,'cha'),(12,12,'mẹ'),(13,13,'cha'),(14,14,'mẹ'),(15,15,'cha'),(16,16,'mẹ'),(17,17,'cha'),(18,18,'mẹ'),(19,19,'cha'),(20,20,'mẹ'),(21,21,'cha'),(22,22,'mẹ'),(23,23,'cha'),(24,24,'mẹ'),(25,25,'cha');

DROP TABLE IF EXISTS `route`;
CREATE TABLE `route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `route_id` int DEFAULT NULL,
  `bus_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `status` enum('pending','in progress','completed') DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `route_id` (`route_id`),
  KEY `bus_id` (`bus_id`),
  KEY `driver_id` (`driver_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`),
  CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`manager_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `stop`;
CREATE TABLE `stop` (
  `stop_id` int NOT NULL AUTO_INCREMENT,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`stop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `stop_route`;
CREATE TABLE `stop_route` (
  `route_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `order` int DEFAULT NULL,
  `expected_arrive_time` time DEFAULT NULL,
  PRIMARY KEY (`route_id`,`stop_id`),
  KEY `stop_id` (`stop_id`),
  CONSTRAINT `stop_route_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `stop_route_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(50) DEFAULT NULL,
  `class` varchar(20) DEFAULT NULL,
  `stop_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `stop_id` (`stop_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `student` VALUES (1,'Nguyễn Minh Anh','1A',NULL),(2,'Trần Gia Bảo','1A',NULL),(3,'Lê Thảo Nhi','1A',NULL),(4,'Phạm Anh Duy','1A',NULL),(5,'Hoàng Thu Trang','1A',NULL),(6,'Đặng Minh Khang','1A',NULL),(7,'Võ Hữu Phát','1A',NULL),(8,'Ngô Nhật Linh','1A',NULL),(9,'Bùi Khánh Vy','1A',NULL),(10,'Tô Anh Quân','1A',NULL),(11,'Đinh Phương Thảo','1B',NULL),(12,'Huỳnh Đức Huy','1B',NULL),(13,'Phan Hồng Nhung','1B',NULL),(14,'Trương Ngọc Long','1B',NULL),(15,'Mai Anh Thư','1B',NULL),(16,'Vũ Đức Minh','1B',NULL),(17,'Nguyễn Hoài Nam','1B',NULL),(18,'Trần Bảo Trân','1B',NULL),(19,'Lý Khánh Dương','1B',NULL),(20,'Phạm Gia Hân','1B',NULL);

DROP TABLE IF EXISTS `student_parent`;
CREATE TABLE `student_parent` (
  `student_id` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  KEY `student_id` (`student_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `student_parent_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `student_parent_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `student_parent` VALUES (1,1),(1,2),(2,3),(2,4),(3,5),(3,6),(4,7),(4,8),(5,9),(5,10),(6,11),(7,12),(8,13),(9,14),(10,15),(11,16),(12,17),(13,18),(14,19),(15,20),(16,21),(17,22),(18,23),(19,24),(20,25);

DROP TABLE IF EXISTS `pickup_status`;
CREATE TABLE `pickup_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `stop_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  KEY `stop_id` (`stop_id`),
  KEY `student_id` (`student_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `pickup_status_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `pickup_status_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `pickup_status_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



------------------CẬP NHẬT THÊM DỮ LIỆU ẢO ,TĂNG ĐỘ BẢO MẬT BẰNG MÃ HASH TRONG USER.PASSWORD------------------------

--TĂNG ĐỘ BẢO MẬT
ALTER TABLE user MODIFY COLUMN password VARCHAR(255);
UPDATE user 
SET password = '$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki';
--CẬP NHẬT THÊM DỮ LIỆU 
USE ssb;
INSERT INTO driver (license_number, user_id, status) VALUES
('GPLX-001', 26, 'Active'),
('GPLX-002', 27, 'Active'),
('GPLX-003', 28, 'On-Leave');

-- 2. Tạo Tuyến đường (Route)
INSERT INTO route (route_id, name, description) VALUES
(1, 'Tuyến 1 - Quận 1/Bình Thạnh', 'Tuyến đón học sinh khu vực Quận 1 và Bình Thạnh'),
(2, 'Tuyến 2 - Gò Vấp', 'Tuyến đón học sinh khu vực Gò Vấp');

-- 3. Tạo các Trạm dừng (Stop)
INSERT INTO stop (stop_id, latitude, longitude, address) VALUES
(1, 10.7769, 106.7009, '123 Nguyễn Huệ, P. Bến Nghé, Quận 1'),
(2, 10.7909, 106.7027, '456 Lê Thánh Tôn, P. Bến Thành, Quận 1'),
(3, 10.8034, 106.7073, '789 Xô Viết Nghệ Tĩnh, P. 21, Q. Bình Thạnh'),
(4, 10.8386, 106.6656, '111 Quang Trung, P. 10, Q. Gò Vấp'),
(5, 10.8339, 106.6675, '222 Nguyễn Văn Lượng, P. 17, Q. Gò Vấp');

-- 4. Gán các trạm vào tuyến (Stop_Route)
-- Tuyến 1 có 3 trạm
INSERT INTO stop_route (route_id, stop_id, `order`, expected_arrive_time) VALUES
(1, 1, 1, '06:30:00'),
(1, 2, 2, '06:45:00'),
(1, 3, 3, '07:00:00');
-- Tuyến 2 có 2 trạm
INSERT INTO stop_route (route_id, stop_id, `order`, expected_arrive_time) VALUES
(2, 4, 1, '06:30:00'),
(2, 5, 2, '06:45:00');

-- 5. CẬP NHẬT QUAN TRỌNG: Gán trạm đón cho học sinh

UPDATE student SET stop_id = 1 WHERE student_id BETWEEN 1 AND 4;
UPDATE student SET stop_id = 2 WHERE student_id BETWEEN 5 AND 8;
UPDATE student SET stop_id = 3 WHERE student_id BETWEEN 9 AND 12;
UPDATE student SET stop_id = 4 WHERE student_id BETWEEN 13 AND 16;
UPDATE student SET stop_id = 5 WHERE student_id BETWEEN 17 AND 20;

-- 6. Tạo Lịch trình (Schedule) cho ngày hôm nay
INSERT INTO schedule (schedule_id, route_id, bus_id, driver_id, `date`, start_time, manager_id, end_time, status) VALUES
(1, 1, 1, 1, CURDATE(), '06:00:00', 29, '08:00:00', 'in progress'),
(2, 2, 2, 2, CURDATE(), '06:00:00', 29, '08:00:00', 'pending');

-- 7. Tạo dữ liệu vị trí (Location_Track)
-- (Giả lập xe bus 1 đang di chuyển)
INSERT INTO location_track (bus_id, `timestamp`, latitude, longitude) VALUES
(1, NOW() - INTERVAL 10 MINUTE, 10.7760, 106.7000),
(1, NOW() - INTERVAL 5 MINUTE, 10.7765, 106.7005),
(1, NOW(), 10.7769, 106.7009); -- Vị trí hiện tại ở trạm 1
-- 9. Tạo Trạng thái đón (Pickup_Status)
-- (Ghi nhận trạng thái cho lịch trình 1, học sinh 1 tại trạm 1)
INSERT INTO pickup_status (stop_id, student_id, schedule_id, `time`, status) VALUES
(1, 1, 1, NOW(), 'boarded'); -- Học sinh 1 đã lên xe
UPDATE `user`
SET email = CONCAT('abc', user_id, '@gmail.com')
WHERE user_id BETWEEN 1 AND 31;
-------thêm cột bảng bus---------------------------
ALTER TABLE bus
ADD COLUMN status ENUM('active', 'idle', 'maintenance', 'retired') DEFAULT 'idle',
ADD COLUMN current_latitude FLOAT,
ADD COLUMN current_longitude FLOAT,
ADD COLUMN last_update DATETIME;
------------cập nhật lại trạng thái trong bus-------------------
UPDATE bus
SET 
    current_latitude = 10.7769,
    current_longitude = 106.7009,
    last_update = NOW(),
    status = 'active' 
WHERE 
    bus_id = 1;
  -- ----- PHẦN 1: CHỈNH SỬA BẢNG "notification" HIỆN TẠI -----
-- Mục tiêu: Biến bảng "notification" (ảnh 1) thành bảng "NOTIFICATION" (ảnh 2)
-- Bảng cũ: (notif_id, user_id, message, timestamp, type)
-- Bảng mới: (notif_id, admin_id, title, message, created_at)

-- LƯU Ý QUAN TRỌNG:
-- Như bạn đã hỏi, cột 'user_id' CÓ THỂ đang dính Khóa Phụ.
-- Bạn phải chạy lệnh SHOW CREATE TABLE notification; để tìm tên khóa phụ
-- và gỡ nó ra TRƯỚC KHI chạy các lệnh bên dưới.


ALTER TABLE notification
DROP FOREIGN KEY notification_ibfk_1;

-- BƯỚC 1: Xóa các cột không còn dùng trong mô hình mới
ALTER TABLE notification
  DROP COLUMN user_id,
  DROP COLUMN timestamp,
  DROP COLUMN type;

-- BƯỚC 2: Thêm các cột mới cho bảng thông báo gốc
ALTER TABLE notification
  ADD COLUMN title VARCHAR(255) NOT NULL AFTER notif_id,
  ADD COLUMN admin_id INT NULL AFTER title, -- ID của người gửi
  ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


-- ----- PHẦN 2: TẠO BẢNG "notification_read_status" MỚI -----
-- Mục tiêu: Tạo bảng theo dõi trạng thái "đã đọc" cho từng người dùng.

CREATE TABLE notification_read_status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Khóa ngoại trỏ đến thông báo gốc (Bảng chúng ta vừa sửa)
    notif_id INT NOT NULL, 
    
    -- Khóa ngoại trỏ đến người nhận (Giả sử bạn có bảng 'users')
    user_id INT NOT NULL, 
    
    -- Cột quan trọng nhất: Mặc định là 'chưa đọc' (false)
    is_read BOOLEAN DEFAULT FALSE, 
    
    -- (Tùy chọn) Lưu lại thời gian họ đọc
    read_at DATETIME NULL, 

    -- ---- Ràng buộc & Tăng tốc ----
    
    -- Ràng buộc 1: Kết nối tới bảng thông báo
    -- (Nếu bạn CHƯA đổi tên bảng ở Bước 3, hãy dùng 'notification(notif_id)')
    FOREIGN KEY (notif_id) 
        REFERENCES notification(notif_id) 
        ON DELETE CASCADE, -- Xóa thông báo gốc thì xóa luôn trạng thái

    -- Ràng buộc 2: Kết nối tới bảng người dùng
    FOREIGN KEY (user_id) 
        REFERENCES user(user_id) 
        ON DELETE CASCADE, -- Xóa user thì xóa luôn trạng thái
        
    -- Đảm bảo một người chỉ nhận 1 thông báo 1 lần
    UNIQUE KEY uk_notification_user (notif_id, user_id),
    
    -- Tăng tốc tìm kiếm 'chưa đọc'
    INDEX idx_is_read (is_read)
);
----------------------------Tạo lại dữ liệu ảo cho 2 bảng-------------------------
INSERT INTO notification (admin_id, title, message, created_at)
VALUES
(
  1, -- admin_id
  'Thông báo nghỉ lễ 30/4', 
  'Toàn trường sẽ được nghỉ lễ 2 ngày 30/4 và 1/5.',
  '2025-04-28 08:00:00'
),
(
  1, -- admin_id
  'Thông báo họp phụ huynh khẩn', 
  'Nhà trường tổ chức họp phụ huynh khẩn vào 10:00 sáng Chủ Nhật tuần này.',
  '2025-11-20 09:00:00'
);
INSERT INTO notification_read_status  (notif_id, user_id, is_read, read_at)
VALUES
-- Kịch bản 1: Thông báo 'Nghỉ lễ' (ID: 1) gửi cho 3 người
(
  4,  -- 'Nghỉ lễ'
  10, -- Phụ huynh A
  TRUE, -- Đã đọc
  '2025-04-28 08:30:15'
),
(
  4,  -- 'Nghỉ lễ'
  11, -- Phụ huynh B
  TRUE, -- Đã đọc
  '2025-04-28 09:15:00'
),
(
  4,  -- 'Nghỉ lễ'
  12, -- Phụ huynh C
  FALSE, -- CHƯA ĐỌC
  NULL
),

-- Kịch bản 2: Thông báo 'Họp khẩn' (ID: 2) gửi cho 2 người
(
  5,  -- 'Họp khẩn'
  10, -- Phụ huynh A
  FALSE, -- CHƯA ĐỌC
  NULL
),
(
  5,  -- 'Họp khẩn'
  11, -- Phụ huynh B
  FALSE, -- CHƯA ĐỌC
  NULL
); --lưu ý nếu không thêm dữ liệu được thì xem lại bảng notification coi có trùng notif_id với dữ liệu trong bảng không.
--ví dụ nếu thông báo trong notification là 1 mà trong notification_read_status là 3 thì sẽ bị lỗi khoá ngoại.
ALTER TABLE `user`
ADD COLUMN `email` VARCHAR(100) DEFAULT NULL AFTER `phone`;
-----------------thêm trạng thái status cho bảng notification---------------------
ALTER TABLE notification
ADD COLUMN status ENUM('published', 'draft', 'archived') 
NOT NULL 
DEFAULT 'published'
AFTER message
ADD COLUMN target_audience VARCHAR(100) NULL 
AFTER title;


-- thêm is_deleted các cột student, parent, route, schedule 

ALTER TABLE student ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;
ALTER TABLE route ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;
ALTER TABLE parent ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;
ALTER TABLE schedule ADD COLUMN is_deleted TINYINT(1) DEFAULT 0;
------thêm bảng report -----------------
CREATE TABLE incident_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    title VARCHAR(100),      -- Tương ứng với 'type' bên frontend (Kẹt xe, Hỏng xe...)
    description TEXT,        -- Tương ứng với 'description'
    priority ENUM('Thấp', 'Trung bình', 'Cao') DEFAULT 'Trung bình', -- Tương ứng với 'priority'
    address VARCHAR(255),    -- Tương ứng với 'location'
    status ENUM('pending', 'processing', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
);
-------khởi tạo bảng message-----------------
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Người gửi (Liên kết với bảng user)
    sender_id INT NOT NULL, 
    
    -- Người nhận (Liên kết với bảng user - Có thể là Driver hoặc Parent)
    receiver_id INT NOT NULL, 
    
    content TEXT NOT NULL,
    
    -- Trạng thái đã xem (Tùy chọn, để hiện "Đã xem")
    is_read BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ràng buộc khóa ngoại (Quan trọng)
    FOREIGN KEY (sender_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON DELETE CASCADE
);