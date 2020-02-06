<?php
$datosJSON = $_POST["usuarios"];

$usuarios = json_decode($datosJSON);

// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "","upoteatro") or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");
foreach ($usuarios as $usuario) {
$sql = "INSERT IGNORE INTO usuarios VALUES ('".$usuario->nombre."','". $usuario->clave."','".$usuario->tipo."')";
$resultado = mysqli_query($conexion,$sql);
}

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>