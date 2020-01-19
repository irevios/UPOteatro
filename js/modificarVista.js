// En este documento se define las funciones que cambian el aspecto de la web según que opcion eligamos.
"use strict";
/*
	Guia de enlaces-formularios
--------------------------------------------
	#navInicio  - Vuelve al inicio de la página.

	-- Entradas -- 
	#navComprarEntrada - Formulario para crear entrada.
	#navListaEntradas - Muestra las entradas vendidas con una X para borrar y un lapiz para editar.

	-- Representaciones --
	#navAgregarRepresentacion - Formulario para crear representación.
	#navListaRepresentaciones - Muestra las representaciones con una X para borrar y un lapiz para editar.

	-- Espectaculos --
	#navAgregarEspectaculo - Formulario para crear un espectáculo.
	#navListaEspectaculos - Muestra los espectáculos con una X para borrar y un lapiz para editar.

*/

document.addEventListener("load", cargarEventos());

function cargarEventos() {
    document.querySelector("#navComprarEntrada").addEventListener("click", () => muestraEnPantalla("formularioEntrada"));
    document.querySelector("#navListaRepresentaciones").addEventListener("click", () => muestraEnPantalla("listaRepresentacion"));
    document.querySelector("#navListaEspectaculos").addEventListener("click", () => muestraEnPantalla("listaEspectaculo"));
}

function cargarEventosAdmin() {
    cargarEventos();
    document.querySelector("#navAgregarRepresentacion").addEventListener("click", () => muestraEnPantalla("formularioRepresentacion"));
    document.querySelector("#navListaEntradas").addEventListener("click", () => muestraEnPantalla("listaEntrada"));
    document.querySelector("#navAgregarEspectaculo").addEventListener("click", () => muestraEnPantalla("formularioEspectaculo"));
}

var form;
function muestraEnPantalla(elem) {
    if (elem.includes("formulario")) { // Si se pide un formulario, busca en el archivo formularios y lo añade a la web
        form = cargarFicheroAFuncion("./html/formularios.html", () => agregaForm(elem));
    } else { 
        // Añade la tabla con el listado correspondiente
    }
}

// Añade un formulario a la vista
function agregaForm(elem) {
    if (elementoExiste("#formularios > form")) {
        document.querySelector("#formularios > form").remove();
    }
    document.querySelector("#formularios").append(form.querySelector("#" + elem));
    document.querySelector(".jumbotron").classList.remove("grande");
    // Luego completa los select con sus datos
    // ...
}
