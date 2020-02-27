<?php
// Creamos la conexión al servidor.
$conexion = mysqli_connect("localhost", "root", "", "upoteatro") or die(mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

// Recogemos los datos en la sentencia sql

$datos = json_decode($_POST["datos"]);
$sql = "INSERT INTO entrada VALUES (null,'$datos->adaptada','$datos->cod_representacion')";
$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
// Enviamos los datos si es correcto.
if ($resultado) {
	if($datos->entrada == "INDIVIDUAL")
	{	
		$datos->cod_entrada = $conexion->insert_id;
		$sql = "INSERT INTO e_individual VALUES ('$datos->cod_entrada','$datos->cod_butaca','$datos->tipo')";
		$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
		if ($resultado) {
			echo 0;
		} else{
			echo 1;
		}
	}
	else
	{
		$datos->cod_entrada = $conexion->insert_id;
			foreach ($datos->$cod_butaca as $key) {
				$sql = "INSERT INTO e_grupal VALUES ('$datos->cod_entrada','$key','$datos->num_personas')";
				$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
				if (!$resultado) {
					echo 1;
				}
			}
	}
}

mysqli_close($conexion);


?>

