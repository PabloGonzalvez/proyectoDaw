let usuarioLogueado = null; //variable que recoge el usuario logueado
let rollLogueado = null;
let usuarioId = null //variable que recoge el rol del usuario logueado
//labels de los mensajes de rror
let mensajes_error = ["user_registro_error", "email_registro_error", "pass_registro_error", "registro_error", "login_error"];
//Comprobamos si hay variables de sesion (si el usuario se ha logueado) y asignamos el valor en caso de que asi sea
if (sessionStorage.getItem("usuarioBlog") != null) {
    usuarioLogueado = sessionStorage.getItem("usuarioBlog");
    rollLogueado = sessionStorage.getItem("rollBlog");
    usuarioId = sessionStorage.getItem("usuarioId");
}
//funcion que limpia los labels de errores de la ventana modal
function limpiarErroresModal(labels_errores) {
    for (let i = 0; i < labels_errores.length; i++) {
        document.getElementById(labels_errores[i]).textContent = "";
    }
}
//funcion que muestra contenido mostrable solo a usuario logueados y oculta el boton de iniciar sesion
function mostrarUserData() {
    let elementos = document.getElementsByClassName("user_data");
    for (let elemento of elementos) {
        elemento.classList.remove("d-none")
    }
    document.getElementById("login_signup").classList.add("d-none");
    document.getElementById("username").textContent = usuarioLogueado;
}
//funcion que muestra contenido mostrable solo a usuario logueados con roll de administrador y oculta el boton de iniciar sesion
function mostrarAdminData() {
    let elementos = document.getElementsByClassName("admin_data");
    for (let elemento of elementos) {
        elemento.classList.remove("d-none")
    }
}
//Funcion que valida el formato del campo usuario en el registro
function validarUsuario(usuario) {
    let formato = new RegExp(/^[A-Za-z-0-9]{6,15}$/);
    let error = document.getElementById("user_registro_error");
    let nombre = usuario.value;
    if (formato.test(nombre)) {
        error.innerHTML = "";
    } else {
        error.innerHTML = "Nombre de usuario no válido";
    }
}
//Funcion que valida el formato del campo contrseña en el registro
function validarPassword(usuario) {
    let formato = new RegExp(/^[A-Za-z-0-9]{6,8}$/);
    let error = document.getElementById("pass_registro_error");
    let password = usuario.value;
    if (formato.test(password)) {
        error.innerHTML = "";
    } else {
        error.innerHTML = "Contraseña no válida";
    }
}
//Funcion que valida el formato del campo correo en el registro
function validarMail(correo) {
    let formato = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    let error = document.getElementById("email_registro_error");
    let tick = document.getElementById("tick_email");
    let email = correo.value;
    if (formato.test(email)) {
        error.innerHTML = "";
    } else {
        error.innerHTML = "Correo no válido";
    }
}
//Funcion que permite mostrar/ocultar la contraseña (icono del ojo)
function verPassword() {
    let input = document.getElementById("registro_password");
    if (input.getAttribute("type") == "password") {
        input.setAttribute("type", "text");
    } else {
        input.setAttribute("type", "password");
    }
}
//Funcion que muestra los errores en el formulario de registro dados por la validacion de php,se le pasa el id del span y el mensaje de error
function errorRegistro(id, error) {
    document.getElementById(id).innerHTML = error;
}
//funcion de login, peticion ajax a la base de datos en caso de coincidir usuario y pass crea variables de sesion con los datos de usuario// Mala praxis, se corregira a posteriori
function login() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.response);
            console.log(this.response);
            if (typeof datos["contrasena"] !== "undefined") {
                sessionStorage.setItem('usuarioBlog', datos["usuario"]);
                sessionStorage.setItem('usuarioId', datos["id"]);
                sessionStorage.setItem('rollBlog', datos["roll"]);
                sessionStorage.setItem("datos", JSON.stringify(datos));
                location.href = "main.html";
            } else {
                for (let key in datos) {
                    errorRegistro(key, datos[key]);
                }
            }
        }
    };
    xhttp.open("POST", "php/login.php", false);
    let formData = new FormData();
    formData.append("usuario", document.getElementById("login_user").value);
    formData.append("contrasena", document.getElementById("login_password").value);
    xhttp.send(formData);
    return false;
}
//Funcion que inserta los datos del usuario registrado en base de datos
function insertar() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let errores = JSON.parse(this.response);
            if (Object.keys(errores).length > 0) {
                for (let key in errores) {
                    errorRegistro(key, errores[key]);
                }
            } else {
                limpiarErroresModal(mensajes_error); //Borramos los mensajes de error de la modal
                document.getElementById("form_registro").reset()
                document.getElementById("form_login").reset()
                document.getElementById("confirmacion").click();
            }
        }
    };
    xhttp.open("POST", "php/insertarUsuario.php", false);
    let formData = new FormData();
    formData.append("usuario", document.getElementById("registro_user").value);
    formData.append("contrasena", document.getElementById("registro_password").value);
    formData.append("correo", document.getElementById("registro_email").value);
    xhttp.send(formData);
}
//funcion que envia los datos de registro a validar al servidor
function verificar() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let errores = JSON.parse(this.response);
            if (Object.keys(errores).length > 0) {
                for (let key in errores) {
                    errorRegistro(key, errores[key]);
                }
            } else {
                insertar(); //Si todo va bien llamamos  a la funcion de insertar
            }
        }
    };
    xhttp.open("POST", "php/verificarRegistro.php", false);
    let formData = new FormData();
    formData.append("usuario", document.getElementById("registro_user").value);
    formData.append("contrasena", document.getElementById("registro_password").value);
    formData.append("correo", document.getElementById("registro_email").value);
    xhttp.send(formData);
    return false;
}
//Asignacion de eventos
window.onload = function() {
    document.getElementById("registro_user").addEventListener("blur", function() { validarUsuario(this) });
    document.getElementById("registro_email").addEventListener("blur", function() { validarMail(this) });
    document.getElementById("registro_password").addEventListener("blur", function() { validarPassword(this) });
    document.getElementById("ver_password").addEventListener("click", verPassword);
    document.getElementById("registrarse").addEventListener("click", verificar);
    document.getElementById("login_button").addEventListener("click", login);
    
}