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

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

// Preparo los datos
let d = {
    datos_personas: [
        {
            ref: {
                "@ref": {
                    id: "ref persona 1"
                }
            },
            data: {
                "nombre": "Elena",
                "apellidos": "Carmona Vallecillo",
                "fechaNacimiento": {
                "dia": 6,
                "mes": 10,
                "anio": 2002
                },
                "pais": "España",
                "aniosCompeticion": [
                2017,
                2018,
                2020,
                2022
                ],
                "numero_campeonatos_ganados": 2,
                "nombre_equipo": "Joventut",
                "categoria": "femenina",
                "altura": 1.85
            }
        },
        {
            ref: {
                "@ref": {
                    id: "ref persona 2"
                }
            },
            data: {
                "nombre": "Fernando",
                "apellidos": "Pérez Sánchez",
                "fechaNacimiento": {
                "dia": 25,
                "mes": 3,
                "anio": 1969
                },
                "pais": "España",
                "aniosCompeticion": [
                1980,
                1985,
                1990
                ],
                "numero_campeonatos_ganados": 1,
                "nombre_equipo": "Unicaja",
                "categoria": "masculina",
                "altura": 1.95
            }
        },

    ]
}

let p = { data: d }


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
Las siguientes funciones no podemos probarlas ya que se encargan de probar las conexiones con el microservicio:
-recuperaJugador()
-mostrarJugador()
-recupera()
-mostrarNombresJugadores()
-mostrarNombresOrdenados()
-mostrarDatosJugadores()
-siguienteAnterior()
-guardar()
-guardarJugador()
-modificarNombreJugador()
-modificarJugador()
*/

describe("Plantilla.imprimeJugador: ", function () {
    it("muestra los datos de un jugador",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.imprimeJugador(persona)
            expect(elementoTitulo.innerHTML).toBe('Mostrar datos del jugador')
            expect(elementoContenido.innerHTML.includes(persona.data.nombre)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.apellidos)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.dia)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.mes)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.anio)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.pais)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.aniosCompeticion)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.numero_campeonatos_ganados)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.nombre_equipo)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.categoria)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.altura)).toBeTrue()
        })
})

describe("Plantilla.imprimeNombres: ", function () {
    it("muestra los nombres de un jugador",
        function () {
            let personas = d.datos_personas
            Plantilla.imprimeNombres(personas)
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
            }
        })
})


describe("Plantilla.imprimeNombresOrdenados: ", function () {
    it("muestra los nombres ordenados alfabéticamente",
        function () {
            let personas = d.datos_personas
            Plantilla.imprimeNombres(personas)
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
            }
        })
})

describe("Plantilla.imprimeDatos: ", function () {
    it("muestra datos jugadores",
        function () {
            let personas = d.datos_personas
            Plantilla.imprimeDatos(personas)
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.apellidos)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.fechaNacimiento.dia)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.fechaNacimiento.mes)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.fechaNacimiento.anio)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.pais)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.aniosCompeticion)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.numero_campeonatos_ganados)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre_equipo)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.categoria)).toBeTrue()
                expect(elementoContenido.innerHTML.includes(personas[i].data.altura)).toBeTrue()
            }
        })
})

describe("Plantilla.imprimeJugadorSigAnt: ", function () {
    it("muestra los datos de un jugador",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.imprimeJugadorSigAnt(persona)
            expect(elementoTitulo.innerHTML).toBe('Mostrar datos del jugador')
            expect(elementoContenido.innerHTML.includes(persona.data.nombre)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.apellidos)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.dia)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.mes)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.fechaNacimiento.anio)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.pais)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.aniosCompeticion)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.numero_campeonatos_ganados)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.nombre_equipo)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.categoria)).toBeTrue()
            expect(elementoContenido.innerHTML.includes(persona.data.altura)).toBeTrue()
        })
})

describe("Plantilla.incluyeNombre: ", function () {
    it("muestra los datos de un jugador cuyo nombre contenga Elena",
        function () {
            let personas = d.datos_personas
            let texto = "Elena"
            Plantilla.incluyeNombre(personas, texto )
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyo nombre contiene")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeTrue()
            expect(elementoContenido.innerHTML.includes(texto)).toBeTrue()  
        })
        it("no muestra los datos de ningún jugador cuyo nombre contenga Patata Frita",
        function () {
            let personas = d.datos_personas
            let texto = "Patata Frita"
            Plantilla.incluyeNombre(personas, texto)
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyo nombre contiene")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeFalse()
            expect(elementoContenido.innerHTML.includes(texto)).toBeFalse()  
        })
    
})

describe("Plantilla.buscarNombre: ", function () {
    it("muestra como contenido Buscar jugadores cuyo nombre incluye",
        function () {
            Plantilla.buscarNombre()
            expect(elementoTitulo.innerHTML).toBe("Buscar jugadores por nombre")
            expect(elementoContenido.innerHTML.includes("Buscar jugadores cuyo nombre incluye")).toBeTrue()  
        })
        it("no muestra como contenido Buscar jugadores cuyo nombre tiene",
        function () {
            Plantilla.buscarNombre()
            expect(elementoContenido.innerHTML.includes("Buscar jugadores cuyo nombre tiene")).toBeFalse()
        })
})

describe("Plantilla.modificarNombre: ", function () {
    it("muestra los datos del jugador cuyo nombre se va a modificar",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.modificarNombre(persona)
            expect(elementoTitulo.innerHTML).toBe("Modificar nombre jugador")
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeTrue()  
            expect(elementoContenido.innerHTML.includes(persona.data.nombre)).toBeTrue()
        })
        it("no muestra como contenido los ojos del jugador",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.modificarNombre(persona)
            expect(elementoContenido.innerHTML.includes("ojos del jugador")).toBeFalse()
        })
})

describe("Plantilla.modificar: ", function () {
    it("muestra los datos del jugador a modificar",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.modificar(persona)
            expect(elementoTitulo.innerHTML).toBe("Modificar datos jugador")
            expect(elementoContenido.innerHTML.includes("Apellidos del jugador")).toBeTrue()  
            expect(elementoContenido.innerHTML.includes(persona.data.apellidos)).toBeTrue()
        })
        it("no muestra como contenido los ojos del jugador",
        function () {
            let persona = d.datos_personas[0]
            Plantilla.modificar(persona)
            expect(elementoContenido.innerHTML.includes("ojos del jugador")).toBeFalse()
        })
})

describe("Plantilla.incluyeApellidos: ", function () {
    it("muestra los datos de un jugador cuyos apellidos contengan Carmona",
        function () {
            let personas = d.datos_personas
            let texto = "Carmona"
            Plantilla.incluyeApellidos(personas, texto )
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyos apellidos contienen")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeTrue()
            expect(elementoContenido.innerHTML.includes(texto)).toBeTrue()  
        })
        it("no muestra los datos de ningún jugador cuyos apellidos contengan hola",
        function () {
            let personas = d.datos_personas
            let texto = "hola"
            Plantilla.incluyeApellidos(personas, texto)
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyos apellidos contienen")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeFalse()
            expect(elementoContenido.innerHTML.includes(texto)).toBeFalse()  
        })
    
})

describe("Plantilla.incluyePais: ", function () {
    it("muestra los datos de un jugador cuyo país sea España",
        function () {
            let personas = d.datos_personas
            let texto = "España"
            Plantilla.incluyePais(personas, texto )
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyo país es")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeTrue()
            expect(elementoContenido.innerHTML.includes(texto)).toBeTrue()  
        })
        it("no muestra los datos de ningún jugador cuyo país sea Francia",
        function () {
            let personas = d.datos_personas
            let texto = "Francia"
            Plantilla.incluyePais(personas, texto)
            expect(elementoTitulo.innerHTML.includes("Jugadores cuyo país es")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeFalse()
            expect(elementoContenido.innerHTML.includes(texto)).toBeFalse()  
        })
    
})

describe("Plantilla.incluyeCampeonatos: ", function () {
    it("muestra los datos de un jugador que haya ganado 1 campeonato",
        function () {
            let personas = d.datos_personas
            let texto = "1"
            Plantilla.incluyeCampeonatos(personas, texto )
            expect(elementoTitulo.innerHTML.includes("Jugadores que hayan ganado")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeTrue()
            expect(elementoContenido.innerHTML.includes(texto)).toBeTrue()  
        })
        it("no muestra los datos de ningún jugador que hayan ganado 5 campeonatos",
        function () {
            let personas = d.datos_personas
            let texto = "5"
            Plantilla.incluyeCampeonatos(personas, texto)
            expect(elementoTitulo.innerHTML.includes("Jugadores que hayan ganado")).toBeTrue()
            expect(elementoContenido.innerHTML.includes("Nombre del jugador")).toBeFalse()
            expect(elementoContenido.innerHTML.includes(texto)).toBeFalse()  
        })
    
})

describe("Plantilla.buscar: ", function () {
    it("muestra buscar por tres campos",
        function () {
            Plantilla.buscar()
            expect(elementoTitulo.innerHTML).toBe("Buscar jugadores por campos")
            expect(elementoContenido.innerHTML.includes("Buscar jugadores cuyos apellidos incluyen")).toBeTrue()  
            expect(elementoContenido.innerHTML.includes("Buscar jugadores cuyo país sea")).toBeTrue() 
            expect(elementoContenido.innerHTML.includes("Buscar jugadores que hayan ganado el siguiente nº de campeonatos")).toBeTrue() 
        })
        it("no muestra como contenido Buscar jugadores cuyo nombre tiene",
        function () {
            Plantilla.buscar()
            expect(elementoContenido.innerHTML.includes("Buscar jugadores cuyo nombre tiene")).toBeFalse()
        })
})


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
