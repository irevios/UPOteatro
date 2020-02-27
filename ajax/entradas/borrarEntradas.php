<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Eliminamos los datos en la sentencia sql
extract($_POST);
$sql = "DELETE FROM entrada WHERE codigo = $id";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

// Enviamos un mensaje por si ocurre un error
if ($resultado) {
    $respuesta["error"]   = 0;
    $respuesta["id"]   = $id;
    $respuesta["mensaje"] = "Entrada eliminada";
} else {
    $respuesta["error"]   = 1;
    $respuesta["mensaje"] = "Error en el proceso: " . mysqli_error($conexion);
}
echo json_encode($respuesta);
mysqli_close($conexion);
?>