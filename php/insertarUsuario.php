<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$errores=array();
$consultaPreparada = $bd->prepare("SELECT * FROM usuarios WHERE usuario = ?  ;");

$consultaPreparada->execute(array($_POST["usuario"]));

if ($consultaPreparada->rowCount() == 0) {
    $consultaPreparada2 = $bd->prepare("SELECT * FROM usuarios WHERE correo = ?  ;");
    $consultaPreparada2->execute(array($_POST["correo"]));
    if ($consultaPreparada2->rowCount() == 0) {
            try {

                $insertar = $bd->prepare("INSERT INTO usuarios(usuario,contrasena,correo,roll)
                    values(?,?,?,?);");
                $insertar->execute(array( $_POST["usuario"], $_POST["contrasena"], $_POST["correo"], "user"));
                echo json_encode($errores);
            } catch (PDOException $exc) {
                
                 echo json_encode($errores);
            }
        }
        else{

            $errores["email_registro_error"]="Correo no disponible";
            echo json_encode($errores);       
        }   
    
} else {
    $errores["user_registro_error"]="Nombre de usuario no disponible";
    echo json_encode($errores);
}
