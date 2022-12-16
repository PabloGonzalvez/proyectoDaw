<?php

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
$datosPost=array();
$errores=array();
$consultaPreparada = $bd->prepare("SELECT P.*,date_format(P.fecha, '%d/%m/%Y') as fecha2,
U.usuario as usuarioid,
U.imagen,
C.nombre as nombrecategoria, 
(select IFNULL('S', 'N')  from Likes L where L.id_post=P.id and L.id_usuario=?) as liked,
(select IFNULL('S', 'N')  from favoritos F where F.id_post=P.id and F.id_usuario=?) as faved
FROM `post` as P 
INNER join usuarios U on P.usuario=U.id
INNER join categorias C on P.categoria=C.id
where P.id=?
;");

$consultaPreparada->execute(array(intval($_POST["usuario"]),intval($_POST["usuario"]),intval($_POST["idpost"])));

if ($consultaPreparada->rowCount() > 0) {
    foreach ($consultaPreparada as $post) {
        $datos=array();
        $datos["id"]=$post["id"];
        $datos["descripcion"]=$post["descripcion"];
        $datos["usuario"]=$post["usuario"];
        $datos["fecha"]=$post["fecha"];
        $datos["fecha2"]=$post["fecha2"];
        $datos["categoria"]=$post["categoria"];
        $datos["media"]=$post["media"];
        $datos["usuarioid"]=$post["usuarioid"];
        $datos["imagen"]=$post["imagen"];
        $datos["liked"]=$post["liked"];
        $datos["faved"]=$post["faved"];
        $datos["nombrecategoria"]=$post["nombrecategoria"];
        
        $datosPost[]=$datos;

    }
    echo json_encode($datosPost);
} else {
    
    $errores["login_error"]="No hay post disponibles en este momento";
    echo json_encode($errores);
}
?>