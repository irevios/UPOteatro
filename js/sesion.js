// En este documento se define las funciones relacionadas con la sesion del usuario.
"use strict";

// En la carga de la página
document.addEventListener("ready",compruebaSesion());
var nav;
function compruebaSesion(){
	if(esAdmin()){
		leeDocumento("./acceso/navAdmin.html","navBar");
		setTimeout(agregaNav,0);
	}
}
function esAdmin(){
	if(getCookie("Admin")){ return true;}
	else{ return false; }
}

function agregaNav(){
	document.querySelector("nav").remove();
	document.querySelector(".container-fluid .col-md-12").insertBefore(nav.querySelector("nav"),document.querySelector(".jumbotron"));
	document.querySelector("#cerrarSesion").addEventListener("click",cierraSesion);
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