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
//labels de los mensajes de rror
//funcion que muestra contenido mostrable solo a usuario logueados y oculta el boton de iniciar sesion
function mostrarUserData() {
  let elementos = document.getElementsByClassName("user_data");
  for (let elemento of elementos) {
    elemento.classList.remove("d-none");
  }
  document.getElementById("login_signup").classList.add("d-none");
  document.getElementById("username").textContent = usuarioLogueado;
}
//funcion que muestra contenido mostrable solo a usuario logueados con roll de administrador y oculta el boton de iniciar sesion
function mostrarAdminData() {
  let elementos = document.getElementsByClassName("admin_data");
  for (let elemento of elementos) {
    elemento.classList.remove("d-none");
  }
}
//fncion de cerrar sesion
function logout() {
  usuarioLogueado = sessionStorage.removeItem("usuarioBlog");
  rollLogueado = sessionStorage.removeItem("rollBlog");
  location.reload();
}

function verLikes(){

  location.href='likes.html'
}

function verFavoritos(){

  location.href='favoritos.html'
}

function darlike(idpost){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
    }
  };
  xhttp.open("POST", "php/dar_like.php", false);
  let formData = new FormData();
  formData.append("idpost", idpost);
  formData.append("usuario",usuarioId);
  xhttp.send(formData);
  return false;


}

function quitarlike(idpost){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
    }
  };
  xhttp.open("POST", "php/quitar_like.php", true);
  let formData = new FormData();
  formData.append("idpost", idpost);
  formData.append("usuario",usuarioId);
  xhttp.send(formData);
  return false;


}


function darfav(idpost){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
    }
  };
  xhttp.open("POST", "php/dar_fav.php", false);
  let formData = new FormData();
  formData.append("idpost", idpost);
  formData.append("usuario",usuarioId);
  xhttp.send(formData);
  return false;

}

function quitarfav(idpost){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
    }
  };
  xhttp.open("POST", "php/quitar_fav.php", false);
  let formData = new FormData();
  formData.append("idpost", idpost);
  formData.append("usuario",usuarioId);
  xhttp.send(formData);
  return false;


}


function cargar_post() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      let container = document.getElementById("contenido_post");
      if (datos.length>0){
      
      datos.forEach((element, index, array) => {
        console.log(element.descripcion);
        let media='';
        if (element.media != null) {
            if (element.media.includes('jpg') || element.media.includes('jpeg') || element.media.includes('png')){
                console.log('imagen');
                media='<img class="img-fluid w-100" src="post/'+element.id+'/'+element.media+'" />';
            }
            else{
                media='<div class="ratio ratio-16x9">' +
                '<iframe src="post/'+element.id+'/'+element.media+'?autoplay=0"" allowfullscreen></iframe>' +
                "</div>" ;
            }  
        }
        let buttonlike;

        if (element.liked=='S'){
          buttonlike='<button  class="card-link btn like liked"><i class="bi bi-heart-fill"></i></button><span>Like</span>';
        }
        else{
          buttonlike='<button  class="card-link btn like"><i class="bi bi-heart-fill"></i></button><span>Like</span>';
        }

        let buttonfav;

        if (element.faved=='S'){
          buttonfav='<button class="card-link btn fav faved"><i class="bi bi-star-fill"></i></button><span>Fav</span>';
        }
        else{
          buttonfav='<button class="card-link btn fav"><i class="bi bi-star-fill"></i></button><span>Fav</span>';
        }


        let imagen;
        if (element.imagen != null) {
            imagen='usuarios/' + element.usuario+ '/' + element.imagen;
           
        } else {
            imagen='usuarios/default/avatar_2x.png';
        }
        let html =
          '<div class="card gedf-card">' +
          '<div class="card-header">' +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="d-flex justify-content-between align-items-center">' +
          '<div class="mr-2">' +
          '<img class="rounded-circle" width="45" src="'+imagen+'" alt="">' +
          "</div>" +
          '<div class="ml-2">' +
          '<div class="h5 m-0">'+element.usuarioid+'</div>' +
          '<div class="h7 text-muted"></div>' +
          "</div>" +
          "</div>" +
          "<div>" +
          '<div class="dropdown">' +
          '<button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
          '<i class="bi bi-three-dots"></i>' +
          "</button>" +
          '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">' +
          '<a class="dropdown-item" href="#">Ocultar</a>' +
          '<a class="dropdown-item" href="#">Denunciar</a>' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="card-body">' +
          '<div class="text-muted h7 mb-2"> <i class="bi bi bi-calendar2-week-fill"></i>'+' '+element.fecha2+'</div>' +
          '<p class="card-text">' +element.descripcion +
          "</p>" +
          media+
          '<div class="mt-2">' +
          '<span class="badge badge-primary">'+element.nombrecategoria+'</span>' +
          "</div>" +
          "</div>" +
          '<div class="card-footer d-flex justify-content-around" data-idpost="'+element.id+'">' +
          "<div>" +
          buttonlike+
          "</div>" +
          "<div>" +
          '<button class="card-link btn"><i class="bi bi-chat-fill"></i></button><span>Comentar</span>' +
          "</div>" +
          "<div>" +
          buttonfav+
          "</div>" +
          "<div>" +
          '<button class="card-link btn"><i class="bi bi-share-fill"></i></button><span>Compartir</span>' +
          "</div>" +
          "</div>" +
          "</div>";
        container.innerHTML += html;
        $('.like').click(function() {
          let idpost=parseInt($(this).parent().parent().data("idpost"));
          $(this).toggleClass( "liked" )
          if($(this).hasClass( "liked" )){
            darlike(idpost)
          }
          else{
            quitarlike(idpost)
            location.reload()
          }
        });

        $('.fav').click(function() {
          let idpost=$(this).parent().parent().data("idpost");
          $(this).toggleClass( "faved" )
          if($(this).hasClass( "faved" )){
            darfav(idpost)
          }
          else{
            quitarfav(idpost)

          }
        });
      });

    }
    else{
      let html ='<span>No hay ningún favorito añadido, añada alguno y podras verlo siempre que quieras</span>'
      container.innerHTML+=html;
      
    }
      }
  };
  xhttp.open("POST", "php/cargar_post1.php", true);
  let formData = new FormData();
  formData.append("usuario",usuarioId);
  xhttp.send(formData);
  return false;
}

function cargar_categorias() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
      let select = document.getElementById("post_categoria");
      datos.forEach((element, index, array) => {
        
        let option=document.createElement("option");
        option.setAttribute("value",element.id);
        option.innerHTML=element.nombre;
        select.appendChild(option);
        
      });
    }
  };
  xhttp.open("POST", "php/cargar_categoria.php", false);
  let formData = new FormData();
  xhttp.send(formData);
  return false;
}

function insertarPost(categoria,texto,archivo){

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.response);
      console.log(this.response);
      console.log(datos);
      location.reload();
    }
  };
  xhttp.open("POST", "php/insertar_post.php", false);
  let formData = new FormData();
  formData.append("categoria", categoria);
  formData.append("texto", texto);
  formData.append("usuario",usuarioId);
  
  formData.append("file", archivo.files[0]);
  
  xhttp.send(formData);
  return false;
}

function publicar(){

    let error=document.getElementById("post_error");

    let categoria= document.getElementById("post_categoria").value;

    let texto=document.getElementById("post_text").value;

    let archivo=document.getElementById("post_file");

    if(categoria!='0'){

      if(texto=='' && archivo.files.length==0){
        error.innerHTML='Debe escribir un texto o sleccionar un archivo'
      }
      else{
        error.innerHTML='';
        insertarPost(categoria,texto,archivo);

        
      }
    }
    else{

      error.innerHTML='Debe seleccionar una categoria'
    }

}





//Asignacion de eventos
window.onload = function () {
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("publicar").addEventListener("click", publicar);
  document.getElementById("ver_likes").addEventListener("click", verLikes);
  document.getElementById("ver_favoritos").addEventListener("click", verFavoritos);
  if (usuarioLogueado != null) {
    cargar_categorias();
    cargar_post();
    mostrarUserData(); //Si hay usuario logueado mostramos contenido de usuario
    if (rollLogueado == "admin") {
      mostrarAdminData(); //si el roll del usuario es administrador mostramos contenido de administrador
    }
  } else {
    location.href = "index.html";
  }
};
