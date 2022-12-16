<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$errores=array();

$usuario=intval($_POST["usuario"]);
$idpost=intval($_POST["idpost"]);
try {

    $sql = "DELETE FROM favoritos  
        where id_usuario='$usuario' and id_post='$idpost'";

    $bd->query($sql);
        
    echo json_encode($errores);
    
} catch (PDOException $exc) {
               
    echo json_encode($errores);
}
         
    
 
