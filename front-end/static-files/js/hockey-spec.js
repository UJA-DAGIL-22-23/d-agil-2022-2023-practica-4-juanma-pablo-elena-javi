/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_LISTA_JUGADORES_EQUIPOS = "Plantilla Lista Jugadores/equipos"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Hockey.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Hockey.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hockey.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Hockey.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hockey.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Hockey.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hockey.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Hockey.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Hockey.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Hockey.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Hockey.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Hockey.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Hockey.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Hockey.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Hockey.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Hockey.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Hockey.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Hockey.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Hockey.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Hockey.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Pie table ", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Hockey.pieTable()).toBe("</tbody></table>");
        });
});

describe("CuerpoTr ", function () {

    // Preparo los datos
    let d = {
        nombre: "Nombre 1"
    }

    let p = { 
        data: d
        , ref: {
            "@ref": {
                id: "ref persona 1"
            }
        }
    }

    it("debería devolver una fila de tabla con el nombre del jugador asociado",
        function () {
            let msj = Hockey.cuerpoTr(p)
            console.log(msj);
            expect(msj.includes(d.nombre)).toBeTrue();
        });
});

describe("cuerpoTodosDatosTr ", function () {

    // Preparo los datos
    let d = {
        nombre: "Nombre 1"
        , apellido: "Apellido 1"
        , equipo: "Equipo"
        , f_nacimiento: { dia: 123, mes: 245, anio: 3024 }
        , partidos_jugados: 123
        , anios_participaciones_jjoo: [
            1234, 1235, 1236
        ]
    }

    let p = { 
        data: d
        , ref: {
            "@ref": {
                id: "ref persona 1"
            }
        }
    }

    it("debería devolver una fila de tabla con los datos del jugador asociado",
        function () {
            let msj = Hockey.cuerpoTodosDatosTr(p)
            console.log(msj);
            expect(msj.includes(d.nombre)).toBeTrue();
            expect(msj.includes(d.apellido)).toBeTrue();
            expect(msj.includes(d.equipo)).toBeTrue();
            expect(msj.includes(d.f_nacimiento.dia)).toBeTrue();
            expect(msj.includes(d.f_nacimiento.mes)).toBeTrue();
            expect(msj.includes(d.f_nacimiento.anio)).toBeTrue();
            expect(msj.includes(d.partidos_jugados)).toBeTrue();
            expect(msj.includes(d.anios_participaciones_jjoo.length)).toBeTrue();
        });
});

describe("CabeceraPorCampo ", function () {
    it("debería devolver las etiquetas HTML para la cabecera por campo",
        function () {
            expect(Hockey.cabeceraPorCampo()).toContain("<select");
            expect(Hockey.cabeceraPorCampo()).toContain("<option>");
            expect(Hockey.cabeceraPorCampo()).toContain("</select>");
        });
});

describe("CabeceraPorCampo ", function () {
    it("debería devolver las etiquetas HTML para la cabecera por campo",
        function () {
            expect(Hockey.cabeceraPorCampo()).toContain("<select");
            expect(Hockey.cabeceraPorCampo()).toContain("<option>");
            expect(Hockey.cabeceraPorCampo()).toContain("</select>");
        });
});

describe("CabeceraDatosUno ", function () {
    it("debería devolver las etiquetas HTML para la cabecera datos de un jugador",
        function () {
            expect(Hockey.cabeceraDatosUno()).toContain('<select id="opcionNombre"');
            expect(Hockey.cabeceraDatosUno()).toContain("<option>");
            expect(Hockey.cabeceraDatosUno()).toContain("</select>");
        });
});

describe("CabeceraDatosClick ", function () {
    it("debería devolver las etiquetas HTML para la cabecera datos cambiando con un solo click",
        function () {
            expect(Hockey.cabeceraDatosClick()).toContain('<button id="previo"');
            expect(Hockey.cabeceraDatosClick()).toContain('<button id="siguiente"');
            expect(Hockey.cabeceraDatosClick()).toContain("</button>");
        });
});

describe("CabeceraFiltro ", function () {
    it("debería devolver las etiquetas HTML para la cabecera datos con filtro",
        function () {
            expect(Hockey.cabeceraFiltro()).toContain('<input type="text" id="myInput" placeholder="Filtro..." title="Escribe un nombre">');
            expect(Hockey.cabeceraFiltro()).toContain('<button onclick="filtroNombre()">');
        });
});

describe("CabeceraFiltroCampos ", function () {
    it("debería devolver las etiquetas HTML para la cabecera datos con filtro",
        function () {
            expect(Hockey.cabeceraFiltroCampos()).toContain('<input type="text" id="inputApellido"');
            expect(Hockey.cabeceraFiltroCampos()).toContain('<button onclick="filtroApellido()">');
            expect(Hockey.cabeceraFiltroCampos()).toContain('<input type="text" id="inputEquipo"');
            expect(Hockey.cabeceraFiltroCampos()).toContain('<button onclick="filtroEquipo()">');
            expect(Hockey.cabeceraFiltroCampos()).toContain('<input type="number" id="inputFecha"');
            expect(Hockey.cabeceraFiltroCampos()).toContain('<button onclick="filtroFecha()">');
        });
});

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
