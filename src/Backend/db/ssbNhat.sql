-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: ssb
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bus`
--

DROP TABLE IF EXISTS `bus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus` (
  `bus_id` int NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `model` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','idle','maintenance','retired') COLLATE utf8mb4_unicode_ci DEFAULT 'idle',
  `current_latitude` float DEFAULT NULL,
  `current_longitude` float DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES (1,'51B-12345',40,'Hyundai County','active',10.7769,106.701,'2025-11-23 22:36:08'),(2,'51C-67890',45,'Thaco Town','idle',NULL,NULL,NULL),(3,'51D-24680',40,'Ford Transit','idle',NULL,NULL,NULL);
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bus_notification`
--

DROP TABLE IF EXISTS `bus_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bus_notification` (
  `bus_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` enum('arrived','close to') NOT NULL,
  PRIMARY KEY (`bus_id`,`stop_id`,`schedule_id`,`type`),
  KEY `stop_id` (`stop_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `bus_notification_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`),
  CONSTRAINT `bus_notification_ibfk_2` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `bus_notification_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus_notification`
--

LOCK TABLES `bus_notification` WRITE;
/*!40000 ALTER TABLE `bus_notification` DISABLE KEYS */;
INSERT INTO `bus_notification` VALUES (1,2,1,'2025-11-26 19:34:50','arrived'),(1,2,1,'2025-11-26 19:34:03','close to'),(1,3,1,'2025-11-26 19:35:36','arrived'),(1,3,1,'2025-11-26 19:34:50','close to');
/*!40000 ALTER TABLE `bus_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `license_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` enum('Active','On-Leave','Suspended','Terminated') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`driver_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (1,'GPLX-001',26,'Active'),(2,'GPLX-002',27,'Active'),(3,'GPLX-003',28,'On-Leave');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incident_reports`
--

DROP TABLE IF EXISTS `incident_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incident_reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `driver_id` int NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `priority` enum('Thấp','Trung bình','Cao') COLLATE utf8mb4_general_ci DEFAULT 'Trung bình',
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('pending','processing','resolved') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `incident_reports_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incident_reports`
--

LOCK TABLES `incident_reports` WRITE;
/*!40000 ALTER TABLE `incident_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `incident_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location_track`
--

DROP TABLE IF EXISTS `location_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location_track` (
  `track_id` int NOT NULL AUTO_INCREMENT,
  `bus_id` int DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`track_id`),
  KEY `bus_id` (`bus_id`),
  CONSTRAINT `location_track_ibfk_1` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_track`
--

LOCK TABLES `location_track` WRITE;
/*!40000 ALTER TABLE `location_track` DISABLE KEYS */;
INSERT INTO `location_track` VALUES (1,1,'2025-11-23 22:26:08',10.776,106.7),(2,1,'2025-11-23 22:31:08',10.7765,106.701),(3,1,'2025-11-23 22:36:08',10.7769,106.701);
/*!40000 ALTER TABLE `location_track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notif_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_audience` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` enum('published','draft','archived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notif_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'Thông báo nghỉ lễ 30/4',NULL,1,'Toàn trường sẽ được nghỉ lễ 2 ngày 30/4 và 1/5.','published','2025-04-28 01:00:00'),(2,'Thông báo họp phụ huynh khẩn',NULL,1,'Nhà trường tổ chức họp phụ huynh khẩn vào 10:00 sáng Chủ Nhật tuần này.','published','2025-11-20 02:00:00');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_read_status`
--

DROP TABLE IF EXISTS `notification_read_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_read_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `notif_id` int NOT NULL,
  `user_id` int NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `read_at` datetime DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `uk_notification_user` (`notif_id`,`user_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_is_read` (`is_read`),
  CONSTRAINT `notification_read_status_ibfk_1` FOREIGN KEY (`notif_id`) REFERENCES `notification` (`notif_id`) ON DELETE CASCADE,
  CONSTRAINT `notification_read_status_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_read_status`
--

LOCK TABLES `notification_read_status` WRITE;
/*!40000 ALTER TABLE `notification_read_status` DISABLE KEYS */;
INSERT INTO `notification_read_status` VALUES (1,1,10,1,'2025-04-28 08:30:15'),(2,1,11,1,'2025-04-28 09:15:00'),(3,1,12,0,NULL),(4,2,10,0,NULL),(5,2,11,0,NULL);
/*!40000 ALTER TABLE `notification_read_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent` (
  `parent_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `relationship_info` enum('ông','bà','cha','mẹ','anh','chị','cô/dì','chú/bác') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`parent_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,1,'cha',0),(2,2,'mẹ',0),(3,3,'cha',0),(4,4,'mẹ',0),(5,5,'cha',0),(6,6,'mẹ',0),(7,7,'cha',0),(8,8,'mẹ',0),(9,9,'cha',0),(10,10,'mẹ',0),(11,11,'cha',0),(12,12,'mẹ',0),(13,13,'cha',0),(14,14,'mẹ',0),(15,15,'cha',0),(16,16,'mẹ',0),(17,17,'cha',0),(18,18,'mẹ',0),(19,19,'cha',0),(20,20,'mẹ',0),(21,21,'cha',0),(22,22,'mẹ',0),(23,23,'cha',0),(24,24,'mẹ',0),(25,25,'cha',0);
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickup_status`
--

DROP TABLE IF EXISTS `pickup_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pickup_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `stop_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `schedule_id` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  KEY `stop_id` (`stop_id`),
  KEY `student_id` (`student_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `pickup_status_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `pickup_status_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `pickup_status_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_status`
--

LOCK TABLES `pickup_status` WRITE;
/*!40000 ALTER TABLE `pickup_status` DISABLE KEYS */;
INSERT INTO `pickup_status` VALUES (1,1,1,1,'2025-11-23 22:36:08','picked up');
/*!40000 ALTER TABLE `pickup_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Tuyến 1 - Quận 1/Bình Thạnh','Tuyến đón học sinh khu vực Quận 1 và Bình Thạnh',0),(2,'Tuyến 2 - Gò Vấp','Tuyến đón học sinh khu vực Gò Vấp',0);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `route_id` int DEFAULT NULL,
  `bus_id` int DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `status` enum('pending','in progress','completed') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`schedule_id`),
  KEY `route_id` (`route_id`),
  KEY `bus_id` (`bus_id`),
  KEY `driver_id` (`driver_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`),
  CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `schedule_ibfk_4` FOREIGN KEY (`manager_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,1,1,'2025-11-23','06:00:00',29,'08:00:00','in progress',0),(2,2,2,2,'2025-11-23','06:00:00',29,'08:00:00','pending',0);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop`
--

DROP TABLE IF EXISTS `stop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stop` (
  `stop_id` int NOT NULL AUTO_INCREMENT,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`stop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop`
--

LOCK TABLES `stop` WRITE;
/*!40000 ALTER TABLE `stop` DISABLE KEYS */;
INSERT INTO `stop` VALUES (1,10.7769,106.701,'123 Nguyễn Huệ, P. Bến Nghé, Quận 1'),(2,10.7909,106.703,'456 Lê Thánh Tôn, P. Bến Thành, Quận 1'),(3,10.8034,106.707,'789 Xô Viết Nghệ Tĩnh, P. 21, Q. Bình Thạnh'),(4,10.8386,106.666,'111 Quang Trung, P. 10, Q. Gò Vấp'),(5,10.8339,106.668,'222 Nguyễn Văn Lượng, P. 17, Q. Gò Vấp');
/*!40000 ALTER TABLE `stop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stop_route`
--

DROP TABLE IF EXISTS `stop_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stop_route` (
  `route_id` int NOT NULL,
  `stop_id` int NOT NULL,
  `order` int DEFAULT NULL,
  `expected_arrive_time` time DEFAULT NULL,
  PRIMARY KEY (`route_id`,`stop_id`),
  KEY `stop_id` (`stop_id`),
  CONSTRAINT `stop_route_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `stop_route_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop_route`
--

LOCK TABLES `stop_route` WRITE;
/*!40000 ALTER TABLE `stop_route` DISABLE KEYS */;
INSERT INTO `stop_route` VALUES (1,1,1,'06:30:00'),(1,2,2,'06:45:00'),(1,3,3,'07:00:00'),(2,4,1,'06:30:00'),(2,5,2,'06:45:00');
/*!40000 ALTER TABLE `stop_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stop_id` int DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`student_id`),
  KEY `stop_id` (`stop_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Nguyễn Minh Anh','1A',1,0),(2,'Trần Gia Bảo','1A',1,0),(3,'Lê Thảo Nhi','1A',1,0),(4,'Phạm Anh Duy','1A',1,0),(5,'Hoàng Thu Trang','1A',2,0),(6,'Đặng Minh Khang','1A',2,0),(7,'Võ Hữu Phát','1A',2,0),(8,'Ngô Nhật Linh','1A',2,0),(9,'Bùi Khánh Vy','1A',3,0),(10,'Tô Anh Quân','1A',3,0),(11,'Đinh Phương Thảo','1B',3,0),(12,'Huỳnh Đức Huy','1B',3,0),(13,'Phan Hồng Nhung','1B',4,0),(14,'Trương Ngọc Long','1B',4,0),(15,'Mai Anh Thư','1B',4,0),(16,'Vũ Đức Minh','1B',4,0),(17,'Nguyễn Hoài Nam','1B',5,0),(18,'Trần Bảo Trân','1B',5,0),(19,'Lý Khánh Dương','1B',5,0),(20,'Phạm Gia Hân','1B',5,0);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_parent`
--

DROP TABLE IF EXISTS `student_parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_parent` (
  `student_id` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  KEY `student_id` (`student_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `student_parent_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `student_parent_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_parent`
--

LOCK TABLES `student_parent` WRITE;
/*!40000 ALTER TABLE `student_parent` DISABLE KEYS */;
INSERT INTO `student_parent` VALUES (1,1),(1,2),(2,3),(2,4),(3,5),(3,6),(4,7),(4,8),(5,9),(5,10),(6,11),(7,12),(8,13),(9,14),(10,15),(11,16),(12,17),(13,18),(14,19),(15,20),(16,21),(17,22),(18,23),(19,24),(20,25);
/*!40000 ALTER TABLE `student_parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('parent','driver','manager','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'parent01','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Nguyễn Minh Tâm','0901000001','abc1@gmail.com'),(2,'parent02','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Trần Thị Hoa','0901000002','abc2@gmail.com'),(3,'parent03','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Lê Văn Nam','0901000003','abc3@gmail.com'),(4,'parent04','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Phạm Thị Hương','0901000004','abc4@gmail.com'),(5,'parent05','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Hoàng Văn Dũng','0901000005','abc5@gmail.com'),(6,'parent06','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Vũ Thị Lan','0901000006','abc6@gmail.com'),(7,'parent07','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Đỗ Minh Đức','0901000007','abc7@gmail.com'),(8,'parent08','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Nguyễn Thị Mai','0901000008','abc8@gmail.com'),(9,'parent09','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Trần Quốc Huy','0901000009','abc9@gmail.com'),(10,'parent10','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Lê Thị Ngọc','0901000010','abc10@gmail.com'),(11,'parent11','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Phan Văn Bình','0901000011','abc11@gmail.com'),(12,'parent12','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Đinh Thị Yến','0901000012','abc12@gmail.com'),(13,'parent13','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Bùi Anh Tuấn','0901000013','abc13@gmail.com'),(14,'parent14','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Mai Thị Hạnh','0901000014','abc14@gmail.com'),(15,'parent15','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Võ Văn Hải','0901000015','abc15@gmail.com'),(16,'parent16','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Ngô Thị Vân','0901000016','abc16@gmail.com'),(17,'parent17','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Tạ Văn Long','0901000017','abc17@gmail.com'),(18,'parent18','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Cao Thị Huệ','0901000018','abc18@gmail.com'),(19,'parent19','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Phùng Văn Quý','0901000019','abc19@gmail.com'),(20,'parent20','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Trương Thị Liên','0901000020','abc20@gmail.com'),(21,'parent21','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Lý Minh Khôi','0901000021','abc21@gmail.com'),(22,'parent22','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Đoàn Thị Hòa','0901000022','abc22@gmail.com'),(23,'parent23','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Huỳnh Văn Tài','0901000023','abc23@gmail.com'),(24,'parent24','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Nguyễn Thị Nga','0901000024','abc24@gmail.com'),(25,'parent25','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','parent','Trần Minh Khang','0901000025','abc25@gmail.com'),(26,'driver01','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','driver','Nguyễn Văn Lợi','0912000001','abc26@gmail.com'),(27,'driver02','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','driver','Trần Quốc Bảo','0912000002','abc27@gmail.com'),(28,'driver03','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','driver','Lê Minh Phúc','0912000003','abc28@gmail.com'),(29,'manager01','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','manager','Phạm Thị Thu','0913000001','abc29@gmail.com'),(30,'manager02','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','manager','Hoàng Anh Tuấn','0913000002','abc30@gmail.com'),(31,'manager03','$2b$10$DxPQvqDAlfOuY4QtmARMl.dhromZWkTAZnfiFFCtWmptX.YFV73ki','manager','Vũ Ngọc Lan','0913000003','abc31@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 19:44:41
