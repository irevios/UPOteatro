// En este documento se define las funciones que cargan los datos del XML a la clase upoTeatro


function cargaInicialDatos() {
    Ajax("./xml/usuarios.xml", cargaUsuarios, "GET", "");
    cargaDatos();
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

function cargaDatos() {
    $.get("./ajax/obras/buscaObras.php", cargaInicialObras, "json");
    $.get("./ajax/companias/buscaCompanias.php", cargaInicialCompanias, "json");
    $.get("./ajax/espectaculos/buscaEspectaculos.php", (json) => {
        cargaInicialEspectaculos(json);
        $.get("./ajax/teatros/buscaTeatros.php", (json) => {
            cargaInicialTeatros(json);
            $.get("./ajax/representaciones/buscaRepresentaciones.php", (json) => {
                cargaInicialRepresentaciones(json);
                $.get("./ajax/butacas/buscaButacas.php", (json) => {
                    cargaInicialButacas(json);
                    $.get("./ajax/entradas/buscaEntradasIndividuales.php", cargaInicialEntradasIndividuales, "json");
                    $.get("./ajax/entradas/buscaEntradasGrupales.php", cargaInicialEntradasGrupales, "json");
                }, "json");
            }, "json");
        }, "json");
    }, "json");

}

function cargaInicialObras(json) {
    json.forEach(obra => {
        let cod = obra.CODIGO;
        let nombre = obra.NOMBRE;
        let autor = obra.AUTOR;

        let nuevaObra = new Obra(cod, nombre, autor);
        upoTeatro.agregaObra(nuevaObra);
    });
}

function cargaInicialCompanias(json) {
    json.forEach(compania => {
        let cif = compania.CIF;
        let nombre = compania.NOMBRE;
        let director = compania.DIRECTOR;

        let nuevaCompania = new Compania(cif, nombre, director);
        upoTeatro.agregaCompania(nuevaCompania);
    });
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

function cargaInicialTeatros(json) {
    json.forEach(teatro => {
        let codigo = teatro.CODIGO;
        let nombre = teatro.NOMBRE;
        let direccion = teatro.DIRECCION;
        let aforo = teatro.AFORO;

        let nuevoTeatro = new Teatro(codigo, nombre, direccion, aforo);
        upoTeatro.agregaTeatro(nuevoTeatro);
    });
}

function cargaInicialRepresentaciones(json) {
    json.forEach(representacion => {
        let teatro = upoTeatro.buscaTeatro(representacion.COD_TEATRO);
        let codigo = representacion.CODIGO;
        let fecha = new Date(representacion.FECHA);
        let adaptada = representacion.ADAPTADA == "N" ? false : true;
        let precioBase = representacion.PRECIO_BASE;
        let espectaculo = upoTeatro.buscaEspectaculo(representacion.COD_ESPECTACULO);

        let nuevaRepresentacion = new Representacion(codigo, fecha, adaptada, precioBase, espectaculo);
        teatro.agregaRepresentacion(nuevaRepresentacion);
    });
}

function cargaInicialButacas(json) {
    json.forEach(butaca => {
        let teatro = upoTeatro.buscaTeatro(butaca.COD_TEATRO);
        let codigo = butaca.CODIGO;
        let fila = butaca.FILA;
        let numero = butaca.NUMERO;
        let coefPrecio = butaca.COEF_PRECIO;
        let zona = butaca.ZONA;

        let nuevaButaca = new Butaca(codigo, numero, fila, zona, coefPrecio);
        teatro.agregaButaca(nuevaButaca);
    });
}

function cargaInicialEntradasIndividuales(json) {
    json.forEach(entrada => {
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(entrada.COD_REPRESENTACION);
        let representacion = teatro.buscaRepresentacion(entrada.COD_REPRESENTACION);
        let codigo = entrada.CODIGO;
        let adaptada = entrada.ADAPTADA;
        let butaca = teatro.buscaButacaPorCod(entrada.COD_BUTACA);
        let tipo = entrada.TIPO;

        let nuevaentrada = new EntradaIndividual(codigo, adaptada, butaca, representacion.precioBase, tipo);
        representacion.compraEntrada(nuevaentrada);
    });
}

function cargaInicialEntradasGrupales(json) {
    json.forEach(entrada => {
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(entrada.COD_REPRESENTACION);
        let representacion = teatro.buscaRepresentacion(entrada.COD_REPRESENTACION);
        let codigo = entrada.CODIGO;
        let adaptada = entrada.ADAPTADA;
        let butaca = teatro.buscaButacaPorCod(entrada.COD_BUTACA);
        let numPersonas = entrada.NUM_PERSONAS;
        if (representacion.buscaEntrada(codigo) == undefined) {
            let nuevaEntrada = new EntradaGrupal(codigo, adaptada, butaca, representacion.precioBase, numPersonas);
            representacion.compraEntrada(nuevaEntrada);
        } else {
            representacion.buscaEntrada(codigo).agregaButaca(butaca);
        }
    });
}