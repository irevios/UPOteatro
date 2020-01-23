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
    calculaAforo() {
        this.aforo = this.butacas.length;
    }
    buscaButaca(zona, fila, num) {
        return this.butacas.filter(butaca => butaca.numero == num && butaca.fila == fila && butaca.zona == zona)[0];
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
        let zona = this.zona[0].toUpperCase() + this.zona.substring(1);

        return zona + " | " + "Fila: " + this.fila + " | Número: " + this.numero;
    }
    textoButaca() {
        return this.zona + "-" + this.fila + "-" + this.numero;
    }
}

class Entrada {
    constructor(adaptada, butaca, representacion) {
        this.adaptada = adaptada;
        this.precio = 0;
        this.butaca = butaca;
        this.representacion = representacion;
    }
    calculaPrecio() {
        //precio base representacion * coeficiente butaca
    }
}

class EntradaIndividual extends Entrada {
    constructor(adaptada, butaca, representacion, tipo) {
        super(adaptada, butaca, representacion, tipo);
        this.tipo = tipo;
    }
}

class EntradaGrupal extends Entrada {
    constructor(adaptada, butaca, representacion, numPersonas) {
        super(adaptada, butaca, representacion, numPersonas);
        this.numPersonas = numPersonas;
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
    buscaButaca(butaca) {
        let butacaEncontrada;
        this.entradas.forEach(entrada => {
            if (entrada.butaca != undefined) {
                let butacas = entrada.butaca.filter(otraButaca =>
                    otraButaca.numero == butaca.numero &&
                    otraButaca.fila == butaca.fila &&
                    otraButaca.zona == butaca.zona);
                console.log(butacas);
                if (butacas.length > 0) {
                    butacaEncontrada = butacas[0];
                }
            }

        });
        return butacaEncontrada;
    }
    butacaOcupada(butaca) {
        let ocupada = false;
        let entradas;
       if(this.buscaButaca(butaca)!=undefined){
            ocupada = true;
       }
       return ocupada;
       
    }
    toHTMLrow() {

    }
    toString() {
        return this.fecha + " | " + this.espectaculo.nombre;
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