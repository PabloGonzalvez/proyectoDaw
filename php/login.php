<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$errores=array();
$consultaPreparada = $bd->prepare("SELECT * FROM usuarios WHERE usuario = ?  ;");

$consultaPreparada->execute(array($_POST["usuario"]));

if ($consultaPreparada->rowCount() > 0) {
    foreach ($consultaPreparada as $usuario) {

        if ($usuario["contrasena"] == $_POST["contrasena"]) {//Si coinciden usuario y pass
            echo json_encode($usuario);
            
        } else {
            $errores["login_error"]="Contraseña erronea";
             echo json_encode($errores);
        }
    }
} else {
    
    $errores["login_error"]="Usuario no encontrado";
    echo json_encode($errores);
}
?>