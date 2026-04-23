CREATE DATABASE  IF NOT EXISTS `boutique_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `boutique_db`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: boutique_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Guitarras Eléctricas'),(2,'Bajos Eléctricos'),(3,'Guitarras Acústicas');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `colors` varchar(255) DEFAULT NULL,
  `category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Squier Classic Vibe 60s Custom Telecaster','Cuerpo de nato, mango de arce en forma de C. Una joya clásica con sonido vintage.',439000.00,'guitarra-1.jpg','Oxblood, Sunburst',1),(2,'Gibson Les Paul Standard','El estándar de oro de las guitarras eléctricas. Tono cálido y sustain infinito.',2800000.00,'guitarra-2.jpg','Goldtop, Heritage Cherry',1),(3,'Bajo Fender Precision Bass Professional','El bajo más grabado de la historia. Sonido potente y definido.',1200000.00,'bajo-1.jpg','Black, Olympic White',2),(4,'Guitarra Acústica Taylor 214ce','Excelente proyección sonora y una comodidad inigualable para tocar horas.',950000.00,'acustica-1.jpg','Natural',3),(15,'Fender Stratocaster Player','Un clásico moderno con tres micrófonos simple bobina.',1200000.00,'1776948698531_img.jpg','Sunburst',1),(16,'Ibanez RG421','Ideal para metal y shred, mástil ultra delgado.',650000.00,'1776948836576_img.jpg','Black Flat',1),(17,'Gibson SG Standard','Cuerpo de caoba, tono rockero puro y agresivo.',1800000.00,'1776948992685_img.jpg','Heritage Cherry',1),(18,'Bajo Music Man StingRay','Sonido funky con mucha pegada y ecualizador activo.',2100000.00,'1776949039305_img.jpg','Blue',2),(19,'Bajo Yamaha TRBX304','Versatilidad total para cualquier género musical.',500000.00,'1776949083487_img.jpg','Candy Apple Red',2),(20,'Guitarra Martin D-28','La acústica definitiva, cuerpo Dreadnought de alta gama.',3200000.00,'1776949119510_img.jpg','Natural',3),(21,'Epiphone Casino','Cuerpo hueco, ideal para blues y jazz.',800000.00,'1776949162487_img.jpg','Vintage Sunburst',1),(22,'Fender Jazz Bass V','El estándar de los bajos de 5 cuerdas.',1900000.00,'1776949205869_img.jpg','Olympic White',2),(23,'Gretsch G5420T','Sonido rockabilly clásico con palanca Bigsby.',1100000.00,'1776949241823_img.jpg','Orange Stain',1),(24,'Yamaha FG800','La mejor guitarra acústica para nivel intermedio.',350000.00,'1776949284638_img.jpg','Natural',3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `rol` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Admin Boutique','admin@boutique.com','$2b$10$qXC7ZPnLtI7LF2XsVDVMNehwtzSL40d5qvI7qI9L5jmfXXnmlyMYm','1776945499883_user.jpg',1),(4,'Ricardo Mollo','molleja@divididos.com','$2b$10$cPZA05kify8baULvURSxs.JNbyQ8DPxOjnIxz4QnME2APIaywUIfe','1776945579670_user.jpg',2),(5,'Pappo Napolitano','carpo@papposblues.com.ar','$2b$10$wkQWRsMeKmpuJipMUMqxyuImKI8R.d7fVUofByvOKFo3vkTjLi61u','1776945664659_user.jpg',2),(6,'Flea','flea@redhot.com','$2b$10$FDoF.bUhRDZXuEj8HI4ioOSRgjiguPOFLggflJHY/wcdIH4Yn18nW','1776945746255_user.jpeg',2),(7,'Stevie Ray Vaughan','stevie@texasflood.com','$2b$10$ix5KSyp0Ql0KyuONxgVdpu5s81D9V0IVig3nNoS9dWkTjETEjZkdW','1776945840496_user.jpg',2),(8,'Luis Alberto Spinetta','flaco@artaud.com.ar','$2b$10$5RFxLjwEL0LFRq/kLAI8AOctN2fVVDl2SKDtnD8AWemXltjGGnCsO','1776945924272_user.jpg',2),(9,'Jimi Hendrix','jimi@woodstock.com','$2b$10$GT3WujbXFiU0IE/mYNxZy.xbOgmFbZrlF4Y9OPLJq6dbvfEoZINDi','1776946848752_user.jpg',2);
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

-- Dump completed on 2026-04-23 11:41:37
