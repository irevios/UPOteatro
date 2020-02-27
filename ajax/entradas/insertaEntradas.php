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

	if($entrada == "INDIVIDUAL")
	{	
		$sql = "SELECT @@IDENTITY as identity";
		$cod_entrada = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
		if($cod_entrada)
			echo 'console.log('. json_encode( $cod_entrada ) .')';
			$sql = "INSERT INTO e_individual VALUES ('$cod_entrada','$cod_butaca','$tipo')";
		$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
		if ($resultado) {
			echo 0;
		} else{
			echo 1;
		}
	}
	else
	{
		$sql = "SELECT @@IDENTITY as identity";
		$cod_entrada = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
		if($cod_entrada)
		{
			foreach ($cod_butaca as $key) {
				$sql = "INSERT INTO e_grupal VALUES ('$cod_entrada','$cod_butaca.codigo','$num_personas')";
				$resultado = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));
				if (!$resultado) {
					echo 1;
				}
			}
		}
	}
}

mysqli_close($conexion);


?>

