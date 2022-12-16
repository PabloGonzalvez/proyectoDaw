<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$errores=array();


try {

    $insertar = $bd->prepare("INSERT INTO comentarios(id_post,usuario,comentario)
        values(?,?,?);");
    $insertar->execute(array( $_POST["idpost"],intval($_POST["usuario"]),$_POST["comentario"]));
        
    echo json_encode($errores);
    
} catch (PDOException $exc) {
               
    echo json_encode($errores);
}
         
    
 
