//Lo mismo que en index.html, variables que recogen los datos de usuario
let usuarioLogueado = null;
let rollLogueado = null;
let datosUsuario = null;
let post_selected=null;
if (sessionStorage.getItem("usuarioBlog") != null) {
    usuarioLogueado = sessionStorage.getItem("usuarioBlog")
    rollLogueado = sessionStorage.getItem("rollBlog")
    datosUsuario = JSON.parse(sessionStorage.getItem("datos"));
    post_selected=sessionStorage.getItem("postId")
}
//funcion que muestra los datos de perfil del usuario
function mostrarUserData() {
    document.getElementById("username").textContent = usuarioLogueado;
    document.getElementById("profile_user").textContent = usuarioLogueado;
    document.getElementById("profile_mail").textContent = datosUsuario["correo"];
    document.getElementById("profile_name").value = datosUsuario["nombre"];
    document.getElementById("profile_surname").value = datosUsuario["apellido"];
    document.getElementById("profile_direccion").value = datosUsuario["direccion"];
    document.getElementById("profile_cp").value = datosUsuario["cp"];
    document.getElementById("profile_country").value = datosUsuario["pais"];
    document.getElementById("profile_phone").value = datosUsuario["telefono"];
    document.getElementById("profile_info").value = datosUsuario["info"];
    if (datosUsuario["imagen"] != null) {
        document.getElementById("profile_image").setAttribute("src", "usuarios/" + datosUsuario['id'] + "/" + datosUsuario["imagen"]);
    } else {
        document.getElementById("profile_image").setAttribute("src", "usuarios/default/avatar_2x.png");
    }
}
//Funcion que recarga los datos del usuario en la sesion en caso de que modifique algun campo
function recargarDatosUsuarios() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.response);
            console.log(this.response);
            if (typeof datos["contrasena"] !== "undefined") {
                sessionStorage.setItem('usuarioBlog', datos["usuario"]);
                sessionStorage.setItem('rollBlog', datos["roll"]);
                sessionStorage.setItem("datos", JSON.stringify(datos));
                location.reload();
            } else {
                for (let key in datos) {
                    errorRegistro(key, datos[key]);
                }
            }
        }
    };
    xhttp.open("POST", "php/login.php", false);
    let formData = new FormData();
    formData.append("usuario", datosUsuario["usuario"]);
    formData.append("contrasena", datosUsuario["contrasena"]);
    xhttp.send(formData);
    return false;
}
//Funcion que guarda los cambios en los datos del perfil en la base de datos
function guadarDatos() {
    let nombre = document.getElementById("profile_name").value;
    let apellido = document.getElementById("profile_surname").value;
    let direccion = document.getElementById("profile_direccion").value;
    let cp = document.getElementById("profile_cp").value;
    let pais = document.getElementById("profile_country").value;
    let telefono = document.getElementById("profile_phone").value;
    let info = document.getElementById("profile_info").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let errores = JSON.parse(this.response);
            console.log(this.response);
            if (errores.length > 0) {
                console.log("fallo");
            } else {
                recargarDatosUsuarios();
            }
        }
    };
    xhttp.open("POST", "php/guardarDatos.php", false);
    let formData = new FormData();
    formData.append("id", datosUsuario["id"]);
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("direccion", direccion);
    formData.append("cp", cp);
    formData.append("pais", pais);
    formData.append("telefono", telefono);
    formData.append("info", info);
    xhttp.send(formData);
    return false;
}
//Funcion que borra la cuenta
function borrarCuenta() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            logout();
        }
    };
    xhttp.open("POST", "php/borrarCuenta.php", false);
    let formData = new FormData();
    formData.append("id", datosUsuario["id"]);
    xhttp.send(formData);
    return false;
}
//funcion que muestra el contenido de administrador
function mostrarAdminData() {
    let elementos = document.getElementsByClassName("admin_data");
    for (let elemento of elementos) {
        elemento.classList.remove("d-none")
    }
}
//funcion de cerrar sesion
function logout() {
    sessionStorage.removeItem("usuarioBlog");
    sessionStorage.removeItem("rollBlog");
    sessionStorage.removeItem("datos");
    location.reload();
}
//Funcion que se usa para subir la imagen al servidor
function subirImagen() {
    let error = document.getElementById("image_error");
    let archivo = document.getElementById("formImage").files;
    if (archivo.length > 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.response == 1) {
                    recargarDatosUsuarios();
                }
            }
        };
        xhttp.open("POST", "php/subirImagen.php", false);
        let formData = new FormData();
        formData.append("usuario_id", datosUsuario["id"]);
        formData.append("file", archivo[0]);
        xhttp.send(formData);
        return false;
    } else {
        error.textContent = "Debe seleccionar una imagen"
    }
}
//asignacion de ventos
window.onload = function() {
    document.getElementById("logout").addEventListener("click", logout);
    document.getElementById("save_user_profile").addEventListener("click", guadarDatos);
    document.getElementById("subir_imagen_boton").addEventListener("click", subirImagen);
    document.getElementById("delete_account_button").addEventListener("click", borrarCuenta);
    if (usuarioLogueado != null) {
        mostrarUserData();
        if (rollLogueado == "admin") {
            mostrarAdminData();
        }
    } else { //en c
        document.location.href = "index.html";
    }
}