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

function muestraEnPantalla(elem) {
    seleccionaActivo(elem);
    // La cabecera se reduce
    document.querySelector("body").classList.remove("grande");

    // Si ya hay un formulario en pantalla, lo borra
    if (elementoExiste("#formularios > form")) {
        document.querySelector("#formularios > form").remove();
    }
    // Si ya hay un listado en pantalla, lo borra
    if (elementoExiste("#formularios > .table-responsive")) {
        document.querySelector("#formularios > .table-responsive").remove();
        document.querySelector("#formularios").querySelector(".filtro").remove();
    }
    // Si se pide un formulario, busca en el archivo formularios y lo añade a la web, si no añade un listado
    if (elem.includes("formulario")) {
        leeArchivoXMLHTML("./html/formularios.html", (formulario) => agregaForm(elem, formulario));
    } else {
        leeArchivoXMLHTML("./html/filtros.html", (filtros) => agregaTabla(elem, filtros));
    }
    // Cierra menú después de elegir
    if (getComputedStyle(document.querySelector(".navbar-toggler")).display != "none") {
        document.querySelector(".navbar-toggler").click();
    }

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

function cambiaCabecera(titulo, subtitulo) {
    document.querySelector(".jumbotron strong").textContent = titulo;
    document.querySelector(".jumbotron p").textContent = subtitulo;
}

// Añade un formulario a la vista
function agregaForm(elem, form) {
    document.querySelector("#formularios").append(form.querySelector("#" + elem));
    switch (elem) {
        case "formularioEntrada":
            cambiaCabecera("Entradas", "Comprar entrada");
            rellenaFormEntrada();
            break;
        case "formularioRepresentacion":
            cambiaCabecera("Representaciones", "Añade representación");
            rellenaFormRepresentacion();
            break;
        case "formularioEspectaculo":
            cambiaCabecera("Espectáculos", "Añade espectáculos");
            rellenaFormEspectaculo();
    }
    document.querySelector("#formularios").classList = "col-8";
}

/// Rellena todos los campos de la base de datos en el formulario de entrada
function rellenaFormEntrada() {
    document.querySelector("#formularioEntrada button[name='submit']").addEventListener("click", () => validar("#formularioEntrada"), false);
    // Select representacion
    //Opcion por defecto
    let opcion = document.createElement("option");
    opcion.value = "00";
    opcion.textContent = "Seleccione una representacion...";
    opcion.selected = true;
    opcion.disabled = true;
    document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);
    //Opciones válidas
    upoTeatro.teatros.forEach(teatro => {
        teatro.representaciones.forEach(representacion => {
            opcion = document.createElement("option");
            opcion.value = representacion.codigo;
            opcion.textContent = teatro.nombre + " | " + fechaToString(representacion.fecha) + " | " + representacion.espectaculo.nombre;
            document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);
        });
    });
    // Select multiple butacas
    let representacionSeleccionada = document.querySelector("#representacionSeleccionada");
    representacionSeleccionada.addEventListener("change", cambiaButacasFormEntrada);
    actualizaFormularioEntrada();

    // Tipo de entrada cambia el select multiple
    document.querySelector("#tipoEntrada0").addEventListener("click", actualizaFormularioEntrada);
    document.querySelector("#tipoEntrada1").addEventListener("click", actualizaFormularioEntrada);
}
// Actualiza los datos que se muestra de entrada grupal o individual
function actualizaFormularioEntrada() {
    document.querySelectorAll(".seleccionada").forEach(sel => sel.classList.remove("seleccionada"));
    document.querySelector("#personasGrupal").closest(".col-4").style.display = document.querySelector("#tipoEntrada1").checked ? "block" : "none";
    document.querySelector("#totalEntrada").value = 0; // Reinicia a 0 el precio si el usuario no ha selccionado ninguna butaca.
    document.querySelector("#personasGrupal").value = 0; // Reinicia a 0 el numero de personas si el usuario no ha selccionado ninguna butaca.

    // Elimina las butacas o las muestra
    document.querySelectorAll(".fila1, .fila2, .fila3, .fila4").forEach(ap => { ap.children.length == 0 ? ap.style.display = "none" : ap.style.display = "initial" });
    document.querySelectorAll(".platea, .anfiteatro, .paraiso, .palco").forEach(ap => { representacionSeleccionada.value == "00" ? ap.style.display = "none" : ap.style.display = "grid" });
}
// Cambia las butacas a elegir según la representación elegida
function cambiaButacasFormEntrada() {
    if (representacionSeleccionada.value != "00") {
        actualizaFormularioEntrada();
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
        let butacas = teatro.butacas;
        let representacion = teatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
        document.querySelectorAll(".platea > *, .anfiteatro > *, .paraiso > *, .palco").forEach(b => b.textContent = "");
        butacas.forEach(butaca => {
            let icoButaca = document.createElement("i");
            icoButaca.classList = "fa butaca-silla";
            icoButaca.dataset.butaca = butaca.idButaca();
            icoButaca.addEventListener("click", seleccionaButaca);
            if (representacion.butacaOcupada(butaca)) {
                icoButaca.classList.add("ocupada");
            }
            switch (butaca.zona) {
                case 'platea':
                    document.querySelector("#butacasRepresentadas .platea .fila" + butaca.fila).append(icoButaca);
                    break;
                case 'anfiteatro':
                    document.querySelector("#butacasRepresentadas .anfiteatro .fila" + butaca.fila).append(icoButaca);
                    break;
                case 'paraiso':
                    document.querySelector("#butacasRepresentadas .paraiso .fila" + butaca.fila).append(icoButaca);
                    break;
                case 'palco':
                    document.querySelector("#butacasRepresentadas .palco").append(icoButaca);
                    break;
            }
        });
    }
    document.querySelectorAll(".fila1, .fila2, .fila3, .fila4").forEach(ap => { ap.children.length == 0 ? ap.style.display = "none" : ap.style.display = "initial" });
}

function seleccionaButaca(e) {
    if (e.target.classList.contains('butaca-silla') && !e.target.classList.contains("ocupada")) {
        if (e.target.classList.contains('seleccionada')) {
            e.target.classList.remove("seleccionada");
        } else {
            if (document.querySelector("#tipoEntrada0").checked && document.querySelectorAll("#butacasRepresentadas .seleccionada").length > 0) {
                document.querySelector("#butacasRepresentadas .seleccionada").classList.remove("seleccionada");
            }
            if (document.querySelector("#tipoEntrada0").checked || (document.querySelector("#tipoEntrada1").checked && e.target.dataset.butaca.split("-")[0] == 'platea')) {
                e.target.classList.add("seleccionada");
            }
        }
        cambiaPrecioEntrada();
    }
}


function cambiaPrecioEntrada() {
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let representacion = teatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let coefButaca;
    if (document.querySelector("#tipoEntrada1").checked) {
        let personas = document.querySelectorAll("#butacasRepresentadas .seleccionada").length;
        document.querySelector("#personasGrupal").value = personas;
        coefButaca = personas;
    } else {
        if (elementoExiste("#butacasRepresentadas .seleccionada"))
            let butacaSeleccionada = document.querySelector("#butacasRepresentadas .seleccionada").dataset.butaca.split("-");
        coefButaca = teatro.buscaButaca(butacaSeleccionada[0], butacaSeleccionada[1], butacaSeleccionada[2]).coefPrecio;
    }
    document.querySelector("#totalEntrada").value = (parseFloat(representacion.precioBase) * parseFloat(coefButaca)).toFixed(2);
}

/// Rellena todos los campos de la base de datos en el formulario de representación
function rellenaFormRepresentacion() {
    document.querySelector("#formularioRepresentacion button[name='submit']").addEventListener("click", () => validar("#formularioRepresentacion"), false);
    document.querySelector("#formularioRepresentacion #fechaInicioRepresentacion").addEventListener("change", () => compruebaFinFecha(document.querySelector("#formularioRepresentacion #fechaInicioRepresentacion"), document.querySelector("#formularioRepresentacion #fechaFinalRepresentacion")));

    // Select teatros
    upoTeatro.teatros.forEach(teatro => {
        let opcion = document.createElement("option");
        opcion.value = teatro.codigo;
        opcion.textContent = teatro.nombre;
        document.querySelector("#teatroSeleccionado").append(opcion);
    });
    // Select espectaculos
    upoTeatro.espectaculos.forEach(espectaculo => {
        let opcion = document.createElement("option");
        opcion.value = espectaculo.codigo;
        opcion.textContent = espectaculo.nombre;
        document.querySelector("#espectaculoSeleccionado").append(opcion);
    });
}

/// Rellena todos los campos de la base de datos en el formulario de espectaculo

function rellenaFormEspectaculo() {

    document.querySelector("#formularioEspectaculo button[name='submit']").addEventListener("click", () => validar("#formularioEspectaculo"), false);

    // Select compañias
    upoTeatro.companias.forEach(compania => {
        let opcion = document.createElement("option");
        opcion.value = compania.cif;
        opcion.textContent = compania.nombre;
        document.querySelector("#companiaSeleccionada").append(opcion);
    });

    // Select obras
    upoTeatro.obras.forEach(obra => {
        let opcion = document.createElement("option");
        opcion.value = obra.codigo;
        opcion.textContent = obra.nombre;
        document.querySelector("#obraSeleccionada").append(opcion);
    });
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