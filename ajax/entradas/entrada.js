/// Rellena todos los campos de la base de datos en el formulario de entrada
//# sourceURL=entrada.js
function rellenaForm() {
    document.querySelector("#formularioEntrada button[name='submit']").addEventListener("click", () => validar("#formularioEntrada"), false);

    // Select representacion
    // Opción por defecto
    let opcion = document.createElement("option");
    opcion.value = "0";
    opcion.textContent = "Seleccione una representacion...";
    opcion.selected = true;
    opcion.disabled = true;
    document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);

    // Opciones válidas
    upoTeatro.teatros.forEach(teatro => {
        teatro.representaciones.forEach(representacion => {
            opcion = document.createElement("option");
            opcion.value = representacion.codigo;
            opcion.textContent = teatro.nombre + " | " + fechaToString(representacion.fecha) + " | " + representacion.espectaculo.nombre;
            document.querySelector("#formularioEntrada #representacionSeleccionada").append(opcion);
        });
    });

    // Seleccionar butacas
    document.querySelector("#representacionSeleccionada").addEventListener("change", actualizaButacas);
    actualizaFormularioEntrada();

    // Tipo de entrada cambia el select multiple
    document.querySelector("#tipoEntrada0").addEventListener("click", actualizaFormularioEntrada);
    document.querySelector("#tipoEntrada1").addEventListener("click", actualizaFormularioEntrada);
}
// Actualiza los datos que se muestra de entrada grupal o individual
function actualizaFormularioEntrada() {
    // Oculta o muestra el número de personas y quita las butacas seleccionadas
    document.querySelector("#personasGrupal").closest(".col-4").style.display = document.querySelector("#tipoEntrada1").checked ? "block" : "none";
    document.querySelectorAll(".seleccionada").forEach(sel => sel.classList.remove("seleccionada"));
    document.querySelector("#totalEntrada").value = 0; // Reinicia a 0 el precio si el usuario no ha selccionado ninguna butaca.
    document.querySelector("#personasGrupal").value = 0; // Reinicia a 0 el numero de personas si el usuario no ha selccionado ninguna butaca.

    // Elimina las butacas o las muestra
    document.querySelectorAll(".fila1, .fila2, .fila3, .fila4").forEach(ap => { ap.children.length == 0 ? ap.style.display = "none" : ap.style.display = "initial" });
    document.querySelectorAll(".platea, .anfiteatro, .paraiso, .palco").forEach(ap => { representacionSeleccionada.value == "0" ? ap.style.display = "none" : ap.style.display = "grid" });
}

// Cambia las butacas a elegir según la representación elegida
function actualizaButacas() {
    if (representacionSeleccionada.value != "0") {
        actualizaFormularioEntrada();
        let teatro = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
        let butacas = teatro.butacas;
        let representacion = teatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
        document.querySelectorAll(".platea > *, .anfiteatro > *, .paraiso > *, .palco").forEach(b => b.textContent = "");
        butacas.forEach(butaca => {
            let icoButaca = document.createElement("i");
            icoButaca.classList = "fa butaca-silla";
            icoButaca.dataset.butaca = butaca.idButaca();
            icoButaca.addEventListener("click", seleccionaButaca);
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

function seleccionaButaca(e) {
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
        actualizaPrecioEntrada();
    }
}

function actualizaPrecioEntrada() {
    document.querySelector("#totalEntrada").value = 0;
    let teatro = upoTeatro.buscaTeatroPorRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let representacion = teatro.buscaRepresentacion(document.querySelector("#formularioEntrada #representacionSeleccionada").value);
    let coefButaca;
    if (elementoExiste("#butacasRepresentadas .seleccionada")) {
        if (document.querySelector("#tipoEntrada1").checked) {
            let personas = document.querySelectorAll("#butacasRepresentadas .seleccionada").length;
            document.querySelector("#personasGrupal").value = personas;
            coefButaca = personas;
        } else {

            let butacaSeleccionada = document.querySelector("#butacasRepresentadas .seleccionada").dataset.butaca.split("-");
            coefButaca = teatro.buscaButaca(butacaSeleccionada[0], butacaSeleccionada[1], butacaSeleccionada[2]).coefPrecio;
        }
        document.querySelector("#totalEntrada").value = (parseFloat(representacion.precioBase) * parseFloat(coefButaca)).toFixed(2);
    }
}

function editaEntrada(id) {
    let representacion = upoTeatro.buscaRepresentacionPorEntrada(id);
    let entrada = representacion.buscaEntrada(id);
    let entradaTipo = entrada instanceof EntradaIndividual ? "individual" : "grupal";
    let butacas = entrada.butacas;
    let adaptada = entrada.adaptada;
    let precio = entrada.precio;
    let tipo;
    let personas;
    document.querySelector("#representacionSeleccionada").value = representacion.codigo;
    actualizaButacas();
    document.querySelectorAll("#butacasRepresentadas i").forEach(silla => {
        butacas.forEach(butaca => {
            if (silla.dataset.butaca == butaca.idButaca()) {
                silla.classList.add("seleccionada");
                silla.classList.remove("ocupada");
            }
        });
    });
    if (entradaTipo == "individual") {
        let tipo = entrada.tipo;
        document.querySelector("#tipoEntrada0").setAttribute("checked", "checked");
    } else {
        let personas = entrada.numPersonas;
        document.querySelector("#tipoEntrada1").setAttribute("checked", "checked");
    }
    document.querySelector("#personasGrupal").closest(".col-4").style.display = document.querySelector("#tipoEntrada1").checked ? "block" : "none";
    document.querySelector("#entradaAdaptada_0").checked = adaptada;
    actualizaPrecioEntrada();
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    document.querySelector("#formularios button[name='submit']").addEventListener("click", () => {
        representacion.borrarEntrada(id);
        setTimeout(() => {
            if (!document.querySelector("#formularioEntrada").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Entrada editada correctamente.";
                muestraEnPantalla("listaEntrada");
            }
        }, 200);
    });
}