/**
 * @file FutbolPlaya.js
 * @description Funciones para el procesamiento de la info enviada por el MS Futbol Playa
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let FutbolPlaya = {};

// Plantilla de datosDescargados vacíos
FutbolPlaya.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Futbol Playa al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
FutbolPlaya.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Futbol Playa
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Futbol Playa
 */
FutbolPlaya.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Futbol Playa Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Futbol Playa
 */
FutbolPlaya.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Futbol Playa Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
FutbolPlaya.procesarHome = function () {
    this.descargarRuta("/futbol-playa/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
FutbolPlaya.procesarAcercaDe = function () {
    this.descargarRuta("/futbol-playa/acercade", this.mostrarAcercaDe);
}

FutbolPlaya.recuperaJugador = async function (idJugador, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/futbol-playa/getPorId/" + idJugador
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS FutbolPlaya
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

FutbolPlaya.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio FutbolPlaya
    try {
        const url = Frontend.API_GATEWAY + "/futbol-playa/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}
/**
 * Función principal para mostrar los nombres de todos los equipos desde el MS y, posteriormente, imprimirla.
 */
FutbolPlaya.mostrarNombresEquipos = function () {
    FutbolPlaya.recupera(FutbolPlaya.imprimeNombres);
}

/**
 * Función para mostrar en pantalla los nombres de todos los equipos que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

FutbolPlaya.imprimeNombres = function (vector) {

    let msj = `<div>`
    vector.forEach(e => msj += `<p> ${e.data.Nombre} </p>`)
    msj += `</div>`

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Nombres equipos:", msj)
}

FutbolPlaya.Futbolplaya = function () {

    let msj = `<div> 
    <a href="javascript:FutbolPlaya.procesarHome()" class="opcion-principal"
        title="Llama a la ruta / del MS FutbolPlaya">Home</a>
    <a href="javascript:FutbolPlaya.procesarAcercaDe()" class="opcion-principal"
        title="Llama a la ruta /acercade del MS FutbolPlaya">Acerca de</a>
    <a href="javascript:FutbolPlaya.mostrarNombresEquipos()" class="opcion-principal"
        title="Muestra los nombres de todos los equipos">Nombres Equipos</a>
    </div>`;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Funcionalidades FutbolPlaya", msj)
}