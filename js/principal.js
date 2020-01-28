// En este documento se define las funciones que interactuan entre el HTML y las clases.
"use strict";


// Eventos iniciales
window.addEventListener("load", cargaInicial);
var upoTeatro;

function cargaInicial() {
    upoTeatro = new UpoTeatro();
    compruebaSesion();
    cargaInicialDatos();
}

// Validar e insertar

function validar(apartado) { // Llamo validar con el apartado que quiero validar
    document.querySelector(apartado).classList.remove("was-validated"); // Limpia de errores antes que se ejecute
    let error = false;
    let elemento;

    // Valida si los datos no están vacíos y son correctos
    for (let i = 0; i < document.querySelector(apartado).getElementsByTagName('input').length; i++) {
        elemento = document.querySelector(apartado).getElementsByTagName('input')[i];

        if (elemento.value == "" || document.querySelector(apartado).querySelectorAll(":invalid").length != 0) { // Cuando algo es invalido y sale el .invalid-feedback ese input tiene :invalid
            error = true;
            document.querySelector(apartado).classList.add("was-validated"); // agrego was-validated para que el usuario vea los errores
        }
    }
    if (error) {
        console.log("ops un error en el formulario :O"); // Aqui si hay error no añado nada a la base de datos, puedo mostrar un mensaje o simplemente dejarlo para que el usuario intente de nuevo
    } else { // Si todo esta relleno y correcto borra los errores 
        document.querySelector(apartado).classList.remove("was-validated");

        // ---- e inserta datos a donde sea necesario ----
    }
}

function compruebaFinFecha(fechaInicio, fechaFin) {
    fechaFin.value = "";
    fechaFin.setAttribute("min", fechaInicio.value);
}
// Eliminar Entradas
document.querySelector("#formularios").addEventListener("click", editaElimina);

function editaElimina(e) {
    if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "borrar") {
        switch (e.currentTarget.querySelector("div").id) {
            case "listadoEntradas":
                upoTeatro.buscaRepresentacionPorEntrada(e.target.dataset.id).borrarEntrada(e.target.dataset.id);
                break;
            case "listadoRepresentaciones":
                upoTeatro.borrarRepresentacion(e.target.dataset.id);
                break;
            case "listadoEspectaculos":
                upoTeatro.borrarEspectaculo(e.target.dataset.id);
                break;
        }
        e.target.parentElement.parentElement.remove();
    } else if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "editar") {
        console.log("pulsas editar");
    }
}

// Filtros
function agregaFiltros(filtros, id) {
    document.querySelector("#formularios").append(filtros.querySelector("#" + id));
    if (id != "filtrosEspectaculo") {
        document.querySelector("#filtroFechaInicial").addEventListener("change", () => {
            compruebaFinFecha(document.querySelector("#filtroFechaInicial"), document.querySelector("#filtroFechaFinal"));
            buscaFecha();
        });
        document.querySelector("#filtroFechaFinal").addEventListener("change", buscaFecha);
    }
    document.querySelector("#filtroTexto").addEventListener("keyup", buscaTexto);
}

function buscaTexto() {
    let texto = document.querySelector("#filtroTexto").value;
    let lineas = Array.from(document.querySelectorAll("table tbody tr")).filter(linea => {
        let contiene = false;
        Array.from(linea.cells).forEach(dato => {
            if (dato.textContent.toLowerCase().includes(texto.toLowerCase())) {
                contiene = true;
            }
        });
        linea.dataset.textoCoincide = texto == "" ? "" : contiene;
        ocultaFila(linea);
    });
}

function buscaFecha() {
    let fechaInicial = document.querySelector("#filtroFechaInicial").value;
    let fechaFinal = document.querySelector("#filtroFechaFinal").value;
    let lineas = Array.from(document.querySelectorAll("table tbody tr")).filter(linea => {
        let contiene = false;
        let fechaBuscando = linea.cells[1].textContent;
        if ((fechaInicial != undefined && fechaFinal != undefined) && fechaToDate(fechaBuscando) >= fechaToDate(fechaInicial) && fechaToDate(fechaBuscando) <= fechaToDate(fechaFinal)) {
            contiene = true;
        }
        linea.dataset.fechaCoincide = fechaInicial == "" || fechaFinal == "" ? "" : contiene;
        ocultaFila(linea);
    });
}

function ocultaFila(fila) {
    let fecha = fila.dataset.fechaCoincide;
    let texto = fila.dataset.textoCoincide;
    if ((fecha == "true" && texto == "true") ||
        (fecha == "true" && (texto == undefined || texto == "")) ||
        ((fecha == undefined || fecha == "") && texto == "true") ||
        ((fecha == undefined || fecha == "") && (texto == undefined || texto == ""))) {
        fila.style.display = "table-row";
    } else {
        fila.style.display = "none";
    }
}