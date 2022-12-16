<?php

$id_usuario = $_POST["id"];
$ruta = "../usuarios/" . $id_usuario . "/";
if (is_dir($ruta)) {

    $files = glob($ruta . "*"); 
    foreach ($files as $file) { 
        unlink($file); 

    }
    rmdir($ruta);
} 

try {
    $cadena_conexion = 'mysql:dbname=blogs;host=127.0.0.1';
    $usuario = 'root';
    $password = '';
    $bd = new PDO($cadena_conexion, $usuario, $password);

    $sql = "DELETE FROM usuarios   
        where id='$id_usuario' ";

    $bd->query($sql);
    echo 1;
} catch (PDOException $exc) {
    echo $exc;
     
}



?>