<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos todas las compañías
$sql = "SELECT CODIGO,NOMBRE,PRODUCTOR,GASTOS,(SELECT NOMBRE FROM categoria WHERE CODIGO = e.ID_CATEGORIA) AS CATEGORIA,CODIGO_OBRA,CIF_COMPANIA FROM espectaculo e";
$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

$companias = [];

while ($fila = mysqli_fetch_assoc($resultados)) {
    $companias[] = $fila;
}

echo json_encode($companias); // Enviamos los datos en forma de json

mysqli_close($conexion);
?>