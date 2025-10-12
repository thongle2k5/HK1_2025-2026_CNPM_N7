CREATE DATABASE  IF NOT EXISTS `ssb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ssb`;
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
  `license_plate` varchar(20) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`bus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bus`
--

LOCK TABLES `bus` WRITE;
/*!40000 ALTER TABLE `bus` DISABLE KEYS */;
INSERT INTO `bus` VALUES (1,'51B-12345',40,'Hyundai County'),(2,'51C-67890',45,'Thaco Town'),(3,'51D-24680',40,'Ford Transit');
/*!40000 ALTER TABLE `bus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `driver_id` int NOT NULL AUTO_INCREMENT,
  `license_number` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`driver_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location_track`
--

LOCK TABLES `location_track` WRITE;
/*!40000 ALTER TABLE `location_track` DISABLE KEYS */;
/*!40000 ALTER TABLE `location_track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
  `relationship_info` enum('ông','bà','cha','mẹ','anh','chị','cô/dì','chú/bác') DEFAULT NULL,
  PRIMARY KEY (`parent_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `parent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,1,'cha'),(2,2,'mẹ'),(3,3,'cha'),(4,4,'mẹ'),(5,5,'cha'),(6,6,'mẹ'),(7,7,'cha'),(8,8,'mẹ'),(9,9,'cha'),(10,10,'mẹ'),(11,11,'cha'),(12,12,'mẹ'),(13,13,'cha'),(14,14,'mẹ'),(15,15,'cha'),(16,16,'mẹ'),(17,17,'cha'),(18,18,'mẹ'),(19,19,'cha'),(20,20,'mẹ'),(21,21,'cha'),(22,22,'mẹ'),(23,23,'cha'),(24,24,'mẹ'),(25,25,'cha');
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
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  KEY `stop_id` (`stop_id`),
  KEY `student_id` (`student_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `pickup_status_ibfk_1` FOREIGN KEY (`stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `pickup_status_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  CONSTRAINT `pickup_status_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickup_status`
--

LOCK TABLES `pickup_status` WRITE;
/*!40000 ALTER TABLE `pickup_status` DISABLE KEYS */;
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
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
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
  `route_id` int DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `address` text,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`stop_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `stop_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stop`
--

LOCK TABLES `stop` WRITE;
/*!40000 ALTER TABLE `stop` DISABLE KEYS */;
/*!40000 ALTER TABLE `stop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(50) DEFAULT NULL,
  `class` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Nguyễn Minh Anh','1A'),(2,'Trần Gia Bảo','1A'),(3,'Lê Thảo Nhi','1A'),(4,'Phạm Anh Duy','1A'),(5,'Hoàng Thu Trang','1A'),(6,'Đặng Minh Khang','1A'),(7,'Võ Hữu Phát','1A'),(8,'Ngô Nhật Linh','1A'),(9,'Bùi Khánh Vy','1A'),(10,'Tô Anh Quân','1A'),(11,'Đinh Phương Thảo','1B'),(12,'Huỳnh Đức Huy','1B'),(13,'Phan Hồng Nhung','1B'),(14,'Trương Ngọc Long','1B'),(15,'Mai Anh Thư','1B'),(16,'Vũ Đức Minh','1B'),(17,'Nguyễn Hoài Nam','1B'),(18,'Trần Bảo Trân','1B'),(19,'Lý Khánh Dương','1B'),(20,'Phạm Gia Hân','1B');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `student_route_assignment`
--

DROP TABLE IF EXISTS `student_route_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_route_assignment` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `pickup_stop_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `dropoff_stop_id` int DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `pickup_stop_id` (`pickup_stop_id`),
  KEY `dropoff_stop_id` (`dropoff_stop_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `student_route_assignment_ibfk_1` FOREIGN KEY (`pickup_stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `student_route_assignment_ibfk_2` FOREIGN KEY (`dropoff_stop_id`) REFERENCES `stop` (`stop_id`),
  CONSTRAINT `student_route_assignment_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_route_assignment`
--

LOCK TABLES `student_route_assignment` WRITE;
/*!40000 ALTER TABLE `student_route_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_route_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `role` enum('parent','driver','manager','admin') NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'parent01','123456','parent','Nguyễn Minh Tâm','0901000001'),(2,'parent02','123456','parent','Trần Thị Hoa','0901000002'),(3,'parent03','123456','parent','Lê Văn Nam','0901000003'),(4,'parent04','123456','parent','Phạm Thị Hương','0901000004'),(5,'parent05','123456','parent','Hoàng Văn Dũng','0901000005'),(6,'parent06','123456','parent','Vũ Thị Lan','0901000006'),(7,'parent07','123456','parent','Đỗ Minh Đức','0901000007'),(8,'parent08','123456','parent','Nguyễn Thị Mai','0901000008'),(9,'parent09','123456','parent','Trần Quốc Huy','0901000009'),(10,'parent10','123456','parent','Lê Thị Ngọc','0901000010'),(11,'parent11','123456','parent','Phan Văn Bình','0901000011'),(12,'parent12','123456','parent','Đinh Thị Yến','0901000012'),(13,'parent13','123456','parent','Bùi Anh Tuấn','0901000013'),(14,'parent14','123456','parent','Mai Thị Hạnh','0901000014'),(15,'parent15','123456','parent','Võ Văn Hải','0901000015'),(16,'parent16','123456','parent','Ngô Thị Vân','0901000016'),(17,'parent17','123456','parent','Tạ Văn Long','0901000017'),(18,'parent18','123456','parent','Cao Thị Huệ','0901000018'),(19,'parent19','123456','parent','Phùng Văn Quý','0901000019'),(20,'parent20','123456','parent','Trương Thị Liên','0901000020'),(21,'parent21','123456','parent','Lý Minh Khôi','0901000021'),(22,'parent22','123456','parent','Đoàn Thị Hòa','0901000022'),(23,'parent23','123456','parent','Huỳnh Văn Tài','0901000023'),(24,'parent24','123456','parent','Nguyễn Thị Nga','0901000024'),(25,'parent25','123456','parent','Trần Minh Khang','0901000025'),(26,'driver01','123456','driver','Nguyễn Văn Lợi','0912000001'),(27,'driver02','123456','driver','Trần Quốc Bảo','0912000002'),(28,'driver03','123456','driver','Lê Minh Phúc','0912000003'),(29,'manager01','123456','manager','Phạm Thị Thu','0913000001'),(30,'manager02','123456','manager','Hoàng Anh Tuấn','0913000002'),(31,'manager03','123456','manager','Vũ Ngọc Lan','0913000003');
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

-- Dump completed on 2025-10-12 14:41:08
