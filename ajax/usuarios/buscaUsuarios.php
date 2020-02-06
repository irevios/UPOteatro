<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Comprobamos si existe el usuario
$sql = "SELECT * FROM usuario where usuario = '" . $_GET["USUARIO"] . "' AND clave = '" . $_GET["CLAVE"] . "'";
$resultado = mysqli_query($conexion, $sql);
$usuario   = mysqli_fetch_assoc($resultado);

echo $usuario["PERMISOS"]; // Enviamos los permisos del usuario encontrado

mysqli_close($conexion);
?>