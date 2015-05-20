var superagent = require('superagent');
var expect = require('chai').expect;
var app = require('../app');

var newPropiedad = {
  direccion: {
    codigoPostal: '8000',
    direccion: 'Charlone 650',
    ciudad: 'bahia blanca',
    provincia: 'buenos aires',
    pais: 'argentina'
  },
  ambientes: 1,
  banios: 1,
  expensas: 1,
  metrosCuadrados: 1,
};

describe('propiedades api', function() {
  beforeEach(function () {
    app.boot();
  });
  afterEach(function () {
    app.shutdown();
  });

  describe('endpoints', function() {
    it('deberia crear una nueva propiedad cuando una solicitud post es realizada correctamente', function(done) {
      superagent.post('http://localhost:3003/api/propiedades')
      .send(newPropiedad)
      .end(function(e, res) {
        expect(e).to.be.null;
        expect(res.body._id.length).to.exist;
        newPropiedad.id = res._id;
        done();
      });
    });
  });

});
