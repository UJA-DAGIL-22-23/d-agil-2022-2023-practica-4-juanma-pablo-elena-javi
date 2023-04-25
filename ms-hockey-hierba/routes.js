/**
 * @file routes.js
 * @description Define las rutas ante las que va a responder al MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");



/**
 * Ruta raíz: /
 */
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Acerca De (es decir, About...)
 */
router.get("/acercade", async (req, res) => {
    try {
        await callbacks.acercaDe(req, res)
    } catch (error) {
        console.log(error);
    }
});



/**
 * Test de conexión a la BBDD
 */
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});


/**
 * Ruta Lista (es decir, About...)
 */
router.get("/listaJugadoresEquipos", async (req, res) => {
    try {
        await callbacks.listaJugadoresEquipos(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Lista (es decir, About...)
 */
router.get("/listaJugadoresEquiposTodos", async (req, res) => {
    try {
        await callbacks.listaJugadoresEquiposTodos(req, res)
    } catch (error) {
        console.log(error);
    }
});

/**
 * Ruta Lista (es decir, About...)
 */
router.get("/listaJugadoresAlfabetica", async (req, res) => {
    try {
        await callbacks.listaJugadoresAlfabetica(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/listaJugadoresPorCampo", async (req, res) => {
    try {
        await callbacks.listaJugadoresPorCampo(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/listaJugadoresDatosUno", async (req, res) => {
    try {
        await callbacks.listaJugadoresDatosUno(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/listaJugadoresDatosClick", async (req, res) => {
    try {
        await callbacks.listaJugadoresDatosClick(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/listaJugadoresFiltro", async (req, res) => {
    try {
        await callbacks.listaJugadoresFiltro(req, res)
    } catch (error) {
        console.log(error);
    }
});

router.get("/listaJugadoresFiltroCampos", async (req, res) => {
    try {
        await callbacks.listaJugadoresFiltroCampos(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Exporto el módulo para poder usarlo en server
module.exports = router;
