/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};
let msj = ``;

/// Concatenación de mensajes para Acerca De
Frontend.AcercaDeMsj= ""
Frontend.NombresMsj= ""
Frontend.vectorNombres = []

/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}

Frontend.mostrarTodoAcercaDe = function() {
    Frontend.AcercaDeMsj=""
    Baloncesto.descargarRuta("/baloncesto/acercade", this.mostrarAcercaDe)
    Hockey.descargarRuta("/hockey/acercade", this.mostrarAcercaDe)
    FutbolPlaya.descargarRuta("/futbol-playa/acercade", this.mostrarAcercaDe)
    Piraguismo.descargarRuta("/piraguismo/acercade", this.mostrarAcercaDe)
  }

Frontend.mostrarAcercaDe = function(datosDescargados){
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

   Frontend.AcercaDeMsj += mensajeAMostrar;
   Frontend.Article.actualizar("Acerca De", Frontend.AcercaDeMsj);
}

Frontend.mostrarNombres = function() {
    let msj = `<div> 
    <a href="javascript:Baloncesto.mostrarNombresJugadores()" class="opcion-principal"
        title="Muestra los nombres de todos los jugadores">Nombres Baloncesto</a>
    <a href="javascript:Hockey.procesarlistaJugadoresEquipos()" class="opcion-principal"
        title="Muestra los nombres de todos los jugadores">Nombres Hockey</a>
    <a href="javascript:FutbolPlaya.mostrarNombresEquipos()" class="opcion-principal"
        title="Muestra los nombres de todos los jugadores">Nombres Fútbol Playa</a>
    </div>`;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Nombres jugadores", msj)
  }

  Frontend.nombresOrdenados = function() {
    Baloncesto.recupera(Frontend.juntarVectores);
    Hockey.recupera(Frontend.juntarVectores);
    FutbolPlaya.recupera(Frontend.juntarVectores);
    Frontend.imprimir();
    Frontend.vectorNombres = []
  }
  
  Frontend.juntarVectores = function(vector) {

    vector.forEach(e => Frontend.vectorNombres.push(e.data.nombre))
    
  }
  
  Frontend.imprimir = function(){

    Frontend.vectorNombres.sort((a, b) => a.localeCompare(b));

    let msj = `<div>`
    Frontend.vectorNombres.forEach(e => msj += `<p> ${e} </p>`)
    msj += `</div>`

    Frontend.Article.actualizar("Nombres jugadores:", msj)
  }

let contrasteValor = false;
  Frontend.contraste = function() {
    if(contrasteValor == false){
        const body = document.querySelector('body');
        body.setAttribute("style", "background-color: #000000; color: #ffffff;")
        contrasteValor = true;
    }else{
        const body = document.querySelector('body');
        body.setAttribute("style", "background-color: #ffffff; color: #000000;")
        contrasteValor = false;
    }
  }



  
  
  