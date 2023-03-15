-- phpMyAdmin SQL Dump
-- version 4.9.10
-- https://www.phpmyadmin.net/
--
-- Host: db5012226121.hosting-data.io
-- Generation Time: Mar 15, 2023 at 12:53 PM
-- Server version: 8.0.26
-- PHP Version: 7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbs10287705`
--

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int UNSIGNED NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `disable` tinyint(1) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `title`, `content`, `disable`, `date`) VALUES
(503, '', '', 0, '2023-03-15 03:20:33'),
(504, '', '', 0, '2023-03-15 04:14:15'),
(505, '', '', 0, '2023-03-15 04:14:23'),
(506, '', '', 0, '2023-03-15 06:03:22'),
(507, '', '', 0, '2023-03-15 06:04:11'),
(508, '', '', 0, '2023-03-15 06:06:50'),
(509, '', '', 0, '2023-03-15 06:07:08'),
(510, '', '', 0, '2023-03-15 06:07:12'),
(511, '', '', 0, '2023-03-15 06:07:26'),
(512, '', '', 0, '2023-03-15 06:10:23'),
(513, '', '', 0, '2023-03-15 06:10:41'),
(514, '', '', 0, '2023-03-15 06:10:54'),
(515, '', '', 0, '2023-03-15 06:11:05'),
(516, '', '', 0, '2023-03-15 06:11:53'),
(517, '', '', 0, '2023-03-15 06:12:58'),
(518, '', '', 0, '2023-03-15 06:13:45'),
(519, '', '', 0, '2023-03-15 06:17:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=520;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
