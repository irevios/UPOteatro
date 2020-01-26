// En este documento se define las funciones relacionadas con la sesion del usuario.
"use strict";

// En la carga de la página
function compruebaSesion(){
	if(esAdmin()){
		leeArchivoXMLHTML("./html/navAdmin.html",agregaNav);
	}
	else{
		cargarEventos();
	}
}
function esAdmin(){
	if(getCookie("Admin")){ return true;}
	else{ return false; }
}

function agregaNav(nav){
	document.querySelector("nav").remove();
	document.querySelector(".container-fluid .col-md-12").insertBefore(nav.querySelector("nav"),document.querySelector(".jumbotron"));
	document.querySelector("#cerrarSesion").addEventListener("click",cierraSesion);
	cargarEventosAdmin();
}

// Click en Acceder como Administrador
document.querySelector("#accederAdmin").addEventListener("click",adminAccede);
function adminAccede(){
	setCookie("Admin","true","1");
	location.reload();
}

// Click en Cerrar Sesion
function cierraSesion(){
	borraCookie("Admin");
	location.reload();
}
