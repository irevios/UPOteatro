/// Rellena todos los campos de la base de datos en el formulario de espectaculo

function rellenaFormEspectaculo() {

    document.querySelector("#formularioEspectaculo button[name='submit']").addEventListener("click", () => validar("#formularioEspectaculo"), false);

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