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
    if (elementoExiste("#formularios > form")) {
        document.querySelector("#formularios > form").remove();
    }
    if (elementoExiste("#formularios > .table-responsive")) {
        document.querySelector("#formularios > .table-responsive").remove();
    }
    document.querySelector("body").classList.remove("grande");
    if (document.querySelector("#formularios").querySelector(".filtro") != undefined) {
        document.querySelector("#formularios").querySelector(".filtro").remove();
    }
    if (elem.includes("formulario")) { // Si se pide un formulario, busca en el archivo formularios y lo añade a la web
        leeArchivoXMLHTML("./html/formularios.html", (formulario) => agregaForm(elem, formulario));
    } else {
        leeArchivoXMLHTML("./html/filtros.html", (filtros) => agregaTabla(elem, filtros));
    }
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
            opcion.textContent = teatro.nombre + " | " + representacion.toString();
            document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);
        });
    });
    // Select multiple butacas
    let representacionSeleccionada = document.querySelector("#representacionSeleccionada");
    representacionSeleccionada.addEventListener("change", cambiaButacasFormEntrada);
    let butacaSeleccionada = document.querySelector("#butacaSeleccionada");
    butacaSeleccionada.addEventListener("change", cambiaPrecioEntrada);
    actualizaFormularioEntrada(false);

    // Tipo de entrada cambia el select multiple
    document.querySelector("#tipoEntrada0 ~ label").addEventListener("click", () => { actualizaFormularioEntrada(false); });
    document.querySelector("#tipoEntrada1 ~ label").addEventListener("click", () => { actualizaFormularioEntrada(true); });

    //
}
// Camboa las butacas a elegir según la representación elegida
function cambiaButacasFormEntrada() {
    let representacion = upoTeatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let butacas = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value).butacas;
    let butacaSeleccionada = document.querySelector("#butacaSeleccionada");
    butacaSeleccionada.querySelectorAll("option").forEach(but => but.remove());
    butacas.forEach(butaca => {
        if (!butacaSeleccionada.multiple || butaca.zona == 'platea') {
            let opcion = document.createElement("option");
            opcion.value = butaca.idButaca();
            opcion.textContent = butaca.toString();
            if (representacion.butacaOcupada(butaca)) {
                opcion.setAttribute("disabled", true);
            }
            butacaSeleccionada.append(opcion);
        }
    });
}

// Actualiza los datos que se muestra de entrada grupal o individual
function actualizaFormularioEntrada(bool) {
    let seleccionButaca = document.querySelector("#formularioEntrada #butacaSeleccionada");
    if (bool) {
        seleccionButaca.setAttribute('multiple', true);
        document.querySelector("#personasGrupal").parentNode.parentNode.style.display = "block";
    } else {
        seleccionButaca.removeAttribute('multiple');
        document.querySelector("#personasGrupal").parentNode.parentNode.style.display = "none";
    }
    if (representacionSeleccionada.value != "00") {
        cambiaButacasFormEntrada();
    }
    document.querySelector("#totalEntrada").value = 0; // Reinicia a 0 el precio si el usuario no ha selccionado ninguna butaca.
}

function cambiaPrecioEntrada() {
    let representacion = upoTeatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let coefButaca;
    if (document.querySelector("input[name='tipoEntrada']:checked").value == "grupal") {
        let personas = document.querySelector("#butacaSeleccionada").selectedOptions.length;
        document.querySelector("#personasGrupal").value = personas;
        coefButaca = personas;
    } else {
        let butacaSeleccionada = document.querySelector("#butacaSeleccionada").value.split("-");
        coefButaca = teatro.buscaButaca(butacaSeleccionada[0], butacaSeleccionada[1], butacaSeleccionada[2]).coefPrecio;
    }
    document.querySelector("#totalEntrada").value = parseFloat(representacion.precioBase) * parseFloat(coefButaca);
}

/// Rellena todos los campos de la base de datos en el formulario de representación
function rellenaFormRepresentacion() {


    document.querySelector("#formularioRepresentacion button[name='submit']").addEventListener("click", () => validar("#formularioRepresentacion"), false);

    document.querySelector("#formularioRepresentacion #fechaInicioRepresentacion").addEventListener("change", () => compruebaFinFecha(document.querySelector("#formularioRepresentacion #fechaInicioRepresentacion"), document.querySelector("#formularioRepresentacion #fechaFinalRepresentacion")));

    // select teatros
    upoTeatro.teatros.forEach(teatro => {
        let opcion = document.createElement("option");
        opcion.value = teatro.codigo;
        opcion.textContent = teatro.nombre;
        document.querySelector("#teatroSeleccionado").append(opcion);
    });
    // select espectaculos
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

    // select compañias
    upoTeatro.companias.forEach(compania => {
        let opcion = document.createElement("option");
        opcion.value = compania.codigo;
        opcion.textContent = compania.nombre;
        document.querySelector("#companiaSeleccionada").append(opcion);
    });

    // select obras
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
            cambiaCabecera("Entradas", "Lista de entradas compradas");
            tabla = upoTeatro.listadoEntradas();
            break;
        case "listaRepresentacion":
            cambiaCabecera("Representaciones", "Lista de representaciones");
            tabla = upoTeatro.listadoRepresentaciones();
            break;
        case "listaEspectaculo":
            cambiaCabecera("Espectáculos", "Lista de espectáculos");
            tabla = upoTeatro.listadoEspectaculos();
            break;
    }
    document.querySelector("#formularios").append(tabla);
}