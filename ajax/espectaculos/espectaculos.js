//# sourceURL=espectaculo.js
/// Rellena todos los campos de la base de datos en el formulario de espectaculo
function rellenaForm() {
    document.querySelector("#formularioEspectaculos button[name='submit']").addEventListener("click", () => validar("#formularioEspectaculos"), false);
    // Select categorias
    $.ajax({
        method: "GET",
        url: "./ajax/espectaculos/buscaCategorias.php",
        dataType: "json"
    }).done((json) => {
        json.forEach(categorias => {
            let opcion = document.createElement("option");
            opcion.value = categorias.CODIGO;
            opcion.textContent = categorias.NOMBRE;
            document.querySelector("#categoriaEspectaculo").append(opcion);
        });

    });

    // Select compañias
    upoTeatro.companias.forEach(compania => {
        let opcion = document.createElement("option");
        opcion.value = compania.cif;
        opcion.textContent = compania.nombre;
        document.querySelector("#companiaSeleccionada").append(opcion);
    });

    // Select obras
    upoTeatro.obras.forEach(obra => {
        let opcion = document.createElement("option");
        opcion.value = obra.codigo;
        opcion.textContent = obra.nombre;
        document.querySelector("#obraSeleccionada").append(opcion);
    });
}

function insertarEspectaculo() {
    let nombre = document.querySelector("#nombreEspectaculo").value;
    let productor = document.querySelector("#nombreProductorEspectaculo").value;
    let categoria = document.querySelector("#categoriaEspectaculo").value;
    let gastos = document.querySelector("#gastosEspectaculo").value;
    let compania = document.querySelector("#companiaSeleccionada").value;
    let obra = document.querySelector("#obraSeleccionada").value;
    $.ajax({
        url: "./ajax/espectaculos/insertaEspectaculos.php",
        data: { "nombre": nombre, "productor": productor, "categoria": categoria, "gastos": gastos, "compania": compania, "obra": obra },
        cache: false,
        async: true, // por defecto
        method: "POST",
        success: completaInsertarEspectaculos
    });
}

function completaInsertarEspectaculos(resultado) {
    if (resultado.substring(0, 1) == "{") { // Si devuelve un json
        let datos = JSON.parse(resultado);
        let nuevoEspectaculo = new Espectaculo(datos["codigo"], datos["nombre"], datos["productor"], datos["categoria"], datos["gastos"], datos["obra"], datos["compania"]);
        upoTeatro.agregaEspectaculo(nuevoEspectaculo);
        mensajeModal("Espectáculo creado correctamente.");
        document.querySelector("form#formularioEspectaculos").reset();
    } else {
        mensajeModal("Ya existe ese espectáculo");
    }

}

function eliminarEspectaculos(id) {
    $.post("./ajax/espectaculos/borrarEspectaculos.php", { "id": id }, completaEliminarEspectaculos);
}

function completaEliminarEspectaculos(resultado) {
    let datos = JSON.parse(resultado);
    if (datos["error"] == 0) {
        upoTeatro.listaRepresentaciones().forEach(rep => {
            if (rep.espectaculo.codigo == datos["id"]) {
                upoTeatro.buscaTeatroPorRepresentacion(rep.codigo).borrarRepresentacion(rep.codigo);
            }
        });
        upoTeatro.borrarEspectaculo(datos["id"]);
    }
    mensajeModal(datos["mensaje"]);
}   