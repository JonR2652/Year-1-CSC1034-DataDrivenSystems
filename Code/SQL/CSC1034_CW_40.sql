-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 03, 2025 at 05:04 PM
-- Server version: 10.5.28-MariaDB-0+deb11u1
-- PHP Version: 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CSC1034_CW_40`
--
CREATE DATABASE IF NOT EXISTS `CSC1034_CW_40` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `CSC1034_CW_40`;

-- --------------------------------------------------------

--
-- Table structure for table `achievementList`
--

DROP TABLE IF EXISTS `achievementList`;
CREATE TABLE IF NOT EXISTS `achievementList` (
  `AchievementID` int(11) NOT NULL,
  `AchievementName` varchar(100) DEFAULT NULL,
  `AchievementDescription` text DEFAULT NULL,
  PRIMARY KEY (`AchievementID`),
  KEY `AchievementID` (`AchievementID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eventInfo`
--

DROP TABLE IF EXISTS `eventInfo`;
CREATE TABLE IF NOT EXISTS `eventInfo` (
  `EventID` int(11) NOT NULL,
  `EventName` varchar(100) DEFAULT NULL,
  `EventType` varchar(50) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gamesummary`
--

DROP TABLE IF EXISTS `gamesummary`;
CREATE TABLE IF NOT EXISTS `gamesummary` (
  `GameSummaryID` int(11) NOT NULL,
  `PlayerID` int(11) NOT NULL,
  `SessionID` int(11) NOT NULL,
  `AchievementID` int(11) NOT NULL,
  `DateofCompletion` int(11) NOT NULL,
  `Attempts` int(11) NOT NULL,
  `DifficultySelected` int(11) NOT NULL,
  `Scratches` int(11) NOT NULL,
  `LevelsCompleted` int(11) NOT NULL,
  `ItemsCollected` int(11) NOT NULL,
  `MoneySpent` int(11) NOT NULL,
  PRIMARY KEY (`GameSummaryID`),
  UNIQUE KEY `AchievementID` (`AchievementID`),
  UNIQUE KEY `SessionID` (`SessionID`),
  UNIQUE KEY `PlayerID` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `itemInfo`
--

DROP TABLE IF EXISTS `itemInfo`;
CREATE TABLE IF NOT EXISTS `itemInfo` (
  `ItemID` int(11) NOT NULL,
  `ItemName` varchar(100) DEFAULT NULL,
  `ItemDescription` text DEFAULT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itemInfo`
--

INSERT INTO `itemInfo` VALUES
(1, 'Hat', 'A worn-out prison cap. Offers no real protection.'),
(2, 'Money', 'Some smuggled cash. Might be useful for bribes.'),
(3, 'Paperclip', 'Looks harmless. Could be handy for a lock.'),
(4, 'Rusted Scalpel', 'Sharp, rusty, and probably dangerous.'),
(5, 'KnuckleDusters', 'Illegal and effective in close combat.'),
(6, 'Toothbrush', 'Your trusty toothbrush. Or is it shiv-ready?'),
(7, 'Family Photo', 'A photo of loved ones. Keeps morale up.'),
(8, 'Stone', 'A stone'),
(9, 'Bolt Cutters', 'Heavy-duty. Great for cutting through fences.'),
(10, 'keys', 'A set of old rusty prison keys, possibly useful for unlocking something.');

-- --------------------------------------------------------

--
-- Table structure for table `playerAchievements`
--

DROP TABLE IF EXISTS `playerAchievements`;
CREATE TABLE IF NOT EXISTS `playerAchievements` (
  `PlayerID` int(11) NOT NULL,
  `AchievementID` int(11) NOT NULL,
  PRIMARY KEY (`PlayerID`,`AchievementID`),
  KEY `fk_playerAchievements_Achievement` (`AchievementID`),
  KEY `fk_playerAchievements_Player` (`PlayerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playerInfo`
--

DROP TABLE IF EXISTS `playerInfo`;
CREATE TABLE IF NOT EXISTS `playerInfo` (
  `PlayerID` int(11) NOT NULL AUTO_INCREMENT,
  `PlayerForename` varchar(100) DEFAULT NULL,
  `PlayerSurname` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PlayerID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `PlayerID` (`PlayerID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playerInfo`
--

INSERT INTO `playerInfo` VALUES
(1, 'Timothy', 'Reid', 'treid@email.com', '123'),
(2, 'Jon ', 'Roberts', 'jr@email.com', '123'),
(3, 'Declan', 'McArdle', 'dm@email.com', '123'),
(4, 'Timothy', 'Reid', 'treid90@gmail.com', '123'),
(5, 'Jon', 'Roberts', 'jon@email.com', '123'),
(6, 'leroy', 'jenkins', 'lj@email.com', '123'),
(7, 'Tim', 'Reid', 'treid11@email.com', '123'),
(8, 'Timothy', 'Reid', 'treid100@qub.ac.uk', '123'),
(9, 'Timothy', 'Reid', 'treid123@email.com', '123'),
(11, 'tim', 'reid', 't@email.com', '123'),
(12, 'tim ', 'reid', 'treid1234@email.com', '123'),
(13, 'James', 'Blunt', 'jb@email.com', '123'),
(14, 'Timothy', 'Reid', 'tr110@email.com', '123'),
(15, 'James', 'Brown', 'jbrown@email.com', '123'),
(16, 'Timothy', 'Reid', 'treid22@email.com', '123'),
(17, 'Bob', 'Builder', 'bb@email.com', '123'),
(18, 'Timothy', 'reid', 'tr1123@email.com', '123'),
(19, 'Pickle', 'Rick', 'pr@email.com', '123'),
(20, 'Donald', 'Duck', 'dd@email.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table `playerInventory`
--

DROP TABLE IF EXISTS `playerInventory`;
CREATE TABLE IF NOT EXISTS `playerInventory` (
  `PlayerID` int(11) NOT NULL,
  `ItemID` int(11) NOT NULL,
  `SessionID` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `ItemQuantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`PlayerID`,`ItemID`),
  KEY `ItemID` (`ItemID`),
  KEY `PlayerID` (`PlayerID`),
  KEY `SessionID` (`SessionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playerInventory`
--

INSERT INTO `playerInventory` VALUES
(4, 8, 1, NULL),
(6, 8, 1, NULL),
(20, 1, 1, NULL),
(20, 2, 1, NULL),
(20, 3, 1, NULL),
(20, 4, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessionInfo`
--

DROP TABLE IF EXISTS `sessionInfo`;
CREATE TABLE IF NOT EXISTS `sessionInfo` (
  `SessionID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `locationID` int(11) DEFAULT NULL,
  `PlayerID` int(11) DEFAULT NULL,
  `timeCompleted` time DEFAULT NULL,
  PRIMARY KEY (`SessionID`),
  KEY `EventID` (`locationID`),
  KEY `PlayerID` (`PlayerID`),
  KEY `SessionID` (`SessionID`,`locationID`,`PlayerID`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessionInfo`
--

INSERT INTO `sessionInfo` VALUES
(1, NULL, 1, NULL),
(2, NULL, 2, NULL),
(3, NULL, 3, NULL),
(4, NULL, 4, NULL),
(5, NULL, 5, NULL),
(6, NULL, 5, NULL),
(7, NULL, 5, NULL),
(8, NULL, 6, NULL),
(9, NULL, 6, NULL),
(10, NULL, 6, NULL),
(11, NULL, 6, NULL),
(12, NULL, 5, NULL),
(13, NULL, 4, NULL),
(14, NULL, 7, NULL),
(15, NULL, 5, NULL),
(16, NULL, 5, NULL),
(17, NULL, 5, NULL),
(18, NULL, 5, NULL),
(19, NULL, 5, NULL),
(20, NULL, 5, NULL),
(21, NULL, 5, NULL),
(22, NULL, 5, NULL),
(23, NULL, 5, NULL),
(24, NULL, 5, NULL),
(25, NULL, 5, NULL),
(26, NULL, 5, NULL),
(27, NULL, 5, NULL),
(28, NULL, 5, NULL),
(29, NULL, 5, NULL),
(30, NULL, 5, NULL),
(31, NULL, 5, NULL),
(32, NULL, 5, NULL),
(33, NULL, 5, NULL),
(34, NULL, 1, NULL),
(35, NULL, 1, NULL),
(36, NULL, 5, NULL),
(37, NULL, 5, NULL),
(38, NULL, 7, NULL),
(39, NULL, 7, NULL),
(40, NULL, 5, NULL),
(41, NULL, 7, NULL),
(42, NULL, 7, NULL),
(43, NULL, 7, NULL),
(44, NULL, 7, NULL),
(45, NULL, 5, NULL),
(46, NULL, 5, NULL),
(47, NULL, 5, NULL),
(48, NULL, 5, NULL),
(49, NULL, 5, NULL),
(50, NULL, 5, NULL),
(51, NULL, 5, NULL),
(52, NULL, 5, NULL),
(53, NULL, 5, NULL),
(54, NULL, 5, NULL),
(55, NULL, 5, NULL),
(56, NULL, 5, NULL),
(57, NULL, 5, NULL),
(58, NULL, 5, NULL),
(59, NULL, 5, NULL),
(60, NULL, 5, NULL),
(61, NULL, 5, NULL),
(62, NULL, 5, NULL),
(63, NULL, 5, NULL),
(64, NULL, 5, NULL),
(65, NULL, 5, NULL),
(66, NULL, 5, NULL),
(67, NULL, 5, NULL),
(68, NULL, 5, NULL),
(69, NULL, 5, NULL),
(70, NULL, 5, NULL),
(71, NULL, 5, NULL),
(72, NULL, 5, NULL),
(73, NULL, 5, NULL),
(74, NULL, 5, NULL),
(75, NULL, 5, NULL),
(76, NULL, 5, NULL),
(77, NULL, 5, NULL),
(78, NULL, 5, NULL),
(79, NULL, 5, NULL),
(80, NULL, 5, NULL),
(81, NULL, 5, NULL),
(82, NULL, 5, NULL),
(83, NULL, 5, NULL),
(84, NULL, 5, NULL),
(85, NULL, 2, NULL),
(86, NULL, 5, NULL),
(87, NULL, 5, NULL),
(88, NULL, 5, NULL),
(89, NULL, 5, NULL),
(90, NULL, 5, NULL),
(91, NULL, 5, NULL),
(92, NULL, 9, NULL),
(93, NULL, 11, NULL),
(94, NULL, 5, NULL),
(95, NULL, 5, NULL),
(96, NULL, 5, NULL),
(97, NULL, 5, NULL),
(98, NULL, 5, NULL),
(99, NULL, 5, NULL),
(100, NULL, 5, NULL),
(101, NULL, 5, NULL),
(102, NULL, 12, NULL),
(103, NULL, 13, NULL),
(104, NULL, 14, NULL),
(105, NULL, 15, NULL),
(106, NULL, 16, NULL),
(107, NULL, 17, NULL),
(108, NULL, 5, NULL),
(109, NULL, 5, NULL),
(110, NULL, 5, NULL),
(111, NULL, 19, NULL),
(112, NULL, 20, NULL),
(113, NULL, 5, NULL),
(114, NULL, 5, NULL),
(115, NULL, 5, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `playerAchievements`
--
ALTER TABLE `playerAchievements`
  ADD CONSTRAINT `fk_playerAchievements_Achievement` FOREIGN KEY (`AchievementID`) REFERENCES `achievementList` (`AchievementID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_playerAchievements_Player` FOREIGN KEY (`PlayerID`) REFERENCES `playerInfo` (`PlayerID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `playerInventory`
--
ALTER TABLE `playerInventory`
  ADD CONSTRAINT `fk_session` FOREIGN KEY (`SessionID`) REFERENCES `sessionInfo` (`SessionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playerInventory_ibfk_1` FOREIGN KEY (`PlayerID`) REFERENCES `playerInfo` (`PlayerID`),
  ADD CONSTRAINT `playerInventory_ibfk_2` FOREIGN KEY (`ItemID`) REFERENCES `itemInfo` (`ItemID`);

--
-- Constraints for table `sessionInfo`
--
ALTER TABLE `sessionInfo`
  ADD CONSTRAINT `sessionInfo_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `eventInfo` (`EventID`),
  ADD CONSTRAINT `sessionInfo_ibfk_2` FOREIGN KEY (`PlayerID`) REFERENCES `playerInfo` (`PlayerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
