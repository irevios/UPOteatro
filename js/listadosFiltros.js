// Añade los filtros al listado
function agregaFiltros(id) {
    console.log(id);
    if (id != "filtrosEspectaculos") {
        document.querySelector("#filtroFechaInicial").addEventListener("change", () => {
            compruebaFinFecha(document.querySelector("#filtroFechaInicial"), document.querySelector("#filtroFechaFinal"));
            buscaFecha();
        });
        document.querySelector("#filtroFechaFinal").addEventListener("change", buscaFecha);
    }
    document.querySelector("#filtroTexto").addEventListener("keyup", buscaTexto);
}

// Filtros
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