// En este documento se define las funciones que cambian el aspecto de la web según que opcion eligamos.
"use strict";

// Eventos del menú
function cargarEventos() {
    document.querySelector("#navComprarEntrada").addEventListener("click", () => muestraEnPantalla("formularioEntrada"));
    document.querySelector("#navListaRepresentaciones").addEventListener("click", () => muestraEnPantalla("listadoRepresentaciones"));
    document.querySelector("#navListaEspectaculos").addEventListener("click", () => muestraEnPantalla("listadoEspectaculos"));
}

function cargarEventosAdmin() {
    cargarEventos();
    document.querySelector("#navListaEntradas").addEventListener("click", () => muestraEnPantalla("listadoEntradas"));
    document.querySelector("#navAgregarRepresentacion").addEventListener("click", () => muestraEnPantalla("formularioRepresentacion"));
    document.querySelector("#navAgregarEspectaculo").addEventListener("click", () => muestraEnPantalla("formularioEspectaculo"));
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
    // // Si ya hay un listado en pantalla, lo oculta
    // if (elementoExiste("#formularios > .table-responsive")) {
    //     document.querySelector("#formularios > .table-responsive").classList.add("oculta");
    //     document.querySelector("#formularios").querySelector(".filtro").classList.add("oculta");
    // }
    // Si se pide un formulario, busca en el archivo formularios y lo añade a la web, si no añade un listado
    elem.includes("formulario") ? agregaFormulario(elem) : cargaListadoFiltro(elem);

    // Cierra menú después de elegir
    if (getComputedStyle(document.querySelector(".navbar-toggler")).display != "none") {
        document.querySelector(".navbar-toggler").click();
    }

}

// Muestra un formulario
function agregaFormulario(elem) {
    switch (elem) {
        case "formularioEntrada":
            cambiaCabecera("Entradas", "Comprar entrada");
            cargaFormulario(elem, "entradas");
            break;
        case "formularioRepresentacion":
            cambiaCabecera("Representaciones", "Añade representación");
            cargaFormulario(elem, "representaciones");
            break;
        case "formularioEspectaculo":
            cambiaCabecera("Espectáculos", "Añade espectáculos");
            cargaFormulario(elem, "espectaculos");
            break;
    }
    document.querySelector("#formularios").classList = "col-8";
}

function cargaFormulario(elem, carpeta) {
    if (elementoExiste("#" + elem)) {
        document.querySelector("#" + elem).classList.remove("oculta");
    } else {
        let nuevo = $("<div id='" + elem + "'></div>").load("./ajax/" + carpeta + "/" + elem + ".html", () => {
            $.getScript("./ajax/" + carpeta + "/" + carpeta.substring(0, carpeta.length - (carpeta.includes("ones") ? 2 : 1)) + ".js", () => rellenaForm());
        });
        $("#formularios").append(nuevo);
    }
}

function cargaListadoFiltro(elem) {
    if (elementoExiste("#" + elem)) {
        document.querySelector("#" + elem).classList.remove("oculta");
    } else {
        let nuevo = $("<div id='" + elem + "'></div>").load("./ajax/listados/" + elem.replace("listado", "filtros") + ".html", () => {
            agregaFiltros(elem.replace("listado", "filtros"));
            $("#" + elem).append(agregaListado(elem));
        });
        $("#formularios").append(nuevo);
    }
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
    }
    document.querySelectorAll("th").forEach(header => header.addEventListener("click", ordenaTabla));
    return tabla;
}