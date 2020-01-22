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
    document.querySelector("#navListaEntradas").addEventListener("click", () => muestraEnPantalla("listaEntrada"));
    document.querySelector("#navAgregarRepresentacion").addEventListener("click", () => muestraEnPantalla("formularioRepresentacion"));
    document.querySelector("#navAgregarEspectaculo").addEventListener("click", () => muestraEnPantalla("formularioEspectaculo"));
}

function muestraEnPantalla(elem) {
    if (elem.includes("formulario")) { // Si se pide un formulario, busca en el archivo formularios y lo añade a la web
        leeArchivoXMLHTML("./html/formularios.html", (formulario) => agregaForm(elem,formulario));
    } else { 
        // Añade la tabla con el listado correspondiente
    }
}

// Añade un formulario a la vista
function agregaForm(elem,form) {
    if (elementoExiste("#formularios > form")) {
        document.querySelector("#formularios > form").remove();
    }
    document.querySelector("#formularios").append(form.querySelector("#" + elem));
    document.querySelector("body").classList.remove("grande");
    switch(elem){
    	case "formularioEntrada":
    		// Select representacion
    		upoTeatro.teatros.forEach( teatro => {
    			teatro.representaciones.forEach(representacion =>{
    				let opcion = document.createElement("option");
    				opcion.value = representacion.codigo;
    				opcion.textContent = teatro.nombre + " | " + representacion.toString();
    				document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);
    			});
    		});
    		// Select multiple butacas
    		let seleccionButaca= document.querySelector("#formularioEntrada #butacaSeleccionada");
    		
    		// Tipo de entrada
    		document.querySelector("#tipoEntrada0 ~ label").addEventListener("click",(e)=>{seleccionButaca.removeAttribute('multiple');});
    		document.querySelector("#tipoEntrada1 ~ label").addEventListener("click",(e)=>{seleccionButaca.setAttribute('multiple',true);});
    	break;
    }
}
