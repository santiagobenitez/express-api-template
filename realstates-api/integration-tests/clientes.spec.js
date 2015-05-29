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
  nroTelefonoCasa: 12345678 ,
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
          console.log(e);
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          newCliente._id = res.body._id;
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
