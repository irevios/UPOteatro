-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-02-2020 a las 22:13:24
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS upoteatro;
--
-- Base de datos: `upoteatro`
--
CREATE DATABASE IF NOT EXISTS `upoteatro` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `upoteatro`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `butaca`
--

DROP TABLE IF EXISTS `butaca`;
CREATE TABLE `butaca` (
  `CODIGO` int(11) NOT NULL,
  `FILA` int(2) NOT NULL,
  `NUMERO` int(2) NOT NULL,
  `COEF_PRECIO` float NOT NULL,
  `ZONA` varchar(20) NOT NULL,
  `ID_TEATRO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `butaca`
--

INSERT INTO `butaca` (`CODIGO`, `FILA`, `NUMERO`, `COEF_PRECIO`, `ZONA`, `ID_TEATRO`) VALUES
(1, 1, 1, 2, 'PALCO', 1),
(2, 1, 2, 2, 'PALCO', 1),
(3, 1, 3, 2, 'PALCO', 1),
(4, 1, 4, 2, 'PALCO', 1),
(5, 1, 5, 2, 'PALCO', 1),
(6, 1, 1, 1.7, 'PARAISO', 1),
(7, 1, 2, 1.7, 'PARAISO', 1),
(8, 1, 3, 1.7, 'PARAISO', 1),
(9, 1, 4, 1.7, 'PARAISO', 1),
(10, 1, 5, 1.7, 'PARAISO', 1),
(11, 1, 6, 1.7, 'PARAISO', 1),
(12, 1, 7, 1.7, 'PARAISO', 1),
(13, 1, 1, 1.3, 'ANFITEATRO', 1),
(14, 1, 2, 1.3, 'ANFITEATRO', 1),
(15, 1, 3, 1.3, 'ANFITEATRO', 1),
(16, 1, 4, 1.3, 'ANFITEATRO', 1),
(17, 1, 5, 1.3, 'ANFITEATRO', 1),
(18, 2, 1, 1.3, 'ANFITEATRO', 1),
(19, 2, 2, 1.3, 'ANFITEATRO', 1),
(20, 2, 3, 1.3, 'ANFITEATRO', 1),
(21, 2, 4, 1.3, 'ANFITEATRO', 1),
(22, 2, 5, 1.3, 'ANFITEATRO', 1),
(23, 1, 1, 1, 'PLATEA', 1),
(24, 1, 2, 1, 'PLATEA', 1),
(25, 1, 3, 1, 'PLATEA', 1),
(26, 1, 4, 1, 'PLATEA', 1),
(27, 1, 5, 1, 'PLATEA', 1),
(28, 1, 6, 1, 'PLATEA', 1),
(29, 2, 1, 1, 'PLATEA', 1),
(30, 2, 2, 1, 'PLATEA', 1),
(31, 2, 3, 1, 'PLATEA', 1),
(32, 2, 4, 1, 'PLATEA', 1),
(33, 2, 5, 1, 'PLATEA', 1),
(34, 2, 6, 1, 'PLATEA', 1),
(35, 3, 1, 1, 'PLATEA', 1),
(36, 3, 2, 1, 'PLATEA', 1),
(37, 3, 3, 1, 'PLATEA', 1),
(38, 3, 4, 1, 'PLATEA', 1),
(39, 3, 5, 1, 'PLATEA', 1),
(40, 3, 6, 1, 'PLATEA', 1),
(41, 1, 1, 2.2, 'PALCO', 2),
(42, 1, 2, 2.2, 'PALCO', 2),
(43, 1, 3, 2.2, 'PALCO', 2),
(44, 1, 4, 2.2, 'PALCO', 2),
(45, 1, 5, 2.2, 'PALCO', 2),
(46, 1, 6, 2.2, 'PALCO', 2),
(47, 1, 7, 2.2, 'PALCO', 2),
(48, 1, 1, 1.8, 'PARAISO', 2),
(49, 1, 2, 1.8, 'PARAISO', 2),
(50, 1, 3, 1.8, 'PARAISO', 2),
(51, 1, 4, 1.8, 'PARAISO', 2),
(52, 1, 5, 1.8, 'PARAISO', 2),
(53, 1, 1, 1.4, 'ANFITEATRO', 2),
(54, 1, 2, 1.4, 'ANFITEATRO', 2),
(55, 1, 3, 1.4, 'ANFITEATRO', 2),
(56, 1, 4, 1.4, 'ANFITEATRO', 2),
(57, 1, 5, 1.4, 'ANFITEATRO', 2),
(58, 1, 1, 1, 'PLATEA', 2),
(59, 1, 2, 1, 'PLATEA', 2),
(60, 1, 3, 1, 'PLATEA', 2),
(61, 1, 4, 1, 'PLATEA', 2),
(62, 1, 5, 1, 'PLATEA', 2),
(63, 1, 6, 1, 'PLATEA', 2),
(64, 2, 1, 1, 'PLATEA', 2),
(65, 2, 2, 1, 'PLATEA', 2),
(66, 2, 3, 1, 'PLATEA', 2),
(67, 2, 4, 1, 'PLATEA', 2),
(68, 2, 5, 1, 'PLATEA', 2),
(69, 2, 6, 1, 'PLATEA', 2),
(70, 1, 1, 1.8, 'PALCO', 3),
(71, 1, 2, 1.8, 'PALCO', 3),
(72, 1, 3, 1.8, 'PALCO', 3),
(73, 1, 4, 1.8, 'PALCO', 3),
(74, 1, 5, 1.8, 'PALCO', 3),
(75, 1, 6, 1.8, 'PALCO', 3),
(76, 1, 7, 1.8, 'PALCO', 3),
(77, 1, 1, 1.6, 'PARAISO', 3),
(78, 1, 2, 1.6, 'PARAISO', 3),
(79, 1, 3, 1.6, 'PARAISO', 3),
(80, 1, 4, 1.6, 'PARAISO', 3),
(81, 1, 5, 1.6, 'PARAISO', 3),
(82, 1, 6, 1.6, 'PARAISO', 3),
(83, 1, 7, 1.6, 'PARAISO', 3),
(84, 2, 1, 1.6, 'PARAISO', 3),
(85, 2, 2, 1.6, 'PARAISO', 3),
(86, 2, 3, 1.6, 'PARAISO', 3),
(87, 2, 4, 1.6, 'PARAISO', 3),
(88, 2, 5, 1.6, 'PARAISO', 3),
(89, 1, 1, 1.2, 'ANFITEATRO', 3),
(90, 1, 2, 1.2, 'ANFITEATRO', 3),
(91, 1, 3, 1.2, 'ANFITEATRO', 3),
(92, 1, 4, 1.2, 'ANFITEATRO', 3),
(93, 1, 5, 1.2, 'ANFITEATRO', 3),
(94, 2, 1, 1.2, 'ANFITEATRO', 3),
(95, 2, 2, 1.2, 'ANFITEATRO', 3),
(96, 2, 3, 1.2, 'ANFITEATRO', 3),
(97, 2, 4, 1.2, 'ANFITEATRO', 3),
(98, 2, 5, 1.2, 'ANFITEATRO', 3),
(99, 1, 1, 1, 'PLATEA', 3),
(100, 1, 2, 1, 'PLATEA', 3),
(101, 1, 3, 1, 'PLATEA', 3),
(102, 1, 4, 1, 'PLATEA', 3),
(103, 1, 5, 1, 'PLATEA', 3),
(104, 1, 6, 1, 'PLATEA', 3),
(105, 2, 1, 1, 'PLATEA', 3),
(106, 2, 2, 1, 'PLATEA', 3),
(107, 2, 3, 1, 'PLATEA', 3),
(108, 2, 4, 1, 'PLATEA', 3),
(109, 2, 5, 1, 'PLATEA', 3),
(110, 2, 6, 1, 'PLATEA', 3),
(111, 3, 1, 1, 'PLATEA', 3),
(112, 3, 2, 1, 'PLATEA', 3),
(113, 3, 3, 1, 'PLATEA', 3),
(114, 3, 4, 1, 'PLATEA', 3),
(115, 3, 5, 1, 'PLATEA', 3),
(116, 3, 6, 1, 'PLATEA', 3),
(117, 4, 1, 1, 'PLATEA', 3),
(118, 4, 2, 1, 'PLATEA', 3),
(119, 4, 3, 1, 'PLATEA', 3),
(120, 4, 4, 1, 'PLATEA', 3),
(121, 4, 5, 1, 'PLATEA', 3),
(122, 4, 6, 1, 'PLATEA', 3),
(123, 1, 1, 1, 'PALCO', 4),
(124, 1, 2, 1, 'PALCO', 4),
(125, 1, 3, 1, 'PALCO', 4),
(126, 1, 4, 1, 'PALCO', 4),
(127, 1, 5, 1, 'PALCO', 4),
(128, 1, 6, 1, 'PALCO', 4),
(129, 1, 7, 1, 'PALCO', 4),
(130, 1, 1, 1.6, 'PARAISO', 4),
(131, 1, 2, 1.6, 'PARAISO', 4),
(132, 1, 3, 1.6, 'PARAISO', 4),
(133, 1, 4, 1.6, 'PARAISO', 4),
(134, 1, 5, 1.6, 'PARAISO', 4),
(135, 1, 6, 1.6, 'PARAISO', 4),
(136, 1, 7, 1.6, 'PARAISO', 4),
(137, 2, 1, 1.6, 'PARAISO', 4),
(138, 2, 2, 1.6, 'PARAISO', 4),
(139, 2, 3, 1.6, 'PARAISO', 4),
(140, 2, 4, 1.6, 'PARAISO', 4),
(141, 2, 5, 1.6, 'PARAISO', 4),
(142, 2, 6, 1.6, 'PARAISO', 4),
(143, 2, 7, 1.6, 'PARAISO', 4),
(144, 1, 1, 1.2, 'ANFITEATRO', 4),
(145, 1, 2, 1.2, 'ANFITEATRO', 4),
(146, 1, 3, 1.2, 'ANFITEATRO', 4),
(147, 1, 4, 1.2, 'ANFITEATRO', 4),
(148, 1, 5, 1.2, 'ANFITEATRO', 4),
(149, 2, 1, 1.2, 'ANFITEATRO', 4),
(150, 2, 2, 1.2, 'ANFITEATRO', 4),
(151, 2, 3, 1.2, 'ANFITEATRO', 4),
(152, 2, 4, 1.2, 'ANFITEATRO', 4),
(153, 2, 5, 1.2, 'ANFITEATRO', 4),
(154, 1, 1, 1, 'PLATEA', 4),
(155, 1, 2, 1, 'PLATEA', 4),
(156, 1, 3, 1, 'PLATEA', 4),
(157, 1, 4, 1, 'PLATEA', 4),
(158, 1, 5, 1, 'PLATEA', 4),
(159, 1, 6, 1, 'PLATEA', 4),
(160, 2, 1, 1, 'PLATEA', 4),
(161, 2, 2, 1, 'PLATEA', 4),
(162, 2, 3, 1, 'PLATEA', 4),
(163, 2, 4, 1, 'PLATEA', 4),
(164, 2, 5, 1, 'PLATEA', 4),
(165, 2, 6, 1, 'PLATEA', 4),
(166, 3, 1, 1, 'PLATEA', 4),
(167, 3, 2, 1, 'PLATEA', 4),
(168, 3, 3, 1, 'PLATEA', 4),
(169, 3, 4, 1, 'PLATEA', 4),
(170, 3, 5, 1, 'PLATEA', 4),
(171, 3, 6, 1, 'PLATEA', 4),
(172, 4, 1, 1, 'PLATEA', 4),
(173, 4, 2, 1, 'PLATEA', 4),
(174, 4, 3, 1, 'PLATEA', 4),
(175, 4, 4, 1, 'PLATEA', 4),
(176, 4, 5, 1, 'PLATEA', 4),
(177, 4, 6, 1, 'PLATEA', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `CODIGO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compania`
--

DROP TABLE IF EXISTS `compania`;
CREATE TABLE `compania` (
  `CIF` varchar(9) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `DIRECTOR` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compania`
--

INSERT INTO `compania` (`CIF`, `NOMBRE`, `DIRECTOR`) VALUES
('B32212532', 'Producciones Altozano', 'Aitor Pino Mate'),
('G44106268', 'Entre Nubes', 'Roberto Tamarit Roca'),
('K64801160', 'Sepaner', 'Carla Pacheco Escala'),
('P61657821', 'Zamora Y Maqueda', 'Maria Rosa Serra Agu'),
('S23875537', 'Pelca', 'Francisco Ballesta F'),
('V0723490I', 'Pangea Artes Escénicas', 'Fernando Salvador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada`
--

DROP TABLE IF EXISTS `entrada`;
CREATE TABLE `entrada` (
  `CODIGO` int(11) NOT NULL,
  `ADAPTADA` varchar(1) NOT NULL,
  `PRECIO_BASE` float NOT NULL,
  `COD_BUTACA` int(11) NOT NULL,
  `COD_REPRESENTACION` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`CODIGO`, `ADAPTADA`, `PRECIO_BASE`, `COD_BUTACA`, `COD_REPRESENTACION`) VALUES
(1, 'N', 71, 5, 4),
(2, 'N', 46.15, 19, 4),
(3, 'N', 103, 70, 16),
(4, 'N', 103, 71, 16),
(5, 'N', 103, 72, 16),
(6, 'N', 103, 73, 16),
(7, 'N', 103, 74, 16),
(8, 'N', 144.2, 70, 19),
(9, 'N', 144.2, 71, 19),
(10, 'N', 144.2, 72, 19),
(11, 'N', 144.2, 84, 19),
(12, 'N', 144.2, 85, 19),
(13, 'N', 144.2, 86, 19),
(14, 'N', 144.2, 87, 19),
(15, 'S', 37.08, 79, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `espectaculo`
--

DROP TABLE IF EXISTS `espectaculo`;
CREATE TABLE `espectaculo` (
  `CODIGO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `PRODUCTOR` varchar(20) NOT NULL,
  `GASTOS` int(20) NOT NULL,
  `ID_CATEGORIA` int(11) NOT NULL,
  `CODIGO_OBRA` int(11) NOT NULL,
  `CIF_COMPANIA` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `espectaculo`
--

INSERT INTO `espectaculo` (`CODIGO`, `NOMBRE`, `PRODUCTOR`, `GASTOS`, `ID_CATEGORIA`, `CODIGO_OBRA`, `CIF_COMPANIA`) VALUES
(1, 'La llamada El Musical', 'Mariano Blanes Argue', 15600, 2, 3, 'B32212532'),
(2, 'La Celestina', 'Guillermo Casanova C', 24100, 6, 2, 'K64801160'),
(3, 'Hamlet', 'Paula Blanco Almansa', 47400, 7, 1, 'P61657821'),
(4, 'Billy Elliot', 'Jose Ignacio Ulloa B', 32300, 2, 4, 'B32212532'),
(5, 'Billy Elliot La Parodia', 'Rafael Fabregat Folc', 12000, 1, 4, 'G44106268'),
(6, 'Lo invisible', 'Fernando Salvador', 3864, 10, 6, 'V0723490I'),
(7, 'Show de comedia femenina', 'Penny JayG', 5640, 1, 7, 'V0723490I');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `e_grupal`
--

DROP TABLE IF EXISTS `e_grupal`;
CREATE TABLE `e_grupal` (
  `CODIGO_ENTRADA` int(11) NOT NULL,
  `NUM_PERSONAS` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `e_grupal`
--

INSERT INTO `e_grupal` (`CODIGO_ENTRADA`, `NUM_PERSONAS`) VALUES
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 7),
(9, 7),
(10, 7),
(11, 7),
(12, 7),
(13, 7),
(14, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `e_individual`
--

DROP TABLE IF EXISTS `e_individual`;
CREATE TABLE `e_individual` (
  `CODIGO_ENTRADA` int(11) NOT NULL,
  `TIPO` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `e_individual`
--

INSERT INTO `e_individual` (`CODIGO_ENTRADA`, `TIPO`) VALUES
(1, 'PALCO'),
(2, 'ANFITEATRO'),
(15, 'PARAISO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra`
--

DROP TABLE IF EXISTS `obra`;
CREATE TABLE `obra` (
  `CODIGO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `AUTOR` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `obra`
--

INSERT INTO `obra` (`CODIGO`, `NOMBRE`, `AUTOR`) VALUES
(1, 'Hamlet', 'William Shakespeare'),
(2, 'La Celestina', 'Fernando de Rojas'),
(3, 'La llamada', 'Javier Calvo'),
(4, 'Billy Elliot', 'Lee Hall'),
(5, 'Yerma', 'Federico García Lorca'),
(6, 'Lo invisible', 'José Martínez Ruíz'),
(7, 'Riot Comedy', 'Influencers');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `representacion`
--

DROP TABLE IF EXISTS `representacion`;
CREATE TABLE `representacion` (
  `CODIGO` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `ADAPTADA` varchar(1) NOT NULL,
  `PRECIO_BASE` int(6) NOT NULL,
  `COD_ESPECTACULO` int(11) NOT NULL,
  `COD_TEATRO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `representacion`
--

INSERT INTO `representacion` (`CODIGO`, `FECHA`, `ADAPTADA`, `PRECIO_BASE`, `COD_ESPECTACULO`, `COD_TEATRO`) VALUES
(1, '2020-03-02', 'N', 36, 1, 1),
(2, '2020-03-03', 'N', 36, 1, 1),
(3, '2020-03-04', 'N', 36, 1, 1),
(4, '2020-03-05', 'N', 36, 1, 1),
(5, '2020-03-06', 'N', 36, 1, 1),
(6, '2020-03-07', 'N', 36, 1, 1),
(7, '2020-03-08', 'N', 36, 1, 1),
(8, '2020-08-29', 'N', 56, 2, 2),
(9, '2020-08-30', 'N', 56, 2, 2),
(10, '2020-04-14', 'S', 39, 3, 2),
(11, '2020-11-09', 'N', 46, 4, 2),
(12, '2020-02-05', 'S', 21, 5, 2),
(13, '2020-02-06', 'S', 21, 5, 2),
(14, '2020-02-07', 'S', 21, 5, 2),
(15, '2020-04-12', 'S', 39, 3, 3),
(16, '2020-04-13', 'S', 49, 3, 3),
(17, '2020-04-15', 'N', 49, 3, 3),
(18, '2020-02-08', 'S', 21, 5, 3),
(19, '2020-02-09', 'S', 21, 5, 3),
(20, '2020-02-10', 'S', 21, 5, 3),
(21, '2020-02-14', 'S', 6, 7, 4),
(22, '2020-02-11', 'S', 12, 6, 4),
(23, '2020-02-12', 'S', 12, 6, 4),
(24, '2020-02-13', 'S', 6, 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `teatro`
--

DROP TABLE IF EXISTS `teatro`;
CREATE TABLE `teatro` (
  `CODIGO` int(11) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL,
  `DIRECCION` varchar(150) NOT NULL,
  `AFORO` int(3) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `teatro`
--

INSERT INTO `teatro` (`CODIGO`, `NOMBRE`, `DIRECCION`, `AFORO`) VALUES
(1, 'Lope de Vega', 'Av. de María Luisa, s/n, 41013 Sevilla', 40),
(2, 'La Maestranza', 'Paseo de Cristóbal Colón, 22, 41001 Sevilla', 29),
(3, 'Quintero', 'Calle Cuna, 15, 41004 Sevilla', 53),
(4, 'El Teatro de Triana', 'Calle Condes de Bustillo, 17, 41010 Sevilla', 55);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `butaca`
--
ALTER TABLE `butaca`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `ID_TEATRO` (`ID_TEATRO`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`CODIGO`);

--
-- Indices de la tabla `compania`
--
ALTER TABLE `compania`
  ADD PRIMARY KEY (`CIF`);

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `COD_BUTACA` (`COD_BUTACA`),
  ADD KEY `COD_REPRESENTACION` (`COD_REPRESENTACION`);

--
-- Indices de la tabla `espectaculo`
--
ALTER TABLE `espectaculo`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `ID_CATEGORIA` (`ID_CATEGORIA`),
  ADD KEY `CODIGO_OBRA` (`CODIGO_OBRA`),
  ADD KEY `CIF_COMPANIA` (`CIF_COMPANIA`);

--
-- Indices de la tabla `e_grupal`
--
ALTER TABLE `e_grupal`
  ADD PRIMARY KEY (`CODIGO_ENTRADA`);

--
-- Indices de la tabla `e_individual`
--
ALTER TABLE `e_individual`
  ADD PRIMARY KEY (`CODIGO_ENTRADA`);

--
-- Indices de la tabla `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`CODIGO`);

--
-- Indices de la tabla `representacion`
--
ALTER TABLE `representacion`
  ADD PRIMARY KEY (`CODIGO`),
  ADD KEY `COD_ESPECTACULO` (`COD_ESPECTACULO`),
  ADD KEY `COD_TEATRO` (`COD_TEATRO`);

--
-- Indices de la tabla `teatro`
--
ALTER TABLE `teatro`
  ADD PRIMARY KEY (`CODIGO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `butaca`
--
ALTER TABLE `butaca`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `entrada`
--
ALTER TABLE `entrada`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `espectaculo`
--
ALTER TABLE `espectaculo`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `e_grupal`
--
ALTER TABLE `e_grupal`
  MODIFY `CODIGO_ENTRADA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `e_individual`
--
ALTER TABLE `e_individual`
  MODIFY `CODIGO_ENTRADA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `obra`
--
ALTER TABLE `obra`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `representacion`
--
ALTER TABLE `representacion`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `teatro`
--
ALTER TABLE `teatro`
  MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `butaca`
--
ALTER TABLE `butaca`
  ADD CONSTRAINT `butaca_ibfk_1` FOREIGN KEY (`ID_TEATRO`) REFERENCES `teatro` (`CODIGO`);

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `entrada_ibfk_1` FOREIGN KEY (`COD_BUTACA`) REFERENCES `butaca` (`CODIGO`),
  ADD CONSTRAINT `entrada_ibfk_2` FOREIGN KEY (`COD_REPRESENTACION`) REFERENCES `representacion` (`CODIGO`);

--
-- Filtros para la tabla `espectaculo`
--
ALTER TABLE `espectaculo`
  ADD CONSTRAINT `espectaculo_ibfk_1` FOREIGN KEY (`ID_CATEGORIA`) REFERENCES `categoria` (`CODIGO`),
  ADD CONSTRAINT `espectaculo_ibfk_2` FOREIGN KEY (`CODIGO_OBRA`) REFERENCES `obra` (`CODIGO`),
  ADD CONSTRAINT `espectaculo_ibfk_3` FOREIGN KEY (`CIF_COMPANIA`) REFERENCES `compania` (`CIF`);

--
-- Filtros para la tabla `e_grupal`
--
ALTER TABLE `e_grupal`
  ADD CONSTRAINT `e_grupal_ibfk_1` FOREIGN KEY (`CODIGO_ENTRADA`) REFERENCES `entrada` (`CODIGO`);

--
-- Filtros para la tabla `e_individual`
--
ALTER TABLE `e_individual`
  ADD CONSTRAINT `e_individual_ibfk_1` FOREIGN KEY (`CODIGO_ENTRADA`) REFERENCES `entrada` (`CODIGO`);

--
-- Filtros para la tabla `representacion`
--
ALTER TABLE `representacion`
  ADD CONSTRAINT `representacion_ibfk_1` FOREIGN KEY (`COD_ESPECTACULO`) REFERENCES `espectaculo` (`CODIGO`),
  ADD CONSTRAINT `representacion_ibfk_2` FOREIGN KEY (`COD_TEATRO`) REFERENCES `teatro` (`CODIGO`);


UPDATE TEATRO T SET AFORO = (SELECT COUNT(*) FROM BUTACA WHERE ID_TEATRO = T.CODIGO);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
