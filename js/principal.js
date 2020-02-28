// En este documento se define las funciones que interactuan entre el HTML y las clases.
"use strict";


// Eventos iniciales
window.addEventListener("load", cargaInicial);
var upoTeatro;

function cargaInicial() {
    upoTeatro = new UpoTeatro();
    compruebaSesion();
    cargaInicialDatos();

    // Añade evento al modal
    document.querySelector(".modal button.close").addEventListener("click", cierraModal);
    document.querySelector(".modal button#cierraModal").addEventListener("click", cierraModal);
}

// Validar e insertar
function validar(apartado) { // Llamo validar con el apartado que quiero validar
    document.querySelector(apartado).classList.remove("was-validated"); // Limpia de errores antes que se ejecute
    let error = false;
    let elemento;

    if (apartado == "#formularioEntradas") {

        let representacion = document.querySelector("#representacionSeleccionada").value;
        if (representacion == "0") {
            error = true;
            document.querySelector("#representacionSeleccionada").classList.add("error");
            document.querySelector(" #representacionSeleccionada").addEventListener("change", () => document.querySelector("#representacionSeleccionada").classList.remove("error"));
        } else {
            let individual = document.getElementById("tipoEntrada0").checked;
            let butacasSel = document.querySelectorAll("#butacasRepresentadas .seleccionada");

            if (individual) {
                if (butacasSel.length == 0) {
                    error = true;
                    document.querySelector("#butacasRepresentadas").classList.add("error");
                }
            } else {
                if (butacasSel.length <= 1) {
                    error = true;
                    document.querySelector("#butacasRepresentadas").classList.add("error");
                }
            }
        }
    }

    // Valida si los datos no están vacíos y son correctos
    for (let i = 0; i < document.querySelector(apartado).getElementsByTagName('input').length; i++) {
        elemento = document.querySelector(apartado).getElementsByTagName('input')[i];

        if (elemento.value == "" || document.querySelector(apartado).querySelectorAll(":invalid").length != 0) {
            error = true;
        }
    }
    document.querySelector(apartado).classList.add("was-validated");
    if (error) {
        mensajeModal("Hay errores en el formulario, compruébalos e inténtalo de nuevo.");
    } else {
        document.querySelector(apartado).classList.remove("was-validated");
        nuevasCreaciones(apartado);
    }
}


// Eliminar Entradas
function editaElimina(e) {
    if (e.target.tagName == "BUTTON") {
        let apartado = e.currentTarget.parentElement.parentElement.id;
        switch (apartado) {
            case "listadoEntradas":
                borrarEntrada(e.target.dataset.cod);
                break;
            case "listadoRepresentaciones":
                eliminarRepresentaciones(e.target.dataset.cod);
                break;
            case "listadoEspectaculos":
                eliminarEspectaculos(e.target.dataset.cod);
                break;
        }
        e.target.closest("tr").remove();
    }
}


// Modal para mensajes
function mensajeModal(texto) {
    document.querySelector(".modal #mensaje").textContent = texto;
    document.querySelector(".modal .modal-footer").classList.add("show");
    document.querySelector(".modal #mensaje").classList.add("show");
    muestraModal();
}

function muestraModal() {
    document.querySelector(".modal").classList.add("show");
}

function cierraModal() {
    document.querySelector(".modal").classList.remove("show");
    document.querySelector(".modal #mensaje").classList.remove("show");
    document.querySelector("#inicioSesion").classList.remove("show");
    document.querySelector(".modal .modal-footer").classList.remove("show");
}

//Añade representacion
function nuevasCreaciones(apartado) {
    let ultimoCodigo;
    switch (apartado) {
        case "#formularioEspectaculos":
            insertarEspectaculo();
            break;
        case "#formularioRepresentaciones":
            insertarRepresentacion();
            break;
        case "#formularioEntradas":
            insertarEntrada();
            break;
    }
}

function getSiguienteCodigo(lista, campo) {
    let ordenada = [];
    lista.forEach(elem => ordenada.push(elem[campo]));
    ordenada.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    let ultimoCodigo = ordenada[ordenada.length - 1];
    let n = parseInt(ultimoCodigo) + 1;

    return n;
}