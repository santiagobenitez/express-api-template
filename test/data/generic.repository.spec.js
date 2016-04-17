/*jshint ignore: start */

var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var GenericRepository = require('../../data/generic.repository');
var clienteModel = require('../../data/schemas/cliente.model');
var repository = new GenericRepository(clienteModel);
var mockgoose = require('mockgoose');

var newCliente = {
	direccion: {
		codigoPostal: '8000',
		direccion: 'test test',
		ciudad: 'test city',
		provincia: 'test',
		pais: 'arg'
	},
	nombre: 'test',
	apellido: 'test',
};

describe('generic repository functionality using cliente model', function() {
	before(function(done) {
		mockgoose(mongoose).then(function(){
			mongoose.connect(dbUrl, function(err){
				done();
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
		it('should create a new propiedad when it is a valid property', function(done) {

			repository.create(newCliente, function(e, obj) {
				expect(e).to.be.null;
				expect(obj).to.exist;
				newCliente._id = obj._id;
				done();
			})
		});

		it('should return an error object when the nombre property is not specified', function(done) {
			var newCliente = {
				direccion: {
					codigoPostal: '8000',
					direccion: 'test address',
					ciudad: 'test city',
					provincia: 'province',
					pais: 'arg'
				},
				apellido: 'last name',
			};

			repository.create(newCliente, function(e, obj) {
				expect(e).not.to.be.null;
				expect(e.nombre.message).to.exist;
				done();
			});
		});
	});

	describe('getAll', function() {
		it('should return the recently created propiedad as part of the result', function(done) {

			repository.getAll(function(e, objs) {
				expect(e).to.be.null;
				expect(objs).to.have.length.above(0);
				expect(objs.map(function(item) {
					return item._id
				})).to.contain(newCliente._id);
				done();
			});
		});
	});

	describe('get', function() {
		it('should return the recently created propiedad as part of the result', function(done) {

			repository.get(newCliente._id, function(e, obj) {
				expect(e).to.be.null;
				expect(obj._id).to.eql(newCliente._id);
				done();
			});
		});

		it('should return an error when the id doesnt exist', function(done) {
			repository.get(newCliente._id + "a", function(e, obj) {
				expect(e).to.exist;
				done();
			});
		})
	});

	describe('update', function() {
		it('should update the cliente when the nombre is modified', function(done) {

			newCliente.nombre = 'florencia';


			repository.update(newCliente._id, newCliente, function(e, obj) {
				expect(e).to.be.null;
				newCliente = obj;
				expect(obj.nombre).to.eql('florencia');
				done();
			});
		});

		it('should return an error when the id doest exist', function(done) {

			repository.update(newCliente._id + 'a', newCliente, function(e, obj) {
				expect(e).to.exist;
				done();
			});
		});
	});


	describe('remove', function() {
		it('should return an error when the object was not removed', function(done) {
			repository.remove(newCliente._id + "a", function(e) {
				expect(e).to.exist;
				done();
			});
		})

		it('should return a null error when the recently created propiedad was removed successfuly', function(done) {

			repository.remove(newCliente._id, function(e) {
				expect(e).to.be.null;
				done();
			});
		});
	});
});
