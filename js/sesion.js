// En este documento se define las funciones relacionadas con la sesion del usuario.
"use strict";

// En la carga de la página
function compruebaSesion() {
    if (esAdmin()) {
        Ajax("./ajax/nav/navAdmin.html", agregaNav, "GET", "");
    } else {
        cargarEventos();
    }
}

function esAdmin() {
    if (getCookie("Admin")) { return true; } else { return false; }
}

function agregaNav(nav) {
    document.querySelector("nav").remove();
    document.querySelector(".container-fluid .col-md-12").insertBefore(nav.querySelector("nav"), document.querySelector(".jumbotron"));
    document.querySelector("#cerrarSesion").addEventListener("click", cierraSesion);
    cargarEventosAdmin();
}

// Click en Acceder como Administrador
document.querySelector("#accederAdmin").addEventListener("click", modalIniciaSesion);

function modalIniciaSesion() {
    document.querySelector(".modal .modal-title").textContent = "Iniciar Sesión";
    document.querySelector("#inicioSesion").classList.add("show");
    document.querySelector(".modal .modal-footer").classList.remove("show");
    document.querySelector("#inicioSesion button").addEventListener("click", compruebaUsuario);
    muestraModal();
}

function compruebaUsuario() {
    let usuario = document.querySelector("#usuario").value;
    let clave = document.querySelector("#clave").value;
    Ajax("./ajax/usuarios/buscaUsuarios.php?usuario=" + usuario + "&clave=" + clave, iniciaSesion, "GET", "");
}

function iniciaSesion(usuario) {
    if (usuario == "Administrador") { // Si el usuario es administrador
        setCookie("Admin", "true", "1");
        location.reload();
    } else if (usuario == "Usuario") { // Si el usuario no tiene permisos
        document.querySelector("form#modalMensaje").reset();
        let error;
        if (!elementoExiste("#errorUsuario")) {
            error = document.createElement("div");
            error.classList.add("errorTexto");
            error.id = "errorUsuario";
        } else {
            error = document.querySelector("#errorUsuario");
        }
        error.textContent = "No tienes privilegios suficientes";
        document.querySelector("#inicioSesion").append(error);
    } else { // Si el usuario no existe
        document.querySelector("form#modalMensaje").reset();
        let error;
        if (!elementoExiste("#errorUsuario")) {
            error = document.createElement("div");
            error.classList.add("errorTexto");
            error.id = "errorUsuario";
        } else {
            error = document.querySelector("#errorUsuario");
        }
        error.textContent = "Usuario incorrecto.";
        document.querySelector("#inicioSesion").append(error);
    }
}

// Click en Cerrar Sesion
function cierraSesion() {
    borraCookie("Admin");
    location.reload();
}