// En este documento se define la clase UpoTeatro junto a sus métodos.
"use strict";
class UpoTeatro {
    constructor() {
        this.teatros = [];
        this.representaciones = [];
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
    agregaRepresentacion(representacion) {
        if (this.representaciones.filter(representacionNuevo => representacionNuevo.codigo == representacion.codigo).length == 0) {
            this.representaciones.push(representacion);
            return true;
        } else { return false; }
    }
    agregaEspectaculo(espectaculo) {
        if (this.espectaculos.filter(espectaculoNuevo => espectaculoNuevo.codigo == espectaculo.codigo).length == 0) {
            this.espectaculos.push(espectaculo);
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
    buscaRepresentacion(codigo) {
        return this.representaciones.filter(representacion => representacion.codigo == codigo)[0];
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
        let tabla = creaTabla(["Representación", "Adaptada", "Precio", "Butacas", "Tipo de entrada / Nº Personas"]);
        this.teatros.forEach(teatro => {
            teatro.representaciones.forEach(representacion => {
                representacion.entradas.forEach(entrada => {
                    let linea = entrada.toHTMLrow();
                    let celdaRepresentacion = linea.insertCell(0);
                    celdaRepresentacion.textContent = representacion.toString();
                    tabla.querySelector("table").tBodies[0].append(linea);
                });
            });
        });
        return tabla;
    }
    listadoRepresentaciones() {
        let tabla = creaTabla(["Teatro", "Fecha", "Adaptada", "Precio Base", "Espectáculo"]);
        this.teatros.forEach(teatro => {
            teatro.representaciones.forEach(representacion => {
                let linea = representacion.toHTMLrow();
                let celdaTeatro = linea.insertCell(0);
                celdaTeatro.textContent = teatro.nombre;
                tabla.querySelector("table").tBodies[0].append(linea);
            });
        });
        return tabla;
    }
    listadoEspectaculos() {
        let tabla = creaTabla(["Espectaculo", "Productor", "Categoría", "Gastos", "Obra", "Compañía"]);
        this.espectaculos.forEach(espectaculo => {
            tabla.querySelector("table").tBodies[0].append(espectaculo.toHTMLrow());
        });
        return tabla;
    }
}