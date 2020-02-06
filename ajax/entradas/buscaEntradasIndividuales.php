<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos todas las entradas
$sql = "SELECT E.CODIGO, E.ADAPTADA,E.COD_BUTACA,E.COD_REPRESENTACION, I.TIPO FROM E_INDIVIDUAL I, ENTRADA E WHERE I.CODIGO_ENTRADA = E.CODIGO";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$companias = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    $companias[] = $fila;
}

echo json_encode($companias); // Enviamos los datos en forma de json

mysqli_close($conexion);
?>