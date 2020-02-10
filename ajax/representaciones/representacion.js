/// Rellena todos los campos de la base de datos en el formulario de representación
//# sourceURL=representacion.js
function rellenaForm() {
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

function insertaRepresentacion() {

    let oRepresentacion;
    let adaptada;
    if (document.querySelector("#representacionAdaptada").checked)
        adaptada = true;
    else
        adaptada = false;

    let precioBase = document.querySelector("#precioBaseRepresentacion").value;

    let oEsp;
    let codEspectaculo = document.querySelector("#espectaculoSeleccionado").value;
    for (let i = 0; i < upoTeatro.espectaculos.length; i++) {
        if (upoTeatro.espectaculos[i].codigo == codEspectaculo)
            oEsp = upoTeatro.espectaculos[i];
    }

    let correcto = true;

    let fechaInicio = fechaToDate(document.querySelector("#fechaInicioRepresentacion").value);
    let fechaFin = fechaToDate(document.querySelector("#fechaFinalRepresentacion").value);
    let fechas = fechasIntervalo(fechaInicio, fechaFin);
    let teatro = upoTeatro.buscaTeatro(document.querySelector("#teatroSeleccionado").value);
    let repAIntroducir = [];
    let incorrectos = document.createElement("div");
    setTimeout(() => {
        fechas.forEach(fecha => {
            let codigoRepresentacion = getSiguienteCodigo(upoTeatro.listaRepresentaciones());
            oRepresentacion = new Representacion(codigoRepresentacion, fecha, adaptada, precioBase, oEsp);
            if (!teatro.esPosibleAgregarRepresentacion(oRepresentacion)) {
                correcto = false;
                let p = document.createElement("p");
                p.textContent = fechaToString(fecha);
                incorrectos.append(p);
            } else {
                repAIntroducir.push(oRepresentacion);
            }

        });

        if (correcto) {
            repAIntroducir.forEach(rep => {
                teatro.agregaRepresentacion(rep);
            })

            mensajeModal("Representacion creada correctamente.");
            document.querySelector(apartado).reset();
        } else {
            let p = document.createElement("p");
            p.textContent = "Las siguientes fechas ya están ocupadas";

            muestraModal();
            document.querySelector(".modal #mensaje").textContent = "";
            incorrectos.insertBefore(p, incorrectos.firstChild);
            document.querySelector(".modal #mensaje").append(incorrectos);
        }
    }, 100);
}