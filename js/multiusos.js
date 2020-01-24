// En este documento se define las funcione que se usan varias veces con diferentes usos.

// Leer XML/HTML y lo guarda en variables para usarlas después
function leeArchivoXMLHTML(filename,funcion) {
	let xhttp;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.addEventListener("readystatechange", () => {
		if (xhttp.readyState == xhttp.DONE) {
			if(filename.includes('html')){
				funcion(new DOMParser().parseFromString(xhttp.responseText, "text/html"));
			}
			else if(filename.includes('xml')){
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
	d.setTime(d.getTime() + (diasExpira*24*60*60*1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = clave + "=" + valor + "; " + expires;
}

function getCookie(clave) {
	let name = clave + "=";
	let ca = document.cookie.split(';');
	let cookie="";
	for(let i=0; i<ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1){
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
function elementoExiste(elemento){
	if(document.querySelector(elemento)!=undefined){
		return true;
	}
	else{
		return false;
	}
}

// Crea una tabla con los headers dados como parametros
function creaTabla(headers){
	let div = document.createElement("div");
	div.classList.add("table-responsive");	
	let tabla = document.createElement("table");
	tabla.classList.add("table");
	tabla.classList.add("table-striped");
	tabla.classList.add("table-hover");
    let header = tabla.createTHead();
	let encabezados = header.insertRow(-1);
	headers.forEach( encabezado => {
		let celda = document.createElement("th");
		celda.textContent = encabezado;
		encabezados.append(celda);
	});
	let cuerpo = document.createElement("tbody");
	tabla.append(cuerpo);
	div.append(tabla);
	return div;
}