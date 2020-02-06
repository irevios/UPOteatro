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


// Eventos del menú
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

function seleccionaActivo(elem) {
    document.querySelector("#navBar .active").classList.remove("active");
    if (elem.includes("Entrada")) {
        document.querySelector("#navBar .nav-item:nth-child(2)").classList.add("active");
    }
    if (elem.includes("Representacion")) {
        document.querySelector("#navBar .nav-item:nth-child(3)").classList.add("active");
    }
    if (elem.includes("Espectaculo")) {
        document.querySelector("#navBar .nav-item:nth-child(4)").classList.add("active");
    }
}

function muestraEnPantalla(elem) {
    seleccionaActivo(elem);
    // La cabecera se reduce
    document.querySelector("body").classList.remove("grande");

    // Si ya hay un formulario en pantalla, lo oculta
    if (elementoExiste("#formularios > form")) {
        document.querySelector("#formularios > form").classList.add("oculta");
    }
    // Si ya hay un listado en pantalla, lo oculta
    if (elementoExiste("#formularios > .table-responsive")) {
        document.querySelector("#formularios > .table-responsive").classList.add("oculta");
        document.querySelector("#formularios").querySelector(".filtro").classList.add("oculta");
    }
    // Si se pide un formulario, busca en el archivo formularios y lo añade a la web, si no añade un listado
    if (elem.includes("formulario")) {
        Ajax("./html/formularios.html", (formulario) => agregaForm(elem, formulario), "GET", "");
    } else {
        Ajax("./html/filtros.html", (filtros) => agregaTabla(elem, filtros), "GET", "");
    }
    // Cierra menú después de elegir
    if (getComputedStyle(document.querySelector(".navbar-toggler")).display != "none") {
        document.querySelector(".navbar-toggler").click();
    }

}


function cambiaCabecera(titulo, subtitulo) {
    document.querySelector(".jumbotron strong").textContent = titulo;
    document.querySelector(".jumbotron p").textContent = subtitulo;
}

// Añade un formulario a la vista
function agregaForm(elem, form) {
    switch (elem) {
        case "formularioEntrada":
            cambiaCabecera("Entradas", "Comprar entrada");
            if (elementoExiste("#formularioEntrada")) {
                document.querySelector("#formularioEntrada").classList.remove("oculta");
            } else {
                $("#formularios").load("./ajax/entradas/formularioEntrada.html", () => {
                    $.getScript("./ajax/entradas/entrada.js", () => rellenaFormEntrada());
                });
            }
            break;
        case "formularioRepresentacion":
            cambiaCabecera("Representaciones", "Añade representación");
            if (elementoExiste("#formularioRepresentacion")) {
                document.querySelector("#formularioRepresentacion").classList.remove("oculta");
            } else {
                $("#formularios").load("./ajax/representaciones/formularioRepresentacion.html", () => {
                    $.getScript("./ajax/representaciones/representacion.js", () => rellenaFormRepresentacion());
                });
            }
            break;
        case "formularioEspectaculo":
            cambiaCabecera("Espectáculos", "Añade espectáculos");
            if (elementoExiste("#formularioEspectaculo")) {
                document.querySelector("#formularioEspectaculo").classList.remove("oculta");
            } else {
                $("#formularios").load("./ajax/espectaculos/formularioEspectaculo.html", () => {
                    $.getScript("./ajax/espectaculos/espectaculo.js", () => rellenaFormEspectaculo());
                });
            }
    }
    document.querySelector("#formularios").classList = "col-8";
}

function agregaTabla(elem, filtros) {
    let tabla;
    switch (elem) {
        case "listaEntrada":
            agregaFiltros(filtros, "filtrosEntrada");
            cambiaCabecera("Entradas", "Lista de entradas compradas");
            tabla = upoTeatro.listadoEntradas();
            break;
        case "listaRepresentacion":
            agregaFiltros(filtros, "filtrosRepresentacion");
            cambiaCabecera("Representaciones", "Lista de representaciones");
            tabla = upoTeatro.listadoRepresentaciones();
            break;
        case "listaEspectaculo":
            agregaFiltros(filtros, "filtrosEspectaculo");
            cambiaCabecera("Espectáculos", "Lista de espectáculos");
            tabla = upoTeatro.listadoEspectaculos();
            break;
    }
    document.querySelector("#formularios").append(tabla);
    document.querySelector("#formularios").classList = "col-11";
    document.querySelectorAll("th").forEach(header => header.addEventListener("click", ordenaTabla));
}