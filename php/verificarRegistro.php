<?php

$errores = array();

//Si pulsamos el boton de crear informe
//Iniciamos la limpieza y validacion de datos
if (empty($_POST['usuario'])) {

    $errores["user_registro_error"]="El susuario debe estar cubierto";
} else {
    if (preg_match("/^[A-Za-z-0-9]{6,15}$/", $_POST["usuario"])) {


    }
    else{
        $errores["user_registro_error"]="nombre de usuario no válido";
    }
}

if (empty($_POST['contrasena'])) {
    $errores["pass_registro_error"]="La contraseña debe estar cubierta";
} else {
    if (preg_match("/^[A-Za-z-0-9]{6,8}$/", $_POST["contrasena"])) {


    }
    else{
        $errores["pass_registro_error"]="Contraseña no válida";
    }
}


if (empty($_POST['correo'])) {
    $errores["email_registro_error"]="El correo debe estar cubierto";
} else {
    if (filter_var($_POST["correo"],FILTER_VALIDATE_EMAIL)) {


    }
    else{
        $errores["email_registro_error"]="Correo no válido";
    }
}



echo json_encode($errores);
?>