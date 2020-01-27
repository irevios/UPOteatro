// En este documento se define las funcione que se usan varias veces con diferentes usos.

// Leer XML/HTML y lo guarda en variables para usarlas después
function leeArchivoXMLHTML(filename, funcion) {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == xhttp.DONE) {
            if (filename.includes('html')) {
                funcion(new DOMParser().parseFromString(xhttp.responseText, "text/html"));
            } else if (filename.includes('xml')) {
                funcion(xhttp.responseXML);
            }
        }
    });
    xhttp.open("GET", filename, true);
    xhttp.send();
}

// Funciones de cookies
function setCookie(clave, valor, diasExpira) {
    let d = new Date();
    d.setTime(d.getTime() + (diasExpira * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}

function getCookie(clave) {
    let name = clave + "=";
    let ca = document.cookie.split(';');
    let cookie = "";
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            cookie = c.substring(name.length, c.length);
        }
    }
    return cookie;
}

function borraCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

// Otros

// Comprueba si existe un elemento en el DOM
function elementoExiste(elemento) {
    if (document.querySelector(elemento) != undefined) {
        return true;
    } else {
        return false;
    }
}

// Crea una tabla con los headers dados como parametros
function creaTabla(headers,id) {
    let div = document.createElement("div");
    div.classList.add("table-responsive");
    div.id=id;
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        let celda = document.createElement("th");
        celda.textContent = encabezado;
        encabezados.append(celda);
    });
    let cuerpo = document.createElement("tbody");
    tabla.append(cuerpo);
    div.append(tabla);
    return div;
}

// Convierte fecha Date a formato DD/MM/AA
function fechaToString(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let año = fecha.getYear();
    return dia + "/" + mes + "/" + año;
}

// Convierte un texto a formato titulo
function toTitleCase(palabra) {
    let palabras = palabra.split(" ");
    let convertido = "";
    palabras.forEach(p => {
        convertido += p[0].toUpperCase() + p.substring(1).toLowerCase() + " ";
    });
    return convertido.substring(0, convertido.length - 1);
}

// Añade un botón borrar o editar
function agregaBoton(tipo, fila, codigo) {
    celda = fila.insertCell(-1);
    let boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.id = codigo;
    boton.dataset.tipo = tipo;
    boton.classList = "btn";
    let icono = document.createElement("i");
    if (tipo == "borrar") {
        icono.classList = "fa fa-times";
    } else {
        icono.classList = "fa fa-pencil";
    }
    boton.append(icono);
    celda.append(boton);
}


//Validaciones
// Basicamente no se cogía bien el elemento formularioRepresentacion. Si lo prefieres puedes poner formularioRepresentacion = document.querySelector("#formularioRepresentacion");
function validar(oEvento) {
    let oE = oEvento || window.event;
    limpiarErrores();

    let precioBase = document.querySelector("#formularioRepresentacion").precioBaseRepresentacion.value;
    expReg = /\d+(\.\d{4})?/;

    if(!expReg.test(precioBase.value.trim())){ // Hay que comprobar si el precio esta vacío o no
            error(precioBase);
        }
        else{
            valido(precioBase);
        }
}

function valido(elem){
    elem.classList.remove("error");
    elem.classList.add("valido");
    elem.parentElement.querySelector(".invalid-feedback")[0].style.display= "none";
}

function error(elem){
    elem.parentElement.querySelector(".invalid-feedback")[0].style.display= "inline-block";
    elem.classList.remove("valido");
    elem.classList.add("error");
    if(bValido){
        elem.focus()
        bValido = false;
    }
}

function limpiarErrores() {
    for(var i = 0;i < document.querySelector("#formularioRepresentacion").elements.length; i++){
        document.querySelector("#formularioRepresentacion").elements[i].classList.remove("error");
        document.querySelector("#formularioRepresentacion").elements[i].classList.remove("valido");
    }
    bValido = true;
    mensajeError = "";
    document.querySelector("#formularioRepresentacion").classList.remove("was-validated");
}

// Validaciones version Irene

function validar2(apartado){  // Llamo validar con el apartado que quiero validar
    document.querySelector("#formularioRepresentacion").classList.remove("was-validated"); // Limpia de errores antes que se ejecute
    let error = false; 
    let elemento;
    // Valida si los datos no están vacíos y son correctos
    for(let i=0; i < document.querySelector(apartado).getElementsByTagName('input').length;i++){
        elemento = document.querySelector(apartado).getElementsByTagName('input')[i];
        if(elemento.value == "" || document.querySelector("#formularioRepresentacion").querySelectorAll(":invalid").length!=0){ // Cuando algo es invalido y sale el .invalid-feedback ese input tiene :invalid
            error = true;
            document.querySelector("#formularioRepresentacion").classList.add("was-validated"); // agrego was-validated para que el usuario vea los errores
        }
    }
    if(error){
        console.log("ops un error en el formulario :O"); // Aqui si hay error no añado nada a la base de datos, puedo mostrar un mensaje o simplemente dejarlo para que el usuario intente de nuevo
    }
    else{// Si todo esta relleno y correcto borra los errores 
        document.querySelector("#formularioRepresentacion").classList.remove("was-validated");

       // ---- e inserta datos a donde sea necesario ----
    }
}