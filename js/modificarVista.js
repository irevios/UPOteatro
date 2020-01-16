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

document.addEventListener("load",cargarEventos);
function cargarEventos(){
	document.querySelector("#navComprarEntrada").addEventListener("click", ()=>muestraEnPantalla("formularioEntrada"));
	document.querySelector("#navAgregarRepresentacion").addEventListener("click", ()=>muestraEnPantalla("formularioRepresentacion"));
	document.querySelector("#navListaRepresentaciones").addEventListener("click", ()=>muestraEnPantalla("listaRepresentacion"));
	document.querySelector("#navAgregarEspectaculo").addEventListener("click", ()=>muestraEnPantalla("formularioEspectaculo"));
	document.querySelector("#navListaEspectaculos").addEventListener("click", ()=>muestraEnPantalla("listaEspectaculo"));
}

// function muestraEnPantalla(a){
// 	console.log(a);
// }