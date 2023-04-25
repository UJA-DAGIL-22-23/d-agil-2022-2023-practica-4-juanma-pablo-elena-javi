/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve \"David\" al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "David");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresEquipos', (done) => {
  supertest(app)
    .get('/listaJugadoresEquipos')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      //console.log( "getProyectos BODY: ", res.body ); // Para comprobar qué contiene exactamente res.body
      assert(res.body.data.length === 10);
      assert(res.body.data[0].data.hasOwnProperty('nombre'));
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresEquiposTodos', (done) => {
  supertest(app)
    .get('/listaJugadoresEquiposTodos')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      //console.log( "getProyectos BODY: ", res.body ); // Para comprobar qué contiene exactamente res.body
      assert(res.body.data.length === 10);
      assert(res.body.data[1].data.hasOwnProperty('apellido'));
      assert(res.body.data[1].data.hasOwnProperty('equipo'));
      assert(res.body.data[1].data.hasOwnProperty('f_nacimiento'));
      assert(res.body.data[1].data.hasOwnProperty('partidos_jugados'));
      assert(res.body.data[1].data.hasOwnProperty('anios_participaciones_jjoo'));
      assert(res.body.data[1].data.anios_participaciones_jjoo[0] === 2020);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresAlfabetica', (done) => {
  supertest(app)
    .get('/listaJugadoresAlfabetica')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data[0].data.hasOwnProperty('nombre'));
      assert(res.body.data.length === 10);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresPorCampo', (done) => {
  supertest(app)
    .get('/listaJugadoresPorCampo')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data.length === 10);
      assert(res.body.data[0].data.partidos_jugados === 281)
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresDatosUno', (done) => {
  supertest(app)
    .get('/listaJugadoresDatosUno')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data[0].data.hasOwnProperty('nombre'));
      assert(res.body.data.length === 10);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresDatosClick', (done) => {
  supertest(app)
    .get('/listaJugadoresDatosClick')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data[0].data.hasOwnProperty('partidos_jugados'));
      assert(res.body.data.length === 10);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresFiltro', (done) => {
  supertest(app)
    .get('/listaJugadoresFiltro')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data[0].data.hasOwnProperty('apellido'));
      assert(res.body.data.length === 10);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});

it('Devuelve un vector de tamaño 10 y comprueba un campo al consultar mediante listaJugadoresFiltroCampos', (done) => {
  supertest(app)
    .get('/listaJugadoresFiltroCampos')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function (res) {
      assert(res.body.data[0].data.hasOwnProperty('f_nacimiento'));
      assert(res.body.data.length === 10);
    })
    .end((error) => {error ? done.fail(error) : done(); }
    );
});