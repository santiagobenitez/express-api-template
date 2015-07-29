var dbUrl = 'mongodb://@127.0.0.1:27017/testbienesraices';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var repository = require('../../data/pago.repository');
var propiedadRepository = require('../../data/propiedades.repository');
var clienteRepository = require('../../data/cliente.repository');
var contratoRepository = require('../../data/contrato.repository');


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
};

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

var newContrato = {
  fechaHasta: new Date(2015, 6, 18),
  fechaDesde: new Date(2013, 8, 18),
  tipoInteres: 'Semestral',
  interes: 10,
  alquiler: 1000,
  deposito: 100,
  multaDiaria: 100,
  diaDeVencimiento: 5
};

var pago = {
  fecha: new Date(2015, 6, 18),
  realizadoPor: 'Santiago',
  importe: 1000
}

describe('pagoRepository', function() {
  before(function(done) {
    mongoose.connect(dbUrl);
    initData(done);
  });

  function initData(done) {
    clienteRepository.create(newCliente, function(e, obj) {
      newCliente._id = obj._id;
      newPropiedad.propietario = obj._id;
      newContrato.inquilino = obj._id;
      newContrato.garante = obj._id;
      propiedadRepository.create(newPropiedad, function(e, prop) {
        newPropiedad._id = prop._id;
        newContrato.propiedad = prop._id;
        contratoRepository.create(newContrato, function(e, cont) {
          newContrato._id = cont._id;
          pago.contrato = cont._id;
          done();
        });
      });
    });
  }

  after(function() {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
  });

  describe('function declaratios', function() {
    it('should have create defined', function() {
      expect(repository.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(repository.getAll).to.exist;
    });
    it('should have remove defined', function() {
      expect(repository.remove).to.exist;
    });
    it('should have update defined', function() {
      expect(repository.update).to.exist;
    });
    it('should have get defined', function() {
      expect(repository.get).to.exist;
    });
  });

  describe('create', function() {
    it('should create a new pago when it is a valid property', function(done) {

      repository.create(pago, function(e, obj) {
        expect(e).to.be.null;
        expect(obj).to.exist;
        pago._id = obj._id;
        done();
      })
    });

    it('should return an error object when the contato property is not specified', function(done) {
      var pago2 = {
        fecha: new Date(2015, 6, 18),
        realizadoPor: 'Santiago',
        importe: 1000
      }

      repository.create(pago2, function(e, obj) {
        expect(e).not.to.be.null;
        expect(e.contrato.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created pago as part of the result', function(done) {

      repository.getAll(function(e, objs) {
        expect(e).to.be.null;
        expect(objs).to.have.length.above(0);
        expect(objs.map(function(item) {
          return item._id
        })).to.contain(pago._id);
        done();
      });
    });
  });

  describe('get', function() {
    it('should return the recently created pago as part of the result', function(done) {

      repository.get(pago._id, function(e, obj) {
        expect(e).to.be.null;
        expect(obj._id).to.eql(pago._id);
        done();
      });
    });

    it('should return an error when the id doesnt exist', function(done) {
      repository.get(pago._id + "a", function(e, obj) {
        expect(e).to.exist;
        done();
      });
    })
  });

  describe('update', function() {
    it('should update the pago when the importe is modified', function(done) {

      pago.importe = 2000;


      repository.update(pago._id, pago, function(e, obj) {
        expect(e).to.be.null;
        pago = obj;
        expect(obj.importe).to.eql(2000);
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {

      repository.update(pago._id + 'a', pago, function(e, obj) {
        expect(e).to.exist;
        done();
      });
    });
  });


  describe('remove', function() {
    it('should return an error when the object was not removed', function(done) {
      repository.remove(pago._id + "a", function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created pago was removed successfuly', function(done) {

      repository.remove(pago._id, function(e) {
        expect(e).to.be.null;
        done();
      });
    });
  });
});
