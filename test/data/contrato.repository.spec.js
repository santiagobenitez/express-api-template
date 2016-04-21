/*jshint ignore: start */

var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var repository = require('../../data/contrato.repository');
var propiedadRepository = require('../../data/propiedades.repository');
var clienteRepository = require('../../data/cliente.repository')
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
	nombre: 'test',
	apellido: 'test',
};

var newPropiedad = {
	direccion: direccion,
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

describe('contratoRepository', function() {
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
				done();
			});
		});
	}

	describe('create', function() {
		it('should create a new contract when it is a valid contract', function(done) {

			repository.create(newContrato).then(function(obj) {
				expect(obj).to.exist;
				newContrato._id = obj._id;
				done();
			})
		});

		it('should return an error object when the tenant is not specified', function(done) {
			var newContrato2 = {
				fechaHasta: new Date(2015, 6, 18),
				fechaDesde: new Date(2013, 8, 18),
				tipoInteres: 'Semestral',
				interes: 10,
				alquiler: 1000,
				deposito: 100,
				multaDiaria: 100
			};

			repository.create(newContrato2).catch(function(e) {
				expect(e).not.to.be.null;
				expect(e.errors.inquilino.message).to.exist;
				done();
			});
		});
	});

	describe('getAll', function() {
		it('should return the recently created contrato as part of the result', function(done) {

			repository.getAll().then(function(objs) {
				expect(objs).to.have.length.above(0);
				expect(objs.map(function(item) {
					return item._id
				})).to.contain(newContrato._id);
				done();
			});
		});
	});

	describe('get', function() {
		it('should return the recently created contrato as part of the result', function(done) {

			repository.get(newContrato._id).then(function(obj) {
				expect(obj._id).to.eql(newContrato._id);
				done();
			});
		});

		it('should return an error when the id doesnt exist', function(done) {
			repository.get(newContrato._id + "a").catch(function(e) {
				expect(e).to.exist;
				done();
			});
		})
	});

	describe('update', function() {
		it('should update the contrato when the alquiler is modified', function(done) {
			newContrato.alquiler = 2000;
			repository.update(newContrato._id, newContrato).then(function(obj) {
				newContrato = obj;
				expect(obj.alquiler).to.eql(2000);
				done();
			});
		});

		it('should return an error when the id doest exist', function(done) {
			repository.update(newContrato._id + 'a', newContrato).catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});
	});

	describe('remove', function() {
		it('should return an error when the object was not removed', function(done) {
			repository.remove(newContrato._id + "a").catch(function(e) {
				expect(e).to.exist;
				done();
			});
		})

		it('should return a null error when the recently created contract was removed successfuly', function(done) {
			repository.remove(newContrato._id).then(function(e) {
				expect(e).not.to.exist;
				done();
			});
		});
	});
});
