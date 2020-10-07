/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.6-MariaDB : Database - scenepicks_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`scenepicks_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `scenepicks_db`;

/*Table structure for table `admins` */

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `admins` */

/*Table structure for table `likes_comments` */

DROP TABLE IF EXISTS `likes_comments`;

CREATE TABLE `likes_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `cmt_option` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `likes_comments` */

insert  into `likes_comments`(`id`,`comment_id`,`user_id`,`cmt_option`,`created_at`) values 
(2,1,1,1,'2020-09-25 00:16:15'),
(6,4,4,0,'2020-09-25 01:36:50'),
(8,5,4,0,'2020-09-25 01:38:51'),
(9,28,1,1,'2020-09-25 01:39:22'),
(18,7,4,0,'2020-09-25 08:25:51'),
(35,37,4,1,'2020-09-25 14:07:52'),
(40,28,4,1,'2020-09-25 14:14:26'),
(43,27,4,1,'2020-09-25 14:15:21'),
(48,1,4,1,'2020-09-25 14:17:21'),
(57,31,4,1,'2020-09-25 14:23:05'),
(58,26,4,1,'2020-09-25 14:23:06');

/*Table structure for table `likes_playlists` */

DROP TABLE IF EXISTS `likes_playlists`;

CREATE TABLE `likes_playlists` (
  `user_id` int(10) unsigned NOT NULL,
  `playlist_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`playlist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `likes_playlists` */

insert  into `likes_playlists`(`user_id`,`playlist_id`,`created_at`,`updated_at`) values 
(1,1,'2020-05-10 23:26:30','2020-05-10 23:26:30'),
(1,4,'2020-05-10 23:37:29','2020-05-10 23:37:29'),
(4,3,'2020-08-25 14:11:41','2020-08-25 14:11:41');

/*Table structure for table `likes_tags` */

DROP TABLE IF EXISTS `likes_tags`;

CREATE TABLE `likes_tags` (
  `user_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `likes_tags` */

insert  into `likes_tags`(`user_id`,`tag_id`,`created_at`,`updated_at`) values 
(1,3,NULL,NULL),
(1,6,'2020-05-05 07:19:58','2020-05-05 07:19:58'),
(1,29,NULL,NULL),
(1,30,NULL,NULL),
(2,3,'2020-08-15 01:10:27',NULL),
(2,4,NULL,NULL),
(3,3,NULL,NULL),
(3,6,NULL,NULL),
(3,9,NULL,NULL),
(3,29,NULL,NULL),
(4,1,'2020-08-10 00:24:49','2020-08-10 00:24:49'),
(4,4,NULL,NULL),
(4,29,NULL,NULL);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values 
(1,'2014_10_12_000000_create_users_table',1),
(2,'2014_10_12_100000_create_password_resets_table',1),
(3,'2020_01_19_193049_create_admins_table',1),
(4,'2020_01_20_202154_create_videos_table',1),
(5,'2020_01_27_074807_create_tags_table',1),
(6,'2020_02_11_061335_create_playlists_table',1),
(7,'2020_02_11_061715_create_playlist_tag_table',1),
(8,'2020_02_17_024250_create_likes_table',1),
(9,'2020_03_07_125255_create_searchqueries_table',1),
(11,'2020_03_07_135510_create_topsearchqueries_table',1),
(12,'2020_03_07_141412_create_taglogs_table',1),
(13,'2020_03_07_141427_create_playlistlogs_table',1),
(14,'2020_03_19_192119_rename_likes_to_likes_tag_table',1),
(15,'2020_03_19_201907_create_likes_playlists_table',1),
(16,'2020_03_28_063443_drop_column_url_to_videos',1),
(17,'2020_03_28_064001_change_not_nullable_first_to_videos',1),
(18,'2020_03_28_064640_change_not_nullable_second_to_videos',1),
(19,'2020_04_02_192507_add_preview_to_tags_table',1),
(20,'2020_04_16_203535_add_category_to_playlists_table',1),
(21,'2020_05_03_231401_introduce_socialite_to_users_table',1),
(23,'2020_03_07_125847_create_searchquery_user_table',2),
(24,'2020_09_13_192302_add_privacysetting_to_tags_table',3),
(25,'2020_09_22_191445_create_playlist_comments_table',4),
(27,'2020_09_25_035945_create_tag_comments_table',6),
(28,'2020_09_23_022126_create_likes_comments_table',7);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `playlist_comments` */

DROP TABLE IF EXISTS `playlist_comments`;

CREATE TABLE `playlist_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `playlist_id` int(10) unsigned NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `playlist_comments_playlist_id_foreign` (`playlist_id`),
  CONSTRAINT `playlist_comments_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `playlist_comments` */

insert  into `playlist_comments`(`id`,`playlist_id`,`content`,`user_id`,`parent_id`,`created_at`) values 
(1,5,'test comment1 test comment1 test comment1 test comment1 test comment1 test comment1 test comment1',4,0,'2020-09-24 07:41:48'),
(3,5,'good comment1',3,1,'2020-09-24 18:30:02'),
(4,5,'bad comment1',1,1,'2020-09-24 18:30:07'),
(5,5,'asdfasdfasdfasdfasdfasdf',1,0,'2020-09-24 18:29:49'),
(6,5,'awesome1',2,5,'2020-09-24 18:30:11'),
(7,5,'stressing',4,5,'2020-09-24 18:30:23'),
(10,5,'awesome playlist clip!!!',4,0,'2020-09-24 20:26:45'),
(11,5,'test111',4,0,'2020-09-24 20:27:27'),
(12,5,'sssss',4,0,'2020-09-24 20:28:43'),
(13,5,'cool!!!!!!!!!!!!',4,5,'2020-09-24 22:44:26'),
(14,5,'test cool!!!!!!!!!!!!!',4,5,'2020-09-24 22:47:45'),
(15,5,'adsfasdfasdf111111111111',4,5,'2020-09-24 22:49:41'),
(16,5,'xxxxxxxxxxxxxxx',4,5,'2020-09-24 22:50:30'),
(17,5,'zzzzzzzzzzzzzzzzz',4,5,'2020-09-24 22:50:37'),
(18,5,'this is test reply1',4,12,'2020-09-24 22:51:37'),
(19,5,'cccccccccccc',4,12,'2020-09-24 22:55:22'),
(20,5,'asadsfaaaaaaaa',4,0,'2020-09-24 23:37:29'),
(21,5,'aaaaaaaaaaaa',4,0,'2020-09-24 23:38:23'),
(22,5,'sddddddddddd',4,0,'2020-09-24 23:38:36'),
(23,5,'sddddddddddd',4,0,'2020-09-24 23:38:49'),
(24,5,'sssssss',4,0,'2020-09-24 23:39:05'),
(25,5,'ssssss',4,0,'2020-09-24 23:48:53'),
(26,5,'ssssss',4,0,'2020-09-24 23:50:39'),
(27,5,'xxxxxxxxx',4,0,'2020-09-24 23:52:51'),
(28,5,'cccccccc',4,0,'2020-09-24 23:54:18'),
(29,5,'aaa',4,28,'2020-09-25 01:41:20'),
(30,5,'cccc',4,28,'2020-09-25 01:42:57'),
(31,5,'XXXXXXXXXXXX',4,27,'2020-09-25 14:01:15'),
(32,3,'test comment1',4,0,'2020-09-25 14:03:10'),
(33,3,'dddd',4,0,'2020-09-25 14:04:05'),
(34,3,'xxxxx',4,0,'2020-09-25 14:06:52'),
(35,3,'xxxxxxxxxxxxxxx',4,34,'2020-09-25 14:07:03'),
(37,3,'test comment1',4,0,'2020-09-25 14:07:49'),
(38,3,'good test comment1',4,37,'2020-09-25 14:07:58');

/*Table structure for table `playlist_tag` */

DROP TABLE IF EXISTS `playlist_tag`;

CREATE TABLE `playlist_tag` (
  `playlist_id` int(10) unsigned NOT NULL,
  `tag_id` int(10) unsigned NOT NULL,
  `scene_order` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`playlist_id`,`tag_id`),
  KEY `playlist_tag_tag_id_foreign` (`tag_id`),
  CONSTRAINT `playlist_tag_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  CONSTRAINT `playlist_tag_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `playlist_tag` */

insert  into `playlist_tag`(`playlist_id`,`tag_id`,`scene_order`,`created_at`,`updated_at`) values 
(1,6,NULL,'2020-05-08 10:57:56',NULL),
(1,29,NULL,'2020-05-09 16:14:57',NULL),
(1,30,NULL,'2020-05-09 16:15:50',NULL),
(2,3,NULL,'2020-05-05 12:04:31',NULL),
(3,4,NULL,'2020-05-05 12:57:19',NULL),
(4,23,2,NULL,NULL),
(4,25,1,NULL,NULL),
(5,122,1,NULL,NULL),
(5,123,2,NULL,NULL),
(5,124,3,NULL,NULL);

/*Table structure for table `playlistlogs` */

DROP TABLE IF EXISTS `playlistlogs`;

CREATE TABLE `playlistlogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `playlist_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `playlistlogs_playlist_id_foreign` (`playlist_id`),
  CONSTRAINT `playlistlogs_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `playlistlogs` */

insert  into `playlistlogs`(`id`,`playlist_id`,`created_at`) values 
(1,4,'2020-08-09 15:12:53'),
(2,4,'2020-08-09 15:12:57'),
(3,1,'2020-08-09 22:34:24'),
(4,1,'2020-08-09 22:34:50'),
(5,1,'2020-08-09 22:35:31'),
(6,1,'2020-08-09 22:36:50'),
(7,4,'2020-08-09 22:40:34'),
(8,4,'2020-08-09 22:40:58'),
(9,4,'2020-08-09 22:41:10'),
(10,4,'2020-08-09 22:41:36'),
(11,4,'2020-08-09 22:41:48'),
(12,4,'2020-08-09 22:42:07'),
(13,4,'2020-08-10 11:20:32'),
(14,4,'2020-08-10 18:11:51'),
(15,4,'2020-08-10 18:12:09'),
(16,4,'2020-08-10 18:13:09'),
(17,4,'2020-08-10 18:15:07'),
(18,4,'2020-08-10 18:15:53'),
(19,4,'2020-08-10 18:15:58'),
(20,4,'2020-08-10 18:16:08'),
(21,4,'2020-08-10 18:16:32'),
(22,3,'2020-08-10 18:16:42'),
(23,3,'2020-08-10 18:17:27'),
(24,3,'2020-08-10 18:17:30'),
(25,4,'2020-08-10 18:17:44'),
(26,4,'2020-08-10 18:40:34'),
(27,4,'2020-08-10 20:58:03'),
(28,4,'2020-08-10 21:17:46'),
(29,4,'2020-08-10 21:18:00'),
(30,4,'2020-08-10 21:18:21'),
(31,4,'2020-08-10 21:18:36'),
(32,4,'2020-08-10 21:18:50'),
(33,3,'2020-08-10 21:19:17'),
(34,3,'2020-08-10 21:20:01'),
(35,2,'2020-08-10 21:20:17'),
(36,4,'2020-08-10 21:20:24'),
(37,3,'2020-08-10 21:20:28'),
(38,3,'2020-08-10 21:20:36'),
(39,4,'2020-08-10 21:21:20'),
(40,4,'2020-08-10 21:21:40'),
(41,3,'2020-08-10 21:25:32'),
(42,4,'2020-08-10 21:25:41'),
(43,4,'2020-08-10 21:26:25'),
(44,4,'2020-08-10 21:26:44'),
(45,4,'2020-08-10 21:29:06'),
(46,4,'2020-08-10 21:29:25'),
(47,4,'2020-08-10 21:42:22'),
(48,4,'2020-08-12 22:43:49'),
(49,4,'2020-08-12 22:52:03'),
(50,4,'2020-08-13 03:09:52'),
(51,4,'2020-08-13 03:51:39'),
(52,4,'2020-08-13 03:56:39'),
(53,4,'2020-08-13 04:11:50'),
(54,4,'2020-08-13 21:57:28'),
(55,4,'2020-08-13 22:00:26'),
(56,1,'2020-08-13 23:38:57'),
(57,4,'2020-08-13 23:39:26'),
(58,1,'2020-08-13 23:39:44'),
(59,1,'2020-08-13 23:42:00'),
(60,4,'2020-08-13 23:42:11'),
(61,4,'2020-08-14 00:31:23'),
(62,3,'2020-08-14 03:25:32'),
(63,4,'2020-08-18 14:37:43'),
(64,4,'2020-08-20 21:31:10'),
(65,1,'2020-08-20 21:33:10'),
(66,3,'2020-08-20 21:33:32'),
(67,4,'2020-08-20 21:34:48'),
(68,3,'2020-08-20 21:35:05'),
(69,4,'2020-08-21 23:05:23'),
(70,4,'2020-08-21 23:08:13'),
(71,3,'2020-08-22 05:00:54'),
(72,3,'2020-08-22 05:13:46'),
(73,4,'2020-08-22 05:20:28'),
(74,4,'2020-08-22 05:25:22'),
(75,4,'2020-08-24 09:45:34'),
(76,4,'2020-08-24 10:24:59'),
(77,4,'2020-08-24 10:25:33'),
(78,4,'2020-08-24 11:03:41'),
(79,4,'2020-08-24 12:48:18'),
(80,4,'2020-08-24 12:50:39'),
(81,3,'2020-08-24 12:51:04'),
(82,4,'2020-08-24 14:23:22'),
(83,4,'2020-08-24 14:23:33'),
(84,4,'2020-08-24 14:24:52'),
(85,4,'2020-08-24 14:25:05'),
(86,4,'2020-08-24 14:25:09'),
(87,4,'2020-08-24 14:25:28'),
(88,4,'2020-08-24 14:34:16'),
(89,4,'2020-08-24 14:34:32'),
(90,3,'2020-08-24 14:34:35'),
(91,4,'2020-08-24 14:36:04'),
(92,4,'2020-08-24 14:36:10'),
(93,4,'2020-08-24 14:38:10'),
(94,4,'2020-08-24 14:38:13'),
(95,4,'2020-08-24 14:41:35'),
(96,4,'2020-08-24 14:43:41'),
(97,4,'2020-08-24 14:45:46'),
(98,4,'2020-08-24 19:21:24'),
(99,4,'2020-08-24 19:37:03'),
(100,4,'2020-08-24 20:58:44'),
(101,4,'2020-08-25 07:39:17'),
(102,3,'2020-08-25 07:51:17'),
(103,4,'2020-08-25 09:11:21'),
(104,3,'2020-08-25 09:11:35'),
(105,1,'2020-08-25 09:15:17'),
(106,4,'2020-08-25 09:15:23'),
(107,5,'2020-09-02 09:25:53'),
(108,5,'2020-09-02 09:27:07'),
(109,5,'2020-09-09 07:42:46'),
(110,5,'2020-09-09 07:43:46'),
(111,2,'2020-09-09 07:44:24'),
(112,3,'2020-09-09 07:45:16'),
(113,5,'2020-09-09 07:45:24'),
(114,5,'2020-09-09 07:47:06'),
(115,5,'2020-09-09 08:02:02'),
(116,5,'2020-09-09 08:04:10'),
(117,3,'2020-09-10 02:41:57'),
(118,5,'2020-09-15 23:53:46'),
(119,5,'2020-09-16 12:53:51'),
(120,5,'2020-09-16 21:23:45'),
(121,3,'2020-09-16 21:33:17'),
(122,5,'2020-09-17 08:52:24'),
(123,5,'2020-09-17 09:21:58'),
(124,4,'2020-09-17 21:32:26'),
(125,5,'2020-09-17 21:34:21'),
(126,5,'2020-09-17 21:43:25'),
(127,5,'2020-09-18 03:47:59'),
(128,1,'2020-09-18 08:39:34'),
(129,4,'2020-09-18 08:42:04'),
(130,4,'2020-09-18 09:53:36'),
(131,5,'2020-09-21 03:47:50'),
(132,5,'2020-09-21 07:35:41'),
(133,5,'2020-09-21 08:25:14'),
(134,5,'2020-09-21 08:27:30'),
(135,4,'2020-09-22 03:17:40'),
(136,5,'2020-09-22 03:19:47'),
(137,5,'2020-09-22 03:21:03'),
(138,5,'2020-09-22 03:24:29'),
(139,5,'2020-09-22 03:26:00'),
(140,5,'2020-09-22 03:26:43'),
(141,5,'2020-09-22 03:27:07'),
(142,5,'2020-09-22 03:28:56'),
(143,5,'2020-09-22 03:29:41'),
(144,4,'2020-09-23 03:40:48'),
(145,5,'2020-09-23 04:08:35'),
(146,5,'2020-09-23 11:16:19'),
(147,5,'2020-09-23 21:46:56'),
(148,5,'2020-09-24 02:07:12'),
(149,4,'2020-09-24 20:14:16'),
(150,5,'2020-09-24 20:14:20'),
(151,5,'2020-09-24 20:26:32'),
(152,5,'2020-09-24 23:21:33'),
(153,5,'2020-09-24 23:37:23'),
(154,5,'2020-09-24 23:38:08'),
(155,5,'2020-09-24 23:48:38'),
(156,5,'2020-09-24 23:52:45'),
(157,5,'2020-09-24 23:54:06'),
(158,5,'2020-09-24 23:54:13'),
(159,5,'2020-09-25 00:22:14'),
(160,5,'2020-09-25 00:29:30'),
(161,5,'2020-09-25 00:38:05'),
(162,5,'2020-09-25 00:43:20'),
(163,5,'2020-09-25 00:47:55'),
(164,5,'2020-09-25 01:01:41'),
(165,5,'2020-09-25 01:04:41'),
(166,5,'2020-09-25 01:39:18'),
(167,5,'2020-09-25 01:39:41'),
(168,5,'2020-09-25 01:43:47'),
(169,5,'2020-09-25 01:44:05'),
(170,5,'2020-09-25 02:58:11'),
(171,5,'2020-09-25 02:58:46'),
(172,1,'2020-09-25 03:00:14'),
(173,5,'2020-09-25 03:00:48'),
(174,5,'2020-09-25 08:22:26'),
(175,5,'2020-09-25 08:23:53'),
(176,5,'2020-09-25 14:00:47'),
(177,3,'2020-09-25 14:02:59'),
(178,5,'2020-09-25 14:12:47');

/*Table structure for table `playlists` */

DROP TABLE IF EXISTS `playlists`;

CREATE TABLE `playlists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `playlistName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `privacySetting` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `playlistCategory` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `playlists_playlistname_unique` (`playlistName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `playlists` */

insert  into `playlists`(`id`,`playlistName`,`privacySetting`,`user_id`,`created_at`,`updated_at`,`playlistCategory`) values 
(1,'電話応対の英語フレーズ集','public',1,'2020-05-05 11:33:34','2020-05-05 11:33:34','Howto & Style'),
(2,'コーギーの可愛いシーン集','public',4,'2020-05-05 12:04:31','2020-05-05 12:04:31','Pets & Animals'),
(3,'ジェラードンのベストシーン集','public',4,'2020-05-05 12:57:19','2020-05-05 12:57:19','Comedy'),
(4,'失点シーン集','public',1,'2020-05-08 19:39:09','2020-05-08 19:39:09','People & Blogs'),
(5,'rxjs','public',4,'2020-09-02 12:59:40','2020-09-09 15:18:08','Education');

/*Table structure for table `searchqueries` */

DROP TABLE IF EXISTS `searchqueries`;

CREATE TABLE `searchqueries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `searchQuery` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `searchOption` tinyint(1) DEFAULT 0 COMMENT 'searchquery is 0, ytsearch query is 1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `searchqueries_searchquery_searchoption_unique` (`searchQuery`,`searchOption`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `searchqueries` */

insert  into `searchqueries`(`id`,`searchQuery`,`searchOption`,`created_at`,`updated_at`) values 
(1,'英語',0,'2020-05-07 03:53:21','2020-08-31 05:47:56'),
(2,'コーギー',0,'2020-05-08 06:57:42','2020-08-31 05:17:16'),
(3,'フットサル',0,'2020-05-08 08:05:41','2020-05-08 08:05:41'),
(4,'英語フレーズ集',0,'2020-05-08 19:57:41','2020-08-17 18:36:41'),
(5,'test',1,'2020-08-08 02:17:44','2020-09-15 17:45:55'),
(6,'test1',1,'2020-08-10 22:58:32','2020-09-01 03:05:49'),
(7,'angular component interaction',0,'2020-08-24 12:59:07','2020-08-24 12:59:23'),
(8,'vuex store',0,'2020-08-24 13:45:48','2020-09-01 06:04:31'),
(9,'aaa',0,'2020-09-01 03:33:14','2020-09-01 03:33:14'),
(10,'bbb',0,'2020-09-01 06:09:34','2020-09-01 16:55:24'),
(11,'angular',1,'2020-09-01 06:15:03','2020-09-01 06:41:38'),
(12,'angular 10',1,'2020-09-01 16:48:22','2020-09-01 16:59:35'),
(13,'angular rxjs',1,'2020-09-01 17:02:29','2020-09-01 18:02:44'),
(14,'rxjs',1,'2020-09-09 09:03:11','2020-09-09 11:44:25'),
(15,'vuex sotre',1,'2020-09-09 14:20:31','2020-09-09 14:20:31'),
(18,'vuex state',1,'2020-09-09 14:21:09','2020-09-15 18:07:47'),
(20,'vuex store',1,'2020-09-09 14:33:35','2020-09-18 15:45:10'),
(21,'vue',1,'2020-09-09 14:33:54','2020-09-09 14:33:54'),
(22,'vue store',1,'2020-09-09 14:34:09','2020-09-23 16:16:19'),
(23,'react native',1,'2020-09-10 09:19:13','2020-09-10 09:19:13'),
(24,'futsal',1,'2020-09-15 18:12:40','2020-09-22 08:40:28'),
(25,'angular interaction',1,'2020-09-22 17:52:33','2020-09-24 07:03:56');

/*Table structure for table `searchquery_user` */

DROP TABLE IF EXISTS `searchquery_user`;

CREATE TABLE `searchquery_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `searchquery_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `searchquery_user_user_id_foreign` (`user_id`),
  KEY `searchquery_user_searchquery_id_foreign` (`searchquery_id`),
  CONSTRAINT `searchquery_user_searchquery_id_foreign` FOREIGN KEY (`searchquery_id`) REFERENCES `searchqueries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `searchquery_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `searchquery_user` */

insert  into `searchquery_user`(`id`,`user_id`,`searchquery_id`,`created_at`,`updated_at`) values 
(1,4,23,'2020-09-10 09:19:13','2020-09-10 09:19:13'),
(2,4,24,'2020-09-16 04:53:52','2020-09-16 04:53:52'),
(3,1,20,'2020-09-18 15:45:10','2020-09-18 15:45:10'),
(4,4,24,'2020-09-22 08:40:09','2020-09-22 08:40:09'),
(5,4,24,'2020-09-22 08:40:28','2020-09-22 08:40:28'),
(6,1,25,'2020-09-22 17:52:33','2020-09-22 17:52:33');

/*Table structure for table `tag_comments` */

DROP TABLE IF EXISTS `tag_comments`;

CREATE TABLE `tag_comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_id` int(10) unsigned NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `parent_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tag_comments_tag_id_foreign` (`tag_id`),
  CONSTRAINT `tag_comments_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tag_comments` */

insert  into `tag_comments`(`id`,`tag_id`,`content`,`user_id`,`parent_id`,`created_at`) values 
(1,120,'test comment1',4,0,'2020-09-24 23:20:51'),
(2,120,'good comment1',1,1,'2020-09-24 23:21:05'),
(3,124,'ssssss',4,0,'2020-09-24 23:51:16'),
(4,124,'sssaaaaaa',4,0,'2020-09-24 23:52:33'),
(5,124,'xxxxxxxxxxxxxxxxxx111111111',4,0,'2020-09-24 23:53:13'),
(6,124,'tag comment test1',4,5,'2020-09-24 23:58:01'),
(7,123,'aaa',4,0,'2020-09-25 08:25:28');

/*Table structure for table `taglogs` */

DROP TABLE IF EXISTS `taglogs`;

CREATE TABLE `taglogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `taglogs_tag_id_foreign` (`tag_id`),
  KEY `taglogs_user_id_foreign` (`user_id`),
  CONSTRAINT `taglogs_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  CONSTRAINT `taglogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `taglogs` */

/*Table structure for table `tags` */

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `preview` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `previewgif` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `privacySetting` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `tags` */

insert  into `tags`(`id`,`video_id`,`user_id`,`tags`,`start`,`end`,`created_at`,`updated_at`,`preview`,`previewgif`,`privacySetting`) values 
(1,1,1,'使いたい英語フレーズ 挨拶','00:06:12','00:06:18','2020-05-04 05:19:57','2020-05-08 11:02:08','','poP9vGCzvL8-372-641339278.gif','public'),
(2,2,1,'使いたい英語フレーズ 美容院予約','00:01:50','00:01:58','2020-05-05 11:56:31','2020-05-05 11:56:31','','TjxLX46ung4-110-971595685.gif','public'),
(3,3,1,'コーギー犬ノエさん かわいい','00:01:17','00:01:26','2020-05-05 11:59:18','2020-05-05 11:59:18','','MiY-2uJjcsM-77-570097505.gif','public'),
(4,4,1,'ジェラードン ベストシーン','00:04:12','00:04:41','2020-05-05 12:56:00','2020-05-05 12:56:00','','YtbZuQEA1Ag-252-604086388.gif','public'),
(5,5,1,'使いたい英語フレーズ 物忘れ','00:09:40','00:09:53','2020-05-08 05:07:56','2020-05-08 05:07:56','','X5Mhmot-yxw-580-93306470.gif','public'),
(6,6,1,'使いたい英語フレーズ 電話応対','00:04:52','00:04:59','2020-05-08 10:56:50','2020-05-08 11:00:17','','el20nj6UFh0-292-261621120.gif','public'),
(7,6,1,'電話応対 挨拶','00:00:36','00:00:42','2020-05-08 15:50:32','2020-05-08 15:50:32','','el20nj6UFh0-36-748696589.gif','public'),
(8,6,1,'英語 電話が遠いとき','00:01:03','00:01:06','2020-05-08 15:51:37','2020-05-08 15:51:37','','el20nj6UFh0-63-248664832.gif','public'),
(9,6,1,'使いたい英語 不在時','00:01:41','00:01:47','2020-05-08 15:52:29','2020-05-08 15:52:29','','el20nj6UFh0-101-1841354203.gif','public'),
(19,11,1,'使いたい英語 類語は何','00:02:08','00:02:16','2020-05-08 19:51:18','2020-05-08 19:51:18','','jp0Z1xK3Z3Q-128-567137743.gif','public'),
(21,12,1,'使いたい英語 お土産','00:02:38','00:02:42','2020-05-08 19:53:45','2020-05-08 19:53:45','','pmCfPF2QG70-158-1033392549.gif','public'),
(23,8,1,'失点','00:11:24','00:11:29','2020-05-09 08:34:55','2020-05-09 08:34:55','','m3pyV7xHuS4-684-1050472510.gif','public'),
(25,13,1,'失点 ドリブル','00:04:19','00:04:24','2020-05-09 08:42:11','2020-05-09 08:42:11','','0BW4tvv2ASk-259-945726639.gif',''),
(28,9,1,'失点 コーナーキック','00:03:28','00:03:37','2020-05-09 15:45:14','2020-05-09 15:45:14','','_4_zZlv09uM-208-1225387828.gif',''),
(29,14,1,'電話 名前聞く','00:03:52','00:03:57','2020-05-09 16:12:22','2020-05-09 16:12:22','','nV5fqxwad2U-232-430327849.gif',''),
(30,15,1,'英語 伝言','00:01:37','00:01:44','2020-05-09 16:14:32','2020-05-09 16:15:37','','T3GgEGd4BnU-97-1882928299.gif',''),
(31,16,1,'ノエさん パパ','00:00:00','00:00:02','2020-05-10 07:50:17','2020-05-10 07:50:17','','MNa2u5Ug1EA-0-2022327471.gif',''),
(32,16,1,'テスト１','00:00:01','00:00:03','2020-05-10 07:51:55','2020-05-10 07:51:55','','MNa2u5Ug1EA-1-1912461719.gif',''),
(33,16,1,'テスト２','00:00:08','00:00:09','2020-05-10 07:52:20','2020-05-10 07:52:20','','MNa2u5Ug1EA-8-975250535.gif',''),
(34,16,1,'テスト４','00:00:04','00:00:06','2020-05-10 08:54:31','2020-05-10 08:54:31','','MNa2u5Ug1EA-4-464515461.gif',''),
(35,16,1,'テスト３','00:00:02','00:00:03','2020-05-10 08:54:41','2020-05-10 08:54:41','','MNa2u5Ug1EA-2-1576455260.gif',''),
(36,18,1,'テスト５','00:00:00','00:00:01','2020-05-10 08:58:42','2020-05-10 08:58:42','','qxKo3Y6Gp3w-0-161824855.gif',''),
(37,19,1,'テスト６','00:00:00','00:00:02','2020-05-10 08:59:52','2020-05-10 08:59:52','','CtXhqo1kirE-0-1425859698.gif',''),
(38,19,1,'テスト７','00:00:02','00:00:03','2020-05-10 09:03:46','2020-05-10 09:03:46','','CtXhqo1kirE-2-249933995.gif',''),
(39,21,1,'テスト８','00:00:10','00:00:11','2020-05-10 09:10:34','2020-05-10 09:10:34','','8PnkR0IpKHc-10-1863376929.gif',''),
(40,3,1,'テスト９','00:00:01','00:00:04','2020-05-10 09:20:26','2020-05-10 09:20:26','','MiY-2uJjcsM-1-798531572.gif',''),
(41,3,1,'テスト１０','00:00:04','00:00:05','2020-05-10 09:22:01','2020-05-10 09:22:01','','MiY-2uJjcsM-4-823945079.gif',''),
(42,3,1,'テスト１１','00:00:01','00:00:03','2020-05-10 09:23:32','2020-05-10 09:23:32','','MiY-2uJjcsM-1-788915246.gif',''),
(43,3,1,'テスト１２','00:00:06','00:00:07','2020-05-10 09:25:40','2020-05-10 09:25:40','','MiY-2uJjcsM-6-146465132.gif',''),
(44,3,1,'テスト１３','00:00:08','00:00:09','2020-05-10 09:26:18','2020-05-10 09:26:18','','MiY-2uJjcsM-8-1064916564.gif',''),
(45,3,1,'テスト１４','00:00:09','00:00:10','2020-05-10 09:28:27','2020-05-10 09:28:27','','MiY-2uJjcsM-9-149305395.gif',''),
(46,3,1,'テスト１４','00:00:00','00:00:03','2020-05-10 09:30:49','2020-05-10 09:30:49','','MiY-2uJjcsM-0-1318915503.gif',''),
(47,3,1,'テスト１５','00:00:03','00:00:05','2020-05-10 09:31:08','2020-05-10 09:31:08','','MiY-2uJjcsM-3-939766657.gif',''),
(48,3,1,'テスト１７ん','00:00:04','00:00:05','2020-05-10 09:36:08','2020-05-10 09:36:08','','MiY-2uJjcsM-4-500108691.gif',''),
(49,3,1,'テスト１６','00:00:01','00:00:04','2020-05-10 09:36:15','2020-05-10 09:36:15','','MiY-2uJjcsM-1-1987483564.gif',''),
(50,18,1,'テスト１８','00:00:10','00:00:11','2020-05-10 09:37:17','2020-05-10 09:37:17','','qxKo3Y6Gp3w-10-1836624317.gif',''),
(51,18,1,'テスト１９','00:00:11','00:00:12','2020-05-10 09:37:18','2020-05-10 09:37:18','','qxKo3Y6Gp3w-11-2103312743.gif',''),
(52,3,1,'テスト２０','00:00:01','00:00:02','2020-05-10 14:57:29','2020-05-10 14:57:29','','MiY-2uJjcsM-1-93731799.gif',''),
(53,3,1,'テスト２１','00:00:03','00:00:04','2020-05-10 15:02:39','2020-05-10 15:02:39','','MiY-2uJjcsM-3-281306.gif',''),
(54,3,1,'テスト２２','00:00:02','00:00:09','2020-05-10 15:10:29','2020-05-10 15:10:29','','MiY-2uJjcsM-2-1521180564.gif',''),
(55,3,1,'テスト２３','00:00:09','00:00:10','2020-05-10 15:10:52','2020-05-10 15:10:52','','MiY-2uJjcsM-9-1341392776.gif',''),
(56,3,1,'テスト２４','00:00:01','00:00:02','2020-05-10 15:12:01','2020-05-10 15:12:01','','MiY-2uJjcsM-1-1595774256.gif',''),
(57,3,1,'テスト２５','00:00:01','00:00:03','2020-05-10 15:12:47','2020-05-10 15:12:47','','MiY-2uJjcsM-1-1230966856.gif',''),
(58,3,1,'テスト２６','00:00:03','00:00:04','2020-05-10 15:12:53','2020-05-10 15:12:53','','MiY-2uJjcsM-3-383933752.gif',''),
(59,3,1,'テスト２７','00:00:04','00:00:05','2020-05-10 15:13:01','2020-05-10 15:13:01','','MiY-2uJjcsM-4-623921584.gif',''),
(60,3,1,'テスト２８ 編集テスト ４','00:00:05','00:00:10','2020-05-10 15:13:17','2020-05-10 15:17:48','','MiY-2uJjcsM-5-1167219724.gif',''),
(61,23,1,'テスト２９','00:00:00','00:00:12','2020-05-10 15:34:03','2020-05-10 15:34:03','','SHpFOknZ9dk-0-1612211915.gif',''),
(62,24,1,'テスト３０','00:00:06','00:00:19','2020-05-10 15:35:06','2020-05-10 15:35:06','','etdeH-cUGLs-6-1050451766.gif',''),
(63,25,1,'テスト３１','00:00:08','00:00:14','2020-05-10 15:51:47','2020-05-10 15:51:47','','aC4a7dSFGkw-8-1287603460.gif',''),
(64,25,4,'テスト３２','00:00:14','00:00:16','2020-05-10 15:51:53','2020-05-10 15:51:53','','aC4a7dSFGkw-14-1960938138.gif',''),
(65,26,4,'テスト３３','00:00:01','00:00:13','2020-05-10 15:53:28','2020-05-10 15:53:28','','uUmREHCMRjo-1-572984325.gif',''),
(66,26,4,'テスト３４','00:00:13','00:00:19','2020-05-10 15:53:36','2020-05-10 15:53:36','','uUmREHCMRjo-13-971403603.gif',''),
(120,43,4,'angular rxjs tutorial1','00:00:20','00:00:30','2020-09-09 11:45:23','2020-09-09 11:45:23','https://i.ytimg.com/vi/BGy8DdGw_WE/hqdefault.jpg','BGy8DdGw_WE-20-1605594543.gif','public'),
(121,41,4,'rxjs observables','00:00:30','00:00:40','2020-09-09 12:41:21','2020-09-09 12:41:21','https://i.ytimg.com/vi/T9wOu11uU6U/hqdefault.jpg','','limited'),
(122,40,4,'vuex state store','00:00:35','00:00:45','2020-09-09 14:16:17','2020-09-09 14:16:17','https://i.ytimg.com/vi/5lVQgZzLMHc/hqdefault.jpg','','public'),
(123,42,4,'rxjs observables angular','00:00:45','00:00:55','2020-09-09 14:19:41','2020-09-09 14:19:41','https://i.ytimg.com/vi/Tux1nhBPl_w/hqdefault.jpg','','private'),
(124,45,4,'vuejs state management::vuex state store::vuejs store','00:00:33','00:00:45','2020-09-09 14:21:59','2020-09-09 17:38:24','https://i.ytimg.com/vi/LW9yIR4GoVU/hqdefault.jpg','LW9yIR4GoVU-33-1937220445.mp4','private');

/*Table structure for table `topsearchqueries` */

DROP TABLE IF EXISTS `topsearchqueries`;

CREATE TABLE `topsearchqueries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `searchquery_id` int(10) unsigned NOT NULL,
  `user_id_count` int(10) unsigned NOT NULL,
  `searchOption` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topsearchqueries_searchquery_id_foreign` (`searchquery_id`),
  CONSTRAINT `topsearchqueries_searchquery_id_foreign` FOREIGN KEY (`searchquery_id`) REFERENCES `searchqueries` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=877 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `topsearchqueries` */

insert  into `topsearchqueries`(`id`,`searchquery_id`,`user_id_count`,`searchOption`,`created_at`,`updated_at`) values 
(95,5,1,NULL,'2020-09-01 03:33:15','2020-09-01 03:33:15'),
(96,6,1,NULL,'2020-09-01 03:33:15','2020-09-01 03:33:15'),
(97,7,0,NULL,'2020-09-01 03:33:15','2020-09-01 03:33:15'),
(98,8,1,NULL,'2020-09-01 03:33:15','2020-09-01 03:33:15'),
(99,9,1,NULL,'2020-09-01 03:33:15','2020-09-01 03:33:15'),
(141,7,0,0,'2020-09-01 16:55:25','2020-09-01 16:55:25'),
(142,8,1,0,'2020-09-01 16:55:25','2020-09-01 16:55:25'),
(143,9,1,0,'2020-09-01 16:55:25','2020-09-01 16:55:25'),
(144,10,1,0,'2020-09-01 16:55:25','2020-09-01 16:55:25'),
(865,11,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(866,12,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(867,13,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(868,14,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(869,15,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(870,18,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(871,20,1,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(872,21,0,1,'2020-09-24 07:03:56','2020-09-24 07:03:56'),
(873,22,0,1,'2020-09-24 07:03:57','2020-09-24 07:03:57'),
(874,23,1,1,'2020-09-24 07:03:57','2020-09-24 07:03:57'),
(875,24,1,1,'2020-09-24 07:03:57','2020-09-24 07:03:57'),
(876,25,1,1,'2020-09-24 07:03:57','2020-09-24 07:03:57');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`remember_token`,`created_at`,`updated_at`) values 
(1,'tester1','test@test.com','$2y$10$DnQ6PDUIc90q8nrwUgL4pe43LQOWWN2B/B3QCn.VxOuWBg7Zx1D0u','FKngU6LpgEW1A6whzfnCl5dOwV1GrF6S8gzYbrQv80vofaAHrNgdxQcHDKlF','2020-05-04 04:21:29','2020-05-04 04:21:29'),
(2,'tester2','user@test.com','$2y$10$18ZWgsCYAlms/TRdA1yknOfRg936IXeF1OhERFEwyT3ysx3hoo3Ta',NULL,'2020-05-04 04:21:29','2020-05-04 04:21:29'),
(3,'testuser3','user3@test.com','$2y$10$YUO09Fbb3QpD1VFdp27hh.8PPwPTd5QYeg3ksf5YPB.mmI8HqxHZ6','PNAUq5y43lR1nf4GaYdlagGN39WYxk957Fyn6LhYjK90Tcr0zwDgkc6k5iPy','2020-05-04 05:08:36','2020-05-04 05:08:36'),
(4,'testuser1','testuser1@gmail.com','$2y$10$DnQ6PDUIc90q8nrwUgL4pe43LQOWWN2B/B3QCn.VxOuWBg7Zx1D0u',NULL,'2020-08-09 16:21:43','2020-08-09 16:21:43');

/*Table structure for table `videos` */

DROP TABLE IF EXISTS `videos`;

CREATE TABLE `videos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `youtubeId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view_count` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `videos_youtubeid_unique` (`youtubeId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `videos` */

insert  into `videos`(`id`,`youtubeId`,`user_id`,`title`,`thumbnail`,`duration`,`category`,`channel_title`,`published_at`,`view_count`,`created_at`,`updated_at`) values 
(1,'poP9vGCzvL8',1,'簡単で自然な挨拶への返し方！英語の挨拶 初心者編☆〔#456〕','https://i.ytimg.com/vi/poP9vGCzvL8/hqdefault.jpg','00:08:04','Howto & Style',NULL,NULL,NULL,'2020-05-04 05:19:38','2020-05-04 05:19:38'),
(2,'TjxLX46ung4',1,'NYに到着！早速美容院で予約☆ 〔#574〕【??横断の旅 02】','https://i.ytimg.com/vi/TjxLX46ung4/hqdefault.jpg','00:06:04','People & Blogs',NULL,NULL,NULL,'2020-05-05 11:56:20','2020-05-05 11:56:20'),
(3,'MiY-2uJjcsM',1,'帰宅したパパを取り合うコーギーと４歳児','https://i.ytimg.com/vi/MiY-2uJjcsM/hqdefault.jpg','00:04:18','Pets & Animals',NULL,NULL,NULL,'2020-05-05 11:59:07','2020-05-05 11:59:07'),
(4,'YtbZuQEA1Ag',1,'ジェラードン「人見知り」【公式】','https://i.ytimg.com/vi/YtbZuQEA1Ag/hqdefault.jpg','00:04:43','Comedy',NULL,NULL,NULL,'2020-05-05 12:55:49','2020-05-05 12:55:49'),
(5,'X5Mhmot-yxw',1,'物忘れをした時に使える英語表現5パターン（forget以外）【#335】','https://i.ytimg.com/vi/X5Mhmot-yxw/hqdefault.jpg','00:11:23','Howto & Style',NULL,NULL,NULL,'2020-05-08 05:07:49','2020-05-08 05:07:49'),
(6,'el20nj6UFh0',1,'【これだけでOK】英語での電話対応を完全攻略【ビジネス英語】','https://i.ytimg.com/vi/el20nj6UFh0/hqdefault.jpg','00:10:42','Education',NULL,NULL,NULL,'2020-05-08 10:56:43','2020-05-08 10:56:43'),
(7,'fO6JebRGQfg',1,'ジェラードン「握手会」【フルver】【公式】','https://i.ytimg.com/vi/fO6JebRGQfg/hqdefault.jpg','00:05:02','People & Blogs',NULL,NULL,NULL,'2020-05-08 18:49:56','2020-05-08 18:49:56'),
(8,'m3pyV7xHuS4',1,'Revo公式戦  前半 2019/08/12','https://i.ytimg.com/vi/m3pyV7xHuS4/hqdefault.jpg','00:27:16','People & Blogs',NULL,NULL,NULL,'2020-05-08 19:08:27','2020-05-08 19:08:27'),
(9,'_4_zZlv09uM',1,'Revoフットサル練習試合(vsクラウド後半)','https://i.ytimg.com/vi/_4_zZlv09uM/hqdefault.jpg','00:30:20','People & Blogs',NULL,NULL,NULL,'2020-05-08 19:35:43','2020-05-08 19:35:43'),
(10,'xXHBsDPed9c',1,'vs FC九龍 ２本目 20/2/9','https://i.ytimg.com/vi/xXHBsDPed9c/hqdefault.jpg','00:30:09','People & Blogs',NULL,NULL,NULL,'2020-05-08 19:38:05','2020-05-08 19:38:05'),
(11,'jp0Z1xK3Z3Q',1,'この英語聞き取れるかな？プリズンブレイクで英語を学ぼう【Prison Break】','https://i.ytimg.com/vi/jp0Z1xK3Z3Q/hqdefault.jpg','00:10:04','Education',NULL,NULL,NULL,'2020-05-08 19:51:09','2020-05-08 19:51:09'),
(12,'pmCfPF2QG70',1,'お土産を渡す時に使える英会話！〔#528〕','https://i.ytimg.com/vi/pmCfPF2QG70/hqdefault.jpg','00:06:25','People & Blogs',NULL,NULL,NULL,'2020-05-08 19:52:12','2020-05-08 19:52:12'),
(13,'0BW4tvv2ASk',1,'2016 01 24 02','https://i.ytimg.com/vi/0BW4tvv2ASk/hqdefault.jpg','00:11:21','People & Blogs',NULL,NULL,NULL,'2020-05-09 08:42:04','2020-05-09 08:42:04'),
(14,'nV5fqxwad2U',1,'英語で電話に出るときの対応の仕方（ビジネスシーン）【#342】','https://i.ytimg.com/vi/nV5fqxwad2U/hqdefault.jpg','00:11:22','Education',NULL,NULL,NULL,'2020-05-09 16:12:11','2020-05-09 16:12:11'),
(15,'T3GgEGd4BnU',1,'英語で電話対応 // Answering the phone in English〔# 048〕','https://i.ytimg.com/vi/T3GgEGd4BnU/hqdefault.jpg','00:04:05','Education',NULL,NULL,NULL,'2020-05-09 16:14:21','2020-05-09 16:14:21'),
(16,'MNa2u5Ug1EA',1,'パパへの愛が止まらないコーギーを好きにさせてみたら大変なことになりました…！','https://i.ytimg.com/vi/MNa2u5Ug1EA/hqdefault.jpg','00:06:13','Pets & Animals',NULL,NULL,NULL,'2020-05-10 07:50:06','2020-05-10 07:50:06'),
(18,'qxKo3Y6Gp3w',1,'コーギーとワーママのナイトルーティン（仕事帰りから寝るまで）','https://i.ytimg.com/vi/qxKo3Y6Gp3w/hqdefault.jpg','00:10:45','Pets & Animals',NULL,NULL,NULL,'2020-05-10 08:58:35','2020-05-10 08:58:35'),
(19,'CtXhqo1kirE',1,'【犬と赤ちゃん】何をされても絶対に怒らない優しいコーギー','https://i.ytimg.com/vi/CtXhqo1kirE/hqdefault.jpg','00:02:40','Pets & Animals',NULL,NULL,NULL,'2020-05-10 08:59:46','2020-05-10 08:59:46'),
(21,'8PnkR0IpKHc',1,'【犬と赤ちゃん】いつもそばで見守ってくれる優しいコーギー','https://i.ytimg.com/vi/8PnkR0IpKHc/hqdefault.jpg','00:05:01','Pets & Animals',NULL,NULL,NULL,'2020-05-10 09:09:36','2020-05-10 09:09:36'),
(23,'SHpFOknZ9dk',1,'【異次元】ネイマール vs ドリブルデザイナー岡部  Neymar半端ないって！','https://i.ytimg.com/vi/SHpFOknZ9dk/hqdefault.jpg','00:01:52','Sports',NULL,NULL,NULL,'2020-05-10 15:33:56','2020-05-10 15:33:56'),
(24,'etdeH-cUGLs',1,'サッカー日本代表 原口元気 × ドリブルデザイナー  バイエルン戦3人抜き','https://i.ytimg.com/vi/etdeH-cUGLs/hqdefault.jpg','00:08:30','Sports',NULL,NULL,NULL,'2020-05-10 15:34:59','2020-05-10 15:34:59'),
(25,'aC4a7dSFGkw',1,'サッカー日本代表 乾貴士 × ドリブルデザイナー岡部将和','https://i.ytimg.com/vi/aC4a7dSFGkw/hqdefault.jpg','00:04:57','Sports',NULL,NULL,NULL,'2020-05-10 15:51:38','2020-05-10 15:51:38'),
(26,'uUmREHCMRjo',1,'【高校サッカーNO.1ドリブラー】青森山田高校出身 現いわきFC 左足の魔術師 \'\'バスケス・バイロン\'\'をドリブルデザイン','https://i.ytimg.com/vi/uUmREHCMRjo/hqdefault.jpg','00:25:23','Education',NULL,NULL,NULL,'2020-05-10 15:53:21','2020-05-10 15:53:21'),
(27,'c-81PHUydMQ',1,'panna battle : 森川獅大 vs 岡部将和 PannaHome streetsoccer ドリブルデザイナー スーパー小学生','https://i.ytimg.com/vi/c-81PHUydMQ/hqdefault.jpg','00:04:26','Sports',NULL,NULL,NULL,'2020-05-10 16:00:02','2020-05-10 16:00:02'),
(28,'6IzIiz4IoOs',1,'ドリブル　連続５１人抜き　岡部将和　〜プログレッド FC編〜','https://i.ytimg.com/vi/6IzIiz4IoOs/hqdefault.jpg','00:09:27','Sports',NULL,NULL,NULL,'2020-05-10 19:17:02','2020-05-10 19:17:02'),
(29,'znK652H6yQM',4,'iPhone 6 Plus Bend Test','https://i.ytimg.com/vi/znK652H6yQM/hqdefault.jpg','00:04:31','Science & Technology',NULL,NULL,NULL,'2020-08-11 02:44:12','2020-08-11 02:44:12'),
(30,'ony539T074w',4,'King Gnu - 白日','https://i.ytimg.com/vi/ony539T074w/hqdefault.jpg','00:04:40','Music',NULL,NULL,NULL,'2020-08-11 02:54:50','2020-08-11 02:54:50'),
(40,'5lVQgZzLMHc',4,'Vuex Crash Course | State Management','https://i.ytimg.com/vi/5lVQgZzLMHc/hqdefault.jpg','01:01:19','Science & Technology',NULL,NULL,NULL,'2020-08-26 07:57:00','2020-08-26 07:57:00'),
(41,'T9wOu11uU6U',4,'RxJS - What and Why?','https://i.ytimg.com/vi/T9wOu11uU6U/hqdefault.jpg','00:09:31','Education',NULL,NULL,NULL,'2020-08-28 11:13:25','2020-08-28 11:13:25'),
(42,'Tux1nhBPl_w',4,'OBSERVABLES, OBSERVERS & SUBSCRIPTIONS | RxJS TUTORIAL','https://i.ytimg.com/vi/Tux1nhBPl_w/hqdefault.jpg','00:17:40','Education',NULL,NULL,NULL,'2020-08-28 14:11:22','2020-08-28 14:11:22'),
(43,'BGy8DdGw_WE',4,'Angular Tutorial - 15 - Component Interaction','https://i.ytimg.com/vi/BGy8DdGw_WE/hqdefault.jpg','00:09:33','Education',NULL,NULL,NULL,'2020-08-28 17:10:16','2020-08-28 17:10:16'),
(44,'ugRc5jx80yg',4,'Testing if Sharks Can Smell a Drop of Blood','https://i.ytimg.com/vi/ugRc5jx80yg/hqdefault.jpg','00:15:35','Science & Technology','Mark Rober','2019-07-28T16:17:19Z','66106860','2020-09-01 01:09:13','2020-09-01 01:09:13'),
(45,'LW9yIR4GoVU',4,'Learn Vuex In 10 Minutes (Vue.js State Management)','https://i.ytimg.com/vi/LW9yIR4GoVU/hqdefault.jpg','00:13:28','Education','Program With Erik','2017-12-06T13:00:02Z','117065','2020-09-09 14:21:59','2020-09-09 14:21:59'),
(46,'6ZnfsJ6mM5c',4,'React Native Tutorial for Beginners - Getting Started','https://i.ytimg.com/vi/6ZnfsJ6mM5c/hqdefault.jpg','00:47:51','Education','Academind','2017-12-13T16:00:00Z','699285','2020-09-10 09:20:29','2020-09-10 09:20:29');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
