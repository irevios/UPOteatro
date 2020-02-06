<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_query($conexion, "utf8");

// Comprobamos si existe el usuario
$sql = "SELECT * FROM usuarios where usuario = '" . $_GET["usuario"] . "' AND clave = '" . $_GET["clave"] . "'";
$resultado = mysqli_query($conexion, $sql);
$usuario   = mysqli_fetch_assoc($resultado);

echo $usuario["permisos"]; // Enviamos los permisos del usuario encontrado

mysqli_close($conexion);
?>