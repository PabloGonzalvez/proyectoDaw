<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$datosPost=array();
$errores=array();
$consultaPreparada = $bd->prepare("SELECT date_format(C.fecha, '%d/%m/%Y') as fecha2,
C.comentario as comentario,
C.usuario as usuarioid,
U.usuario as nombreusuario,
U.imagen

FROM comentarios as C
INNER join usuarios U on C.usuario=U.id

where C.id_post=?
;");

$consultaPreparada->execute(array(intval($_POST["idpost"])));

if ($consultaPreparada->rowCount() > 0) {
    foreach ($consultaPreparada as $post) {
        $datos=array();
        $datos["comentario"]=$post["comentario"];
        $datos["nombreusuario"]=$post["nombreusuario"]; 
        $datos["fecha2"]=$post["fecha2"];
        $datos["imagen"]=$post["imagen"];
        $datos["usuarioid"]=$post["usuarioid"];
        $datosPost[]=$datos;

    }
    echo json_encode($datosPost);
} else {
    
    $errores["login_error"]="No hay comentarios disponibles en este momento";
    echo json_encode($errores);
}
?>