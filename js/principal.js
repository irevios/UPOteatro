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
                upoTeatro.borrarRepresentacion(e.target.dataset.id);
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
            mensajeModal("¡Le has dado a editar!");
        }, 10);
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
    //document.querySelector("#formularios button[name='submit']").addEventListener("click", /*--*/ );
}

function editaRepresentacion(id) {
    let representacion = upoTeatro.buscaRepresentacion(id);
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(id);
    let fecha = representacion.fecha;
    let adaptada = representacion.adaptada;
    let precioBase = representacion.precioBase;
    let espectaculo = representacion.espectaculo;
    document.querySelector("#teatroSeleccionado").value = teatro.codigo;
    document.querySelector("#fechaInicioRepresentacion").value = fecha.toLocaleDateString();
    document.querySelector("#fechaFinalRepresentacion").value = fecha.toLocaleDateString();
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    //document.querySelector("#formularios button[name='submit']").addEventListener("click", /*--*/ );
}

function editaEspectaculo(id) {
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    //document.querySelector("#formularios button[name='submit']").addEventListener("click", /*--*/ );
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
        let fechaBuscando = linea.cells[1].textContent;
        if ((fechaInicial != undefined && fechaFinal != undefined) && fechaToDate(fechaBuscando) >= fechaToDate(fechaInicial) && fechaToDate(fechaBuscando) <= fechaToDate(fechaFinal)) {
            contiene = true;
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
        let lineas = [];
        document.querySelectorAll("tbody tr").forEach(linea => lineas.push(linea)); // Pasa los tr a un array

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
                let fechaA = fechaToDate(lineaA.cells[numCelda].textContent);
                let fechaB = fechaToDate(lineaB.cells[numCelda].textContent);
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
function nuevasCreaciones(apartado){
    switch(apartado){
        case "#formularioRepresentacion":
        break;

        case "#formularioEspectaculo":
        let ultimoCodigo = upoTeatro.espectaculos[upoTeatro.espectaculos.length-1].codigo.split("");
        let codigo="";
        for(let i=0;i<ultimoCodigo.length;i++)
        {
            if(i == (ultimoCodigo.length-1))
                codigo+=parseInt(ultimoCodigo[i])+1;
            else
                codigo+=ultimoCodigo[i];
        }
        let nombre = document.querySelector("#nombreEspectaculo").value;
        let productor = document.querySelector("#nombreProductorEspectaculo").value;
        let categoria = document.querySelector("#categoriaEspectaculo").value;
        let gastos = document.querySelector("#gastosEspectaculo").value;
        let compania = upoTeatro.buscaCompania(document.querySelector("#companiaSeleccionada").value);
        let obra = upoTeatro.buscaObra(document.querySelector("#obraSeleccionada").value);

        let oEspectaculo = new Espectaculo(codigo, nombre, productor, categoria, gastos, obra, compania);
        upoTeatro.agregaEspectaculo(oEspectaculo);
        document.querySelector(apartado).reset();
        break;

        case "#formularioEntrada":
        alert("Nueva Entrada");
        break;
    }
}