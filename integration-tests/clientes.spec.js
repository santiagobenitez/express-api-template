var superagent = require('superagent');
var expect = require('chai').expect;
var app = require('../app');

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

describe('clientes api', function() {
  before(function() {
    app.boot();
  });
  after(function() {
    app.shutdown();
  });

  describe('endpoints', function() {
    it('should create a new cliente when a request is made correctly', function(done) {
      superagent.post('http://localhost:3003/api/clientes')
        .send(newCliente)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          newCliente._id = res.body._id;
          done();
        });
    });

    it('should return a 400 error with a message of required apellido when the apellido was not submited', function(done) {
      var invalidCliente = {
        direccion: {
          codigoPostal: '8000',
          direccion: 'Charlone 650',
          ciudad: 'bahia blanca',
          provincia: 'buenos aires',
          pais: 'argentina'
        },
        nombre: 'santiago',
        nroTelefonoCasa: 12345678,
        nroTelefonoCelular: 123213456,
      };

      superagent.post('http://localhost:3003/api/clientes')
        .send(invalidCliente)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.error.apellido.msg).to.exist;
          done();
        });
    });

    it('should get the recently created cliente as part of the result set when requesting /api/propiedades', function(done) {
      superagent.get('http://localhost:3003/api/clientes')
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body.items).to.have.length.above(0);;
          expect(res.body.items.map(function(item) {
            return item._id;
          })).to.contain(newCliente._id);
          done();
        });
    });

    it('should get the the recently created cliente when requesting /api/clientes/{id}', function(done) {

      superagent.get('http://localhost:3003/api/clientes/' + newCliente._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newCliente._id);
          done();
        });
    });

    it('should update the the recently created cliente when requesting put /api/clientes/{id}', function(done) {
      newCliente.direccion.direccion = "Balbin 2325";
      newCliente.nombre = 'carmelo'
      superagent.put('http://localhost:3003/api/clientes/' + newCliente._id, newCliente)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newCliente._id);
          expect(res.body.nombre).to.eql('carmelo');
          expect(res.body.direccion.direccion).to.eql('Balbin 2325');
          newCliente = res.body;
          done();
        });
    });

    it('should return a 400 error with a message of required nombre when requesting put /api/clientes/{id} without a nombre', function(done) {
      var invalidCliente = {
        direccion: {
          codigoPostal: '8000',
          direccion: 'Charlone 650',
          ciudad: 'bahia blanca',
          provincia: 'buenos aires',
          pais: 'argentina'
        },
        apellido: 'santiago',
        nroTelefonoCasa: 12345678,
        nroTelefonoCelular: 123213456,
      };
      superagent.put('http://localhost:3003/api/clientes/' + newCliente._id, invalidCliente)
        .end(function(e, res) {
          expect(res.status).to.eql(400);
          expect(res.body.error.nombre.msg).to.exist;
          done();
        });
    });

    it('should remove the the recently created propiedad when requesting delete /api/clientes/{id}', function(done) {

      superagent.del('http://localhost:3003/api/clientes/' + newCliente._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.ok).to.be.true;
          done();
        });
    });

    it('should return an error when requesting the recently removed cliente', function(done) {
      superagent.get('http://localhost:3003/api/clientes/' + newCliente._id)
        .end(function(e, res) {
          expect(e).to.exist;
          expect(e.status).to.eql(404);
          done();
        });
    });
  });
});
