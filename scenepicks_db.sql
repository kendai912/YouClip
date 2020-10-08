-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:3306
-- 生成日時: 2020 年 8 月 08 日 10:51
-- サーバのバージョン： 5.7.26
-- PHP のバージョン: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `scenepicks_db`
--
CREATE DATABASE IF NOT EXISTS `scenepicks_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `scenepicks_db`;

-- --------------------------------------------------------

--
-- テーブルの構造 `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `likes_playlists`
--

DROP TABLE IF EXISTS `likes_playlists`;
CREATE TABLE `likes_playlists` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `playlist_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `likes_playlists`
--

INSERT INTO `likes_playlists` (`user_id`, `playlist_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-05-11 04:26:30', '2020-05-11 04:26:30'),
(1, 4, '2020-05-11 04:37:29', '2020-05-11 04:37:29');

-- --------------------------------------------------------

--
-- テーブルの構造 `likes_tags`
--

DROP TABLE IF EXISTS `likes_tags`;
CREATE TABLE `likes_tags` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `likes_tags`
--

INSERT INTO `likes_tags` (`user_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-05-05 12:19:58', '2020-05-05 12:19:58');

-- --------------------------------------------------------

--
-- テーブルの構造 `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2020_01_19_193049_create_admins_table', 1),
(4, '2020_01_20_202154_create_videos_table', 1),
(5, '2020_01_27_074807_create_tags_table', 1),
(6, '2020_02_11_061335_create_playlists_table', 1),
(7, '2020_02_11_061715_create_playlist_tag_table', 1),
(8, '2020_02_17_024250_create_likes_table', 1),
(9, '2020_03_07_125255_create_searchqueries_table', 1),
(10, '2020_03_07_125847_create_searchquery_user_table', 1),
(11, '2020_03_07_135510_create_topsearchqueries_table', 1),
(12, '2020_03_07_141412_create_taglogs_table', 1),
(13, '2020_03_07_141427_create_playlistlogs_table', 1),
(14, '2020_03_19_192119_rename_likes_to_likes_tag_table', 1),
(15, '2020_03_19_201907_create_likes_playlists_table', 1),
(16, '2020_03_28_063443_drop_column_url_to_videos', 1),
(17, '2020_03_28_064001_change_not_nullable_first_to_videos', 1),
(18, '2020_03_28_064640_change_not_nullable_second_to_videos', 1),
(19, '2020_04_02_192507_add_preview_to_tags_table', 1),
(20, '2020_04_16_203535_add_category_to_playlists_table', 1),
(21, '2020_05_03_231401_introduce_socialite_to_users_table', 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `playlistlogs`
--

DROP TABLE IF EXISTS `playlistlogs`;
CREATE TABLE `playlistlogs` (
  `id` int(10) UNSIGNED NOT NULL,
  `playlist_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `playlists`
--

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE `playlists` (
  `id` int(10) UNSIGNED NOT NULL,
  `playlistName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `privacySetting` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `playlistCategory` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `playlists`
--

INSERT INTO `playlists` (`id`, `playlistName`, `privacySetting`, `user_id`, `created_at`, `updated_at`, `playlistCategory`) VALUES
(1, '電話応対の英語フレーズ集', '公開', 1, '2020-05-05 16:33:34', '2020-05-05 16:33:34', 'Howto & Style'),
(2, 'コーギーの可愛いシーン集', '公開', 1, '2020-05-05 17:04:31', '2020-05-05 17:04:31', 'Pets & Animals'),
(3, 'ジェラードンのベストシーン集', '公開', 1, '2020-05-05 17:57:19', '2020-05-05 17:57:19', 'Comedy'),
(4, '失点シーン集', '公開', 1, '2020-05-09 00:39:09', '2020-05-09 00:39:09', 'People & Blogs');

-- --------------------------------------------------------

--
-- テーブルの構造 `playlist_tag`
--

DROP TABLE IF EXISTS `playlist_tag`;
CREATE TABLE `playlist_tag` (
  `playlist_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `playlist_tag`
--

INSERT INTO `playlist_tag` (`playlist_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(1, 6, '2020-05-08 15:57:56', NULL),
(1, 29, '2020-05-09 21:14:57', NULL),
(1, 30, '2020-05-09 21:15:50', NULL),
(2, 3, '2020-05-05 17:04:31', NULL),
(3, 4, '2020-05-05 17:57:19', NULL),
(4, 23, '2020-05-09 14:27:10', NULL),
(4, 25, '2020-05-09 13:44:08', NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `searchqueries`
--

DROP TABLE IF EXISTS `searchqueries`;
CREATE TABLE `searchqueries` (
  `id` int(10) UNSIGNED NOT NULL,
  `searchQuery` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `searchqueries`
--

INSERT INTO `searchqueries` (`id`, `searchQuery`, `created_at`, `updated_at`) VALUES
(1, '英語', '2020-05-07 08:53:21', '2020-05-11 09:40:44'),
(2, 'コーギー', '2020-05-08 11:57:42', '2020-08-07 09:51:05'),
(3, 'フットサル', '2020-05-08 13:05:41', '2020-05-08 13:05:41'),
(4, '英語フレーズ集', '2020-05-09 00:57:41', '2020-05-09 00:57:41');

-- --------------------------------------------------------

--
-- テーブルの構造 `searchquery_user`
--

DROP TABLE IF EXISTS `searchquery_user`;
CREATE TABLE `searchquery_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `searchquery_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `searchquery_user`
--

INSERT INTO `searchquery_user` (`id`, `user_id`, `searchquery_id`, `created_at`) VALUES
(1, 1, 1, '2020-05-07 08:53:21'),
(2, 1, 4, '2020-05-09 00:57:41'),
(3, 1, 1, '2020-05-09 00:58:08'),
(4, 1, 1, '2020-05-09 00:58:42'),
(5, 1, 1, '2020-05-09 21:54:33'),
(6, 1, 1, '2020-05-09 21:55:55');

-- --------------------------------------------------------

--
-- テーブルの構造 `taglogs`
--

DROP TABLE IF EXISTS `taglogs`;
CREATE TABLE `taglogs` (
  `id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start` time NOT NULL,
  `end` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `preview` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `tags`
--

INSERT INTO `tags` (`id`, `video_id`, `user_id`, `tags`, `start`, `end`, `created_at`, `updated_at`, `preview`) VALUES
(1, 1, 1, '使いたい英語フレーズ 挨拶', '00:06:12', '00:06:18', '2020-05-04 10:19:57', '2020-05-08 16:02:08', 'poP9vGCzvL8-372-641339278.gif'),
(2, 2, 1, '使いたい英語フレーズ 美容院予約', '00:01:50', '00:01:58', '2020-05-05 16:56:31', '2020-05-05 16:56:31', 'TjxLX46ung4-110-971595685.gif'),
(3, 3, 1, 'コーギー犬ノエさん かわいい', '00:01:17', '00:01:26', '2020-05-05 16:59:18', '2020-05-05 16:59:18', 'MiY-2uJjcsM-77-570097505.gif'),
(4, 4, 1, 'ジェラードン ベストシーン', '00:04:12', '00:04:41', '2020-05-05 17:56:00', '2020-05-05 17:56:00', 'YtbZuQEA1Ag-252-604086388.gif'),
(5, 5, 1, '使いたい英語フレーズ 物忘れ', '00:09:40', '00:09:53', '2020-05-08 10:07:56', '2020-05-08 10:07:56', 'X5Mhmot-yxw-580-93306470.gif'),
(6, 6, 1, '使いたい英語フレーズ 電話応対', '00:04:52', '00:04:59', '2020-05-08 15:56:50', '2020-05-08 16:00:17', 'el20nj6UFh0-292-261621120.gif'),
(7, 6, 1, '電話応対 挨拶', '00:00:36', '00:00:42', '2020-05-08 20:50:32', '2020-05-08 20:50:32', 'el20nj6UFh0-36-748696589.gif'),
(8, 6, 1, '英語 電話が遠いとき', '00:01:03', '00:01:06', '2020-05-08 20:51:37', '2020-05-08 20:51:37', 'el20nj6UFh0-63-248664832.gif'),
(9, 6, 1, '使いたい英語 不在時', '00:01:41', '00:01:47', '2020-05-08 20:52:29', '2020-05-08 20:52:29', 'el20nj6UFh0-101-1841354203.gif'),
(19, 11, 1, '使いたい英語 類語は何', '00:02:08', '00:02:16', '2020-05-09 00:51:18', '2020-05-09 00:51:18', 'jp0Z1xK3Z3Q-128-567137743.gif'),
(21, 12, 1, '使いたい英語 お土産', '00:02:38', '00:02:42', '2020-05-09 00:53:45', '2020-05-09 00:53:45', 'pmCfPF2QG70-158-1033392549.gif'),
(23, 8, 1, '失点', '00:11:24', '00:11:29', '2020-05-09 13:34:55', '2020-05-09 13:34:55', 'm3pyV7xHuS4-684-1050472510.gif'),
(25, 13, 1, '失点 ドリブル', '00:04:19', '00:04:24', '2020-05-09 13:42:11', '2020-05-09 13:42:11', '0BW4tvv2ASk-259-945726639.gif'),
(28, 9, 1, '失点 コーナーキック', '00:03:28', '00:03:37', '2020-05-09 20:45:14', '2020-05-09 20:45:14', '_4_zZlv09uM-208-1225387828.gif'),
(29, 14, 1, '電話 名前聞く', '00:03:52', '00:03:57', '2020-05-09 21:12:22', '2020-05-09 21:12:22', 'nV5fqxwad2U-232-430327849.gif'),
(30, 15, 1, '英語 伝言', '00:01:37', '00:01:44', '2020-05-09 21:14:32', '2020-05-09 21:15:37', 'T3GgEGd4BnU-97-1882928299.gif'),
(31, 16, 1, 'ノエさん パパ', '00:00:00', '00:00:02', '2020-05-10 12:50:17', '2020-05-10 12:50:17', 'MNa2u5Ug1EA-0-2022327471.gif'),
(32, 16, 1, 'テスト１', '00:00:01', '00:00:03', '2020-05-10 12:51:55', '2020-05-10 12:51:55', 'MNa2u5Ug1EA-1-1912461719.gif'),
(33, 16, 1, 'テスト２', '00:00:08', '00:00:09', '2020-05-10 12:52:20', '2020-05-10 12:52:20', 'MNa2u5Ug1EA-8-975250535.gif'),
(34, 16, 1, 'テスト４', '00:00:04', '00:00:06', '2020-05-10 13:54:31', '2020-05-10 13:54:31', 'MNa2u5Ug1EA-4-464515461.gif'),
(35, 16, 1, 'テスト３', '00:00:02', '00:00:03', '2020-05-10 13:54:41', '2020-05-10 13:54:41', 'MNa2u5Ug1EA-2-1576455260.gif'),
(36, 18, 1, 'テスト５', '00:00:00', '00:00:01', '2020-05-10 13:58:42', '2020-05-10 13:58:42', 'qxKo3Y6Gp3w-0-161824855.gif'),
(37, 19, 1, 'テスト６', '00:00:00', '00:00:02', '2020-05-10 13:59:52', '2020-05-10 13:59:52', 'CtXhqo1kirE-0-1425859698.gif'),
(38, 19, 1, 'テスト７', '00:00:02', '00:00:03', '2020-05-10 14:03:46', '2020-05-10 14:03:46', 'CtXhqo1kirE-2-249933995.gif'),
(39, 21, 1, 'テスト８', '00:00:10', '00:00:11', '2020-05-10 14:10:34', '2020-05-10 14:10:34', '8PnkR0IpKHc-10-1863376929.gif'),
(40, 3, 1, 'テスト９', '00:00:01', '00:00:04', '2020-05-10 14:20:26', '2020-05-10 14:20:26', 'MiY-2uJjcsM-1-798531572.gif'),
(41, 3, 1, 'テスト１０', '00:00:04', '00:00:05', '2020-05-10 14:22:01', '2020-05-10 14:22:01', 'MiY-2uJjcsM-4-823945079.gif'),
(42, 3, 1, 'テスト１１', '00:00:01', '00:00:03', '2020-05-10 14:23:32', '2020-05-10 14:23:32', 'MiY-2uJjcsM-1-788915246.gif'),
(43, 3, 1, 'テスト１２', '00:00:06', '00:00:07', '2020-05-10 14:25:40', '2020-05-10 14:25:40', 'MiY-2uJjcsM-6-146465132.gif'),
(44, 3, 1, 'テスト１３', '00:00:08', '00:00:09', '2020-05-10 14:26:18', '2020-05-10 14:26:18', 'MiY-2uJjcsM-8-1064916564.gif'),
(45, 3, 1, 'テスト１４', '00:00:09', '00:00:10', '2020-05-10 14:28:27', '2020-05-10 14:28:27', 'MiY-2uJjcsM-9-149305395.gif'),
(46, 3, 1, 'テスト１４', '00:00:00', '00:00:03', '2020-05-10 14:30:49', '2020-05-10 14:30:49', 'MiY-2uJjcsM-0-1318915503.gif'),
(47, 3, 1, 'テスト１５', '00:00:03', '00:00:05', '2020-05-10 14:31:08', '2020-05-10 14:31:08', 'MiY-2uJjcsM-3-939766657.gif'),
(48, 3, 1, 'テスト１７ん', '00:00:04', '00:00:05', '2020-05-10 14:36:08', '2020-05-10 14:36:08', 'MiY-2uJjcsM-4-500108691.gif'),
(49, 3, 1, 'テスト１６', '00:00:01', '00:00:04', '2020-05-10 14:36:15', '2020-05-10 14:36:15', 'MiY-2uJjcsM-1-1987483564.gif'),
(50, 18, 1, 'テスト１８', '00:00:10', '00:00:11', '2020-05-10 14:37:17', '2020-05-10 14:37:17', 'qxKo3Y6Gp3w-10-1836624317.gif'),
(51, 18, 1, 'テスト１９', '00:00:11', '00:00:12', '2020-05-10 14:37:18', '2020-05-10 14:37:18', 'qxKo3Y6Gp3w-11-2103312743.gif'),
(52, 3, 1, 'テスト２０', '00:00:01', '00:00:02', '2020-05-10 19:57:29', '2020-05-10 19:57:29', 'MiY-2uJjcsM-1-93731799.gif'),
(53, 3, 1, 'テスト２１', '00:00:03', '00:00:04', '2020-05-10 20:02:39', '2020-05-10 20:02:39', 'MiY-2uJjcsM-3-281306.gif'),
(54, 3, 1, 'テスト２２', '00:00:02', '00:00:09', '2020-05-10 20:10:29', '2020-05-10 20:10:29', 'MiY-2uJjcsM-2-1521180564.gif'),
(55, 3, 1, 'テスト２３', '00:00:09', '00:00:10', '2020-05-10 20:10:52', '2020-05-10 20:10:52', 'MiY-2uJjcsM-9-1341392776.gif'),
(56, 3, 1, 'テスト２４', '00:00:01', '00:00:02', '2020-05-10 20:12:01', '2020-05-10 20:12:01', 'MiY-2uJjcsM-1-1595774256.gif'),
(57, 3, 1, 'テスト２５', '00:00:01', '00:00:03', '2020-05-10 20:12:47', '2020-05-10 20:12:47', 'MiY-2uJjcsM-1-1230966856.gif'),
(58, 3, 1, 'テスト２６', '00:00:03', '00:00:04', '2020-05-10 20:12:53', '2020-05-10 20:12:53', 'MiY-2uJjcsM-3-383933752.gif'),
(59, 3, 1, 'テスト２７', '00:00:04', '00:00:05', '2020-05-10 20:13:01', '2020-05-10 20:13:01', 'MiY-2uJjcsM-4-623921584.gif'),
(60, 3, 1, 'テスト２８ 編集テスト ４', '00:00:05', '00:00:10', '2020-05-10 20:13:17', '2020-05-10 20:17:48', 'MiY-2uJjcsM-5-1167219724.gif'),
(61, 23, 1, 'テスト２９', '00:00:00', '00:00:12', '2020-05-10 20:34:03', '2020-05-10 20:34:03', 'SHpFOknZ9dk-0-1612211915.gif'),
(62, 24, 1, 'テスト３０', '00:00:06', '00:00:19', '2020-05-10 20:35:06', '2020-05-10 20:35:06', 'etdeH-cUGLs-6-1050451766.gif'),
(63, 25, 1, 'テスト３１', '00:00:08', '00:00:14', '2020-05-10 20:51:47', '2020-05-10 20:51:47', 'aC4a7dSFGkw-8-1287603460.gif'),
(64, 25, 1, 'テスト３２', '00:00:14', '00:00:16', '2020-05-10 20:51:53', '2020-05-10 20:51:53', 'aC4a7dSFGkw-14-1960938138.gif'),
(65, 26, 1, 'テスト３３', '00:00:01', '00:00:13', '2020-05-10 20:53:28', '2020-05-10 20:53:28', 'uUmREHCMRjo-1-572984325.gif'),
(66, 26, 1, 'テスト３４', '00:00:13', '00:00:19', '2020-05-10 20:53:36', '2020-05-10 20:53:36', 'uUmREHCMRjo-13-971403603.gif'),
(67, 27, 1, 'テスト３５', '00:00:00', '00:00:11', '2020-05-10 21:00:10', '2020-05-10 21:00:10', 'c-81PHUydMQ-0-1185849382.gif'),
(68, 27, 1, 'テスト３６', '00:00:11', '00:00:13', '2020-05-10 21:00:17', '2020-05-10 21:00:17', 'c-81PHUydMQ-11-1873694553.gif');

-- --------------------------------------------------------

--
-- テーブルの構造 `topsearchqueries`
--

DROP TABLE IF EXISTS `topsearchqueries`;
CREATE TABLE `topsearchqueries` (
  `id` int(10) UNSIGNED NOT NULL,
  `searchquery_id` int(10) UNSIGNED NOT NULL,
  `user_id_count` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`, `provider`, `provider_id`) VALUES
(1, 'tester1', 'test@test.com', '$2y$10$18ZWgsCYAlms/TRdA1yknOfRg936IXeF1OhERFEwyT3ysx3hoo3Ta', 'HZnpNNqxn8dnfWLgDKH5kpnJ0tXWQkmNUkbcNupOEdxe5jhqeYeWZRQryJF2', '2020-05-04 09:21:29', '2020-05-04 09:21:29', 'test provider', 'test provider ID'),
(2, 'tester2', 'user@test.com', '$2y$10$18ZWgsCYAlms/TRdA1yknOfRg936IXeF1OhERFEwyT3ysx3hoo3Ta', NULL, '2020-05-04 09:21:29', '2020-05-04 09:21:29', 'test provider', 'test provider ID'),
(3, 'testuser3', 'user3@test.com', '$2y$10$YUO09Fbb3QpD1VFdp27hh.8PPwPTd5QYeg3ksf5YPB.mmI8HqxHZ6', 'PNAUq5y43lR1nf4GaYdlagGN39WYxk957Fyn6LhYjK90Tcr0zwDgkc6k5iPy', '2020-05-04 10:08:36', '2020-05-04 10:08:36', 'email', 'na');

-- --------------------------------------------------------

--
-- テーブルの構造 `videos`
--

DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `youtubeId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- テーブルのデータのダンプ `videos`
--

INSERT INTO `videos` (`id`, `youtubeId`, `user_id`, `title`, `thumbnail`, `duration`, `category`, `created_at`, `updated_at`) VALUES
(1, 'poP9vGCzvL8', 1, '簡単で自然な挨拶への返し方！英語の挨拶 初心者編☆〔#456〕', 'https://i.ytimg.com/vi/poP9vGCzvL8/hqdefault.jpg', '00:08:04', 'Howto & Style', '2020-05-04 10:19:38', '2020-05-04 10:19:38'),
(2, 'TjxLX46ung4', 1, 'NYに到着！早速美容院で予約☆ 〔#574〕【🇺🇸横断の旅 02】', 'https://i.ytimg.com/vi/TjxLX46ung4/hqdefault.jpg', '00:06:04', 'People & Blogs', '2020-05-05 16:56:20', '2020-05-05 16:56:20'),
(3, 'MiY-2uJjcsM', 1, '帰宅したパパを取り合うコーギーと４歳児', 'https://i.ytimg.com/vi/MiY-2uJjcsM/hqdefault.jpg', '00:04:18', 'Pets & Animals', '2020-05-05 16:59:07', '2020-05-05 16:59:07'),
(4, 'YtbZuQEA1Ag', 1, 'ジェラードン「人見知り」【公式】', 'https://i.ytimg.com/vi/YtbZuQEA1Ag/hqdefault.jpg', '00:04:43', 'Comedy', '2020-05-05 17:55:49', '2020-05-05 17:55:49'),
(5, 'X5Mhmot-yxw', 1, '物忘れをした時に使える英語表現5パターン（forget以外）【#335】', 'https://i.ytimg.com/vi/X5Mhmot-yxw/hqdefault.jpg', '00:11:23', 'Howto & Style', '2020-05-08 10:07:49', '2020-05-08 10:07:49'),
(6, 'el20nj6UFh0', 1, '【これだけでOK】英語での電話対応を完全攻略【ビジネス英語】', 'https://i.ytimg.com/vi/el20nj6UFh0/hqdefault.jpg', '00:10:42', 'Education', '2020-05-08 15:56:43', '2020-05-08 15:56:43'),
(7, 'fO6JebRGQfg', 1, 'ジェラードン「握手会」【フルver】【公式】', 'https://i.ytimg.com/vi/fO6JebRGQfg/hqdefault.jpg', '00:05:02', 'People & Blogs', '2020-05-08 23:49:56', '2020-05-08 23:49:56'),
(8, 'm3pyV7xHuS4', 1, 'Revo公式戦  前半 2019/08/12', 'https://i.ytimg.com/vi/m3pyV7xHuS4/hqdefault.jpg', '00:27:16', 'People & Blogs', '2020-05-09 00:08:27', '2020-05-09 00:08:27'),
(9, '_4_zZlv09uM', 1, 'Revoフットサル練習試合(vsクラウド後半)', 'https://i.ytimg.com/vi/_4_zZlv09uM/hqdefault.jpg', '00:30:20', 'People & Blogs', '2020-05-09 00:35:43', '2020-05-09 00:35:43'),
(10, 'xXHBsDPed9c', 1, 'vs FC九龍 ２本目 20/2/9', 'https://i.ytimg.com/vi/xXHBsDPed9c/hqdefault.jpg', '00:30:09', 'People & Blogs', '2020-05-09 00:38:05', '2020-05-09 00:38:05'),
(11, 'jp0Z1xK3Z3Q', 1, 'この英語聞き取れるかな？プリズンブレイクで英語を学ぼう【Prison Break】', 'https://i.ytimg.com/vi/jp0Z1xK3Z3Q/hqdefault.jpg', '00:10:04', 'Education', '2020-05-09 00:51:09', '2020-05-09 00:51:09'),
(12, 'pmCfPF2QG70', 1, 'お土産を渡す時に使える英会話！〔#528〕', 'https://i.ytimg.com/vi/pmCfPF2QG70/hqdefault.jpg', '00:06:25', 'People & Blogs', '2020-05-09 00:52:12', '2020-05-09 00:52:12'),
(13, '0BW4tvv2ASk', 1, '2016 01 24 02', 'https://i.ytimg.com/vi/0BW4tvv2ASk/hqdefault.jpg', '00:11:21', 'People & Blogs', '2020-05-09 13:42:04', '2020-05-09 13:42:04'),
(14, 'nV5fqxwad2U', 1, '英語で電話に出るときの対応の仕方（ビジネスシーン）【#342】', 'https://i.ytimg.com/vi/nV5fqxwad2U/hqdefault.jpg', '00:11:22', 'Education', '2020-05-09 21:12:11', '2020-05-09 21:12:11'),
(15, 'T3GgEGd4BnU', 1, '英語で電話対応 // Answering the phone in English〔# 048〕', 'https://i.ytimg.com/vi/T3GgEGd4BnU/hqdefault.jpg', '00:04:05', 'Education', '2020-05-09 21:14:21', '2020-05-09 21:14:21'),
(16, 'MNa2u5Ug1EA', 1, 'パパへの愛が止まらないコーギーを好きにさせてみたら大変なことになりました…！', 'https://i.ytimg.com/vi/MNa2u5Ug1EA/hqdefault.jpg', '00:06:13', 'Pets & Animals', '2020-05-10 12:50:06', '2020-05-10 12:50:06'),
(18, 'qxKo3Y6Gp3w', 1, 'コーギーとワーママのナイトルーティン（仕事帰りから寝るまで）', 'https://i.ytimg.com/vi/qxKo3Y6Gp3w/hqdefault.jpg', '00:10:45', 'Pets & Animals', '2020-05-10 13:58:35', '2020-05-10 13:58:35'),
(19, 'CtXhqo1kirE', 1, '【犬と赤ちゃん】何をされても絶対に怒らない優しいコーギー', 'https://i.ytimg.com/vi/CtXhqo1kirE/hqdefault.jpg', '00:02:40', 'Pets & Animals', '2020-05-10 13:59:46', '2020-05-10 13:59:46'),
(21, '8PnkR0IpKHc', 1, '【犬と赤ちゃん】いつもそばで見守ってくれる優しいコーギー', 'https://i.ytimg.com/vi/8PnkR0IpKHc/hqdefault.jpg', '00:05:01', 'Pets & Animals', '2020-05-10 14:09:36', '2020-05-10 14:09:36'),
(23, 'SHpFOknZ9dk', 1, '【異次元】ネイマール vs ドリブルデザイナー岡部  Neymar半端ないって！', 'https://i.ytimg.com/vi/SHpFOknZ9dk/hqdefault.jpg', '00:01:52', 'Sports', '2020-05-10 20:33:56', '2020-05-10 20:33:56'),
(24, 'etdeH-cUGLs', 1, 'サッカー日本代表 原口元気 × ドリブルデザイナー  バイエルン戦3人抜き', 'https://i.ytimg.com/vi/etdeH-cUGLs/hqdefault.jpg', '00:08:30', 'Sports', '2020-05-10 20:34:59', '2020-05-10 20:34:59'),
(25, 'aC4a7dSFGkw', 1, 'サッカー日本代表 乾貴士 × ドリブルデザイナー岡部将和', 'https://i.ytimg.com/vi/aC4a7dSFGkw/hqdefault.jpg', '00:04:57', 'Sports', '2020-05-10 20:51:38', '2020-05-10 20:51:38'),
(26, 'uUmREHCMRjo', 1, '【高校サッカーNO.1ドリブラー】青森山田高校出身 現いわきFC 左足の魔術師 \'\'バスケス・バイロン\'\'をドリブルデザイン', 'https://i.ytimg.com/vi/uUmREHCMRjo/hqdefault.jpg', '00:25:23', 'Education', '2020-05-10 20:53:21', '2020-05-10 20:53:21'),
(27, 'c-81PHUydMQ', 1, 'panna battle : 森川獅大 vs 岡部将和 PannaHome streetsoccer ドリブルデザイナー スーパー小学生', 'https://i.ytimg.com/vi/c-81PHUydMQ/hqdefault.jpg', '00:04:26', 'Sports', '2020-05-10 21:00:02', '2020-05-10 21:00:02'),
(28, '6IzIiz4IoOs', 1, 'ドリブル　連続５１人抜き　岡部将和　〜プログレッド FC編〜', 'https://i.ytimg.com/vi/6IzIiz4IoOs/hqdefault.jpg', '00:09:27', 'Sports', '2020-05-11 00:17:02', '2020-05-11 00:17:02');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- テーブルのインデックス `likes_playlists`
--
ALTER TABLE `likes_playlists`
  ADD PRIMARY KEY (`user_id`,`playlist_id`);

--
-- テーブルのインデックス `likes_tags`
--
ALTER TABLE `likes_tags`
  ADD PRIMARY KEY (`user_id`,`tag_id`);

--
-- テーブルのインデックス `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- テーブルのインデックス `playlistlogs`
--
ALTER TABLE `playlistlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlistlogs_playlist_id_foreign` (`playlist_id`),
  ADD KEY `playlistlogs_user_id_foreign` (`user_id`);

--
-- テーブルのインデックス `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `playlists_playlistname_unique` (`playlistName`);

--
-- テーブルのインデックス `playlist_tag`
--
ALTER TABLE `playlist_tag`
  ADD PRIMARY KEY (`playlist_id`,`tag_id`),
  ADD KEY `playlist_tag_tag_id_foreign` (`tag_id`);

--
-- テーブルのインデックス `searchqueries`
--
ALTER TABLE `searchqueries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `searchqueries_searchquery_unique` (`searchQuery`);

--
-- テーブルのインデックス `searchquery_user`
--
ALTER TABLE `searchquery_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `searchquery_user_user_id_foreign` (`user_id`),
  ADD KEY `searchquery_user_searchquery_id_foreign` (`searchquery_id`);

--
-- テーブルのインデックス `taglogs`
--
ALTER TABLE `taglogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taglogs_tag_id_foreign` (`tag_id`),
  ADD KEY `taglogs_user_id_foreign` (`user_id`);

--
-- テーブルのインデックス `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `topsearchqueries`
--
ALTER TABLE `topsearchqueries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topsearchqueries_searchquery_id_foreign` (`searchquery_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- テーブルのインデックス `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `videos_youtubeid_unique` (`youtubeId`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- テーブルのAUTO_INCREMENT `playlistlogs`
--
ALTER TABLE `playlistlogs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルのAUTO_INCREMENT `searchqueries`
--
ALTER TABLE `searchqueries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルのAUTO_INCREMENT `searchquery_user`
--
ALTER TABLE `searchquery_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- テーブルのAUTO_INCREMENT `taglogs`
--
ALTER TABLE `taglogs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- テーブルのAUTO_INCREMENT `topsearchqueries`
--
ALTER TABLE `topsearchqueries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- テーブルのAUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルのAUTO_INCREMENT `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `playlistlogs`
--
ALTER TABLE `playlistlogs`
  ADD CONSTRAINT `playlistlogs_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlistlogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `playlist_tag`
--
ALTER TABLE `playlist_tag`
  ADD CONSTRAINT `playlist_tag_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlist_tag_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `searchquery_user`
--
ALTER TABLE `searchquery_user`
  ADD CONSTRAINT `searchquery_user_searchquery_id_foreign` FOREIGN KEY (`searchquery_id`) REFERENCES `searchqueries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `searchquery_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `taglogs`
--
ALTER TABLE `taglogs`
  ADD CONSTRAINT `taglogs_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `taglogs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- テーブルの制約 `topsearchqueries`
--
ALTER TABLE `topsearchqueries`
  ADD CONSTRAINT `topsearchqueries_searchquery_id_foreign` FOREIGN KEY (`searchquery_id`) REFERENCES `searchqueries` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
