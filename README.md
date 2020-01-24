# UpoTeatro
### Proyecto de Entorno Cliente basado en Javascript

UpoTeatro es una aplicacion web para gestionar diferentes teatros con sus entradas y representaciones.

La idea fue producida por un equipo de estudiantes de la Universidad de Pablo Olavide: [Documentación](Enunciado/UPOTEATRO.pdf)

Puedes ver el diagrama de clases [en este link](Enunciado/Diagrama.pdf).

### Clases
* **Upoteatro**: contiene la información de todo el sistema
* **Teatro**: define cada teatro con su nombre, dirección, representaciones que se realiza en el teatro y las butacas.
* **Butaca**: define cada butaca de un teatro por su fila, zona y número.
* **Representaciones**: define una representación por la fecha en la que se realiza y por el espectáculo.
* **Espectaculo**: define diferentes espectáculos por la obra en la que esta basada y la compñía.
* **Compania**: base de datos de diferentes compañías con su nif, nombre y director.
* **Obra**: base de datos de diferentes obras con su nombre y autor.
* **Entrada**: define cada entrada de una representación en un teatro. Su precio se calcula según en la zona que está la butaca y el precio base de la representación. En el caso de caso grupales, se calcula según el precio base y el número de personas.

### Esquema
La aplicación se compone de lo siguiente:

* **index.html**: La página inicial de la aplicación. Tiene una parte dinámica donde aparecen los formularios o listados.
* **formularios.html**: Diferentes formularios que serán cargados a la página principal.
* **navAdmin.html**: Barra de navegación que reemplaza a la habitual si se ha iniciado sesión como administrador.

### Datos iniciales
La aplicación contiene ficheros XML donde aparecen datos iniciales para ser cargados al comienzo.

* **teatros.xml**: Datos de teatros.
* **representaciones.xml**: Datos de representaciones.
* **espectaculos.xml**: Datos de espectáculos.
* **entradas.xml**: Datos de entradas.
* **butacas.xml**: Datos de butacas.
* **compañias.xml**: Datos de compañías.
* **obras.xml**: Datos de obras.

### Código
El código de esta aplicación se divide en diferentes ficheros para mejorar la legibilidad del código:

* **claseUpoTeatro.js**: En este fichero se define la clase UpoTeatro junto a sus métodos.
* **clases.js**: En este fichero se define el resto de clases.
* **cargaDatos.js**: En este fichero se lee los ficheros XML de los datos iniciales y se cargan en el modelo de clases.
* **modificarVista.js**: En este fichero se cambia la web según en que apartadose encuentre.
* **sesion.js**: En este fichero se realiza el inicio y cierre de sesión.
* **principal.js**: En este fichero se realiza la validación de formularios así como la integración de nuevos datos.
* **multiusos.js**: En este fichero se definen diferentes funciones que pueden servir para cualquier proyecto.

I.E.S. Hermanos Machado | Programación | Isabel Fernández e Irene Viñas | Enero 2020
