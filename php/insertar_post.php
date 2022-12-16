<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$errores=array();
$media=null;
if(array_key_exists("file",$_FILES)){
    if($_FILES["file"]["error"] == 0) {

        $media = $_FILES["file"]["name"];
    }

} 

try {

    $insertar = $bd->prepare("INSERT INTO post(descripcion,usuario,fecha,categoria,media)
        values(?,?,?,?,?);");
    $insertar->execute(array( $_POST["texto"],intval($_POST["usuario"]), date("Y-m-d H:i:s"),intval($_POST["categoria"]),$media));
        

    if($media != null)   {
        $last_id = $bd->lastInsertId();
        
        $ruta = "../post/" . $last_id . "/";
        mkdir($ruta, 0777, true);
        $fichero = $_FILES["file"]["tmp_name"];
        $destino = $_FILES["file"]["name"];
        move_uploaded_file($fichero, $ruta . $destino);
    } 
    echo json_encode($errores);
    
} catch (PDOException $exc) {
               
    echo json_encode($errores);
}
         
    
 
