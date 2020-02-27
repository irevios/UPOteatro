<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Eliminamos los datos en la sentencia sql
$cod_intervalo = $_POST["cod_intervalo"];
$sql = "DELETE FROM representacion WHERE COD_INTERVALO = $cod_intervalo";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

// Enviamos un mensaje por si ocurre un error
if ($resultado) {
    $respuesta["error"]			= 0;
    $respuesta["cod_intervalo"] = $cod_intervalo;
    $respuesta["mensaje"] 		= "Representación eliminada";
} else {
    $respuesta["error"]   = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: " . mysqli_error($conexion);
}
echo json_encode($respuesta);
mysqli_close($conexion);
?>