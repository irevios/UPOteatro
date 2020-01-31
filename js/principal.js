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
    document.querySelector(".modal button.btn-primary").addEventListener("click", cierraModal);
}

// Validar e insertar
function validar(apartado) { // Llamo validar con el apartado que quiero validar
    document.querySelector(apartado).classList.remove("was-validated"); // Limpia de errores antes que se ejecute
    let error = false;
    let elemento;

    if (apartado == "#formularioEntrada") {

        let representacion = document.querySelector("#representacionSeleccionada").value;
        if (representacion == "00") {
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
        mensajeModal("Hiciste algo mal, comprueba los errores");
    } else { // Si todo esta relleno y correcto borra los errores 
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
                upoTeatro.buscaTeatroPorRepresentacion(e.target.dataset.id).borrarRepresentacion(e.target.dataset.id);
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
        }, 101);
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
        }, 101);
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
        }, 101);
    });
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
        let fechas;
        let fechaBuscando;
        if (linea.cells[1].textContent.includes(" - ")) {
            let fechaBuscandoIni = fechaToDate(linea.cells[1].textContent.split(" - ")[0]);
            let fechaBuscandoFin = fechaToDate(linea.cells[1].textContent.split(" - ")[1]);
            fechas = fechasIntervalo(fechaBuscandoIni, fechaBuscandoFin);
        } else {
            fechaBuscando = fechaToDate(linea.cells[1].textContent);
        }
        if (fechaInicial != undefined && fechaFinal != undefined) {
            if (fechaBuscando != undefined && fechaBuscando >= fechaToDate(fechaInicial) && fechaBuscando <= fechaToDate(fechaFinal)) {
                contiene = true;
            } else if (fechas != undefined) {
                fechas.forEach(fecha => {
                    if (fecha >= fechaToDate(fechaInicial) && fecha <= fechaToDate(fechaFinal)) {
                        contiene = true;
                    }
                });
            }
        }
        linea.dataset.fechaCoincide = fechaInicial == "" || fechaFinal == "" ? "" : contiene;
        ocultaFila(linea);
    });
}

function ocultaFila(fila) {
    let fecha = fila.dataset.fechaCoincide;
    let texto = fila.dataset.textoCoincide;

    // Condiciones
    let coincideAmbas = fecha == "true" && texto == "true";
    let coincideTextoSolo = (fecha == undefined || fecha == "") && texto == "true";
    let coincideFechaSolo = fecha == "true" && (texto == undefined || texto == "");
    let todoVacio = (fecha == undefined || fecha == "") && (texto == undefined || texto == "");

    if (coincideAmbas || coincideFechaSolo || coincideTextoSolo || todoVacio) {
        fila.style.display = "table-row";
    } else {
        fila.style.display = "none";
    }
}

function ordenaTabla(e) {
    if (e.target.tagName == 'TH') {
        let seleccionado = e.target.textContent;
        let numCelda = e.target.cellIndex;
        // Miramos si ordenamos de forma ascendente o descendente
        let ascendente = e.target.dataset.ascendente == "true" ? true : false;
        e.target.dataset.ascendente = !ascendente;

        // Según el tipo del campo hacemos diferentes comparadores
        let campoTexto = ["Representación", "Adaptada", "Teatro", "Espectáculo", "Productor", "Categoría", "Obra", "Compañía"]
        let campoNumero = ["Precio", "Precio Base", "Gastos"];
        let lineas = Array.from(document.querySelectorAll("tbody tr"));
        //document.querySelectorAll("tbody tr").forEach(linea => lineas.push(linea)); // Pasa los tr a un array

        if (campoTexto.includes(seleccionado)) {
            lineas.sort((lineaA, lineaB) => { // Ordena los tr del array
                let textoA = lineaA.cells[numCelda].textContent;
                let textoB = lineaB.cells[numCelda].textContent;
                return ascendente ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
            });
        }
        if (campoNumero.includes(seleccionado)) {
            lineas.sort((lineaA, lineaB) => { // Ordena los tr del array
                let numA = parseFloat(lineaA.cells[numCelda].textContent);
                let numB = parseFloat(lineaB.cells[numCelda].textContent);
                return ascendente ? numA - numB : numB - numA;
            });
        }
        if (seleccionado == "Fecha") {
            lineas.sort((lineaA, lineaB) => { // Ordena los tr del array
                let fechaA = fechaToDate(lineaA.cells[numCelda].textContent.includes(" - ") ? lineaA.cells[numCelda].textContent.split(" - ")[0] : lineaA.cells[numCelda].textContent);
                let fechaB = fechaToDate(lineaB.cells[numCelda].textContent.includes(" - ") ? lineaB.cells[numCelda].textContent.split(" - ")[0] : lineaB.cells[numCelda].textContent);
                return ascendente ? fechaA - fechaB : fechaB - fechaA;
            });
        }
        document.querySelectorAll("tbody tr").forEach(linea => linea.remove()); // Elimina las lineas desordenadas
        lineas.forEach(linea => document.querySelector("tbody").append(linea)); // Introduce las lineas ordenadas
    }
}

// Modal para mensajes
function mensajeModal(texto) {
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".modal #mensaje").textContent = texto;
}

function cierraModal() {
    document.querySelector(".modal").classList.remove("show");
}

//Añade representacion
function nuevasCreaciones(apartado) {

    let ultimoCodigo;

    switch (apartado) {
        case "#formularioRepresentacion":

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

            let incorrectos = "";
            let correcto = true;

            let fechaInicio = fechaToDate(document.querySelector("#fechaInicioRepresentacion").value);
            let fechaFin = fechaToDate(document.querySelector("#fechaFinalRepresentacion").value);
            let fechas = fechasIntervalo(fechaInicio, fechaFin);
            let teatro = upoTeatro.buscaTeatro(document.querySelector("#teatroSeleccionado").value);
            fechas.forEach(fecha => {


                let codigoRepresentacion = getSiguienteCodigo(teatro.representaciones);
                console.log(codigoRepresentacion);
                oRepresentacion = new Representacion(codigoRepresentacion, fecha, adaptada, precioBase, oEsp);
                console.log(codigoRepresentacion, fecha, adaptada, precioBase, oEsp);
                if (teatro.agregaRepresentacion(oRepresentacion) == false) {
                    correcto = false;
                    incorrectos += fecha + "\n";
                }
            });

            setTimeout(() => {
                if (correcto) {
                    mensajeModal("Representacion creada correctamente.");
                    document.querySelector(apartado).reset();
                } else {
                    mensajeModal("Las fechas |" + incorrectos + "| ya están ocupadas.");
                }
            }, 100);
            break;


        case "#formularioEspectaculo":
            let codigoEspectaculo = getSiguienteCodigo(upoTeatro.espectaculos);

            let nombre = document.querySelector("#nombreEspectaculo").value;
            let productor = document.querySelector("#nombreProductorEspectaculo").value;
            let categoria = document.querySelector("#categoriaEspectaculo").value;
            let gastos = document.querySelector("#gastosEspectaculo").value;
            let compania = upoTeatro.buscaCompania(document.querySelector("#companiaSeleccionada").value);
            let obra = upoTeatro.buscaObra(document.querySelector("#obraSeleccionada").value);

            let oEspectaculo = new Espectaculo(codigoEspectaculo, nombre, productor, categoria, gastos, obra, compania);
            setTimeout(() => {
                if (upoTeatro.agregaEspectaculo(oEspectaculo)) {
                    mensajeModal("Espectáculo creado correctamente.");
                    document.querySelector(apartado).reset();
                } else {
                    mensajeModal("Ya existe ese espectáculo");
                }
            }, 100);
            break;
        case "#formularioEntrada":
            let oEntradaAComprar;
            let representacionSeleccionada = upoTeatro.buscaRepresentacion(document.querySelector("#representacionSeleccionada").value);
            let teatroSeleccionado = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#representacionSeleccionada").value);

            let esAdaptada;
            if (document.querySelector("#entradaAdaptada_0").checked) {
                esAdaptada = true;
            } else {
                esAdaptada = false;
            }

            let totalEntrada = document.querySelector("#totalEntrada").value;
            let tipo;

            let codigoEntrada = getSiguienteCodigo(upoTeatro.listaEntradas());
            let oButaca;

            let butacasSeleccionadas = formularioEntrada.parentElement.getElementsByClassName("seleccionada");
            let butacaFragmentacion
            if (butacasSeleccionadas.length == 1) {

                //INDIVIDUAL
                butacaFragmentacion = butacasSeleccionadas[0].dataset.butaca.split("-");
                oButaca = teatroSeleccionado.buscaButaca(butacaFragmentacion[0], butacaFragmentacion[1], butacaFragmentacion[2]);
                tipo = butacaFragmentacion[0];

                oEntradaAComprar = new EntradaIndividual(codigoEntrada, esAdaptada, [oButaca], representacionSeleccionada.precioBase, tipo);
            } else {
                //GRUPAL
                let numPersonas = document.querySelector("#personasGrupal").value;

                let butacas = []
                for (let i = 0; i < butacasSeleccionadas.length; i++) {
                    butacaFragmentacion = butacasSeleccionadas[i].dataset.butaca.split("-");
                    oButaca = teatroSeleccionado.buscaButaca(butacaFragmentacion[0], butacaFragmentacion[1], butacaFragmentacion[2]);
                    butacas.push(oButaca);
                }
                oEntradaAComprar = new EntradaGrupal(codigoEntrada, esAdaptada, butacas, representacionSeleccionada.precioBase, numPersonas);
            }
            setTimeout(() => {
                if (representacionSeleccionada.compraEntrada(oEntradaAComprar)) {
                    mensajeModal("Has comprado la entrada correctamente");
                    //RESET
                    document.querySelector("#representacionSeleccionada").value = "00";
                    document.querySelector("#totalEntrada").value = "0";
                    actualizaFormularioEntrada();
                } else {
                    mensajeModal("Ha ocurrido un error, inténtelo más tarde.");
                }
            }, 100);
            break;

        case "#formularioEntrada":
    }
}

function getSiguienteCodigo(lista) {
    let ordenada = [];
    lista.forEach(elem => ordenada.push(elem.codigo));
    ordenada.sort((a, b) => { return a.localeCompare(b) });
    let ultimoCodigo = ordenada[ordenada.length - 1];
    let numRexp = /([A-Z]{1,2})([0-9]+)/;
    ultimoCodigo = ultimoCodigo.split(numRexp);
    console.log(ultimoCodigo);
    let letra = ultimoCodigo[1];
    let n = parseInt(ultimoCodigo[2]) + 1;
    let num = pad(n, ultimoCodigo[2].length == 3 ? 3 : 2);

    return (letra + num);
}

function pad(num, size) { return ('0000000000000000000' + num).substr(-size); }