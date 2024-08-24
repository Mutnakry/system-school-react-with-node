-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2024 at 04:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `id` int(11) NOT NULL,
  `names` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `table` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classroom`
--

INSERT INTO `classroom` (`id`, `names`, `teacher_id`, `table`, `status`, `create_at`) VALUES
(3, 'Publice', 4, 20, 0, '2024-08-19 05:15:48'),
(5, 'Gamming', 12, 2, 1, '2024-08-19 03:01:23'),
(6, '12-F1', 1, 20, 0, '2024-08-19 04:20:07'),
(8, '11 A', 2, 5, 1, '2024-08-19 04:20:51'),
(11, 'បង្រៀនញ៉ែ', 1, 1, 1, '2024-08-19 05:14:01'),
(12, 'Free Fire ', 1, 5, 1, '2024-08-20 05:48:22');

-- --------------------------------------------------------

--
-- Table structure for table `mother`
--

CREATE TABLE `mother` (
  `id` int(11) NOT NULL,
  `kh_name` varchar(100) NOT NULL,
  `en_name` varchar(100) NOT NULL,
  `age` int(11) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(255) NOT NULL DEFAULT 'Male',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mother`
--

INSERT INTO `mother` (`id`, `kh_name`, `en_name`, `age`, `address`, `phone`, `email`, `gender`, `create_at`) VALUES
(13, 'f', 'f', 23, 'd', '2', '33@mnae', '', '2024-08-22 08:25:41'),
(27, 'ma', 'ka', 5, 'ee', '5', '33@mnae', '', '2024-08-22 09:00:01'),
(28, 'ma', 'ka', 5, 'ee', '5', '33@mnae', 'Female', '2024-08-22 09:00:58'),
(29, 'ma', 'ka', 5, 'ee', '5', '33@mnae', 'Male', '2024-08-22 09:01:12'),
(32, 'as', 'as', 12, 'dc', '0987654323', '33@mnae', '', '2024-08-22 15:21:19'),
(34, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:27:43'),
(35, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:27:47'),
(36, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:27:58'),
(37, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:28:39'),
(38, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:29:36'),
(39, 'wefrw', 'rr', 65, '23', '453', '33@mnae', '', '2024-08-22 15:31:48'),
(40, 'awrfawe', 'WEF', 22, '22', '2', 'na@gmail.com', 'Female', '2024-08-24 07:23:15'),
(41, 'wea', 'we', 23, 'ee', '0987654323', '33@mnae', 'Female', '2024-08-24 07:26:50'),
(45, '1', '1', 1, '1', '1', '33@mnae', 'Female', '2024-08-24 07:45:58'),
(46, 'na', 'na', 3, 'e', '0987654323', '33@mnae', '', '2024-08-24 07:48:41');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `fkh_names` varchar(100) NOT NULL,
  `lkh_name` varchar(100) NOT NULL,
  `fen_name` varchar(100) NOT NULL,
  `len_name` varchar(100) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `age` int(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `clsss_id` int(11) NOT NULL,
  `mother_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `fkh_names`, `lkh_name`, `fen_name`, `len_name`, `gender`, `dob`, `age`, `phone`, `address`, `email`, `clsss_id`, `mother_id`, `image`) VALUES
(14, 's1', 's1', 's1', 's1', 'Male', '2024-08-08', 551, '51', 'w111', 'nak@gmail.com1', 3, 13, '1724386395754_Sup.png'),
(26, 'ណាគ្រី', 'មុត', 'nakry', 'mut', '', '2024-08-13', 23, '22', 'dd', '33@mnae', 6, 27, '1724317201569_mobile.jpg'),
(27, 'nakry', 'mut', 'nakry', 'mut', 'Female', '2024-08-13', 23, '22', 'dd', '33@mnae', 6, 28, '1724386317091_Supreme Duelist.jpg'),
(28, 'សៀវ', 'កញ្ញា', 'SEAV', 'KANHA', 'Male', '2003-03-13', 20, '04556564', 'PP', 'kanh@gmail.com', 5, 29, '1724386281248_Hay Day.jpg'),
(29, 'gf', 'fg', 'e1', 'e1', 'Male', '2024-07-29', 23, '0987654323', 'dd', '33@mnae', 12, 32, '1724387526681_Hay Day.jpg'),
(31, 'd', 'fghh', 'sds', 'dds', 'Female', '2024-08-19', 5, '0987654323', 'sd', '33@mnae', 8, 34, '1724386338186_unnamed.png'),
(32, 'd', 'fghh', 'sds', 'dds', 'Male', '2024-08-19', 5, '0987654323', 'sd', '33@mnae', 8, 35, '1724386346747_Ball Pool.jpg'),
(34, 'd1', 'fghh1', 'sds1', 'dds1', 'Female', '2024-08-23', 51, '09876543231', '111', '33@mnae1', 5, 37, '1724386357188_Candy Crush Saga1.jpg'),
(35, 'd', 'fghh', 'sds', 'dds', '', '2024-08-19', 5, '0987654323', 'sd', '33@mnae', 8, 38, '1724385618642_Candy Crush Saga.jpg'),
(36, 'ណាគ្រី', 'មុត', 'nakry', 'mut', 'Male', '2000-01-03', 21, '083789457', 'sc', 'admin@gmail.com', 11, 36, '1724386221894_Zombie Tsunami.jpg'),
(37, '1', '1', '1', '1', 'Female', '2024-07-30', 1, '1', '1', '33@mnae', 6, 45, '1724485558417_Supreme.jpg'),
(38, 'na', 'na', 'na', 'na', '', '2024-08-02', 1, '0987654323', '', '33@mnae', 6, 46, '1724485721076_Supreme.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `sub_names` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `kh_name` varchar(100) NOT NULL,
  `en_name` varchar(100) NOT NULL,
  `gender` text NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` text NOT NULL,
  `subject` text NOT NULL,
  `salary` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `create-at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `kh_name`, `en_name`, `gender`, `dob`, `phone`, `address`, `subject`, `salary`, `status`, `create-at`) VALUES
(1, 'មុត ណាគ្រី', 'nakry mut', 'Male', '1990-01-01', '01234567890', '123 Main St', 'Math,Englist,Khmer', 5000, 1, '2024-08-18 07:35:41'),
(2, 'កញ្ញា', 'Khanha', 'Female', '1990-01-01', '1234567890', '123 Main St', 'Math Englist, Khmer', 5000, 0, '2024-08-17 18:13:25'),
(4, 'ម៉ា', 'Ma', 'Female', '1990-01-01', '1234567890', '123 Main St', 'Math,Englist', 5000, 1, '2024-08-17 06:31:49'),
(10, 'កូនប៉ាៗ​​', 'Kon Papa', 'Female', '2024-07-30', '098', 'Math,Englist,Khmer', '', 2000, 1, '2024-08-22 06:08:53'),
(12, 'ឧត្ដម', 'Udom', 'Female', '2024-08-15', '089999999999', 'pp', 'pp1', 33, 0, '2024-08-18 02:11:48'),
(18, 'ពូធំជាងប៉ា', 'Pu thom jeang pa', 'Other', '1999-02-18', '1234567890', 'nv na k ban', 'vai sex', 20000, 1, '2024-08-17 06:25:30'),
(19, 'ម៉ា', 'មា', 'Male', '2024-08-01', '0988', 'Math,Englist,\n,Math\n,Englist,Khmer', '', 900, 1, '2024-08-22 06:09:44'),
(21, 'សង្សាពាល', 'hunni sava', 'Female', '2024-08-07', '0987654323', 'sc', 'CC', 4555, 1, '2024-08-22 06:09:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `names` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `rol` enum('admin','user','manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `names`, `email`, `pass`, `rol`, `created_at`) VALUES
(5, 'nakry', 'nakry@gmail.com', '$2a$08$VUzvc8tv3/y2hNCxLPZ3GuWxyWrQY0z4/BoHsdFvoSyxhT/VVYe1q', 'manager', '2024-08-13 13:43:43'),
(13, 'Admin', 'admin@gmail.com', '$2a$08$TgvNSnH0rA/3vk6CBIyJsein2jiHFQflKm.weeiHR/OJgJNEU52me', 'admin', '2024-08-15 07:13:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `mother`
--
ALTER TABLE `mother`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mother_id` (`mother_id`),
  ADD KEY `clsss_id` (`clsss_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mother`
--
ALTER TABLE `mother`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classroom`
--
ALTER TABLE `classroom`
  ADD CONSTRAINT `classroom_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_2` FOREIGN KEY (`mother_id`) REFERENCES `mother` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`clsss_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
