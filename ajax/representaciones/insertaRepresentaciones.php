<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos los datos en la sentencia sql
$sql = "INSERT INTO representacion VALUES ";
foreach (json_decode($_POST["datos"]) as $value) {
	$dato = json_decode($value);
	$sql .= "('$dato->codigo','$dato->fecha','$dato->adaptada','$dato->precioBase','$dato->espectaculo','$dato->teatro','$dato->intervalo'),";
}

$resultado = mysqli_query($conexion, substr($sql, 0,-1)) or die(mysqli_error($conexion));

if ($resultado) {
	echo 0;
} else{
	echo 1;
}

 mysqli_close($conexion);
?>

