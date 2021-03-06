// En este documento se define las funcione que se usan varias veces con diferentes usos.
"use strict";

// Ajax javascript
function Ajax(filename, funcion, tipo, parametros) {
    let xhttp;
    window.XMLHttpRequest ? xhttp = new XMLHttpRequest() : xhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xhttp.addEventListener("readystatechange", () => {
        if (xhttp.readyState == xhttp.DONE) { // Cuando el archivo está listo realiza una función
            if (tipo == "GET") {
                if (filename.includes("html")) { // Devuelve un html si el archivo es html
                    funcion(new DOMParser().parseFromString(xhttp.responseText, "text/html"));
                } else if (filename.includes("xml")) { // Devuelve un xml si el archivo es xml
                    funcion(xhttp.responseXML);
                } else {
                    funcion(xhttp.responseText); // Devuelve el texto tal cual
                }
            } else {
                funcion(xhttp.responseText); // Devuelve el texto tal cual
            }
        }
    });
    xhttp.open(tipo, filename, true);
    if (tipo == "POST") {
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(encodeURI(parametros));
    } else {
        xhttp.send();
    }
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



// Convierte fecha Date a formato DD/MM/AAAA
function fechaToString(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return dia + "/" + mes + "/" + año;
}

// Convierte una fecha DD/MM/AAAA a Date
function fechaToDate(fecha) {
    let dia = fecha.split("/")[0];
    let mes = fecha.split("/")[1];
    let año = fecha.split("/")[2];
    return new Date(año + "/" + mes + "/" + dia);
}

// Convierte una fecha Date a AAAA-MM-DD
function fechaToAmericana(fecha) {
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let año = fecha.getFullYear();
    return año + "-" + (mes < 10 ? "0" + mes : mes) + "-" + (dia < 10 ? "0" + dia : dia);
}

// Convierte una fecha de AAAA/MM/DD a Date
function fechaAmericanaToDate(fecha) {
    let dia = fecha.split("-")[2];
    let mes = fecha.split("-")[1];
    let año = fecha.split("-")[0];
    return new Date(año + "/" + mes + "/" + dia);
}

// Comprueba si dos fechas son consecutivas
function esFechaConsecutivaPosterior(fechaA, fechaB) {
    let diaA = fechaA.getDate();
    let diaB = fechaB.getDate();

    return diaA + 1 == diaB ? true : false;
}

function esFechaConsecutivaAnterior(fechaA, fechaB) {
    let diaA = fechaA.getDate();
    let diaB = fechaB.getDate();

    return diaA == diaB + 1 ? true : false;
}

// Devuelve un array de fechas que estén dentro de un intervalo
function fechasIntervalo(fechaInicio, fechaFin) {
    let fechas = [];
    let fechaBase = fechaInicio;
    let fechaLimite = fechaFin.getDate() + 1;
    for (var i = 0; i <= (fechaFin - fechaInicio) / (1000 * 3600 * 24); i++) {
        let fechaSiguiente = new Date(fechaBase);
        fechaSiguiente.setDate(fechaSiguiente.getDate() + i);
        fechas.push(fechaSiguiente);
    };
    return fechas;
}

// Cambia el mínimo de la fecha final
function compruebaFinFecha(fechaInicio, fechaFin) {
    fechaFin.value = "";
    fechaFin.setAttribute("min", fechaInicio.value);
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

// Crea una tabla con los headers dados como parametros
function creaTabla(headers) {
    let div = document.createElement("div");
    div.classList.add("table-responsive");
    let tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.classList.add("table-striped");
    tabla.classList.add("table-hover");
    let header = tabla.createTHead();
    let encabezados = header.insertRow(-1);
    headers.forEach(encabezado => {
        if (encabezado == "Borrar" && esAdmin() ||
            encabezado != "Borrar") {
            let celda = document.createElement("th");
            if (!["Borrar", "Tipo de entrada / Nº Personas", "Butacas", "Representaciones", "Producciones"].includes(encabezado)) {
                celda.classList = 'ordenable';
                celda.dataset.ascendente = 'true';
                let head = document.createElement("div");
                head.classList = "row align-items-center justify-content-between";
                let texto = document.createElement("div");
                texto.classList = "col";
                texto.textContent = encabezado;
                let ico = document.createElement("div");
                ico.classList = "col-1";
                let icono = document.createElement("i");
                icono.classList = "fa fa-sort";
                ico.append(icono);
                head.append(texto);
                head.append(ico);
                celda.append(head);
            } else {
                celda.textContent = encabezado;
            }
            encabezados.append(celda);
        }
    });
    let cuerpo = document.createElement("tbody");
    tabla.append(cuerpo);
    div.append(tabla);
    return div;
}

// Añade un botón borra
function agregaBoton(tipo, fila, codigo) {
    let celda = fila.insertCell(-1);
    let boton = document.createElement("button");
    boton.type = "button";
    boton.dataset.cod = codigo;
    boton.dataset.tipo = tipo;
    boton.classList = "btn";
    let icono = document.createElement("i");
    if (tipo == "borrar") {
        icono.classList = "fa fa-times";
    }
    boton.append(icono);
    celda.append(boton);
}

// Comprueba si un script fue cargado anteriormente
function scriptCargado(src) {
    return document.querySelector('script[src="' + src + '"]') ? true : false;
}