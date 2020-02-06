<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos todas las obras
$sql = "SELECT * FROM obra";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$obras = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    $obras[] = $fila;
}

echo json_encode($obras); // Enviamos los datos en forma de json

mysqli_close($conexion);
?>