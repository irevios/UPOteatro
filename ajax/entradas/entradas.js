/// Rellena todos los campos de la base de datos en el formulario de entrada
//# sourceURL=entrada.js
function rellenaForm(tipo) {
    let form = document.querySelector("#" + tipo + "Entradas");
    form.querySelector("button[name='submit']").addEventListener("click", () => validar("#" + tipo + "Entradas"), false);

    // Select representacion
    // Opción por defecto
    let opcion = document.createElement("option");
    opcion.value = "0";
    opcion.textContent = "Seleccione una representacion...";
    opcion.selected = true;
    opcion.disabled = true;
    form.querySelector("#representacionSeleccionada").append(opcion);

    // Opciones válidas
    upoTeatro.teatros.forEach(teatro => {
        teatro.representaciones.forEach(representacion => {
            opcion = document.createElement("option");
            opcion.value = representacion.codigo;
            opcion.textContent = teatro.nombre + " | " + fechaToString(representacion.fecha) + " | " + representacion.espectaculo.nombre;
            form.querySelector("#representacionSeleccionada").append(opcion);
        });
    });

    // Seleccionar butacas
    form.querySelector("#representacionSeleccionada").addEventListener("change", () => actualizaButacas(tipo));
    actualizaFormularioEntrada(tipo);

    // Tipo de entrada cambia el select multiple
    form.querySelector("#tipoEntrada0").addEventListener("click", () => actualizaFormularioEntrada(tipo));
    form.querySelector("#tipoEntrada1").addEventListener("click", () => actualizaFormularioEntrada(tipo));
}

// Actualiza los datos que se muestra de entrada grupal o individual
function actualizaFormularioEntrada(tipo) {
    let form = document.querySelector("#" + "formulario" + "Entradas");
    // Oculta o muestra el número de personas y quita las butacas seleccionadas
    form.querySelector("#personasGrupal").closest(".col-4").style.display = form.querySelector("#tipoEntrada1").checked ? "block" : "none";
    form.querySelectorAll(".seleccionada").forEach(sel => sel.classList.remove("seleccionada"));
    form.querySelector("#totalEntrada").value = 0; // Reinicia a 0 el precio si el usuario no ha selccionado ninguna butaca.
    form.querySelector("#personasGrupal").value = 0; // Reinicia a 0 el numero de personas si el usuario no ha selccionado ninguna butaca.

    // Elimina las butacas o las muestra
    form.querySelectorAll(".fila1, .fila2, .fila3, .fila4").forEach(ap => { ap.children.length == 0 ? ap.style.display = "none" : ap.style.display = "initial" });
    form.querySelectorAll(".platea, .anfiteatro, .paraiso, .palco").forEach(ap => { representacionSeleccionada.value == "0" ? ap.style.display = "none" : ap.style.display = "grid" });
}

// Cambia las butacas a elegir según la representación elegida
function actualizaButacas(tipo) {
    let form = document.querySelector("#" + tipo + "Entradas");
    if (representacionSeleccionada.value != "0") {
        actualizaFormularioEntrada(tipo);
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(form.querySelector("#representacionSeleccionada").value);
        let butacas = teatro.butacas;
        let representacion = teatro.buscaRepresentacion(form.querySelector("#representacionSeleccionada").value);
        document.querySelectorAll(".platea > *, .anfiteatro > *, .paraiso > *, .palco").forEach(b => b.textContent = "");
        butacas.forEach(butaca => {
            let icoButaca = document.createElement("i");
            icoButaca.classList = "fa butaca-silla";
            icoButaca.dataset.butaca = butaca.idButaca();
            icoButaca.addEventListener("click", (e) => seleccionaButaca(e, tipo));
            if (representacion.butacaOcupada(butaca)) {
                icoButaca.classList.add("ocupada");
            }
            switch (butaca.zona) {
                case 'PLATEA':
                document.querySelector("#butacasRepresentadas .platea .fila" + butaca.fila).append(icoButaca);
                break;
                case 'ANFITEATRO':
                document.querySelector("#butacasRepresentadas .anfiteatro .fila" + butaca.fila).append(icoButaca);
                break;
                case 'PARAISO':
                document.querySelector("#butacasRepresentadas .paraiso .fila" + butaca.fila).append(icoButaca);
                break;
                case 'PALCO':
                document.querySelector("#butacasRepresentadas .palco").append(icoButaca);
                break;
            }
        });
    }
    document.querySelectorAll(".fila1, .fila2, .fila3, .fila4").forEach(ap => { ap.children.length == 0 ? ap.style.display = "none" : ap.style.display = "initial" });
}

function seleccionaButaca(e, tipo) {
    if (e.target.classList.contains('butaca-silla') && !e.target.classList.contains("ocupada")) {
        if (e.target.classList.contains('seleccionada')) {
            e.target.classList.remove("seleccionada");
        } else {
            if (document.querySelector("#tipoEntrada0").checked && document.querySelectorAll("#butacasRepresentadas .seleccionada").length > 0) {
                document.querySelector("#butacasRepresentadas .seleccionada").classList.remove("seleccionada");
            }
            if (document.querySelector("#tipoEntrada0").checked || (document.querySelector("#tipoEntrada1").checked && e.target.dataset.butaca.split("-")[0] == 'PLATEA')) {
                e.target.classList.add("seleccionada");
            }
        }
        actualizaPrecioEntrada(tipo);
    }
}

function actualizaPrecioEntrada(tipo) {
    let form = document.querySelector("#" + tipo + "Entradas");
    form.querySelector("#totalEntrada").value = 0;
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(form.querySelector("#representacionSeleccionada").value);
    let representacion = teatro.buscaRepresentacion(form.querySelector("#representacionSeleccionada").value);
    let coefButaca;
    if (elementoExiste("#butacasRepresentadas .seleccionada")) {
        if (form.querySelector("#tipoEntrada1").checked) {
            let personas = document.querySelectorAll("#butacasRepresentadas .seleccionada").length;
            form.querySelector("#personasGrupal").value = personas;
            coefButaca = personas;
        } else {

            let butacaSeleccionada = document.querySelector("#butacasRepresentadas .seleccionada").dataset.butaca.split("-");
            coefButaca = teatro.buscaButaca(butacaSeleccionada[0], butacaSeleccionada[1], butacaSeleccionada[2]).coefPrecio;
        }
        form.querySelector("#totalEntrada").value = (parseFloat(representacion.precioBase) * parseFloat(coefButaca)).toFixed(2);
    }
}

function editarForm(id) {
    let representacion = upoTeatro.buscaRepresentacionPorEntrada(id);
    let entrada = representacion.buscaEntrada(id);
    let entradaTipo = entrada instanceof EntradaIndividual ? "individual" : "grupal";
    let butacas = entrada.butacas;
    let adaptada = entrada.adaptada;
    let precio = entrada.precio;
    let tipo;
    let personas;
    document.querySelector("#editarEntradas #representacionSeleccionada").value = representacion.codigo;
    actualizaButacas("editar");
    document.querySelectorAll("#editarEntradas #butacasRepresentadas i").forEach(silla => {
        butacas.forEach(butaca => {
            if (silla.dataset.butaca == butaca.idButaca()) {
                silla.classList.add("seleccionada");
                silla.classList.remove("ocupada");
            }
        });
    });
    if (entradaTipo == "individual") {
        let tipo = entrada.tipo;
        document.querySelector("#editarEntradas #tipoEntrada0").setAttribute("checked", "checked");
    } else {
        let personas = entrada.numPersonas;
        document.querySelector("#editarEntradas #tipoEntrada1").setAttribute("checked", "checked");
    }
    document.querySelector("#editarEntradas #personasGrupal").closest(".col-4").style.display = document.querySelector("#editarEntradas #tipoEntrada1").checked ? "block" : "none";
    document.querySelector("#editarEntradas #entradaAdaptada_0").checked = adaptada;
    actualizaPrecioEntrada("editar");
    document.querySelector("#editarEntradas button[name='submit']").textContent = "Editar";
    document.querySelector("#editarEntradas button[name='submit']").addEventListener("click", () => {
        representacion.borrarEntrada(id);
        setTimeout(() => {
            if (!document.querySelector("#editarEntradas").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Entrada editada correctamente.";
                muestraEnPantalla("listaEntrada");
            }
        }, 200);
    });
}

function insertarEntrada() {
    let representacionSeleccionada = upoTeatro.buscaRepresentacion(document.querySelector("#representacionSeleccionada").value);
    let cod_repre = representacionSeleccionada.codigo;
    let teatroSeleccionado = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#representacionSeleccionada").value);
    let esAdaptada;
    if (document.querySelector("#entradaAdaptada_0").checked) {
        esAdaptada = "S";
    } else {
        esAdaptada = "N";
    }

    let totalEntrada = document.querySelector("#totalEntrada").value;
    let tipo;

    let codigoEntrada = getSiguienteCodigo(upoTeatro.listaEntradas());
    let oButaca;

    let butacasSeleccionadas = document.querySelectorAll("#butacasRepresentadas .seleccionada");
    let butacaFragmentacion;
    if (butacasSeleccionadas.length == 1) {

        //INDIVIDUAL
        butacaFragmentacion = butacasSeleccionadas[0].dataset.butaca.split("-");
        oButaca = teatroSeleccionado.buscaButaca(butacaFragmentacion[0], butacaFragmentacion[1], butacaFragmentacion[2]);
        let cod_butaca = oButaca.codigo;
        tipo = butacaFragmentacion[0];
        oEntradaAComprar = new EntradaIndividual(codigoEntrada, esAdaptada, [oButaca], representacionSeleccionada.precioBase, tipo);
        let e_individual = JSON.stringify({
            "entrada": "INDIVIDUAL",
            "adaptada": esAdaptada,
            "cod_representacion": cod_repre,
            "cod_butaca": cod_butaca,
            "tipo": tipo
        });
        $.post("./ajax/entradas/insertaEntradas.php", "datos=" + e_individual, (resultado) => completaInsertarEntrada(resultado, tipo));
    } else {
        //GRUPAL
        let numPersonas = document.querySelector("#personasGrupal").value;

        let butacas = [];
        for (let i = 0; i < butacasSeleccionadas.length; i++) {
            butacaFragmentacion = butacasSeleccionadas[i].dataset.butaca.split("-");
            oButaca = teatroSeleccionado.buscaButaca(butacaFragmentacion[0], butacaFragmentacion[1], butacaFragmentacion[2]);
            oEntradaAComprar = new EntradaGrupal(codigoEntrada, esAdaptada, butacas, representacionSeleccionada.precioBase, numPersonas);
            butacas.push(oButaca.codigo);
        }
        console.log(butacas);
        let e_grupal = JSON.stringify({
            "entrada": "GRUPAL",
            "adaptada": esAdaptada,
            "cod_representacion": cod_repre,
            "num_personas": butacas.length,
            "cod_butaca": butacas
        });
        $.post("./ajax/entradas/insertaEntradas.php", "datos=" + e_grupal, (resultado) => completaInsertarEntrada(resultado, tipo));
    }
    
}

function completaInsertarEntrada(resultado, tipo) {
    if (resultado == 0) {
       mensajeModal("Entrada comprada correctamente.");
       document.querySelector("#representacionSeleccionada").value = "0";
       document.querySelector("#totalEntrada").value = "0";   
       actualizaFormularioEntrada(tipo);
   }
   else
   {
    mensajeModal("Error en la compra.");
}


}

function borrarEntrada(cod) {
    //upoTeatro.buscaRepresentacionPorEntrada(cod).borrarEntrada(cod);
    $.post("./ajax/entradas/borrarEntradas.php", { "id": cod }, completaEliminarEntradas);
}

function completaEliminarEntradas(resultado) {
    let datos = JSON.parse(resultado);
    mensajeModal(datos["mensaje"]);
}

/*setTimeout(() => {
        if (representacionSeleccionada.compraEntrada(oEntradaAComprar)) {
            mensajeModal("Has comprado la entrada correctamente");
            //RESET
            document.querySelector("#representacionSeleccionada").value = "0";
            document.querySelector("#totalEntrada").value = "0";
            actualizaFormularioEntrada(tipo);
        } else {
            mensajeModal("Ha ocurrido un error, inténtelo más tarde.");
        }
    }, 100);*/