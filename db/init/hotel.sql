CREATE DATABASE hotel
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE hotel;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `TELEFONO` varchar(20) DEFAULT NULL,
  `FECHA_REGISTRO` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `FECHA_MODIFICACION` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID`, `NOMBRE`, `EMAIL`, `TELEFONO`, `FECHA_REGISTRO`, `FECHA_MODIFICACION`) VALUES
(1, 'elvis', 'j@correo.com', '60606060', '2024-12-08 17:13:26.355902', '2024-12-08 17:13:26.355902');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `ID` int(11) NOT NULL,
  `NUMERO` varchar(10) NOT NULL,
  `TIPO` varchar(50) NOT NULL,
  `PRECIO` decimal(10,2) NOT NULL,
  `FECHA_REGISTRO` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `FECHA_MODIFICACION` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `IMAGENES` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`IMAGENES`)),
  `NRO_CAMAS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`ID`, `NUMERO`, `TIPO`, `PRECIO`, `FECHA_REGISTRO`, `FECHA_MODIFICACION`, `IMAGENES`, `NRO_CAMAS`) VALUES
(1, '101', 'MATRIMONIAL', '100.00', '2024-12-08 18:20:35.125827', '2024-12-09 01:46:22.672071', '[]', 2),
(2, '102', 'SIMPLE', '50.00', '2024-12-09 17:14:41.588922', '2024-12-09 17:14:41.588922', '[]', 1),
(3, '103', 'DOBLE', '80.00', '2024-12-09 17:14:56.681875', '2024-12-09 17:14:56.681875', '[]', 2),
(4, '104', 'DOBLE', '80.00', '2024-12-09 17:15:06.448457', '2024-12-09 17:15:06.448457', '[]', 2),
(5, '105', 'MATRIMONIAL', '120.00', '2024-12-09 17:15:19.305889', '2024-12-09 17:15:19.305889', '[]', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `ID` int(11) NOT NULL,
  `FECHA_INICIO` date NOT NULL,
  `FECHA_FIN` date NOT NULL,
  `USUARIO_REGISTRO` int(11) DEFAULT NULL,
  `FECHA_REGISTRO` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `FECHA_MODIFICACION` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `ESTADO` enum('PENDIENTE','CONFIRMADO','CANCELADO','PAGADO','CHECK_IN','CHECK_OUT') NOT NULL DEFAULT 'PENDIENTE',
  `HABITACION_ID` int(11) NOT NULL,
  `CLIENTE_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`ID`, `FECHA_INICIO`, `FECHA_FIN`, `USUARIO_REGISTRO`, `FECHA_REGISTRO`, `FECHA_MODIFICACION`, `ESTADO`, `HABITACION_ID`, `CLIENTE_ID`) VALUES
(1, '2024-12-08', '2024-12-08', NULL, '2024-12-08 18:23:30.054369', '2024-12-09 01:12:40.406097', 'PENDIENTE', 1, 1),
(2, '2024-12-08', '2024-12-08', NULL, '2024-12-08 18:57:45.211983', '2024-12-08 18:57:45.211983', 'PENDIENTE', 1, 1),
(3, '2024-12-08', '2024-12-10', NULL, '2024-12-09 01:48:54.495513', '2024-12-09 01:52:05.070010', 'PENDIENTE', 1, 1),
(4, '2024-12-03', '2024-12-18', NULL, '2024-12-09 01:51:06.535555', '2024-12-09 01:52:05.085627', 'PENDIENTE', 1, 1),
(5, '2024-12-09', '2024-12-09', NULL, '2024-12-09 02:00:37.959204', '2024-12-09 02:16:33.898654', 'PENDIENTE', 1, 1),
(6, '2024-12-09', '2024-12-09', NULL, '2024-12-09 02:16:17.396101', '2024-12-09 02:16:17.396101', 'PENDIENTE', 1, 1),
(7, '2024-12-10', '2024-12-13', NULL, '2024-12-09 17:26:25.426271', '2024-12-09 17:26:25.426271', 'PENDIENTE', 1, 1),
(8, '2024-12-10', '2024-12-14', NULL, '2024-12-09 18:04:26.808804', '2024-12-09 18:04:26.808804', 'PENDIENTE', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(150) NOT NULL,
  `DESCRIPCION` varchar(250) NOT NULL,
  `PRECIO` decimal(2,0) NOT NULL,
  `FECHA_REGISTRO` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `FECHA_MODIFICACION` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`ID`, `NOMBRE`, `DESCRIPCION`, `PRECIO`, `FECHA_REGISTRO`, `FECHA_MODIFICACION`) VALUES
(2, 'NOMBRE', 'Descripcion de Ejemplo', '0', '2024-11-21 21:08:24.178000', '2024-11-21 21:08:24.195814');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `USUARIO` varchar(50) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL,
  `PASSWORD` varchar(150) NOT NULL,
  `FECHA_REGISTRO` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `FECHA_MODIFICACION` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `ROL` enum('ADM','CLIENTE') NOT NULL DEFAULT 'CLIENTE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `USUARIO`, `NOMBRE`, `PASSWORD`, `FECHA_REGISTRO`, `FECHA_MODIFICACION`, `ROL`) VALUES
(1, 'javier', 'javier', '468a1934f235b7cea545501f273a229d8413a05eebb4f44fe269596aa7d061b0cfe070bbb2fca650babf5c38aad3fa5cb73509d83de4e8fcdd73969a06e3906f', '2024-11-21 20:32:18.902455', '2024-12-08 23:05:58.181485', 'ADM'),
(2, 'edhuin', 'edhuin', '69514f52c8695261915ae49717dd4ee3b464c3810ec0696e5fedfa9953d083cb18e6e92efde354e4939cd7ebf2c910bbb878de6c04872641c9a309fd10f1d778', '2024-11-21 21:38:51.811459', '2024-12-09 17:45:18.296062', 'ADM'),
(3, 'xavier', 'Xavier', '468a1934f235b7cea545501f273a229d8413a05eebb4f44fe269596aa7d061b0cfe070bbb2fca650babf5c38aad3fa5cb73509d83de4e8fcdd73969a06e3906f', '2024-12-08 22:27:36.396263', '2024-12-08 22:54:40.928915', 'CLIENTE'),
(4, 'elvis', 'Elvis', '468a1934f235b7cea545501f273a229d8413a05eebb4f44fe269596aa7d061b0cfe070bbb2fca650babf5c38aad3fa5cb73509d83de4e8fcdd73969a06e3906f', '2024-12-08 22:52:09.138199', '2024-12-08 22:54:40.930798', 'CLIENTE'),
(5, 'alex', 'Alex', '468a1934f235b7cea545501f273a229d8413a05eebb4f44fe269596aa7d061b0cfe070bbb2fca650babf5c38aad3fa5cb73509d83de4e8fcdd73969a06e3906f', '2024-12-08 22:58:19.442232', '2024-12-08 22:58:19.442232', 'CLIENTE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_066c70ce7f00ea835f3fea1561b` (`USUARIO_REGISTRO`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IDX_4f6feaf2bbefb44b6fbfd71b03` (`USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `FK_066c70ce7f00ea835f3fea1561b` FOREIGN KEY (`USUARIO_REGISTRO`) REFERENCES `usuario` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;