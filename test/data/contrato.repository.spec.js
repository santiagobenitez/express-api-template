/*jshint ignore: start */
var dbUrl = 'mongodb://@127.0.0.1:27017/test';
var mongoose = require('mongoose');
var expect = require('chai').expect;
var repository = require('../../data/contrato.repository');
var propiedadRepository = require('../../data/propiedades.repository');
var mockgoose = require('mockgoose');
var Promise = require('bluebird');
var contractModel = require('../../data/schemas/contrato.model');
var sinon = require('sinon');
var mongooseMockHelper = require('./mongoose-mock.helper');

var newContract = {
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
	describe('create', function() {
		afterEach(function(){
			if (contractModel.create.restore) contractModel.create.restore();
		});
 
		it('should return the recently created contract when there are no errors', function(done) {
			var contractModelStub = sinon.stub(contractModel, 'create');
			var contract = mongooseMockHelper.getDocMock(newContract); 
			contractModelStub.returns(Promise.resolve(contract));

			repository.create(newContract).then(function(obj) {
				expect(obj).to.exist;
				done();
			})
		});

		it('should return an error when there is an error while creating the contract', function(done) {
			var contractModelStub = sinon.stub(contractModel, 'create');
			contractModelStub.returns(Promise.reject(new Error('error')));

			repository.create(newContract).catch(function(e) {
				expect(e).not.to.be.null;
				done();
			});
		});
	});

	describe('getAll', function() {
		afterEach(function(){
			if (contractModel.find.restore) contractModel.find.restore();
		});
		it('should return all of the contracts when there are not errors', function(done) {
			var contractModelStub = sinon.stub(contractModel, 'find');
			var queryMock = mongooseMockHelper.getLeanQueryMock(Promise.resolve([{_id: '123'}]));
			contractModelStub.returns(queryMock);

			repository.getAll().then(function(objs) {
				expect(objs).to.have.length.above(0);
				done();
			});
		});
	});

	describe('get', function() {
		afterEach(function(){
			if (contractModel.findById.restore) contractModel.findById.restore();
		});
		it('should return the requested contract when there are not errors while getting it', function(done) {
			var contractDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(contractDoc));
			var contractStub = sinon.stub(contractModel, 'findById');
			contractStub.returns(queryMock);
			repository.get('123').then(function(obj) {
				expect(obj._id).to.eql('123');
				done();
			});
		});

		it('should return an error when there are errors while getting the contract', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var contractStub = sinon.stub(contractModel, 'findById');
			contractStub.returns(queryMock);
			
			repository.get("123").catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});

    it('should return null when the id is valid but the object was not found', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var contractStub = sinon.stub(contractModel, 'findById');
			contractStub.returns(queryMock);
      
			repository.get('123').then(function(obj) {
        expect(obj).to.be.null;
        done();
      });
    })
	});

	describe('update', function() {
		afterEach(function(){
			if (contractModel.findById.restore) contractModel.findById.restore();
		});
	
		it('should the updated contract when there are not errors while updating the contact', function(done) {
	 		var contractDoc = mongooseMockHelper.getDocMock({alquiler: 2000});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(contractDoc));
			var contractStub = sinon.stub(contractModel, 'findById');
			contractStub.returns(queryMock);
			var contractDocStub = sinon.stub(contractDoc, "save");
			contractDocStub.returns(Promise.resolve(contractDoc));

			repository.update('123', newContract).then(function(obj) {
				expect(obj.alquiler).to.eql(2000);
				done();
			});
		});

		it('should return an error when the id doest exist', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var contractStub = sinon.stub(contractModel, 'findById');
			contractStub.returns(queryMock);

			repository.update('123', newContract).catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});
	});

	describe('remove', function() {
		afterEach(function(){
			if (contractModel.findByIdAndRemove.restore) contractModel.findByIdAndRemove.restore();
		});

		it('should return an error when there was an error while removing the contract', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var contractStub = sinon.stub(contractModel, 'findByIdAndRemove');
			contractStub.returns(queryMock);
			repository.remove("123").catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});

		it('should return a null error when a contract is removed successfuly', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var contractStub = sinon.stub(contractModel, 'findByIdAndRemove');
			contractStub.returns(queryMock);

			repository.remove('123').then(function(e) {
				expect(e).not.to.exist;
				done();
			});
		});
	});
});
