/// Rellena todos los campos de la base de datos en el formulario de representación
//# sourceURL=representacion.js
function rellenaForm(tipo) {
    document.querySelector("#" + tipo + "Representaciones button[name='submit']").addEventListener("click", () => validar("#" + tipo + "Representaciones"), false);
    document.querySelector("#" + tipo + "Representaciones #fechaInicioRepresentacion").addEventListener("change", () => compruebaFinFecha(document.querySelector("#" + tipo + "Representaciones #fechaInicioRepresentacion"), document.querySelector("#" + tipo + "Representaciones #fechaFinalRepresentacion")));

    // Select teatros
    upoTeatro.teatros.forEach(teatro => {
        let opcion = document.createElement("option");
        opcion.value = teatro.codigo;
        opcion.textContent = teatro.nombre;
        document.querySelector("#" + tipo + "Representaciones #teatroSeleccionado").append(opcion);
    });
    // Select espectaculos
    upoTeatro.espectaculos.forEach(espectaculo => {
        let opcion = document.createElement("option");
        opcion.value = espectaculo.codigo;
        opcion.textContent = espectaculo.nombre;
        document.querySelector("#" + tipo + "Representaciones #espectaculoSeleccionado").append(opcion);
    });
}

function editarForm(id) {
    document.querySelector(".jumbotron p").textContent = "Edita representación";
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(id);
    let representacion = teatro.buscaRepresentacion(id);
    let todas = teatro.buscaRepresentacionesIntervalo(representacion);
    let fechaInicial = todas[0].fecha;
    let fechaFinal = todas[todas.length - 1].fecha;
    let adaptada = representacion.adaptada;
    let precioBase = representacion.precioBase;
    let espectaculo = representacion.espectaculo;
    document.querySelector("#editarRepresentaciones #teatroSeleccionado").value = teatro.codigo;
    document.querySelector("#editarRepresentaciones #teatroSeleccionado").disabled = true;
    document.querySelector("#editarRepresentaciones #fechaInicioRepresentacion").value = fechaToAmericana(fechaInicial);
    document.querySelector("#editarRepresentaciones #fechaFinalRepresentacion").value = fechaToAmericana(fechaFinal);
    document.querySelector("#editarRepresentaciones #representacionAdaptada").checked = adaptada;
    document.querySelector("#editarRepresentaciones #precioBaseRepresentacion").value = precioBase;
    document.querySelector("#editarRepresentaciones #espectaculoSeleccionado").value = espectaculo.codigo;
    document.querySelector("#editarRepresentaciones #espectaculoSeleccionado").disabled = true;
    document.querySelector("#editarRepresentaciones button[name='submit']").textContent = "Editar";
    document.querySelector("#editarRepresentaciones button[name='submit']").addEventListener("click", () => {
        todas.forEach(rep => {
            teatro.borrarRepresentacion(rep.codigo);
        });
        setTimeout(() => {
            if (!document.querySelector("#editarRepresentaciones").classList.contains("was-validated")) {
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

function eliminarRepresentaciones(codigo) {
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(codigo);
    let todas = teatro.buscaRepresentacionesIntervalo(teatro.buscaRepresentacion(codigo));
    todas.forEach(rep => {
        teatro.borrarRepresentacion(rep.codigo);
    });
}