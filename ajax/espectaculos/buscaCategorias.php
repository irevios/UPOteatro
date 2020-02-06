<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos todas las categorias
$sql = "SELECT * FROM categoria";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$categoria = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    $categoria[] = $fila;
}

echo json_encode($categoria); // Enviamos los datos en forma de json

mysqli_close($conexion);
?>