/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Hockey = {};

// Plantilla de datosDescargados vacíos
Hockey.datosDescargadosNulos = {
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
Hockey.descargarRuta = async function (ruta, callBackFn) {
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


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Hockey.mostrarHome = function (datosDescargados) {
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
Hockey.mostrarAcercaDe = function (datosDescargados) {
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
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Hockey.cabeceraTable = function () {
    return `<table class="listado">
        <thead>
        <th>Nombre</th>
        </thead>
        <tbody>
    `;
}

Hockey.cabeceraTableTodos = function () {
    return `<table class="listado">
        <thead>
        <th>Nombre</th><th>Apellido</th><th>Equipo</th><th>Fecha de Nacimiento</th><th>Partidos Jugados</th><th>A&ntildeos participaciones JJOO</th>
        </thead>
        <tbody>
    `;
}

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Hockey.cuerpoTr = function (p) {
    const d = p.data

    return `<tr title="${p.ref['@ref'].id}">
    <td>${d.nombre}</td>
    </tr>
    `;
}

Hockey.cuerpoTodosDatosTr = function (p) {
    const d = p.data
    const fechaN = d.f_nacimiento;
    let msj = Hockey.cabeceraTableTodos();

    msj += `<tr title="${p.ref['@ref'].id}">
    <td>${d.nombre}</td>
    <td>${d.apellido}</td>
    <td>${d.equipo}</td>
    <td>${fechaN.dia}/${fechaN.mes}/${fechaN.anio}</td>
    <td>${d.partidos_jugados}</td>
    <td>`
		for (var i = 0; i < d.anios_participaciones_jjoo.length; i++) {
			msj += '<li>'+d.anios_participaciones_jjoo[i]+'</li>';
		}
    msj += `</td></tr>
    `;
    msj += Hockey.pieTable();
    return msj;
}

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Hockey.pieTable = function () {
    return `</tbody></table>`;
}

/**
 * Muestra un listado del nombre de los jugadores
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresEquipos = function (datosDescargados) {   
    let msj = "";
    msj += Hockey.cabeceraTable();
    datosDescargados.data.forEach(e => msj += Hockey.cuerpoTr(e))
    msj += Hockey.pieTable();

    Frontend.Article.actualizar("Plantilla Lista Jugadores/equipos", msj)
}

/**
 * Muestra todos los datos de los jugadores
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresDatos = function (datosDescargados) {   
    let msj = "";
    datosDescargados.data.forEach(e => msj += Hockey.cuerpoTodosDatosTr(e))

    Frontend.Article.actualizar("Plantilla Lista Datos Jugadores", msj)
}

/**
 * Muestra un listado con los nombres de los jugadores ordenados alfabéticamente
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresAlfabetica = function (datosDescargados) {
    var datosOrdenados = sortNombre(datosDescargados.data);
    let msj = "";
    msj += Hockey.cabeceraTable();
    datosOrdenados.forEach(e => msj += Hockey.cuerpoTr(e))
    msj += Hockey.pieTable();
    
    Frontend.Article.actualizar("Plantilla ordenar jugador alfab&eacuteticamente", msj)
}

let campo = 'nombre';

Hockey.cabeceraPorCampo = function () {
    return `<select id="opcionCampo" name="Campo" onchange="cambiarOpcionCampo()">
    <option>-Seleccione campo-</option>
    <option value="nombre">Nombre</option>
    <option value="apellido">Apellido</option>
    <option value="equipo">Equipo</option>
    <option value="f_nacimiento">Fecha de Nacimiento</option>
    <option value="partidos_jugados">Partidos Jugados</option>
    <option value="anios_participaciones_jjoo">A&ntildeos participaciones JJOO</option>
    </select>`;
}

/**
 * Muestra un listado de datos de jugadores que podemos ordenar por campos
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresPorCampo = function (datosDescargados) {
    let msj = "";
    msj += Hockey.cabeceraPorCampo();
    var datosOrdenados = sortNombre(datosDescargados.data);
    if(campo === 'nombre'){
        var datosOrdenados = sortNombre(datosDescargados.data);
    }
    if(campo === 'apellido'){
        var datosOrdenados = sortApellido(datosDescargados.data);
    }
    if(campo === 'equipo'){
        var datosOrdenados = sortEquipo(datosDescargados.data);
    }
    if(campo === 'partidos_jugados'){
        var datosOrdenados = sortPartidos(datosDescargados.data);
    }
    if(campo === 'f_nacimiento'){
        var datosOrdenados = sortNacimiento(datosDescargados.data);
    }
    if(campo === 'anios_participaciones_jjoo'){
        var datosOrdenados = sortJJOO(datosDescargados.data);
    }
    
    datosOrdenados.forEach(e => msj += Hockey.cuerpoTodosDatosTr(e))
    Frontend.Article.actualizar("Plantilla mostrar datos por campo", msj)
}

/**
 * Función llamada cada vez que se cambia el campo en "MostrarJugadoresPorCampo" que cambia
 * el valor del parámetro campo al valor que se elija en el selector
 */
function cambiarOpcionCampo(){
    campo = document.getElementById("opcionCampo").value;
    Hockey.procesarJugadoresPorCampo();
}

/**
 * Función que ordena los datos por nombre
 * @param {*} data 
 */
function sortNombre(data) {
    return data.sort(function(a, b) {
  
        var nameA = a.data.nombre.toUpperCase();
        var nameB = b.data.nombre.toUpperCase();
        
        if (nameA < nameB) {     return -1;   }      if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      
      });
}

/**
 * Función que ordena los datos por apellido
 * @param {*} data 
 */
function sortApellido(data) {
    return data.sort(function(a, b) {
  
        var nameA = a.data.apellido.toUpperCase();
        var nameB = b.data.apellido.toUpperCase();
        
        if (nameA < nameB) {     return -1;   }      if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      
      });
}

/**
 * Función que ordena los datos por equipo
 * @param {*} data 
 */
function sortEquipo(data) {
    return data.sort(function(a, b) {
  
        var nameA = a.data.equipo.toUpperCase();
        var nameB = b.data.equipo.toUpperCase();
        
        if (nameA < nameB) {     return -1;   }      if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      
      });
}

/**
 * Función que ordena los datos por nº de partidos jugados
 * @param {*} data 
 */
function sortPartidos(data) {
    return data.sort(function(a, b) {

        return b.data.partidos_jugados - a.data.partidos_jugados;
      
      });
}

/**
 * Función que ordena los datos por fecha de nacimiento
 * @param {*} data 
 */
function sortNacimiento(data) {
    return data.sort(function(a, b) {

        if(a.data.f_nacimiento.anio < b.data.f_nacimiento.anio){
            return -1;
        }
        if(a.data.f_nacimiento.anio > b.data.f_nacimiento.anio){
            return 1;
        }
        if(a.data.f_nacimiento.mes < b.data.f_nacimiento.mes){
            return -1;
        }
        if(a.data.f_nacimiento.mes > b.data.f_nacimiento.mes){
            return 1;
        }
        if(a.data.f_nacimiento.dia < b.data.f_nacimiento.dia){
            return -1;
        }
        if(a.data.f_nacimiento.dia > b.data.f_nacimiento.dia){
            return 1;
        }
        return 0;
      
      });
}

/**
 * Función que ordena los datos por participaciones en los JJOO
 * @param {*} data 
 */
function sortJJOO(data) {
    return data.sort(function(a, b) {
  
        return b.data.anios_participaciones_jjoo.length - a.data.anios_participaciones_jjoo.length;
      
      });
}

Hockey.cabeceraDatosUno = function () {
    return `<select id="opcionNombre" name="Nombre" onchange="cambiarOpcionNombre()">
    <option>-Seleccione Jugador-</option>
    <option value="david">David</option>
    <option value="alejandro">Alejandro</option>
    <option value="jose">Jose</option>
    <option value="marc">Marc</option>
    <option value="quico">Quico</option>
    <option value="miquel">Miquel</option>
    <option value="enrique">Enrique</option>
    <option value="alvaro">&Aacutelvaro</option>
    <option value="xavi">Xavi</option>
    <option value="roc">Roc</option>
    </select>`;
}

/**
 * Muestra los datos de un solo jugador a elección
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresDatosUno = function (datosDescargados) {   
    let msj = "";
    msj += Hockey.cabeceraDatosUno();
    var i = 0;
    if(campo === 'david'){
        i = 0;
    }
    if(campo === 'alejandro'){
        i = 1;
    }
    if(campo === 'jose'){
        i = 2;
    }
    if(campo === 'marc'){
        i = 3;
    }
    if(campo === 'quico'){
        i = 4;
    }
    if(campo === 'miquel'){
        i = 5;
    }
    if(campo === 'enrique'){
        i = 6;
    }
    if(campo === 'alvaro'){
        i = 7;
    }
    if(campo === 'xavi'){
        i = 8;
    }
    if(campo === 'roc'){
        i = 9;
    }
    msj += Hockey.cuerpoTodosDatosTr(datosDescargados.data[i])
    Frontend.Article.actualizar("Plantilla Lista Datos Jugador", msj)
}

/**
 * Función llamada cada vez que se cambia el campo en "MostrarJugadoresDatosUno" que cambia
 * el valor del parámetro nombre al valor que se elija en el selector
 */
function cambiarOpcionNombre(){
    campo = document.getElementById("opcionNombre").value;
    Hockey.procesarJugadoresDatosUno();
}

let valor = 0; //constante para moverse entre los nombres con Anterior y Siguiente

Hockey.cabeceraDatosClick = function () {
    return `<button id="previo" onclick="anterior()">&laquo; Anterior</button>
    <button id="siguiente" onclick="siguiente()">Siguiente &raquo;</button>
    `;
}

/**
 * Muestra los datos de un solo jugador a elección permitiendo cambiar entre el siguiente
 * y el anterior con un solo click
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresDatosClick = function (datosDescargados) {   
    let msj = "";
    msj += Hockey.cabeceraDatosClick();
    msj += Hockey.cuerpoTodosDatosTr(datosDescargados.data[valor])
    Frontend.Article.actualizar("Plantilla Lista Datos Jugador con un click", msj)
}

/**
 * Función que incrementa el valor para mostrar el siguiente
 */
function siguiente(){
    if(valor != 9){
        valor = valor+1;
    }
    Hockey.procesarJugadoresDatosClick();
}

/**
 * Función que decrementa el valor para mostrar el anterior
 */
function anterior(){
    if(valor != 0){
        valor = valor-1;
    }
    Hockey.procesarJugadoresDatosClick();
}

let clave = null;

Hockey.cabeceraFiltro = function () {
    return `
    <input type="text" id="myInput" placeholder="Filtro..." title="Escribe un nombre">
    <button onclick="filtroNombre()">Filtrar Nombre</button>
    `;
}

/**
 * Muestra los datos de los jugadores cuyo nombre cumpla el filtro aplicado
 * @param {*} datosDescargados 
 */
Hockey.mostrarJugadoresFiltro = function (datosDescargados) {   
    let msj = "";
    msj += Hockey.cabeceraFiltro();
    //console.log(datosDescargados.data[0].data);
    var DatosFiltrados = aplicarFiltroNombre(datosDescargados.data);
    console.log(DatosFiltrados);
    DatosFiltrados.forEach(e => msj += Hockey.cuerpoTodosDatosTr(e));
    Frontend.Article.actualizar("Plantilla Lista Datos Jugador filtrando por nombre", msj);
}

/**
 * Función llamada cada vez se envía un filtro nuevo en "mostrarJugadoresFiltro"
 */
function filtroNombre(){
    var input
    input = document.getElementById("myInput");
    clave = input.value.toLowerCase();
    Hockey.procesarJugadoresFiltro();
}

/**
 * Función que deja solo los datos de los jugadores que cumplen con el filtro
 * @param {*} data 
 * @returns 
 */
function aplicarFiltroNombre(data){
    if(clave!=null){
        for(var i=0; i<data.length; i++){
            if(data[i].data.nombre.toLowerCase().includes(clave)){
            }else{
                delete data[i];
            }
        }
    }
    return data;
}

Hockey.cabeceraFiltroCampos = function () {
    return `
    <input type="text" id="inputApellido" placeholder="Apellido..." title="Escribe un apellido">
    <button onclick="filtroApellido()">Filtrar Apellido</button>
    <br>
    <input type="text" id="inputEquipo" placeholder="Equipo..." title="Escribe un equipo">
    <button onclick="filtroEquipo()">Filtrar Equipo</button>
    <br>
    <input type="number" id="inputFecha" value="2023" min="1900" max="2023" title="Escribe una fecha">
    <button onclick="filtroFecha()">Filtrar Fecha Nacimiento</button>
    `;
}

let tipo = null;

/**
 * 
 */
Hockey.mostrarJugadoresFiltroCampos = function(datosDescargados) {
    let msj = "";
    msj += Hockey.cabeceraFiltroCampos();
    var DatosFiltrados = datosDescargados.data;
    if(tipo==='apellido'){
        var DatosFiltrados = aplicarFiltroApellido(datosDescargados.data);
    }
    if(tipo==='equipo'){
        var DatosFiltrados = aplicarFiltroEquipo(datosDescargados.data);
    }
    if(tipo==='fecha'){
        var DatosFiltrados = aplicarFiltroFecha(datosDescargados.data);
    }
    DatosFiltrados.forEach(e => msj += Hockey.cuerpoTodosDatosTr(e))
    Frontend.Article.actualizar("Plantilla Lista Datos Jugador filtrando por uno de los campos", msj)
}

function filtroApellido(){
    var input;
    input = document.getElementById("inputApellido");
    clave = input.value.toLowerCase();
    tipo = 'apellido';
    Hockey.procesarJugadoresFiltroCampos();
}

function aplicarFiltroApellido(data){
    if(clave!=null){
        for(var i=0; i<data.length; i++){
            if(data[i].data.apellido.toLowerCase().includes(clave)){
            }else{
                delete data[i];
            }
        }
    }
    return data;
}

function filtroEquipo(){
    var input
    input = document.getElementById("inputEquipo");
    clave = input.value.toLowerCase();
    tipo = 'equipo';
    Hockey.procesarJugadoresFiltroCampos();
}

function aplicarFiltroEquipo(data){
    if(clave!=null){
        for(var i=0; i<data.length; i++){
            if(data[i].data.equipo.toLowerCase().includes(clave)){
            }else{
                delete data[i];
            }
        }
    }
    return data;
}

function filtroFecha(){
    var input
    input = document.getElementById("inputFecha");
    clave = input.value;
    tipo = 'fecha';
    Hockey.procesarJugadoresFiltroCampos();
}

function aplicarFiltroFecha(data){
    if(clave!=null){
        for(var i=0; i<data.length; i++){
            if(data[i].data.f_nacimiento.anio > clave){
            }else{
                delete data[i];
            }
        }
    }
    return data;
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Hockey.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Hockey.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres Jugadores"
 */
Hockey.procesarlistaJugadoresEquipos = function () {
    this.descargarRuta("/plantilla/listaJugadoresEquipos", this.mostrarJugadoresEquipos);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar datos Jugadores"
 */
Hockey.procesarlistaDatosJugadores = function () {
    this.descargarRuta("/plantilla/listaJugadoresEquiposTodos", this.mostrarJugadoresDatos);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar nombres alfabéticamente"
 */
Hockey.procesarJugadoresAlfabetica = function () {
    this.descargarRuta("/plantilla/listaJugadoresAlfabetica", this.mostrarJugadoresAlfabetica);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar datos por campo"
 */
Hockey.procesarJugadoresPorCampo = function () {
    this.descargarRuta("/plantilla/listaJugadoresPorCampo", this.mostrarJugadoresPorCampo);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar datos de un jugador"
 */
Hockey.procesarJugadoresDatosUno = function () {
    this.descargarRuta("/plantilla/listaJugadoresDatosUno", this.mostrarJugadoresDatosUno);
}

/**
 * Función principal para responder al evento de elegir la opción "Listar datos de un jugador con un click"
 */
Hockey.procesarJugadoresDatosClick = function () {
    this.descargarRuta("/plantilla/listaJugadoresDatosClick", this.mostrarJugadoresDatosClick);
}

/**
 * 
 */
Hockey.procesarJugadoresFiltro = function () {
    this.descargarRuta("/plantilla/listaJugadoresFiltro", this.mostrarJugadoresFiltro);
}

/**
 * 
 */
Hockey.procesarJugadoresFiltroCampos = function () {
    this.descargarRuta("/plantilla/listaJugadoresFiltroCampos", this.mostrarJugadoresFiltroCampos);
}