/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const datosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

// Preparo los datos
let per = {
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

let pp = { data: per }

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article) 
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})

describe("Frontend.mostrarTodoAcercaDe: ", function () {
    it("el msj tiene que estar vacío",
        function () {
            // Probamos valores nulos
            Frontend.mostrarTodoAcercaDe()
            expect(msj).toBe(``)
        })  

})

describe("Frontend.mostrarAcercaDe: ", function () {
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Frontend.mostrarAcercaDe(datosPrueba)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosPrueba.fecha) >= 0).toBeTrue()

            expect(elementoTitulo.innerHTML).toBe("Acerca De")
            expect(elementoContenido.innerHTML.includes("Autor")).toBeTrue() 
            expect(elementoContenido.innerHTML.includes("E-mail")).toBeTrue() 
            expect(elementoContenido.innerHTML.includes("Fecha")).toBeTrue() 
        })
})

describe("Frontend.imprimeNombres: ", function () {
    it("muestra todos los nombres de los jugadores/equipos de todos los deportes",
        function () {
            let personas = per.datos_personas
            Frontend.imprimeNombres(personas)

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores/equipos:")
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
            }
            
        })
})

describe("Frontend.imprimeNombresPiraguismo: ", function () {
    it("muestra todos los nombres de los jugadores/equipos de piragüismo",
        function () {
            let personas = per.datos_personas
            Frontend.imprimeNombresPiraguismo(personas)

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores/equipos:")
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.name)).toBeTrue()
            }
            
        })
})

describe("Frontend.juntarVectores: ", function () {
    it("muestra todos los nombres de los jugadores/equipos de todos los deportes ordenados alfabéticamente",
        function () {
            let personas = per.datos_personas
            Frontend.juntarVectores(personas)

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores/equipos ordenados:")
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.nombre)).toBeTrue()
            }
        })
})

describe("Frontend.juntarVectoresPiraguismo: ", function () {
    it("muestra todos los nombres de los jugadores/equipos de piragüismo ordenados alfabéticamente",
        function () {
            let personas = per.datos_personas
            Frontend.juntarVectoresPiraguismo(personas)

            expect(elementoTitulo.innerHTML).toBe("Nombres jugadores/equipos ordenados:")
            for (let i = 0; i < d.datos_personas.length; ++i) {
                expect(elementoContenido.innerHTML.includes(personas[i].data.name)).toBeTrue()
            }
        })
})

/*
Las siguientes no se pueden probar porque dependen de funciones asíncronas:
-mostrarTodosNombres()
-nombresOrdenados()
*/
