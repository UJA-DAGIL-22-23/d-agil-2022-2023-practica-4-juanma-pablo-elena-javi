/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
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

Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
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


let posicion = 0;

function guardarPosicion(pos) {
    posicion = pos;
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
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
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Funcion para mostrar lista de personas.
 */
Plantilla.mostrarGetPersonas = function (datosDescargados) {
    let mensajeAMostrar = "<div>";

    for (let i = 0; i < datosDescargados.data.length; i++) {
        mensajeAMostrar += `
            <ul>
            <li><a href="javascript:Plantilla.procesarGetPersonaId(${datosDescargados.data[i].ref['@ref'].id})">${datosDescargados.data[i].data.name}</a></li>
            </ul>
        `;
    }

    mensajeAMostrar += "</div>";
    Frontend.Article.actualizar("Lista de Competidores", mensajeAMostrar);
}


Plantilla.mostrarTodoPersona = function (persona) {
    let mensajeAMostrar = "<div>";
    mensajeAMostrar += `<table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>País</th>
                                    <th>Club</th>
                                    <th>Participaciones</th>
                                    <th>Años ganados</th>
                                    <th>Veces olímpico</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>${persona.data.name}</td>
                            <td>${persona.data.birthdate.day}/${persona.data.birthdate.month}/${persona.data.birthdate.year}</td>
                            <td>${persona.data.country}</td>
                            <td>${persona.data.club}</td>
                            <td>${persona.data.participation}</td>
                            <td>${persona.data.yearsWin}</td>
                            <td>${persona.data.timesOlimpic}</td>
                            </tr>
                            </tbody>
	                    </table>`;
    mensajeAMostrar += "</div>";
    Frontend.Article.actualizar("Todos los Datos", mensajeAMostrar);
}

/**
 * Funcion para mostrar las personas ordenadas alfabeticamente.
 */
Plantilla.mostrarGetPersonasOrd = function (datosDescargados) {
    // Ordenar el arreglo de datos por nombre
    datosDescargados.data.sort((a, b) => a.data.name.localeCompare(b.data.name));

    let mensajeAMostrar = "<div>";

    for (let i = 0; i < datosDescargados.data.length; i++) {
        mensajeAMostrar += `
            <ul>
                <li><b>Nombre</b>: ${datosDescargados.data[i].data.name}</li>
            </ul>
        `;
    }

    mensajeAMostrar += "</div>";
    Frontend.Article.actualizar("Lista de Competidores Ordenada Alfabeticamente", mensajeAMostrar);
}

/**
 * Funcion para mostrar lista de personas.
 */
Plantilla.mostrarGetTodosDatos = function (datosDescargados) {
    let mensajeAMostrar = "<div>";
    mensajeAMostrar += `<table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Fecha de nacimiento</th>
                                    <th>País</th>
                                    <th>Club</th>
                                    <th>Participaciones</th>
                                    <th>Años ganados</th>
                                    <th>Veces olímpico</th>
                                </tr>
                            </thead>
                            <tbody>`;

    for (let i = 0; i < datosDescargados.data.length; i++) {
        mensajeAMostrar += `
                        <tr>
                        <td><a href="javascript:Plantilla.procesarGetTodosDatosOrd('${datosDescargados.data[i].data.name}')">${datosDescargados.data[i].data.name}</a></td>
                            <td>${datosDescargados.data[i].data.birthdate.day}/${datosDescargados.data[i].data.birthdate.month}/${datosDescargados.data[i].data.birthdate.year}</td>
                            <td>${datosDescargados.data[i].data.country}</td>
                            <td>${datosDescargados.data[i].data.club}</td>
                            <td>${datosDescargados.data[i].data.participation}</td>
                            <td>${datosDescargados.data[i].data.yearsWin}</td>
                            <td>${datosDescargados.data[i].data.timesOlimpic}</td>
                        </tr>
        `;
    }

    mensajeAMostrar += `</tbody>
	                    </table>`;
    mensajeAMostrar += "</div>";
    Frontend.Article.actualizar("Datos de Todos los Competidores", mensajeAMostrar);
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Funcion para listar a las personas.
 */
Plantilla.procesarGetPersonas = function() {
    this.descargarRuta("/plantilla/getPersonas", this.mostrarGetPersonas);
}

/**
 * Funcion para listar a los equipos.
 */
Plantilla.procesarGetPersonasOrd = function() {
    this.descargarRuta("/plantilla/getPersonas", this.mostrarGetPersonasOrd);
}

/**
 * Funcion para listar todos los datos de cada persona.
 */
Plantilla.procesarGetTodosDatos = function() {
    this.descargarRuta("/plantilla/getPersonas", this.mostrarGetTodosDatos);
}

/**
 * Funcion para listar todos los datos de cada persona.
 */
Plantilla.procesarGetPersonaId = function (idPersona) {
    console.log(idPersona);
    this.recuperaUnaPersona(idPersona, this.mostrarTodoPersona);
}