// En este documento se define las funciones que cargan los datos del XML a la clase upoTeatro


function cargaInicialDatos() {
    Ajax("./xml/usuarios.xml", cargaUsuarios, "GET", "");
    cargaDatos2();
    Ajax("./xml/allDatos.xml", cargaDatos, "GET", "");
}

function cargaUsuarios(xml) {
    let usuarios = [];
    xml.querySelectorAll("usuario").forEach(usuario => {
        let nombre = usuario.querySelector("nombre").textContent;
        let clave = usuario.querySelector("clave").textContent;
        let tipo = usuario.getAttribute("tipo");
        let user = { nombre: nombre, clave: clave, tipo: tipo };
        usuarios.push(user);
    });
    let parametro = "usuarios=" + JSON.stringify(usuarios);
    Ajax("./ajax/usuarios/insertaUsuarios.php", (resultado) => {
        r = JSON.parse(resultado);
        r.error == 1 ? mensajeModal(r.mensaje) : "";
    }, "POST", parametro);
}

function cargaDatos(xml) {
    //cargaInicialObras(xml.querySelectorAll("obra"));
    //cargaInicialCompanias(xml.querySelectorAll("compania"));
    //cargaInicialEspectaculos(xml.querySelectorAll("espectaculo"));
    cargaInicialTeatros(xml.querySelectorAll("datos > teatros > teatro"));
    cargaInicialRepresentaciones(xml.querySelectorAll("datos > representaciones representacion"));
    cargaInicialButacas(xml.querySelectorAll("butacas"));
    cargaInicialEntradas(xml.querySelectorAll("entrada"));
}

function cargaDatos2() {
    $.get("./ajax/obras/buscaObras.php", cargaInicialObras, "json");
    $.get("./ajax/companias/buscaCompanias.php", cargaInicialCompanias, "json");
    $.get("./ajax/espectaculos/buscaEspectaculos.php", cargaInicialEspectaculos, "json");
}

function cargaInicialObras(json) {
    json.forEach(obra => {
        let cod = obra.CODIGO;
        let nombre = obra.NOMBRE;
        let autor = obra.AUTOR;

        let nuevaObra = new Obra(cod, nombre, autor);
        upoTeatro.agregaObra(nuevaObra);
    });
    obras = true;
}

function cargaInicialCompanias(json) {
    json.forEach(compania => {
        let cif = compania.CIF;
        let nombre = compania.NOMBRE;
        let director = compania.DIRECTOR;

        let nuevaCompania = new Compania(cif, nombre, director);
        upoTeatro.agregaCompania(nuevaCompania);
    });
    companias = true;
}

function cargaInicialEspectaculos(json) {
    json.forEach(espectaculo => {
        let codigo = espectaculo.CODIGO;
        let nombre = espectaculo.NOMBRE;
        let productor = espectaculo.PRODUCTOR;
        let categoria = espectaculo.CATEGORIA;
        let gastos = espectaculo.GASTOS;
        let obra = espectaculo.CODIGO_OBRA;
        let compania = espectaculo.CIF_COMPANIA;

        let nuevaEspectaculo = new Espectaculo(codigo, nombre, productor, categoria, gastos, obra, compania);
        upoTeatro.agregaEspectaculo(nuevaEspectaculo);
    });
}


function cargaInicialTeatros(teatros) {
    teatros.forEach(teatro => {
        let codigo = teatro.getAttribute("cod");
        let nombre = teatro.querySelector("nombre").textContent;
        let direccion = teatro.querySelector("direccion").textContent;
        let nuevoTeatro = new Teatro(codigo, nombre, direccion);
        upoTeatro.agregaTeatro(nuevoTeatro);
    });
}

function cargaInicialRepresentaciones(representaciones) {
    representaciones.forEach(representacion => {
        let teatro = upoTeatro.buscaTeatro(representacion.parentElement.getAttribute("cod"));
        let codigo = representacion.getAttribute("cod");
        let fecha = new Date(representacion.querySelector("fecha").textContent);
        let adaptada = representacion.getAttribute("adaptada") == "N" ? false : true;
        let precioBase = representacion.querySelector("precioBase").textContent;
        let espectaculo = upoTeatro.buscaEspectaculo(representacion.getAttribute("espectaculo"));

        let nuevaRepresentacion = new Representacion(codigo, fecha, adaptada, precioBase, espectaculo);
        teatro.agregaRepresentacion(nuevaRepresentacion);
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
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(entrada.querySelector("representacion").textContent);
        let representacion = teatro.buscaRepresentacion(entrada.querySelector("representacion").textContent);
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