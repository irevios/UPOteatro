// En este documento se define las funciones que cambian el aspecto de la web según que opcion eligamos.
"use strict";

// Eventos del menú
function cargarEventos() {
    document.querySelector("#navComprarEntrada").addEventListener("click", () => muestraEnPantalla("formularioEntradas"));
    document.querySelector("#navListaRepresentaciones").addEventListener("click", () => muestraEnPantalla("listadoRepresentaciones"));
    document.querySelector("#navListaEspectaculos").addEventListener("click", () => muestraEnPantalla("listadoEspectaculos"));
    document.querySelector("#navListaTeatros").addEventListener("click", () => muestraEnPantalla("listadoTeatros"));
    document.querySelector("#navListaObras").addEventListener("click", () => muestraEnPantalla("listadoObras"));
}

function cargarEventosAdmin() {
    cargarEventos();
    document.querySelector("#navListaEntradas").addEventListener("click", () => muestraEnPantalla("listadoEntradas"));
    document.querySelector("#navAgregarRepresentacion").addEventListener("click", () => muestraEnPantalla("formularioRepresentaciones"));
    document.querySelector("#navAgregarEspectaculo").addEventListener("click", () => muestraEnPantalla("formularioEspectaculos"));
    document.querySelector("#navListaCompanias").addEventListener("click", () => muestraEnPantalla("listadoCompanias"));
}

// Cambia el titulo y subtítulo de la cabecera
function cambiaCabecera(titulo, subtitulo) {
    document.querySelector(".jumbotron strong").textContent = titulo;
    document.querySelector(".jumbotron p").textContent = subtitulo;
}

// Deja en activo el apartado del menú correspondiente
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
    if (elem.includes("Teatro")) {
        document.querySelector("#navBar .nav-item:nth-child(5)").classList.add("active");
    }
    if (elem.includes("Obra")) {
        document.querySelector("#navBar .nav-item:nth-child(6)").classList.add("active");
    }
    if (elem.includes("Compania")) {
        document.querySelector("#navBar .nav-item:nth-child(7)").classList.add("active");
    }
}

// Muestra u oculta un formulario o listado
function muestraEnPantalla(elem) {
    seleccionaActivo(elem);
    // La cabecera se reduce
    document.querySelector("body").classList.remove("grande");

    // Si ya hay algo en pantalla, lo oculta
    if (elementoExiste("#formularios > *")) {
        document.querySelectorAll("#formularios > *").forEach(elem => elem.classList.add("oculta"));
    }
    elem.includes("formulario") ? agregaFormulario(elem) : cargaListadoFiltro(elem);

    // Cierra menú después de elegir
    if (getComputedStyle(document.querySelector(".navbar-toggler")).display != "none") {
        document.querySelector(".navbar-toggler").click();
    }
}

// Muestra un formulario
function agregaFormulario(elem) {
    switch (elem) {
        case "formularioEntradas":
            cambiaCabecera("Entradas", "Comprar entrada");
            cargaFormulario(elem, "entradas", "formulario");
            break;
        case "formularioRepresentaciones":
            cambiaCabecera("Representaciones", "Añade representación");
            cargaFormulario(elem, "representaciones", "formulario");
            break;
        case "formularioEspectaculos":
            cambiaCabecera("Espectáculos", "Añade espectáculos");
            cargaFormulario(elem, "espectaculos", "formulario");
            break;
    }
    document.querySelector("#formularios").classList = "col-8";
}

var scriptsCargados = "";

function cargaFormulario(elem, carpeta, tipo) {
    if (elementoExiste("#" + elem)) {
        document.querySelector("#" + elem).classList.remove("oculta");
    } else {
        let nuevo = $("<div id='" + elem + "'></div>").load("./ajax/" + carpeta + "/" + elem + ".html", () => {
            let script = "./ajax/" + carpeta + "/" + carpeta + ".js";
            if (!scriptsCargados.includes(script)) {
                $.getScript(script, () => rellenaForm(tipo));
                scriptsCargados += script;
            } else {
                rellenaForm(tipo);
            }
        });
        $("#formularios").append(nuevo);
    }
}



function cargaListadoFiltro(elem) {
    if($("#"+elem).length > 0){
        $("#"+elem).remove();
    }
    let nuevo = $("<div id='" + elem + "'></div>").load("./ajax/listados/" + elem.replace("listado", "filtros") + ".html", () => {
        if (elem.includes("Entrada") || elem.includes("Representacion") || elem.includes("Espectaculo")) {
            let script = "./ajax/" + elem.toLowerCase().replace("listado", "") + "/" + elem.toLowerCase().replace("listado", "") + ".js";
            if (!scriptsCargados.includes(script)) {
                $.getScript(script);
                scriptsCargados += script;
            }
        }
            agregaFiltros(elem.replace("listado", "filtros"));
            $("#" + elem).append(agregaListado(elem));
            document.querySelector("#" + elem + " table").addEventListener("click", editaElimina);
            document.querySelectorAll(".ordenable").forEach(header => header.addEventListener("click", ordenaTabla));
    });
    $("#formularios").append(nuevo);

    document.querySelector("#formularios").classList = "col-11";
}

function agregaListado(elem) {
    let tabla;
    switch (elem) {
        case "listadoEntradas":
            cambiaCabecera("Entradas", "Lista de entradas compradas");
            tabla = upoTeatro.listadoEntradas();
            break;
        case "listadoRepresentaciones":
            cambiaCabecera("Representaciones", "Lista de representaciones");
            tabla = upoTeatro.listadoRepresentaciones();
            break;
        case "listadoEspectaculos":
            cambiaCabecera("Espectáculos", "Lista de espectáculos");
            tabla = upoTeatro.listadoEspectaculos();
            break;
        case "listadoTeatros":
            cambiaCabecera("Teatros", "Lista de teatros");
            tabla = upoTeatro.listadoTeatros();
            break;
        case "listadoObras":
            cambiaCabecera("Obras", "Lista de obras");
            tabla = upoTeatro.listadoObras();
            break;
        case "listadoCompanias":
            cambiaCabecera("Compañías", "Lista de compañías");
            tabla = upoTeatro.listadoCompanias();
            break;
    }
    return tabla;
}