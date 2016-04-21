/*jshint ignore: start */

var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var repository = require('../../data/pago.repository');
var propiedadRepository = require('../../data/propiedades.repository');
var clienteRepository = require('../../data/cliente.repository');
var contratoRepository = require('../../data/contrato.repository');
var mockgoose = require('mockgoose');
mongoose.Promise = require('bluebird');

var direccion = {
	codigoPostal: '8000',
	direccion: 'test test',
	ciudad: 'test city',
	provincia: 'test',
	pais: 'arg'
};

var newCliente = {
  direccion: direccion,
  nombre: 'santiago',
  apellido: 'benitez',
};

var newPropiedad = {
  direccion: direccion ,
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
  realizadoPor: 'new tenant',
  importe: 1000
}

describe('pagoRepository', function() {
  before(function(done) {
		mockgoose(mongoose).then(function(){
			mongoose.connect(dbUrl, function(err){
				init_data(done);
			});
		});
	});
	after(function(done) {
		mockgoose.reset(function(){
			done();
		});
	});

  function init_data(done) {
    clienteRepository.create(newCliente).then(function(obj) {
      newCliente._id = obj._id;
      newPropiedad.propietario = obj._id;
      newContrato.inquilino = obj._id;
      newContrato.garante = obj._id;
      propiedadRepository.create(newPropiedad).then(function(prop) {
        newPropiedad._id = prop._id;
        newContrato.propiedad = prop._id;
        contratoRepository.create(newContrato).then(function(cont) {
          newContrato._id = cont._id;
          pago.contrato = cont._id;
          done();
        });
      });
    });
  }

  describe('create', function() {
    it('should create a new payment when it is a valid property', function(done) {
      repository.create(pago).then(function(obj) {
        expect(obj).to.exist;
        pago._id = obj._id;
        done();
      })
    });

    it('should return an error object when the contactis not specified', function(done) {
      var pago2 = {
        fecha: new Date(2015, 6, 18),
        realizadoPor: 'test',
        importe: 1000
      }

      repository.create(pago2).catch(function(e) {
				expect(e).not.to.be.null;
        expect(e.errors.contrato.message).to.exist;
        done();
      });
    });
  });

  describe('getAll', function() {
    it('should return the recently created payment as part of the result', function(done) {
      repository.getAll().then(function(objs) {
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
      repository.get(pago._id).then(function(obj) {
        expect(obj._id).to.eql(pago._id);
        done();
      });
    });

    it('should return an error when the id doesnt exist', function(done) {
      repository.get(pago._id + "a").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })
  });

  describe('update', function() {
    it('should update the payment when the value is modified', function(done) {
      pago.importe = 2000;
      repository.update(pago._id, pago).then(function(obj) {
        pago = obj;
        expect(obj.importe).to.eql(2000);
        done();
      });
    });

    it('should return an error when the id doest exist', function(done) {
      repository.update(pago._id + 'a', pago).catch(function(e) {
        expect(e).to.exist;
        done();
      });
    });
  });

  describe('remove', function() {
    it('should return an error when the object was not removed', function(done) {
      repository.remove(pago._id + "a").catch(function(e) {
        expect(e).to.exist;
        done();
      });
    })

    it('should return a null error when the recently created pago was removed successfuly', function(done) {
      repository.remove(pago._id).then(function(e) {
        expect(e).not.to.exist;
        done();
      });
    });
  });
});
