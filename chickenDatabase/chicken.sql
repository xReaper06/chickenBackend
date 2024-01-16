-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: chicken_db
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `json_token`
--

DROP TABLE IF EXISTS `json_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `json_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` text NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `json_token`
--

LOCK TABLES `json_token` WRITE;
/*!40000 ALTER TABLE `json_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `json_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_checkout`
--

DROP TABLE IF EXISTS `order_checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_checkout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` text NOT NULL,
  `user_id` int NOT NULL,
  `totalprice` decimal(10,2) NOT NULL,
  `products` text NOT NULL,
  `paymentType` int NOT NULL,
  `status` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_checkout`
--

LOCK TABLES `order_checkout` WRITE;
/*!40000 ALTER TABLE `order_checkout` DISABLE KEYS */;
INSERT INTO `order_checkout` VALUES (8,'97e243db65',5,5.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5}]',1,3,'2024-01-15 21:11:09',NULL),(9,'da68452b77',5,15.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5},{\"id\":5,\"image\":\"images/413067115_677863954538852_546210169540014930_n.png\",\"productname\":\"Chicken Feet\",\"quantity\":1,\"price\":10}]',1,3,'2024-01-15 22:04:52',NULL),(10,'7d13403cad',5,30.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5},{\"id\":6,\"image\":\"images/368011093_747077287249479_7710779837136624042_n.png\",\"productname\":\"Fried Chicken\",\"quantity\":1,\"price\":15},{\"id\":7,\"image\":\"images/411389807_216826594830827_7608441644715436006_n.png\",\"productname\":\"Chicken Neck\",\"quantity\":1,\"price\":10}]',1,2,'2024-01-15 22:15:56',NULL),(11,'106f867f51',5,15.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5},{\"id\":5,\"image\":\"images/413067115_677863954538852_546210169540014930_n.png\",\"productname\":\"Chicken Feet\",\"quantity\":1,\"price\":10}]',1,2,'2024-01-15 22:21:15',NULL),(12,'c152f497ce',5,85.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5}]',1,2,'2024-01-15 22:22:08',NULL),(13,'81d3e29eb8',5,230.00,'[{\"id\":8,\"image\":\"images/360066794_667340032091177_4175451543078614672_n.jpg\",\"productname\":\"Batchoy\",\"quantity\":1,\"price\":25},{\"id\":6,\"image\":\"images/368011093_747077287249479_7710779837136624042_n.png\",\"productname\":\"Fried Chicken\",\"quantity\":1,\"price\":15},{\"id\":5,\"image\":\"images/413067115_677863954538852_546210169540014930_n.png\",\"productname\":\"Chicken Feet\",\"quantity\":1,\"price\":10},{\"id\":7,\"image\":\"images/411389807_216826594830827_7608441644715436006_n.png\",\"productname\":\"Chicken Neck\",\"quantity\":10,\"price\":100}]',1,2,'2024-01-15 22:23:30',NULL),(14,'81ef16a223',5,300.00,'[{\"id\":8,\"image\":\"images/360066794_667340032091177_4175451543078614672_n.jpg\",\"productname\":\"Batchoy\",\"quantity\":12,\"price\":300}]',1,2,'2024-01-15 22:26:16',NULL),(15,'e8d3d91f1e',5,85.00,'[{\"id\":4,\"image\":\"images/387518460_341302871606169_1176658346387497253_n.png\",\"productname\":\"Puso Rice\",\"quantity\":1,\"price\":5}]',1,2,'2024-01-15 22:41:26',NULL);
/*!40000 ALTER TABLE `order_checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_type`
--

DROP TABLE IF EXISTS `payment_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_id` int NOT NULL,
  `paymentname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_type`
--

LOCK TABLES `payment_type` WRITE;
/*!40000 ALTER TABLE `payment_type` DISABLE KEYS */;
INSERT INTO `payment_type` VALUES (1,1,'COD'),(2,2,'GCASH');
/*!40000 ALTER TABLE `payment_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_cart`
--

DROP TABLE IF EXISTS `product_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_cart`
--

LOCK TABLES `product_cart` WRITE;
/*!40000 ALTER TABLE `product_cart` DISABLE KEYS */;
INSERT INTO `product_cart` VALUES (14,5,4,1,5.00,2,'2024-01-15 21:09:02','2024-01-15 21:11:08'),(15,5,4,1,5.00,2,'2024-01-15 22:00:38','2024-01-15 22:04:52'),(16,5,5,1,10.00,2,'2024-01-15 22:00:41','2024-01-15 22:04:52'),(17,5,4,1,5.00,2,'2024-01-15 22:14:15','2024-01-15 22:15:55'),(18,5,6,1,15.00,2,'2024-01-15 22:14:18','2024-01-15 22:15:55'),(19,5,7,1,10.00,2,'2024-01-15 22:14:21','2024-01-15 22:15:56'),(20,5,4,1,5.00,2,'2024-01-15 22:18:13','2024-01-15 22:18:23'),(21,5,4,1,5.00,2,'2024-01-15 22:21:01','2024-01-15 22:21:15'),(22,5,5,1,10.00,2,'2024-01-15 22:21:04','2024-01-15 22:21:15'),(23,5,4,1,5.00,2,'2024-01-15 22:21:54','2024-01-15 22:22:07'),(24,5,8,1,25.00,2,'2024-01-15 22:22:30','2024-01-15 22:23:28'),(25,5,6,1,15.00,2,'2024-01-15 22:22:32','2024-01-15 22:23:29'),(26,5,5,1,10.00,2,'2024-01-15 22:22:34','2024-01-15 22:23:29'),(27,5,7,10,100.00,2,'2024-01-15 22:22:39','2024-01-15 22:23:29'),(28,5,8,12,300.00,2,'2024-01-15 22:24:08','2024-01-15 22:26:15'),(29,5,4,1,5.00,2,'2024-01-15 22:24:30','2024-01-15 22:41:26');
/*!40000 ALTER TABLE `product_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_favorites`
--

DROP TABLE IF EXISTS `product_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_favorites`
--

LOCK TABLES `product_favorites` WRITE;
/*!40000 ALTER TABLE `product_favorites` DISABLE KEYS */;
INSERT INTO `product_favorites` VALUES (5,5,4,'2024-01-15 21:09:05',NULL);
/*!40000 ALTER TABLE `product_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `productname` varchar(100) NOT NULL,
  `productdesc` text NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` text NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,4,'Puso Rice','This is a Hanging Rice',91,5.00,'images/387518460_341302871606169_1176658346387497253_n.png',0,'2024-01-15 19:16:52',NULL),(5,4,'Chicken Feet','This is a Chicken Feet',97,10.00,'images/413067115_677863954538852_546210169540014930_n.png',0,'2024-01-15 19:17:32','2024-01-15 19:19:26'),(6,4,'Fried Chicken','This is Fried Chicken',96,15.00,'images/368011093_747077287249479_7710779837136624042_n.png',0,'2024-01-15 19:18:29',NULL),(7,4,'Chicken Neck','This is a Chicken Neck',87,10.00,'images/411389807_216826594830827_7608441644715436006_n.png',0,'2024-01-15 19:19:19',NULL),(8,4,'Batchoy','This is our Batchoy',37,25.00,'images/360066794_667340032091177_4175451543078614672_n.jpg',0,'2024-01-15 19:20:10',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,1,'user'),(2,2,'admin'),(3,3,'rider');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sitio` varchar(100) NOT NULL,
  `baranggay` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `zipcode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
INSERT INTO `user_address` VALUES (2,4,'Camolinas','Poblacion','Cordova','Cebu','6017',1,'2024-01-07 13:45:18',NULL),(3,5,'camolinas','poblacion','cordova','cebu','6017',1,'2024-01-09 19:24:55',NULL),(4,6,'camolinas','poblacion','cordova','cebu','6017',1,'2024-01-12 19:44:25',NULL);
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `mname` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `status` int NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,4,'admin','admin','admin','admin@admin.com',1,'2024-01-07 13:45:18',NULL),(2,5,'user','user','user','user1@gmail.com',1,'2024-01-09 19:24:56',NULL),(3,6,'rider','rider','rider','0927418234',1,'2024-01-12 19:44:25',NULL);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image` text NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,4,'images/413918014_7101459136542833_6201295894764936195_n.jpg','2024-01-07 13:45:19',NULL),(2,5,'images/413918014_7101459136542833_6201295894764936195_n.jpg','2024-01-09 19:24:56',NULL),(3,6,'images/414201481_701035105460422_2055208688526954366_n.jpg','2024-01-12 19:44:25',NULL);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL DEFAULT '1',
  `status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'new',
  `last_loggin` datetime DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'admin@admin.com','$2a$10$h0MID0TaOC3/YYN6xEvIreolxEgyUb/Gep1vsY8tbwKqVnPvmINaa',2,'0','2024-01-16 17:58:12','2024-01-07 13:45:18',NULL),(5,'user1@gmail.com','$2a$10$6V5/LCEhpOUuRlUm8a98e.zUJ5XDKluxkbsVv2wKnLpCQfvPxEMR.',1,'0','2024-01-16 15:21:35','2024-01-09 19:24:55',NULL),(6,'rider@gmail.com','$2a$10$y9zOZnGZgcgGZG52peJtoOl.terKb9VUA8n9STP00waw1putOjm9K',3,'0','2024-01-16 17:32:26','2024-01-12 19:44:24',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 18:05:43
