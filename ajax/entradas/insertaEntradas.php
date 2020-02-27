<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos los datos en la sentencia sql
extract($_POST);
$sql = "INSERT INTO entrada VALUES (null,'$adaptada','$cod_representacion')";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

// Enviamos los datos si es correcto.
if ($resultado) {
	$codigo = $conexion->insert_id;
	$datos = array("codigo"=>$codigo,"adaptada"=>$adaptada,"cod_representacion"=>$cod_representacion);
	echo json_encode($datos);
}

mysqli_close($conexion);


?>

