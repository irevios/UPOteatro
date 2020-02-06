// En este documento se define todas las clases, menos UpoTeatro, junto a sus métodos.
"use strict";
class Teatro {
    constructor(codigo, nombre, direccion, aforo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.direccion = direccion;
        this.aforo = aforo;
        this.representaciones = [];
        this.butacas = [];
    }
    agregaRepresentacion(representacion) {
        if (this.representaciones.filter(representacionNuevo => fechaToString(representacionNuevo.fecha) == fechaToString(representacion.fecha)).length == 0) {
            this.representaciones.push(representacion);
            return true;
        } else { return false; }
    }
    esPosibleAgregarRepresentacion(representacion) {
        if (this.representaciones.filter(representacionNuevo => fechaToString(representacionNuevo.fecha) == fechaToString(representacion.fecha)).length == 0) {
            return true;
        } else { return false; }
    }
    agregaButaca(butaca) {
        if (this.butacas.filter(butacaNuevo => butacaNuevo.numero == butaca.numero && butacaNuevo.fila == butaca.fila && butacaNuevo.zona == butaca.zona).length == 0) {
            this.butacas.push(butaca);
            return true;
        } else { return false; }
    }
    borrarRepresentacion(codigo) {
        if (this.buscaRepresentacion(codigo) != undefined) {
            this.representaciones = this.representaciones.filter(representacion => representacion.codigo != codigo);
            return true;
        } else { return false; }

    }
    buscaButaca(zona, fila, num) {
        return this.butacas.filter(butaca => butaca.numero == num && butaca.fila == fila && butaca.zona == zona)[0];
    }
    buscaButacaPorCod(codigo) {
        return this.butacas.filter(butaca => butaca.codigo == codigo)[0];
    }
    buscaRepresentacion(codigo) {
        return this.representaciones.filter(representacion => representacion.codigo == codigo)[0];
    }
    buscaRepresentacionesIntervalo(representacion) {
        let repInicial = representacion;
        let representacionIntervalo = [representacion];
        let repr = this.representaciones;
        repr.sort((repA, repB) => { return repA.fecha - repB.fecha });
        repr.forEach(rep => {
            if (representacion.precioBase == rep.precioBase &&
                representacion.espectaculo == rep.espectaculo &&
                esFechaConsecutivaPosterior(representacion.fecha, rep.fecha)) {
                representacionIntervalo.push(rep);
                representacion = rep;
            }
        });
        repr.sort((repA, repB) => { return repB.fecha - repA.fecha });
        repr.forEach(rep => {
            if (repInicial.precioBase == rep.precioBase && repInicial.espectaculo == rep.espectaculo && esFechaConsecutivaAnterior(repInicial.fecha, rep.fecha)) {
                representacionIntervalo.push(rep);
                repInicial = rep;
            }
        });
        representacionIntervalo.sort((repA, repB) => { return repA.fecha - repB.fecha });
        return representacionIntervalo;
    }
}

class Representacion {
    constructor(codigo, fecha, adaptada, precioBase, espectaculo) {
        this.codigo = codigo;
        this.fecha = fecha;
        this.adaptada = adaptada;
        this.precioBase = precioBase;
        this.espectaculo = espectaculo;
        this.entradas = [];
    }
    compraEntrada(entrada) {
        if (this.entradas.filter(entradaNuevo => entradaNuevo.codigo == entrada.codigo).length == 0) {
            this.entradas.push(entrada);
            return true;
        } else { return false; }
    }
    borrarEntrada(codigo) {
        if (this.buscaEntrada(codigo) != undefined) {
            this.entradas = this.entradas.filter(entrada => entrada.codigo != codigo);
            return true;
        } else { return false; }
    }
    buscaEntrada(codigo) {
        return this.entradas.filter(entrada => entrada.codigo == codigo)[0];
    }
    butacaOcupada(butaca) {
        let ocupada = false;
        this.entradas.forEach(entrada => {
            if (entrada.butacas != undefined) {
                let butacas = entrada.butacas.filter(otraButaca => otraButaca.numero == butaca.numero && otraButaca.fila == butaca.fila && otraButaca.zona == butaca.zona);
                if (butacas.length > 0) {
                    ocupada = true;
                }
            }

        });
        return ocupada;
    }
    toHTMLrow() {
        let fila = document.createElement("tr");
        let celda = fila.insertCell(-1);
        celda.textContent = fechaToString(this.fecha);
        celda = fila.insertCell(-1);
        celda.textContent = this.adaptada ? "Sí" : "No";
        celda = fila.insertCell(-1);
        celda.textContent = this.precioBase + "€";
        celda = fila.insertCell(-1);
        celda.textContent = this.espectaculo.nombre;
        if (esAdmin()) {
            agregaBoton("editar", fila, this.codigo);
            agregaBoton("borrar", fila, this.codigo);
        }
        return fila;
    }
}

class Espectaculo {
    constructor(codigo, nombre, productor, categoria, gastos, obra, compania) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.productor = productor;
        this.categoria = categoria;
        this.gastos = gastos;
        this.obra = obra;
        this.compania = compania;
    }
    toHTMLrow() {
        let fila = document.createElement("tr");
        let celda = fila.insertCell(-1);
        celda.textContent = this.nombre;
        celda = fila.insertCell(-1);
        celda.textContent = this.productor;
        celda = fila.insertCell(-1);
        celda.textContent = this.categoria;
        celda = fila.insertCell(-1);
        celda.textContent = this.gastos + "€";
        celda = fila.insertCell(-1);
        celda.textContent = upoTeatro.buscaObra(this.obra).nombre;
        celda = fila.insertCell(-1);
        celda.textContent = upoTeatro.buscaCompania(this.compania).nombre;
        if (esAdmin()) {
            agregaBoton("editar", fila, this.codigo);
            agregaBoton("borrar", fila, this.codigo);
        }
        return fila;
    }
}

class Entrada {
    constructor(codigo, adaptada, butacas, precioBase) {
        this.codigo = codigo;
        this.adaptada = adaptada;
        this.precioBase = precioBase;
        this.precio = 0;
        this.butacas = [butacas];
    }
    butacasToHTML() {
        let butacas = document.createElement("div");
        this.butacas.forEach(butaca => {
            let butacaString = document.createElement("div");
            butacaString.textContent = "F: " + butaca.fila + " | N: " + butaca.numero;
            butacas.append(butacaString);
        });
        return butacas;
    }
}

class EntradaIndividual extends Entrada {
    constructor(codigo, adaptada, butaca, precioBase, tipo) {
        super(codigo, adaptada, butaca, precioBase);
        this.tipo = tipo;
    }
    calculaPrecio() {
        this.precio = parseFloat(this.precioBase) * parseFloat(this.butacas[0].coefPrecio);
        return this.precio.toFixed(2);
    }
    toHTMLrow() {
        let fila = document.createElement("tr");
        let celda = fila.insertCell(-1);
        celda.textContent = this.adaptada ? "Sí" : "No";
        celda = fila.insertCell(-1);
        celda.textContent = this.calculaPrecio() + "€";
        celda = fila.insertCell(-1);
        celda.append(super.butacasToHTML());
        celda = fila.insertCell(-1);
        celda.textContent = toTitleCase(this.tipo);
        if (esAdmin()) {
            agregaBoton("editar", fila, this.codigo);
            agregaBoton("borrar", fila, this.codigo);
        }
        return fila;
    }
}

class EntradaGrupal extends Entrada {
    constructor(codigo, adaptada, butaca, precioBase, numPersonas) {
        super(codigo, adaptada, butaca, precioBase);
        this.numPersonas = numPersonas;
    }
    calculaPrecio() {
        this.precio = parseFloat(this.precioBase) * parseFloat(this.butacas.length);
        return this.precio.toFixed(2);
    }
    agregaButaca(butaca) {
        if (this.butacas.filter(butacaNuevo => butacaNuevo.codigo == butaca.codigo).length == 0) {
            this.butacas.push(butaca);
            return true;
        } else { return false; }
    }
    toHTMLrow() {
        let fila = document.createElement("tr");
        let celda = fila.insertCell(-1);
        celda.textContent = this.adaptada ? "Sí" : "No";
        celda = fila.insertCell(-1);
        celda.textContent = this.calculaPrecio() + "€";
        celda = fila.insertCell(-1);
        celda.append(super.butacasToHTML());
        celda = fila.insertCell(-1);
        celda.textContent = this.butacas.length + " personas";
        if (esAdmin()) {
            agregaBoton("editar", fila, this.codigo);
            agregaBoton("borrar", fila, this.codigo);
        }
        return fila;
    }
}

class Butaca {
    constructor(codigo, numero, fila, zona, coefPrecio) {
        this.codigo = codigo;
        this.numero = numero;
        this.fila = fila;
        this.zona = zona;
        this.coefPrecio = coefPrecio;
    }
    toString() {
        return toTitleCase(this.zona) + " | " + "Fila: " + this.fila + " | Número: " + this.numero;
    }
    idButaca() {
        return this.zona + "-" + this.fila + "-" + this.numero;
    }
}

class Compania {
    constructor(cif, nombre, director) {
        this.cif = cif;
        this.nombre = nombre;
        this.director = director;
    }
}

class Obra {
    constructor(codigo, nombre, autor) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.autor = autor;
    }
}