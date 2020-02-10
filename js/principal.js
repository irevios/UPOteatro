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

    if (apartado == "#formularioEntrada") {

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

function compruebaFinFecha(fechaInicio, fechaFin) {
    fechaFin.value = "";
    fechaFin.setAttribute("min", fechaInicio.value);
}

// Eliminar Entradas
document.querySelector("#formularios").addEventListener("click", editaElimina);

function editaElimina(e) {
    if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "borrar") {
        switch (e.currentTarget.querySelector(".table-responsive").id) {
            case "listadoEntradas":
                upoTeatro.buscaRepresentacionPorEntrada(e.target.dataset.id).borrarEntrada(e.target.dataset.id);
                break;
            case "listadoRepresentaciones":
                let teatro = upoTeatro.buscaTeatroPorRepresentacion(e.target.dataset.id);
                let todas = teatro.buscaRepresentacionesIntervalo(teatro.buscaRepresentacion(e.target.dataset.id));
                todas.forEach(rep => {
                    teatro.borrarRepresentacion(rep.codigo);
                });
                break;
            case "listadoEspectaculos":
                upoTeatro.borrarEspectaculo(e.target.dataset.id);
                break;
        }
        e.target.parentElement.parentElement.remove();
    } else if (e.target.tagName == "BUTTON" && e.target.dataset.tipo == "editar") {
        let apartado = e.currentTarget.querySelector(".table-responsive").id;
        muestraEnPantalla(apartado.replace("listado", "formulario").replace("das", "da").replace("iones", "ion").replace("ulos", "ulo"));
        setTimeout(() => {
            switch (apartado) {
                case "listadoEntradas":
                    editaEntrada(e.target.dataset.id);
                    break;
                case "listadoRepresentaciones":
                    editaRepresentacion(e.target.dataset.id);
                    break;
                case "listadoEspectaculos":
                    editaEspectaculo(e.target.dataset.id);
                    break;
            }
        }, 100);
    }
}

// Editar
function editaEntrada(id) {
    let representacion = upoTeatro.buscaRepresentacionPorEntrada(id);
    let entrada = representacion.buscaEntrada(id);
    let entradaTipo = entrada instanceof EntradaIndividual ? "individual" : "grupal";
    let butacas = entrada.butacas;
    let adaptada = entrada.adaptada;
    let precio = entrada.precio;
    let tipo;
    let personas;
    document.querySelector("#representacionSeleccionada").value = representacion.codigo;
    cambiaButacasFormEntrada();
    document.querySelectorAll("#butacasRepresentadas i").forEach(silla => {
        butacas.forEach(butaca => {
            if (silla.dataset.butaca == butaca.idButaca()) {
                silla.classList.add("seleccionada");
                silla.classList.remove("ocupada");
            }
        });
    });
    if (entradaTipo == "individual") {
        let tipo = entrada.tipo;
        document.querySelector("#tipoEntrada0").setAttribute("checked", "checked");
    } else {
        let personas = entrada.numPersonas;
        document.querySelector("#tipoEntrada1").setAttribute("checked", "checked");
    }
    document.querySelector("#personasGrupal").closest(".col-4").style.display = document.querySelector("#tipoEntrada1").checked ? "block" : "none";
    document.querySelector("#entradaAdaptada_0").checked = adaptada;
    cambiaPrecioEntrada();
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    document.querySelector("#formularios button[name='submit']").addEventListener("click", () => {
        representacion.borrarEntrada(id);
        setTimeout(() => {
            if (!document.querySelector("#formularioEntrada").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Entrada editada correctamente.";
                muestraEnPantalla("listaEntrada");
            }
        }, 200);
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

function editaEspectaculo(id) {
    document.querySelector(".jumbotron p").textContent = "Edita espectáculo";
    let espectaculo = upoTeatro.buscaEspectaculo(id);
    let nombre = espectaculo.nombre;
    let productor = espectaculo.productor;
    let categoria = espectaculo.categoria;
    let gastos = espectaculo.gastos;
    let obra = espectaculo.obra.codigo;
    let compania = espectaculo.compania.cif;
    document.querySelector("#nombreEspectaculo").value = nombre;
    document.querySelector("#nombreProductorEspectaculo").value = productor;
    document.querySelector("#categoriaEspectaculo").value = categoria;
    document.querySelector("#gastosEspectaculo").value = gastos;
    document.querySelector("#companiaSeleccionada").value = compania;
    document.querySelector("#obraSeleccionada").value = obra;
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    document.querySelector("#formularios button[name='submit']").addEventListener("click", () => {
        upoTeatro.borrarEspectaculo(id);
        setTimeout(() => {
            if (!document.querySelector("#formularioEspectaculo").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Espectáculo editado correctamente.";
                muestraEnPantalla("listaEspectaculo");
            }
        }, 200);
    });
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
        case "#formularioEspectaculo":
            insertarEspectaculo();
            break;
        case "#formularioRepresentacion":
            insertarRepresentacion();
            break;
        case "#formularioEntrada":
            insertarEntrada();
            break;
    }
}

function getSiguienteCodigo(lista) {
    let ordenada = [];
    lista.forEach(elem => ordenada.push(elem.codigo));
    ordenada.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });
    let ultimoCodigo = ordenada[ordenada.length - 1];
    let n = parseInt(ultimoCodigo) + 1;

    return n;
}