<?php
$response = 0;
$nombreUsuario=$_POST["nombre"];
$bioUsuario=$_POST["bio"];
$id_usuario = $_POST["usuario"];

$cadena_conexion = 'mysql:dbname=youpost;host=127.0.0.1';
$usuario = 'root';
$password = '';
$bd = new PDO($cadena_conexion, $usuario, $password);
if(array_key_exists("file",$_FILES)){
    if ($_FILES["file"]["error"] == 0) {

       
        $ruta = "../usuarios/" . $id_usuario . "/";
        if (is_dir($ruta)) {

            $files = glob($ruta . "*"); 
            foreach ($files as $file) { 
                unlink($file); 

            }
        } else {

            mkdir($ruta, 0777, true);
        }


        $fichero = $_FILES["file"]["tmp_name"];
        $destino = $_FILES["file"]["name"];

        try {
            move_uploaded_file($fichero, $ruta . $destino);

            

            $sql = "UPDATE usuarios SET 
                   imagen = '$destino' ,
                   nombre='$nombreUsuario',
                   info='$bioUsuario'
                where id='$id_usuario' ";

            $bd->query($sql);
        

            $response = 1;
        } catch (PDOException $exc) {
            echo "No se pudo subir el archivo corectamente.El motivo del error es :<br>";
            echo "$exc" . "<br>";
        }
    }
}

else{
    try {
        $sql = "UPDATE usuarios SET 
               nombre='$nombreUsuario',
               info='$bioUsuario'
            where id='$id_usuario' ";

        $bd->query($sql);
    

        $response = 1;
    } catch (PDOException $exc) {
        echo "error :<br>";
        echo "$exc" . "<br>";
    }


}
echo $response;
