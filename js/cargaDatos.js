// En este documento se define las funciones que cargan los datos del XML a la clase upoTeatro


function cargaInicialDatos() {
    leeArchivoXMLHTML("./xml/allDatos.xml", cargaDatos);
}

function cargaDatos(xml) {
    cargaInicialObras(xml.querySelectorAll("obra"));
    cargaInicialCompanias(xml.querySelectorAll("compania"));
    cargaInicialEspectaculos(xml.querySelectorAll("espectaculo"));
    cargaInicialRepresentaciones(xml.querySelectorAll("datos> representaciones > representacion"));
    cargaInicialTeatros(xml.querySelectorAll("teatro"));
    cargaInicialButacas(xml.querySelectorAll("butacas"));
    cargaInicialEntradas(xml.querySelectorAll("entrada"));
}

function cargaInicialObras(obras) {
    obras.forEach(obra => {
        let cod = obra.getAttribute("cod");
        let nombre = obra.querySelector("nombre").textContent;
        let autor = obra.querySelector("autor").textContent;
        let nuevaObra = new Obra(cod, nombre, autor);
        upoTeatro.agregaObra(nuevaObra);
    });
}

function cargaInicialCompanias(companias) {
    companias.forEach(compania => {
        let cif = compania.getAttribute("cif");
        let nombre = compania.querySelector("nombre").textContent;
        let director = compania.querySelector("director").textContent;

        let nuevaCompania = new Compania(cif, nombre, director);
        upoTeatro.agregaCompania(nuevaCompania);
    });
}

function cargaInicialEspectaculos(espectaculos) {
    espectaculos.forEach(espectaculo => {
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


function cargaInicialRepresentaciones(representaciones) {
    representaciones.forEach(representacion => {
        let codigo = representacion.getAttribute("cod");
        let fecha = new Date(representacion.querySelector("fecha").textContent);
        let adaptada = representacion.getAttribute("adaptada") == "N" ? false : true;
        let precioBase = representacion.querySelector("precioBase").textContent;
        let espectaculo = upoTeatro.buscaEspectaculo(representacion.getAttribute("espectaculo"));

        let nuevaRepresentacion = new Representacion(codigo, fecha, adaptada, precioBase, espectaculo);
        upoTeatro.agregaRepresentacion(nuevaRepresentacion);
    });
}

function cargaInicialTeatros(teatros) {
    teatros.forEach(teatro => {
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

function cargaInicialButacas(butacas) {
    butacas.forEach(butaca => {
        let teatro = upoTeatro.buscaTeatro(butaca.getAttribute("teatro"));
        butaca.querySelectorAll("zona").forEach(zona => {
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
    xml.forEach(entrada => {
        let representacion = upoTeatro.buscaRepresentacion(entrada.querySelector("representacion").textContent);
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(entrada.querySelector("representacion").textContent);
        let codigo = entrada.getAttribute("cod");
        let adaptada = entrada.querySelector("adaptada").textContent == "N" ? false : true;
        let butaca;
        let nuevaEntrada;
        if (entrada.getAttribute("tipo") == "individual") {
            let zona = entrada.querySelector("tipo").textContent;
            let fila = entrada.querySelector("butaca").getAttribute("fila");
            let num = entrada.querySelector("butaca").getAttribute("num");
            butaca = [teatro.buscaButaca(zona, fila, num)];
            nuevaEntrada = new EntradaIndividual(codigo, adaptada, butaca, representacion.precioBase, zona);
        } else {
            butaca = [];
            let butacas = entrada.querySelectorAll("butaca");
            butacas.forEach(cadaButaca => {
                let fila = cadaButaca.getAttribute("fila");
                let num = cadaButaca.getAttribute("num");
                butaca.push(teatro.buscaButaca("platea", fila, num));
            });
            let numPersonas = entrada.getAttribute("numPersonas");
            nuevaEntrada = new EntradaGrupal(codigo, adaptada, butaca, representacion.precioBase, numPersonas);
        }
        representacion.compraEntrada(nuevaEntrada);
    });
}