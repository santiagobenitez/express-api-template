/*jshint ignore: start */

var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var clienteRepository = require('../../data/cliente.repository');
var propiedadRepository = require('../../data/propiedades.repository');
var mockgoose = require('mockgoose');

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

describe('propiedadRepository', function() {
	before(function(done) {
		mockgoose(mongoose).then(function(){
			mongoose.connect(dbUrl, function(err){
				clienteRepository.create(newCliente, function(e, obj) {
					newCliente._id = obj._id;
					newPropiedad.propietario = obj._id;
					done();
				});
			});
		});
	});
	after(function(done) {
		mockgoose.reset(function(){
			done();
		});
	});

	describe('function declaratios', function() {
		it('should have create defined', function() {
			expect(propiedadRepository.create).to.exist;
		});
		it('should have getAll defined', function() {
			expect(propiedadRepository.getAll).to.exist;
		});
		it('should have get defined', function() {
			expect(propiedadRepository.get).to.exist;
		});
		it('should have remove defined', function() {
			expect(propiedadRepository.remove).to.exist;
		});
		it('should have update defined', function() {
			expect(propiedadRepository.update).to.exist;
		});
	});

	describe('create', function() {
		it('should create a new propiedad when it is a valid cliente', function(done) {

			propiedadRepository.create(newPropiedad, function(e, obj) {
				expect(e).to.be.null;
				expect(obj).to.exist;
				newPropiedad._id = obj._id;
				done();
			})
		});

		it('should return an error object when the propietario property is not specified', function(done) {
			var propiedad = {
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

			propiedadRepository.create(propiedad, function(e, obj) {
				expect(e).not.to.be.null;
				expect(e.propietario.message).to.exist;
				done();
			});
		});
	});

	describe('getAll', function() {
		it('should return the recently created propiedad as part of the result', function(done) {

			propiedadRepository.getAll(function(e, objs) {
				expect(e).to.be.null;
				expect(objs).to.have.length.above(0);
				expect(objs.map(function(item) {
					return item._id
				})).to.contain(newPropiedad._id);
				done();
			});
		});
	});

	describe('get', function() {
		it('should return the recently created propiedad as part of the result', function(done) {

			propiedadRepository.get(newPropiedad._id, function(e, obj) {
				expect(e).to.be.null;
				expect(obj._id).to.eql(newPropiedad._id);
				done();
			});
		});

		it('should return an error when the id is invalid', function(done) {
			propiedadRepository.get(newPropiedad._id + "a", function(e, obj) {
				expect(e).to.exist;
				done();
			});
		});

		it('should return null when the id is valid but the object was not found', function(done) {
			// 556c217f3bb8bc6017a8f2e8
			propiedadRepository.get('556c217f3bb8bc6017a8f2e5', function(e, obj) {

				expect(e).to.be.null;
				expect(obj).to.be.null;
				done();
			});

		})
	});

	describe('update', function() {
		it('should update the propiedad when the codigoPostal, direccion and apellido are modified', function(done) {
			newPropiedad.direccion = {
				codigoPostal: '9000',
				direccion: 'Balbin 2325',
				ciudad: 'bahia blanca',
				provincia: 'buenos aires',
				pais: 'argentina'
			};
			newPropiedad.ambientes = 4;


			propiedadRepository.update(newPropiedad._id, newPropiedad, function(e, obj) {
				expect(e).to.be.null;
				newPropiedad = obj;
				expect(newPropiedad.direccion.direccion).to.eql('Balbin 2325');
				expect(newPropiedad.direccion.codigoPostal).to.eql('9000');
				expect(newPropiedad.ambientes).to.eql(4);
				done();
			});
		});

		it('should return an error when the id doest exist', function(done) {
			newPropiedad.direccion = {
				codigoPostal: '8000',
				direccion: 'Balbin 2325',
				ciudad: 'bahia blanca',
				provincia: 'buenos aires',
				pais: 'argentina'
			};

			propiedadRepository.update(newPropiedad._id + 'a', newPropiedad, function(e, obj) {
				expect(e).to.exist;
				done();
			});
		});
	});

	describe('remove', function() {
		it('should return an error when the object was not removed', function(done) {
			propiedadRepository.remove(newPropiedad._id + "a", function(e) {
				expect(e).to.exist;
				done();
			});
		})

		it('should return a null error when the recently created propiedad was removed successfuly', function(done) {
			propiedadRepository.remove(newPropiedad._id, function(e) {
				expect(e).to.be.null;
				done();
			});
		});
	});

});
