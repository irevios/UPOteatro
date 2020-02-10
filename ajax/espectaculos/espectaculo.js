//# sourceURL=espectaculo.js
/// Rellena todos los campos de la base de datos en el formulario de espectaculo
function rellenaForm() {

    document.querySelector("#formularioEspectaculo button[name='submit']").addEventListener("click", () => validar("#formularioEspectaculo"), false);
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

function editaEspectaculo(id) {
    document.querySelector(".jumbotron p").textContent = "Edita espectáculo";
    let espectaculo = upoTeatro.buscaEspectaculo(id);
    let nombre = espectaculo.nombre;
    let productor = espectaculo.productor;
    let categoria = espectaculo.categoria;
    let gastos = espectaculo.gastos;
    let obra = espectaculo.obra.codigo;
    let compania = espectaculo.compania.cif;
    document.querySelector("#nombreEspectaculo").value = nombre;
    document.querySelector("#nombreProductorEspectaculo").value = productor;
    document.querySelector("#categoriaEspectaculo").value = categoria;
    document.querySelector("#gastosEspectaculo").value = gastos;
    document.querySelector("#companiaSeleccionada").value = compania;
    document.querySelector("#obraSeleccionada").value = obra;
    document.querySelector("#formularios button[name='submit']").textContent = "Editar";
    document.querySelector("#formularios button[name='submit']").addEventListener("click", () => {
        upoTeatro.borrarEspectaculo(id);
        setTimeout(() => {
            if (!document.querySelector("#formularioEspectaculo").classList.contains("was-validated")) {
                document.querySelector(".modal #mensaje").textContent = "Espectáculo editado correctamente.";
                muestraEnPantalla("listaEspectaculo");
            }
        }, 200);
    });
}

// function insertarEspectaculo() {
//     let codigoEspectaculo = getSiguienteCodigo(upoTeatro.espectaculos);

//     let nombre = document.querySelector("#nombreEspectaculo").value;
//     let productor = document.querySelector("#nombreProductorEspectaculo").value;
//     let categoria = document.querySelector("#categoriaEspectaculo").value;
//     let gastos = document.querySelector("#gastosEspectaculo").value;
//     let compania = upoTeatro.buscaCompania(document.querySelector("#companiaSeleccionada").value);
//     let obra = upoTeatro.buscaObra(document.querySelector("#obraSeleccionada").value);

//     let oEspectaculo = new Espectaculo(codigoEspectaculo, nombre, productor, categoria, gastos, obra, compania);
//     setTimeout(() => {
//         if (upoTeatro.agregaEspectaculo(oEspectaculo)) {
//             mensajeModal("Espectáculo creado correctamente.");
//             document.querySelector(apartado).reset();
//         } else {
//             mensajeModal("Ya existe ese espectáculo");
//         }
//     }, 100);
// }

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
        document.querySelector("form#formularioEspectaculo").reset();
    } else {
        mensajeModal("Ya existe ese espectáculo");
    }

}