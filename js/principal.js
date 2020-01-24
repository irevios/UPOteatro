// En este documento se define las funciones que interactuan entre el HTML y las clases.
"use strict";

var upoTeatro = new UpoTeatro();
document.addEventListener("load", cargaInicialDatos());

function cargaInicialDatos() {
    leeArchivoXMLHTML("./xml/obras.xml", cargaInicialObras);
    leeArchivoXMLHTML("./xml/compañias.xml", cargaInicialCompanias);
    leeArchivoXMLHTML("./xml/espectaculos.xml", cargaInicialEspectaculos);
    leeArchivoXMLHTML("./xml/representaciones.xml", cargaInicialRepresentaciones);
    leeArchivoXMLHTML("./xml/teatros.xml", cargaInicialTeatros);
    leeArchivoXMLHTML("./xml/butacas.xml", cargaInicialButacas);
    leeArchivoXMLHTML("./xml/entradas.xml", cargaInicialEntradas);
}

function cargaInicialObras(xml) {
    xml.querySelectorAll("obra").forEach(obra => {
        let cod = obra.getAttribute("cod");
        let nombre = obra.querySelector("nombre").textContent;
        let autor = obra.querySelector("autor").textContent;

        let nuevaObra = new Obra(cod, nombre, autor);
        upoTeatro.agregaObra(nuevaObra);
    });
}

function cargaInicialCompanias(xml) {
    xml.querySelectorAll("compañia").forEach(compania => {
        let cif = compania.getAttribute("cif");
        let nombre = compania.querySelector("nombre").textContent;
        let director = compania.querySelector("director").textContent;

        let nuevaCompania = new Compania(cif, nombre, director);
        upoTeatro.agregaCompania(nuevaCompania);
    });
}

function cargaInicialEspectaculos(xml) {
    xml.querySelectorAll("espectaculo").forEach(espectaculo => {
        let codigo = espectaculo.getAttribute("cod");
        let nombre = espectaculo.querySelector("nombre").textContent;
        let productor = espectaculo.querySelector("productor").textContent;
        let categoria = espectaculo.querySelector("categoria").textContent;
        let gastos = espectaculo.querySelector("gastos").textContent;
        let obra = upoTeatro.buscaObra(espectaculo.getAttribute("obra"));
        let compania = upoTeatro.buscaCompania(espectaculo.getAttribute("compania"));

        let nuevoEspectaculo = new Espectaculo(codigo, nombre, productor, categoria, gastos, obra, compania);
        upoTeatro.agregaEspectaculo(nuevoEspectaculo);
    });
}


function cargaInicialRepresentaciones(xml) {
    xml.querySelectorAll("representacion").forEach(representacion => {
        let codigo = representacion.getAttribute("cod");
        let fecha = new Date(representacion.querySelector("fecha").textContent);
        let adaptada = representacion.getAttribute("adaptada") == "N" ? false : true;
        let precioBase = representacion.querySelector("precioBase").textContent;
        let espectaculo = upoTeatro.buscaEspectaculo(representacion.getAttribute("espectaculo"));

        let nuevaRepresentacion = new Representacion(codigo, fecha, adaptada, precioBase, espectaculo);
        upoTeatro.agregaRepresentacion(nuevaRepresentacion);
    });
}

function cargaInicialTeatros(xml) {
    xml.querySelectorAll("teatro").forEach(teatro => {
        let codigo = teatro.getAttribute("cod");
        let nombre = teatro.querySelector("nombre").textContent;
        let direccion = teatro.querySelector("direccion").textContent;
        let representaciones = teatro.querySelectorAll("representacion");
        let nuevaTeatro = new Teatro(codigo, nombre, direccion);
        representaciones.forEach(representacion => {
            let codRepresentacion = representacion.getAttribute("cod");
            nuevaTeatro.agregaRepresentacion(upoTeatro.buscaRepresentacion(codRepresentacion));
        })
        upoTeatro.agregaTeatro(nuevaTeatro);
    });
}

function cargaInicialButacas(xml) {
    xml.querySelectorAll("butacas").forEach(butacas => {
        let teatro = upoTeatro.buscaTeatro(butacas.getAttribute("teatro"));
        butacas.querySelectorAll("zona").forEach(zona => {
            let nombreZona = zona.getAttribute("nomZona");
            let coefPrecio = zona.getAttribute("coefPrecio");
            zona.querySelectorAll("fila").forEach(fila => {
                let nFila = fila.getAttribute("num");
                fila.querySelectorAll("butaca").forEach(butaca => {
                    let numero = butaca.getAttribute("num");
                    let nuevaButaca = new Butaca(numero, nFila, nombreZona, coefPrecio);
                    teatro.agregaButaca(nuevaButaca);
                });
            });
        });
    });
}

function cargaInicialEntradas(xml) {
    xml.querySelectorAll("entrada").forEach(entrada => {
        let representacion = upoTeatro.buscaRepresentacion(entrada.querySelector("representacion").textContent);
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(entrada.querySelector("representacion").textContent);
        let adaptada = entrada.querySelector("adaptada").textContent == "N" ? false : true;
        let butaca;
        let nuevaEntrada;
        if (entrada.getAttribute("tipo") == "individual") {
            let zona = entrada.querySelector("tipo").textContent;
            let fila = entrada.querySelector("butaca").getAttribute("fila");
            let num = entrada.querySelector("butaca").getAttribute("num");
            butaca = [teatro.buscaButaca(zona, fila, num)];
            nuevaEntrada = new EntradaIndividual(adaptada, butaca, representacion.precioBase, zona);
        } else {
            butaca = [];
            let butacas = entrada.querySelectorAll("butaca");
            butacas.forEach(cadaButaca => {
                let fila = cadaButaca.getAttribute("fila");
                let num = cadaButaca.getAttribute("num");
                butaca.push(teatro.buscaButaca("platea", fila, num));
            });
            let numPersonas = entrada.getAttribute("numPersonas");
            nuevaEntrada = new EntradaGrupal(adaptada, butaca, representacion.precioBase, numPersonas);
        }
        representacion.compraEntrada(nuevaEntrada);
    });
}