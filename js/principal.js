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