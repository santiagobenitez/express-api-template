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

describe('propiedades api', function() {
  before(function(done) {
    app.boot();
    superagent.post('http://localhost:3003/api/clientes')
      .send(newCliente)
      .end(function(e, res) {
        console.log(e);
        expect(e).to.be.null;
        expect(res.body._id).to.exist;
        newCliente._id = res.body._id;
        newPropiedad.propietario = newCliente._id;
        done();
      });
  });
  after(function(done) {
    superagent.del('http://localhost:3003/api/clientes/' + newCliente._id)
      .end(function(e, res) {
        expect(e).to.be.null;
        expect(res.ok).to.be.true;
        app.shutdown();
        done();
      });
  });

  describe('endpoints', function() {
    it('should create a new propiedad when a request is made correctly', function(done) {
      superagent.post('http://localhost:3003/api/propiedades')
        .send(newPropiedad)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          newPropiedad._id = res.body._id;
          done();
        });
    });

    it('should get the recently created propiedad as part of the result set when requesting /api/propiedades', function(done) {
      superagent.get('http://localhost:3003/api/propiedades')
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body.items).to.have.length.above(0);;
          expect(res.body.items.map(function(item) {
            return item._id;
          })).to.contain(newPropiedad._id);
          done();
        });
    });

    it('should get the the recently created propiedad when requesting /api/propiedades/{id}', function(done) {

      superagent.get('http://localhost:3003/api/propiedades/' + newPropiedad._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newPropiedad._id);
          done();
        });
    });

    it('should update the the recently created propiedad when requesting put /api/propidades/{id}', function(done) {
      newPropiedad.direccion.direccion = "Balbin 2325";
      newPropiedad.ambientes = 4;
      superagent.put('http://localhost:3003/api/propiedades/' + newPropiedad._id, newPropiedad)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.body._id).to.exist;
          expect(res.body._id).to.eql(newPropiedad._id);
          expect(res.body.ambientes).to.eql(4);
          expect(res.body.direccion.direccion).to.eql('Balbin 2325');
          newPropiedad = res.body;
          done();
        });
    });

    it('should remove the the recently created propiedad when requesting delete /api/propiedades/{id}', function(done) {

      superagent.del('http://localhost:3003/api/propiedades/' + newPropiedad._id)
        .end(function(e, res) {
          expect(e).to.be.null;
          expect(res.ok).to.be.true;
          done();
        });
    });

    it('should return an error when requesting the recently removed propiedad', function(done) {
      superagent.get('http://localhost:3003/api/propiedades/' + newPropiedad._id)
        .end(function(e, res) {
          expect(e).to.exist;
          expect(e.status).to.eql(404);
          done();
        });
    });

  });
});
