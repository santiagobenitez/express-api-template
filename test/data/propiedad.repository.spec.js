/*jshint ignore: start */
var expect = require('chai').expect;
var propiedadRepository = require('../../data/propiedades.repository');
var Promise = require('bluebird');
var mongooseMockHelper = require('./mongoose-mock.helper');
var realEstateModel = require('../../data/schemas/propiedad.model');
var sinon = require('sinon');

var newrealEstate = {
	direccion: {},
	ambientes: 1,
	banios: 1,
	expensas: 1,
	metrosCuadrados: 1,
};

describe('propiedadRepository', function() {
	describe('create', function() {
		afterEach(function(){
			if (realEstateModel.create.restore) realEstateModel.create.restore();
		});
		it('should create a new real estate when it is a valid real estate', function(done) {
			var realEstateModelStub = sinon.stub(realEstateModel, 'create');
			var realEstateMock = mongooseMockHelper.getDocMock(newrealEstate); 
			realEstateModelStub.returns(Promise.resolve(realEstateMock));
			
			propiedadRepository.create(newrealEstate).then(function(obj) {
				expect(obj).to.exist;
				done();
			});
		});

		it('should return an error object when there was an error while creating the real estate', function(done) {
			var realEstateModelStub = sinon.stub(realEstateModel, 'create');
			realEstateModelStub.returns(Promise.reject(new Error('error')));

			propiedadRepository.create(newrealEstate).catch(function(e) {
				expect(e).not.to.be.null;
				done();
			});
		});
	});

	describe('getAll', function() {
		
		afterEach(function(){
			if (realEstateModel.find.restore) realEstateModel.find.restore();
		});

		it('should return all of the real estates as part of the result when there are not errors while getting the real estates', function(done) {
			var realEstateModelStub = sinon.stub(realEstateModel, 'find');
			var queryMock = mongooseMockHelper.getLeanQueryMock(Promise.resolve([{_id: '123'}]));
			realEstateModelStub.returns(queryMock);
			
			propiedadRepository.getAll().then(function(objs) {
				expect(objs).to.have.length.above(0);
				done();
			});
		});
	});

	describe('get', function() {
		afterEach(function(){
			if (realEstateModel.findById.restore) realEstateModel.findById.restore();
		});
		it('should return a real estate as part of the result when there are not errors while getting the real estate', function(done) {
			var realEstateDoc = mongooseMockHelper.getDocMock({_id: '123'});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(realEstateDoc));
			var realEstateStub = sinon.stub(realEstateModel, 'findById');
			realEstateStub.returns(queryMock);
			propiedadRepository.get('123').then(function(obj) {
				expect(obj._id).to.eql('123');
				done();
			});
		});

		it('should return an error when there was an error while getting the real estate', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('123')));
			var realEstateStub = sinon.stub(realEstateModel, 'findById');
			realEstateStub.returns(queryMock);
			propiedadRepository.get('123').catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});

		it('should return null when the id is valid but the object was not found', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var realEstateStub = sinon.stub(realEstateModel, 'findById');
			realEstateStub.returns(queryMock);
			propiedadRepository.get('123').then(function(obj) {
				expect(obj).to.be.null;
				done();
			});
		});
	});

	describe('update', function() {
		afterEach(function(){
			if (realEstateModel.findById.restore) realEstateModel.findById.restore();
		});

		it('should return an updated a real estate when the real estate is updated successfully', function(done) {
			var realEstateDoc = mongooseMockHelper.getDocMock({ambientes: 4});
      var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(realEstateDoc));
			var realEstateStub = sinon.stub(realEstateModel, 'findById');
			realEstateStub.returns(queryMock);
			var realEstateDocStub = sinon.stub(realEstateDoc, "save");
			realEstateDocStub.returns(Promise.resolve(realEstateDoc));

			propiedadRepository.update('123', newrealEstate).then(function(obj) {
				expect(obj.ambientes).to.eql(4);
				done();
			});
		});

		it('should return an error when there is an error while updating the real estate', function(done) {
      var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var realEstateStub = sinon.stub(realEstateModel, 'findById');
			realEstateStub.returns(queryMock);

			propiedadRepository.update('123', newrealEstate).catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});
	});

	describe('remove', function() {
		afterEach(function(){
			if (realEstateModel.findByIdAndRemove.restore) realEstateModel.findByIdAndRemove.restore();
		});
		it('should return an error when there was while removing the real estate', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.reject(new Error('error')));
			var realEstateStub = sinon.stub(realEstateModel, 'findByIdAndRemove');
			realEstateStub.returns(queryMock);
			
			propiedadRepository.remove("123").catch(function(e) {
				expect(e).to.exist;
				done();
			});
		});

		it('should return a null error when a real estate was removed successfuly', function(done) {
			var queryMock = mongooseMockHelper.getQueryMock(Promise.resolve(null));
			var realEstateStub = sinon.stub(realEstateModel, 'findByIdAndRemove');
			realEstateStub.returns(queryMock);

			propiedadRepository.remove('123').then(function(e) {
				expect(e).not.to.exist;
				done();
			});
		});
	});
});
