<?php

// Recogemos los datos
$datosJSON = $_POST["usuarios"];
$usuarios = json_decode($datosJSON);

// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Insertamos todos los datos en la tabla Usuarios
foreach ($usuarios as $usuario) {
    $sql       = "INSERT IGNORE INTO usuario VALUES ('" . $usuario->nombre . "','" . $usuario->clave . "','" . $usuario->tipo . "')";
    $resultado = mysqli_query($conexion, $sql);
}

// Enviamos un mensaje por si ocurre un error
if ($resultado) {
    $respuesta["error"]   = 0;
    $respuesta["mensaje"] = "Alta realizada";
} else {
    $respuesta["error"]   = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: " . mysqli_error($conexion);
}

echo json_encode($respuesta); // Enviamos el resultado

mysqli_close($conexion);
?>