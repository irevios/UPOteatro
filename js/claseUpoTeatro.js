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
        let teatroConRepresentacion;
        this.teatros.forEach(teatro => {
            if (teatro.representaciones.filter(representacion => representacion.codigo == codigo).length > 0) {
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
}