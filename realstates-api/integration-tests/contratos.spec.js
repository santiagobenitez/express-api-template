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

var newCliente = {
  direccion: {
    codigoPostal: '8000',
    direccion: 'Charlone 650',
    ciudad: 'bahia blanca',
    provincia: 'buenos aires',
    pais: 'argentina'
  },
  nombre: 'santiago',
  apellido: 'benitez',
  nroTelefonoCasa: 12345678,
  nroTelefonoCelular: 123213456,
};

var newContrato = {
  fechaHasta: new Date(2015, 6, 18),
  fechaDesde: new Date(2013, 8, 18),
  tipoInteres: 'Semestral',
  interes: 10,
  alquiler: 1000,
  deposito: 100,
  multaDiaria: 100,
  diaDeVencimiento: 10
};

describe('contratos api', function() {
  before(function(done) {
    app.boot();
    superagent.post('http://localhost:3003/api/clientes')
      .send(newCliente)
      .end(function(e, res) {
        console.log(e);
        newCliente._id = res.body._id;
        newPropiedad.propietario = newCliente._id;
        newContrato.inquilino = newCliente._id;
        newContrato.garante = newCliente._id;
        superagent.post('http://localhost:3003/api/propiedades')
          .send(newPropiedad)
          .end(function(e, res) {
            newPropiedad._id = res.body._id;
            newContrato.propiedad = res.body._id;
            done();
          });
      });
  });

  after(function(done) {
    superagent.del('http://localhost:3003/api/clientes/' + newCliente._id)
      .end(function(e, res) {
        superagent.del('http://localhost:3003/api/propiedades/' + newPropiedad._id)
          .end(function(e, res) {
            app.shutdown();
            done();
          });
      });
  });

  describe('endpoints', function() {
    it('should create a new contrato when a request is made correctly', function(done) {
      superagent.post('http://localhost:3003/api/contratos')
        .send(newContrato)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          newContrato._id = res.body._id;
          done();
        });
    });

    it('should return a 400 error with a message of required inquilino when the inquilino was not submited', function(done) {
      var newInvalidContrato = {
        fechaHasta: new Date(2015, 6, 18),
        fechaDesde: new Date(2013, 8, 18),
        tipoInteres: 'Semestral',
        interes: 10,
        alquiler: 1000,
        deposito: 100,
        multaDiaria: 100
      };

      superagent.post('http://localhost:3003/api/contratos')
        .send(newInvalidContrato)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.errors.inquilino.msg).to.exist;
          done();
        });
    });

    it('should return a 400 error with a message of required inquilino when the inquilino was submited but is an invalid id', function(done) {
      var newInvalidContrato = {
        fechaHasta: new Date(2015, 6, 18),
        fechaDesde: new Date(2013, 8, 18),
        tipoInteres: 'Semestral',
        interes: 10,
        alquiler: 1000,
        deposito: 100,
        multaDiaria: 100,
        inquilino: 'abc12345'
      };

      superagent.post('http://localhost:3003/api/contratos')
        .send(newInvalidContrato)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.errors.inquilino.msg).to.exist;
          done();
        });
    });

    it('should get the recently created contrato as part of the result set when requesting /api/contratos', function(done) {
      superagent.get('http://localhost:3003/api/contratos')
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body.items).to.have.length.above(0);;
          expect(res.body.items.map(function(item) {
            return item._id;
          })).to.contain(newContrato._id);
          done();
        });
    });

    it('should get the the recently created contrato when requesting /api/contratos/{id}', function(done) {

      superagent.get('http://localhost:3003/api/contratos/' + newContrato._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newContrato._id);
          done();
        });
    });

    it('should update the the recently created contrato when requesting put /api/contratos/{id}', function(done) {
      newContrato.alquiler = 2000;
      newContrato.interes = 15;
      superagent.put('http://localhost:3003/api/contratos/' + newContrato._id, newContrato)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newContrato._id);
          expect(res.body.interes).to.eql(15);
          expect(res.body.alquiler).to.eql(2000);
          newContrato = res.body;
          done();
        });
    });

    it('should remove the the recently created contrato when requesting delete /api/contratos/{id}', function(done) {

      superagent.del('http://localhost:3003/api/contratos/' + newContrato._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.ok).to.be.true;
          done();
        });
    });

    it('should return an error when requesting the recently removed contrato', function(done) {
      superagent.get('http://localhost:3003/api/contratos/' + newContrato._id)
        .end(function(e, res) {
          expect(e).to.exist;
          expect(e.status).to.eql(404);
          done();
        });
    });

  });
});
