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
Frontend.vector = {nombres: [], deporte: []}
Frontend.deporte = ""

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

Frontend.mostrarTodosNombres = function() {
    Frontend.NombresMsj=""
    Baloncesto.recupera(Frontend.imprimeNombres);
    Hockey.recupera(Frontend.imprimeNombres);
    FutbolPlaya.recupera(Frontend.imprimeNombres);
    Piraguismo.recupera(Frontend.imprimeNombresPiraguismo);
}

Frontend.imprimeNombres = function(vector) {

    let msj = `<div>`
    vector.forEach(e => msj += `<p> ${e.data.nombre} </p>`)
    msj += `</div>`
    
    Frontend.NombresMsj += msj;
    Frontend.Article.actualizar("Nombres jugadores/equipos:", Frontend.NombresMsj)
}

Frontend.imprimeNombresPiraguismo = function(vector) {

    let msj = `<div>`
    vector.forEach(e => msj += `<p> ${e.data.name} </p>`)
    msj += `</div>`
    
    Frontend.NombresMsj += msj;
    Frontend.Article.actualizar("Nombres jugadores/equipos:", Frontend.NombresMsj)
}

  Frontend.nombresOrdenados = function() {
      Baloncesto.recupera(Frontend.juntarVectores);
      Hockey.recupera(Frontend.juntarVectores);
      FutbolPlaya.recupera(Frontend.juntarVectores);
      Piraguismo.recupera(Frontend.juntarVectoresPiraguismo);
      Frontend.vectorNombres = []
  }
  
  Frontend.juntarVectores = function(vector) {

      vector.forEach(e => Frontend.vectorNombres.push(e.data.nombre))  

      Frontend.vectorNombres.sort((a, b) => a.localeCompare(b));

      let msj = `<div>`
      Frontend.vectorNombres.forEach(e => msj += `<p> ${e} </p>`)
      msj += `</div>`

      Frontend.Article.actualizar("Nombres jugadores/equipos ordenados:", msj)
    
  }

  Frontend.juntarVectoresPiraguismo = function(vector) {

      vector.forEach(e => Frontend.vectorNombres.push(e.data.name)) 

      Frontend.vectorNombres.sort((a, b) => a.localeCompare(b));

      let msj = `<div>`
      Frontend.vectorNombres.forEach(e => msj += `<p> ${e} </p>`)
      msj += `</div>`

      Frontend.Article.actualizar("Nombres jugadores/equipos ordenados:", msj)
    
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

Frontend.buscarNombres = function(){

    Frontend.deporte = "Baloncesto";
    Baloncesto.recupera(Frontend.juntarVectores2);
    Frontend.deporte = "Hockey";
    Hockey.recupera(Frontend.juntarVectores2);
    Frontend.deporte = "Fútbol Playa";
    FutbolPlaya.recupera(Frontend.juntarVectores2);
    Frontend.deporte = "Piragüismo";
    Piraguismo.recupera(Frontend.juntarVectoresPiraguismo2);
    Frontend.vectorNombres = []
    Frontend.vector.nombres = []
    Frontend.vector.deporte = []

    let msj = `<div>
    <p> Buscar jugadores cuyo nombre incluye: </p>
    <input type="text" id="id_Texto">
    <button onclick="javascript:Frontend.incluyeNombre();">Buscar</button>
    </div>`;

    Frontend.Article.actualizar("Buscar jugadores por nombre", msj)
}


Frontend.incluyeNombre = function (texto) {
    // Si está definido el campo de búsqueda, uso el valor que ha introducido el usuario.
    // Si no, uso el valor que se ha pasado por parámetro.
    if( typeof document.getElementById("id_Texto") != "undefined" && document.getElementById("id_Texto")!=null ) texto=document.getElementById("id_Texto").value
    let msj = "";

    for(var i=0; i < Frontend.vector.nombres.length; i++){
        let nombre=Frontend.vector.nombres[i];
        let deporte=Frontend.vector.deporte[i];
        if(nombre.includes(texto)){
            msj += `<div> 
            <h1> Jugador </h1>
            <p> Nombre del jugador: ${nombre} </p>
            <p> Deporte del jugador: ${deporte} </p>
            </div>`;
        }
    }

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Jugadores cuyo nombre contiene '" + texto + "'", msj)

}
/**
 * Vuelca en Frontend.vector los datos de los distintos deportes que han sido encontrados.
 * @param {*} vector VEctor con los datos de los deportistas/equipos
 * @param {*} deporte Nombre del deporte que estamos procesando
 */
Frontend.juntarVectores2 = function(vector, deporte) {

    vector.forEach(e => Frontend.vectorNombres.push(e.data.nombre))
    vector.forEach(e => Frontend.vector.nombres.push(e.data.nombre))
    vector.forEach(e => Frontend.vector.deporte.push(deporte))  
  
}

Frontend.juntarVectoresPiraguismo2 = function(vector, deporte) {

    vector.forEach(e => Frontend.vectorNombres.push(e.data.name))
    vector.forEach(e => Frontend.vector.nombres.push(e.data.name))
    vector.forEach(e => Frontend.vector.deporte.push(deporte))  
  
}
