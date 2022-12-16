<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$datosPost=array();
$errores=array();
$consultaPreparada = $bd->prepare("SELECT * FROM `categorias`;");

$consultaPreparada->execute();

if ($consultaPreparada->rowCount() > 0) {
    foreach ($consultaPreparada as $post) {
        $datos=array();
        $datos["id"]=$post["id"];
        $datos["nombre"]=$post["nombre"];
        
        $datosPost[]=$datos;

    }
    echo json_encode($datosPost);
} else {
    
    $errores["login_error"]="No hay categorias disponibles en este momento";
    echo json_encode($errores);
}
?>