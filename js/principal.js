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

// Agregar --



// Eliminar entradas
document.querySelector("#formularios").addEventListener("click", editaElimina);

function editaElimina(e) {
    if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "borrar") {
        switch (e.currentTarget.querySelector("div").id) {
            case "listadoEntradas":
                upoTeatro.buscaRepresentacionPorEntrada(e.target.dataset.id).borrarEntrada(e.target.dataset.id);
                e.target.parentElement.parentElement.remove();
                break;
            case "listadoRepresentaciones":
                //borrarRepresentaciones(e.target.dataset.id);
                break;
            case "listadoEspectaculos":
                //borrarEspectaculos(e.target.dataset.id);
                break;
        }
    } else if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "editar") {
        console.log("pulsas editar");
    }
}