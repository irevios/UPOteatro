SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `UPOTEATRO`
--
drop DATABASE IF EXISTS  `UPOTEATRO`;
create database  `UPOTEATRO` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
	USE `UPOTEATRO`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `COMPAÑIA`
--
CREATE TABLE `COMPANIA` (
	`CIF` VARCHAR(9) NOT NULL,
	`NOMBRE` VARCHAR(50) NOT NULL,
	`DIRECTOR` VARCHAR(20) NOT NULL
) CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `OBRA`
--
CREATE TABLE `OBRA` (
	`CODIGO` int(11) NOT NULL,
	`NOMBRE` VARCHAR(50) NOT NULL,
	`AUTOR` VARCHAR(20) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CATEGORIA`
--
CREATE TABLE `CATEGORIA` (
	`CODIGO` int(11) NOT NULL,
	`NOMBRE` VARCHAR(50) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESPECTACULO`
--
CREATE TABLE `ESPECTACULO` (
	`CODIGO` int(11) NOT NULL,
	`NOMBRE` VARCHAR(50) NOT NULL,
	`PRODUCTOR` VARCHAR(20) NOT NULL,
	`GASTOS` int(20) NOT NULL,
	`ID_CATEGORIA` int(11) NOT NULL,
	`CODIGO_OBRA` int(11) NOT NULL,
	`CIF_COMPANIA` VARCHAR(9) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `REPRESENTACION`
--
CREATE TABLE `REPRESENTACION` (
	`CODIGO` int(11) NOT NULL,
	`FECHA` date NOT NULL,
	`ADAPTADA` VARCHAR(1) NOT NULL,
	`PRECIO_BASE` int(6) NOT NULL,
	`COD_ESPECTACULO` int(11) NOT NULL,
	`COD_TEATRO` int(11) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TEATRO`
--
CREATE TABLE `TEATRO` (
	`CODIGO` int(11) NOT NULL,
	`NOMBRE` VARCHAR(50) NOT NULL,
	`DIRECCION` VARCHAR(150) NOT NULL,
	`AFORO` int(3) DEFAULT 0
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `BUTACA`
--
CREATE TABLE `BUTACA` (
	`CODIGO` int(11) NOT NULL,
	`FILA` int(2) NOT NULL,
	`NUMERO` int(2) NOT NULL,
	`COEF_PRECIO` float(3) NOT NULL,
	`ZONA` VARCHAR(20) NOT NULL,
	`ID_TEATRO` int(11) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ENTRADA`
--
CREATE TABLE `ENTRADA` (
	`CODIGO` int(11) NOT NULL,
	`ADAPTADA` VARCHAR(1) NOT NULL,
	`PRECIO_BASE` float(6) NOT NULL,
	`COD_BUTACA` int(11) NOT NULL,
	`COD_REPRESENTACION` int(11) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `E_INDIVIDUAL`
--
CREATE TABLE `E_INDIVIDUAL` (
	`CODIGO_ENTRADA` int(11) NOT NULL,
	`TIPO` varchar(20) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `E_GRUPAL`
--
CREATE TABLE `E_GRUPAL` (
	`CODIGO_ENTRADA` int(11) NOT NULL,
	`NUM_PERSONAS` int(3) NOT NULL
) CHARSET=latin1;
-- --------------------------------------------------------
--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `COMPANIA`
--
ALTER TABLE `COMPANIA`
ADD PRIMARY KEY (`CIF`);
--
-- Indices de la tabla `OBRA`
--
ALTER TABLE `OBRA`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `CATEGORIA`
--
ALTER TABLE `CATEGORIA`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `ESPECTACULO`
--
ALTER TABLE `ESPECTACULO`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `REPRESENTACION`
--
ALTER TABLE `REPRESENTACION`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `TEATRO`
--
ALTER TABLE `TEATRO`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `BUTACA`
--
ALTER TABLE `BUTACA`
ADD PRIMARY KEY (`CODIGO`);
--
-- Indices de la tabla `ENTRADA`
--
ALTER TABLE `ENTRADA`
ADD PRIMARY KEY (`CODIGO`);
  --
-- Indices de la tabla `E_INDIVIDUAL`
--
ALTER TABLE `E_INDIVIDUAL`
ADD PRIMARY KEY (`CODIGO_ENTRADA`);
--
-- Indices de la tabla `E_GRUPAL`
--
ALTER TABLE `E_GRUPAL`
ADD PRIMARY KEY (`CODIGO_ENTRADA`);
-- --------------------------------------------------------
--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `OBRA`
--
ALTER TABLE `OBRA`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `CATEGORIA`
--
ALTER TABLE `CATEGORIA`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `ESPECTACULO`
--
ALTER TABLE `ESPECTACULO`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `REPRESENTACION`
--
ALTER TABLE `REPRESENTACION`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `TEATRO`
--
ALTER TABLE `TEATRO`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `ENTRADA`
--
ALTER TABLE `ENTRADA`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `BUTACA`
--
ALTER TABLE `BUTACA`
MODIFY `CODIGO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `E_INDIVIDUAL`
--
ALTER TABLE `E_INDIVIDUAL`
MODIFY `CODIGO_ENTRADA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT de la tabla `E_GRUPAL`
--
ALTER TABLE `E_GRUPAL`
MODIFY `CODIGO_ENTRADA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
-- --------------------------------------------------------
--
-- FOREIGN_KEY de las tablas volcadas
--
--
-- FOREIGN_KEY de la tabla `ESPECTACULO`
--
ALTER TABLE ESPECTACULO
ADD FOREIGN KEY (ID_CATEGORIA) REFERENCES CATEGORIA(CODIGO);
ALTER TABLE ESPECTACULO
ADD FOREIGN KEY (CODIGO_OBRA) REFERENCES OBRA(CODIGO);
ALTER TABLE ESPECTACULO
ADD FOREIGN KEY (CIF_COMPANIA) REFERENCES COMPANIA(CIF);
--
-- FOREIGN_KEY de la tabla `REPRESENTACION`
--
ALTER TABLE REPRESENTACION
ADD FOREIGN KEY (COD_ESPECTACULO) REFERENCES ESPECTACULO(CODIGO);
ALTER TABLE REPRESENTACION
ADD FOREIGN KEY (COD_TEATRO) REFERENCES TEATRO(CODIGO);
--
-- FOREIGN_KEY de la tabla `ENTRADA`
--
ALTER TABLE ENTRADA
ADD FOREIGN KEY (COD_BUTACA) REFERENCES BUTACA(CODIGO);
ALTER TABLE ENTRADA
ADD FOREIGN KEY (COD_REPRESENTACION) REFERENCES REPRESENTACION(CODIGO);
--
-- FOREIGN_KEY de la tabla `BUTACA`
--
ALTER TABLE BUTACA
ADD FOREIGN KEY (ID_TEATRO) REFERENCES TEATRO(CODIGO);
--
-- FOREIGN_KEY de la tabla `E_INDIVIDUAL`
--
ALTER TABLE E_INDIVIDUAL
ADD FOREIGN KEY (CODIGO_ENTRADA) REFERENCES ENTRADA(CODIGO);
--
-- FOREIGN_KEY de la tabla `E_GRUPAL`
--
ALTER TABLE E_GRUPAL
ADD FOREIGN KEY (CODIGO_ENTRADA) REFERENCES ENTRADA(CODIGO);
-- --------------------------------------------------------
--
-- Volcado de datos 
--
--
-- Volcado de datos para tabla CATEGORIA
--
INSERT INTO `CATEGORIA` (`NOMBRE`) VALUES
('Comedia'),
('Musical'),
('Pantomima'),
('Marionetas'),
('Absurdo'),
('Tragicomedia'),
('Tragedia'),
('Independiente'),
('Poético'),
('Suspense'),
('Drama');
--
-- Volcado de datos para tabla OBRA
--
INSERT INTO `OBRA` (`NOMBRE`,`AUTOR`) VALUES
('Hamlet','William Shakespeare'),
('La Celestina','Fernando de Rojas'),
('La llamada','Javier Calvo'),
('Billy Elliot','Lee Hall'),
('Yerma','Federico García Lorca'),
('Lo invisible','José Martínez Ruíz "Azorín"'),
('Riot Comedy','Influencers');
--
-- Volcado de datos para tabla COMPANIA
--
INSERT INTO `COMPANIA` VALUES
('B32212532','Producciones Altozano','Aitor Pino Mate'),
('S23875537','Pelca','Francisco Ballesta Farinas'),
('K64801160','Sepaner','Carla Pacheco Escalante'),
('G44106268','Entre Nubes','Roberto Tamarit Rocamora'),
('P61657821','Zamora Y Maqueda','Maria Rosa Serra Aguiar'),
('V0723490I','Pangea Artes Escénicas','Fernando Salvador');
--
-- Volcado de datos para tabla TEATRO
--
INSERT INTO `TEATRO` (`NOMBRE`,`DIRECCION`) VALUES
('Lope de Vega','Av. de María Luisa, s/n, 41013 Sevilla'),
('La Maestranza','Paseo de Cristóbal Colón, 22, 41001 Sevilla'),
('Quintero','Calle Cuna, 15, 41004 Sevilla'),
('El Teatro de Triana','Calle Condes de Bustillo, 17, 41010 Sevilla');
--
-- Volcado de datos para tabla ESPECTACULO
--
INSERT INTO `ESPECTACULO` (`NOMBRE`,`PRODUCTOR`,`GASTOS`,`ID_CATEGORIA`,`CODIGO_OBRA`,`CIF_COMPANIA`) VALUES
('La llamada El Musical','Mariano Blanes Arguelles','15600','2','3','B32212532'),
('La Celestina','Guillermo Casanova Cruces','24100','6','2','K64801160'),
('Hamlet','Paula Blanco Almansa','47400','7','1','P61657821'),
('Billy Elliot','Jose Ignacio Ulloa Bautista','32300','2','4','B32212532'),
('Billy Elliot La Parodia','Rafael Fabregat Folch','12000','1','4','G44106268'),
('Lo invisible','Fernando Salvador','3864','10','6','V0723490I'),
('Show de comedia femenina','Penny JayG','5640','1','7','V0723490I');
--
-- Volcado de datos para tabla BUTACA
--
INSERT INTO `BUTACA` (`FILA`,`NUMERO`,`COEF_PRECIO`,`ZONA`,`ID_TEATRO`) VALUES
('1','1','2','PALCO','1'),
('1','2','2','PALCO','1'),
('1','3','2','PALCO','1'),
('1','4','2','PALCO','1'),
('1','5','2','PALCO','1'),
('1','1','1.7','PARAISO','1'),
('1','2','1.7','PARAISO','1'),
('1','3','1.7','PARAISO','1'),
('1','4','1.7','PARAISO','1'),
('1','5','1.7','PARAISO','1'),
('1','6','1.7','PARAISO','1'),
('1','7','1.7','PARAISO','1'),
('1','1','1.3','ANFITEATRO','1'),
('1','2','1.3','ANFITEATRO','1'),
('1','3','1.3','ANFITEATRO','1'),
('1','4','1.3','ANFITEATRO','1'),
('1','5','1.3','ANFITEATRO','1'),
('2','1','1.3','ANFITEATRO','1'),
('2','2','1.3','ANFITEATRO','1'),
('2','3','1.3','ANFITEATRO','1'),
('2','4','1.3','ANFITEATRO','1'),
('2','5','1.3','ANFITEATRO','1'),
('1','1','1','PLATEA','1'),
('1','2','1','PLATEA','1'),
('1','3','1','PLATEA','1'),
('1','4','1','PLATEA','1'),
('1','5','1','PLATEA','1'),
('1','6','1','PLATEA','1'),
('2','1','1','PLATEA','1'),
('2','2','1','PLATEA','1'),
('2','3','1','PLATEA','1'),
('2','4','1','PLATEA','1'),
('2','5','1','PLATEA','1'),
('2','6','1','PLATEA','1'),
('3','1','1','PLATEA','1'),
('3','2','1','PLATEA','1'),
('3','3','1','PLATEA','1'),
('3','4','1','PLATEA','1'),
('3','5','1','PLATEA','1'),
('3','6','1','PLATEA','1'),
('1','1','2.2','PALCO','2'),
('1','2','2.2','PALCO','2'),
('1','3','2.2','PALCO','2'),
('1','4','2.2','PALCO','2'),
('1','5','2.2','PALCO','2'),
('1','6','2.2','PALCO','2'),
('1','7','2.2','PALCO','2'),
('1','1','1.8','PARAISO','2'),
('1','2','1.8','PARAISO','2'),
('1','3','1.8','PARAISO','2'),
('1','4','1.8','PARAISO','2'),
('1','5','1.8','PARAISO','2'),
('1','1','1.4','ANFITEATRO','2'),
('1','2','1.4','ANFITEATRO','2'),
('1','3','1.4','ANFITEATRO','2'),
('1','4','1.4','ANFITEATRO','2'),
('1','5','1.4','ANFITEATRO','2'),
('1','1','1','PLATEA','2'),
('1','2','1','PLATEA','2'),
('1','3','1','PLATEA','2'),
('1','4','1','PLATEA','2'),
('1','5','1','PLATEA','2'),
('1','6','1','PLATEA','2'),
('2','1','1','PLATEA','2'),
('2','2','1','PLATEA','2'),
('2','3','1','PLATEA','2'),
('2','4','1','PLATEA','2'),
('2','5','1','PLATEA','2'),
('2','6','1','PLATEA','2'),
('1','1','1.8','PALCO','3'),
('1','2','1.8','PALCO','3'),
('1','3','1.8','PALCO','3'),
('1','4','1.8','PALCO','3'),
('1','5','1.8','PALCO','3'),
('1','6','1.8','PALCO','3'),
('1','7','1.8','PALCO','3'),
('1','1','1.6','PARAISO','3'),
('1','2','1.6','PARAISO','3'),
('1','3','1.6','PARAISO','3'),
('1','4','1.6','PARAISO','3'),
('1','5','1.6','PARAISO','3'),
('1','6','1.6','PARAISO','3'),
('1','7','1.6','PARAISO','3'),
('2','1','1.6','PARAISO','3'),
('2','2','1.6','PARAISO','3'),
('2','3','1.6','PARAISO','3'),
('2','4','1.6','PARAISO','3'),
('2','5','1.6','PARAISO','3'),
('1','1','1.2','ANFITEATRO','3'),
('1','2','1.2','ANFITEATRO','3'),
('1','3','1.2','ANFITEATRO','3'),
('1','4','1.2','ANFITEATRO','3'),
('1','5','1.2','ANFITEATRO','3'),
('2','1','1.2','ANFITEATRO','3'),
('2','2','1.2','ANFITEATRO','3'),
('2','3','1.2','ANFITEATRO','3'),
('2','4','1.2','ANFITEATRO','3'),
('2','5','1.2','ANFITEATRO','3'),
('1','1','1','PLATEA','3'),
('1','2','1','PLATEA','3'),
('1','3','1','PLATEA','3'),
('1','4','1','PLATEA','3'),
('1','5','1','PLATEA','3'),
('1','6','1','PLATEA','3'),
('2','1','1','PLATEA','3'),
('2','2','1','PLATEA','3'),
('2','3','1','PLATEA','3'),
('2','4','1','PLATEA','3'),
('2','5','1','PLATEA','3'),
('2','6','1','PLATEA','3'),
('3','1','1','PLATEA','3'),
('3','2','1','PLATEA','3'),
('3','3','1','PLATEA','3'),
('3','4','1','PLATEA','3'),
('3','5','1','PLATEA','3'),
('3','6','1','PLATEA','3'),
('4','1','1','PLATEA','3'),
('4','2','1','PLATEA','3'),
('4','3','1','PLATEA','3'),
('4','4','1','PLATEA','3'),
('4','5','1','PLATEA','3'),
('4','6','1','PLATEA','3'),
('1','1','1','PALCO','4'),
('1','2','1','PALCO','4'),
('1','3','1','PALCO','4'),
('1','4','1','PALCO','4'),
('1','5','1','PALCO','4'),
('1','6','1','PALCO','4'),
('1','7','1','PALCO','4'),
('1','1','1.6','PARAISO','4'),
('1','2','1.6','PARAISO','4'),
('1','3','1.6','PARAISO','4'),
('1','4','1.6','PARAISO','4'),
('1','5','1.6','PARAISO','4'),
('1','6','1.6','PARAISO','4'),
('1','7','1.6','PARAISO','4'),
('2','1','1.6','PARAISO','4'),
('2','2','1.6','PARAISO','4'),
('2','3','1.6','PARAISO','4'),
('2','4','1.6','PARAISO','4'),
('2','5','1.6','PARAISO','4'),
('2','6','1.6','PARAISO','4'),
('2','7','1.6','PARAISO','4'),
('1','1','1.2','ANFITEATRO','4'),
('1','2','1.2','ANFITEATRO','4'),
('1','3','1.2','ANFITEATRO','4'),
('1','4','1.2','ANFITEATRO','4'),
('1','5','1.2','ANFITEATRO','4'),
('2','1','1.2','ANFITEATRO','4'),
('2','2','1.2','ANFITEATRO','4'),
('2','3','1.2','ANFITEATRO','4'),
('2','4','1.2','ANFITEATRO','4'),
('2','5','1.2','ANFITEATRO','4'),
('1','1','1','PLATEA','4'),
('1','2','1','PLATEA','4'),
('1','3','1','PLATEA','4'),
('1','4','1','PLATEA','4'),
('1','5','1','PLATEA','4'),
('1','6','1','PLATEA','4'),
('2','1','1','PLATEA','4'),
('2','2','1','PLATEA','4'),
('2','3','1','PLATEA','4'),
('2','4','1','PLATEA','4'),
('2','5','1','PLATEA','4'),
('2','6','1','PLATEA','4'),
('3','1','1','PLATEA','4'),
('3','2','1','PLATEA','4'),
('3','3','1','PLATEA','4'),
('3','4','1','PLATEA','4'),
('3','5','1','PLATEA','4'),
('3','6','1','PLATEA','4'),
('4','1','1','PLATEA','4'),
('4','2','1','PLATEA','4'),
('4','3','1','PLATEA','4'),
('4','4','1','PLATEA','4'),
('4','5','1','PLATEA','4'),
('4','6','1','PLATEA','4');
--
-- Volcado de datos para tabla REPRESENTACION
--
INSERT INTO `REPRESENTACION` (`FECHA`,`ADAPTADA`,`PRECIO_BASE`,`COD_ESPECTACULO`,`COD_TEATRO`) VALUES
('2020-03-02','N','35.5','1','1'),
('2020-03-03','N','35.5','1','1'),
('2020-03-04','N','35.5','1','1'),
('2020-03-05','N','35.5','1','1'),
('2020-03-06','N','35.5','1','1'),
('2020-03-07','N','35.5','1','1'),
('2020-03-08','N','35.5','1','1'),
('2020-08-29','N','55.5','2','2'),
('2020-08-30','N','55.5','2','2'),
('2020-04-14','S','38.8','3','2'),
('2020-11-09','N','45.5','4','2'),
('2020-02-05','S','20.6','5','2'),
('2020-02-06','S','20.6','5','2'),
('2020-02-07','S','20.6','5','2'),
('2020-04-12','S','38.8','3','3'),
('2020-04-13','S','48.8','3','3'),
('2020-04-15','N','48.8','3','3'),
('2020-02-08','S','20.6','5','3'),
('2020-02-09','S','20.6','5','3'),
('2020-02-10','S','20.6','5','3'),
('2020-02-14','S','6','7','4'),
('2020-02-11','S','12','6','4'),
('2020-02-12','S','12','6','4'),
('2020-02-13','S','6','7','4');

--
-- Volcado de datos para tabla ENTRADA
--
INSERT INTO `ENTRADA` (`ADAPTADA`,`PRECIO_BASE`,`COD_BUTACA`,`COD_REPRESENTACION`) VALUES
('N','71','5','4'),
('N','46.15','19','4'),
('N','103','70','16'),
('N','103','71','16'),
('N','103','72','16'),
('N','103','73','16'),
('N','103','74','16'),
('N','144.20','70','19'),
('N','144.20','71','19'),
('N','144.20','72','19'),
('N','144.20','84','19'),
('N','144.20','85','19'),
('N','144.20','86','19'),
('N','144.20','87','19'),
('S','37.08','79','15');
--
-- Volcado de datos para tabla E_INDIVIDUAL
--
INSERT INTO `E_INDIVIDUAL` (`CODIGO_ENTRADA`,`TIPO`) VALUES
('1','PALCO'),
('2','ANFITEATRO'),
('15','PARAISO');
--
-- Volcado de datos para tabla E_GRUPAL
--
INSERT INTO `E_GRUPAL` (`CODIGO_ENTRADA`,`NUM_PERSONAS`) VALUES
('3','5'),
('4','5'),
('5','5'),
('6','5'),
('7','5'),
('8','7'),
('9','7'),
('10','7'),
('11','7'),
('12','7'),
('13','7'),
('14','7');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

