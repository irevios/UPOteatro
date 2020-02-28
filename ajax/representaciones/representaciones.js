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

function insertarRepresentacion() {
    // Datos
    let codigo = getSiguienteCodigo(upoTeatro.listaRepresentaciones(), "codigo");
    let fechaInicio = fechaToDate(document.querySelector("#fechaInicioRepresentacion").value);
    let fechaFin = fechaToDate(document.querySelector("#fechaFinalRepresentacion").value);
    let fechas = fechasIntervalo(fechaInicio, fechaFin);
    let adaptada = document.querySelector("#representacionAdaptada").checked;
    let teatro = upoTeatro.buscaTeatro(document.querySelector("#teatroSeleccionado").value);
    let espectaculo = document.querySelector("#espectaculoSeleccionado").value;
    let precioBase = document.querySelector("#precioBaseRepresentacion").value;
    let intervalo = getSiguienteCodigo(upoTeatro.listaRepresentaciones(), "intervalo");

    // Control de solapamientos de fechas
    let representaciones = [];
    let repAIntroducir = [];
    let correcto = true;
    let incorrectos = document.createElement("div");
    fechas.forEach((f, i) => {
        nuevaRepresentacion = new Representacion(codigo + i, f, adaptada, precioBase, upoTeatro.buscaEspectaculo(espectaculo), intervalo);
        console.log(teatro.esPosibleAgregarRepresentacion(nuevaRepresentacion));
        if (!teatro.esPosibleAgregarRepresentacion(nuevaRepresentacion)) {
            correcto = false;
            let p = document.createElement("p");
            p.textContent = fechaToString(f);
            incorrectos.append(p);
        } else {
            repAIntroducir.push(nuevaRepresentacion);
            representaciones.push({
                "codigo": codigo + i,
                "teatro": teatro.codigo,
                "fecha": fechaToAmericana(f),
                "adaptada": adaptada ? "S" : "N",
                "precioBase": precioBase,
                "espectaculo": espectaculo,
                "intervalo": intervalo
            });
        }
    });

    console.log(representaciones);
    if (correcto) {
        $.post("./ajax/representaciones/insertaRepresentaciones.php", "datos=" + JSON.stringify(representaciones), (resultado) => completaInsertarRepresentaciones(resultado, teatro, repAIntroducir));

    } else {
        let p = document.createElement("p");
        p.textContent = "Las siguientes fechas ya están ocupadas";
        document.querySelector(".modal #mensaje").textContent = "";
        incorrectos.insertBefore(p, incorrectos.firstChild);
        document.querySelector(".modal #mensaje").append(incorrectos);
        document.querySelector(".modal #mensaje").classList.add("show");
        muestraModal();
    }
}

function completaInsertarRepresentaciones(resultado, teatro, array) {
    if (resultado == 0) {
        array.forEach(rep => {
            teatro.agregaRepresentacion(rep);
        });
        mensajeModal("Representacion creada correctamente.");
        document.querySelector("form").reset();
    } else {
        console.log("here2");
    }


}

function eliminarRepresentaciones(id) {
    $.post("./ajax/representaciones/borrarRepresentaciones.php", "cod_intervalo=" + upoTeatro.buscaRepresentacion(id).intervalo, completaEliminarRepresentaciones);
}

function completaEliminarRepresentaciones(resultado) {
    let datos = JSON.parse(resultado);
    if (datos["error"] == 0) {
        upoTeatro.listaRepresentaciones().forEach(rep => {
            if (rep.intervalo == datos["cod_intervalo"]) {
                upoTeatro.buscaTeatroPorRepresentacion(rep.codigo).borrarRepresentacion(rep.codigo);
            }
        });
    }
    mensajeModal(datos["mensaje"]);
}