// En este documento se define la clase UpoTeatro junto a sus métodos.
"use strict";
class UpoTeatro {
    constructor() {
        this.teatros = [];
        this.espectaculos = [];
        this.companias = [];
        this.obras = [];
    }
    agregaTeatro(teatro) {
        if (this.teatros.filter(teatroNuevo => teatroNuevo.nombre == teatro.nombre).length == 0) {
            this.teatros.push(teatro);
            return true;
        } else { return false; }
    }
    agregaEspectaculo(espectaculo) {
        if (this.espectaculos.filter(espectaculoNuevo => espectaculoNuevo.nombre == espectaculo.nombre && espectaculoNuevo.compania == espectaculo.compania).length == 0) {
            this.espectaculos.push(espectaculo);
            return true;
        } else { return false; }
    }
    borrarEspectaculo(codigo) {
        if (this.buscaEspectaculo(codigo) != undefined) {
            this.espectaculos = this.espectaculos.filter(espectaculo => espectaculo.codigo != codigo);
            return true;
        } else { return false; }
    }
    agregaCompania(compania) {
        if (this.companias.filter(companiaNuevo => companiaNuevo.cif == compania.cif).length == 0) {
            this.companias.push(compania);
            return true;
        } else { return false; }
    }
    agregaObra(obra) {
        if (this.obras.filter(obraNuevo => obraNuevo.codigo == obra.codigo).length == 0) {
            this.obras.push(obra);
            return true;
        } else { return false; }
    }
    buscaTeatro(codigo) {
        return this.teatros.filter(teatro => teatro.codigo == codigo)[0];
    }
    buscaTeatroPorRepresentacion(codigo) {
        let teatroConRepresentacion = null;
        this.teatros.forEach(teatro => {
            if (teatro.representaciones.filter(representacion => representacion.codigo == codigo).length != 0) {
                teatroConRepresentacion = teatro;
            }

        });
        return teatroConRepresentacion;
    }
    buscaRepresentacionPorEntrada(codigo) {
        let representacionConEntrada = null;
        this.teatros.forEach(teatro => {
            teatro.representaciones.forEach(representacion => {
                if (representacion.entradas.filter(entrada => entrada.codigo == codigo).length != 0) {
                    representacionConEntrada = representacion;
                }
            });
        });
        return representacionConEntrada;
    }
    buscaRepresentacion(codigo) {
        return this.buscaTeatroPorRepresentacion(codigo).representaciones.filter(rep => rep.codigo == codigo)[0];
    }
    buscaEspectaculo(codigo) {
        return this.espectaculos.filter(espectaculo => espectaculo.codigo == codigo)[0];
    }
    buscaCompania(cif) {
        return this.companias.filter(compania => compania.cif == cif)[0];
    }
    buscaObra(codigo) {
        return this.obras.filter(obra => obra.codigo == codigo)[0];
    }
    listadoEntradas() {
        let tabla = creaTabla(["Representación", "Fecha", "Adaptada", "Precio", "Butacas", "Tipo de entrada / Nº Personas", "Editar", "Borrar"], "listadoEntradas");
        this.listaEntradas().forEach(entrada => {
            let linea = entrada.toHTMLrow();
            let celdaRepresentacion = linea.insertCell(0);
            celdaRepresentacion.textContent = this.buscaRepresentacionPorEntrada(entrada.codigo).espectaculo.nombre;
            celdaRepresentacion = linea.insertCell(1);
            celdaRepresentacion.textContent = fechaToString(this.buscaRepresentacionPorEntrada(entrada.codigo).fecha);
            tabla.querySelector("table").tBodies[0].append(linea);
        });
        return tabla;
    }
    listadoRepresentaciones() {
        let tabla = creaTabla(["Teatro", "Fecha", "Adaptada", "Precio Base", "Espectáculo", "Editar", "Borrar"], "listadoRepresentaciones");
        let a = [];
        a.push(this.teatros[0].representaciones[0]);
        this.teatros.forEach(teatro => {
            teatro.representaciones.forEach(rep => {
                if (this.coincideRepresentacion(a, rep)) {
                    a.push(rep);
                }

            });
        });
        a.forEach(representacion => {
            let linea = representacion.toHTMLrow();
            let celdaTeatro = linea.insertCell(0);
            let teatro = this.buscaTeatroPorRepresentacion(representacion.codigo);
            celdaTeatro.textContent = teatro.nombre;
            let fechas = teatro.buscaRepresentacionesIntervalo(representacion);
            let fInicio = fechaToString(fechas[0].fecha);
            let fFin = fechaToString(fechas[fechas.length - 1].fecha);
            tabla.querySelector("table").tBodies[0].append(linea);
            if (fInicio == fFin) {
                linea.cells[1].textContent = fInicio;
            } else {
                linea.cells[1].textContent = fInicio + " - " + fFin;
            }
        });
        return tabla;
    }
    coincideRepresentacion(lista, busca) {
        return lista.filter(rep => this.buscaTeatroPorRepresentacion(rep.codigo) == this.buscaTeatroPorRepresentacion(busca.codigo) && rep.espectaculo == busca.espectaculo && rep.precioBase == busca.precioBase && rep.adaptada == busca.adaptada).length == 0;
    }
    listadoEspectaculos() {
        let tabla = creaTabla(["Espectáculo", "Productor", "Categoría", "Gastos", "Obra", "Compañía", "Editar", "Borrar"], "listadoEspectaculos");
        this.espectaculos.forEach(espectaculo => {
            tabla.querySelector("table").tBodies[0].append(espectaculo.toHTMLrow());
        });
        return tabla;
    }
    listaEntradas() {
        let entradas = [];
        this.teatros.forEach(teatro => {
            teatro.representaciones.forEach(representacion => {
                representacion.entradas.forEach(entrada => {
                    entradas.push(entrada);
                });
            });
        });
        return entradas;
    }
}