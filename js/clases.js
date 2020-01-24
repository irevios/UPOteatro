// En este documento se define todas las clases, menos UpoTeatro, junto a sus métodos.
"use strict";
class Teatro {
    constructor(codigo, nombre, direccion, representaciones) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.direccion = direccion;
        this.aforo = 0;
        this.representaciones = [];
        this.butacas = [];
    }
    agregaRepresentacion(representacion) {
        this.representaciones.push(representacion);
    }
    agregaButaca(butaca) {
        if (this.butacas.filter(butacaNuevo => butacaNuevo.numero == butaca.numero && butacaNuevo.fila == butaca.fila && butacaNuevo.zona == butaca.zona).length == 0) {
            this.butacas.push(butaca);
            return true;
        } else { return false; }
    }
    buscaButaca(zona, fila, num) {
        return this.butacas.filter(butaca => butaca.numero == num && butaca.fila == fila && butaca.zona == zona)[0];
    }
    calculaAforo() {
        this.aforo = this.butacas.length;
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
        if (this.entradas.filter(entradaNuevo => entradaNuevo.butaca == entrada.butaca && entradaNuevo.representacion == entrada.representacion).length == 0) {
            this.entradas.push(entrada);
            return true;
        } else { return false; }
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
        celda.textContent = this.precioBase;
        celda = fila.insertCell(-1);
        celda.textContent = this.espectaculo.nombre;
        return fila;
    }
    toString() {
        return fechaToString(this.fecha) + " | " + this.espectaculo.nombre;
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
        celda.textContent = this.obra.nombre;
        celda = fila.insertCell(-1);
        celda.textContent = this.compania.nombre;
        return fila;
    }
}

class Entrada {
    constructor(adaptada, butacas, precioBase) {
        this.adaptada = adaptada;
        this.precioBase = precioBase;
        this.precio = 0;
        this.butacas = butacas;
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
    constructor(adaptada, butacas, precioBase, tipo) {
        super(adaptada, butacas, precioBase);
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
        return fila;
    }
}

class EntradaGrupal extends Entrada {
    constructor(adaptada, butacas, precioBase, numPersonas) {
        super(adaptada, butacas, precioBase);
        this.numPersonas = numPersonas;
    }
    calculaPrecio() {
        this.precio = parseFloat(this.precioBase) * parseFloat(this.butacas.length);
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
        celda.textContent = this.butacas.length;
        return fila;
    }
}

class Butaca {
    constructor(numero, fila, zona, coefPrecio) {
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