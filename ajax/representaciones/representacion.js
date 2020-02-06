/// Rellena todos los campos de la base de datos en el formulario de representación
//# sourceURL=representacion.js
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

function editaRepresentacion(id) {
    document.querySelector(".jumbotron p").textContent = "Edita representación";
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(id);
    let representacion = teatro.buscaRepresentacion(id);
    let todas = teatro.buscaRepresentacionesIntervalo(representacion);
    let fechaInicial = todas[0].fecha;
    let fechaFinal = todas[todas.length - 1].fecha;
    let adaptada = representacion.adaptada;
    let precioBase = representacion.precioBase;
    let espectaculo = representacion.espectaculo;
    document.querySelector("#teatroSeleccionado").value = teatro.codigo;
    document.querySelector("#teatroSeleccionado").disabled = true;
    document.querySelector("#fechaInicioRepresentacion").value = fechaToAmericana(fechaInicial);
    document.querySelector("#fechaFinalRepresentacion").value = fechaToAmericana(fechaFinal);
    document.querySelector("#representacionAdaptada").checked = adaptada;
    document.querySelector("#precioBaseRepresentacion").value = precioBase;
    document.querySelector("#espectaculoSeleccionado").value = espectaculo.codigo;
    document.querySelector("#espectaculoSeleccionado").disabled = true;
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    document.querySelector("#formularios button[name='submit']").addEventListener("click", () => {
        todas.forEach(rep => {
            teatro.borrarRepresentacion(rep.codigo);
        });
        setTimeout(() => {
            if (!document.querySelector("#formularioRepresentacion").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Representación editada correctamente.";
                muestraEnPantalla("listaRepresentacion");
            }
        }, 200);
    });
}