<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos los datos en la sentencia sql
extract($_POST);
$sql = "INSERT INTO espectaculo VALUES (null,'$nombre','$productor',$gastos,$categoria,$obra,'$compania')";

$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

// Enviamos los datos si es correcto.
if ($resultado) {
	$codigo = $conexion->insert_id;
	$datos = array("codigo"=>$codigo,"nombre"=>$nombre,"productor"=>$productor,"gastos"=>$gastos,"categoria"=>$categoria,"obra"=>$obra,"compania"=>$compania);
	echo json_encode($datos);
}

mysqli_close($conexion);
?>