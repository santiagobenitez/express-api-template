// jshint ignore: start

var propiedadesRepository = require('../../data/propiedades.repository');
var propiedadesService = require('../../services/propiedades.service');
var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

describe('propiedadesService', function() {

  describe('create', function() {

    it('should call create of the propiedadesRepository with a real estate of two rooms  when it is called', function() {
      var propiedad = {
        ambientes: 2
      };
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('create').withArgs(propiedad).exactly(1);

      propiedadesService.create(propiedad);

      mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (propiedadesRepository.getAll.restore) propiedadesRepository.getAll.restore();
    });

    it('should call getAll of the propiedadesRepository when it is called ', function() {

      var mock = sinon.mock(propiedadesRepository);
      mock.expects('getAll').exactly(1);

      propiedadesService.getAll();

      mock.verify();
    });

    it('should return a rejected promise with an error when getAll returns an error', function(done) {

      var stub = sinon.stub(propiedadesRepository, 'getAll');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = propiedadesService.getAll();
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {

      var stub = sinon.stub(propiedadesRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];

      stub.returns(Promise.resolve(objs));
      var promise = propiedadesService.getAll();
      promise.then(function(o){
				expect(o).to.eql(objs);
				done();
			});
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (propiedadesRepository.get.restore) propiedadesRepository.get.restore();
    });

    it('should call get of the propiedadesRepository', function() {
      var id = 1;
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('get').exactly(1).withArgs(id);

      propiedadesService.get(id);

      mock.verify();
    });

    it('should return a rejected promise with an error when get returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'get');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = propiedadesService.get(id);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});	
    });

    it('should return a fulfilled promise  with the results returned by the repository when there are no errors', function(done) {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'get');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve(obj));

      var promise = propiedadesService.get(id);
			promise.then(function(o){
				expect(o).to.eql(obj);
				done();
			});
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (propiedadesRepository.update.restore) propiedadesRepository.update.restore();
    });

    it('should call update of the propiedadesRepository', function() {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('update').exactly(1).withArgs(id, updatePropiedad);

      propiedadesService.update(id, updatePropiedad);

      mock.verify();
    });

    it('should return a rejected promise with an error when update returns an error', function(done) {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };

      var stub = sinon.stub(propiedadesRepository, 'update');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));
      var promise = propiedadesService.update(id, updatePropiedad);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;
      var updatePropiedad = {
        ambientes: 1
      };

      var stub = sinon.stub(propiedadesRepository, 'update');
      var updatedPropiedad = {
        ambientes: 1,
        _id: 1
      };
      stub.returns(Promise.resolve(updatedPropiedad));

      var promise = propiedadesService.update(id, updatePropiedad);
			promise.then(function(prop){
				expect(prop).to.eql(updatedPropiedad);
				done();
			});
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (propiedadesRepository.remove.restore) propiedadesRepository.remove.restore();
    });

    it('should call remove of the propiedadesRepository', function() {
      var id = 1;
      var mock = sinon.mock(propiedadesRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      propiedadesService.remove(id);

      mock.verify();
    });

    it('should return a rejected promise with an error when remove returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'remove');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = propiedadesService.remove(id);
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise when there are no errors while removing the real estate', function(done) {
      var id = 1;

      var stub = sinon.stub(propiedadesRepository, 'remove');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve());

      var promise = propiedadesService.remove(id);
			promise.then(function(){
				expect(true).to.be.ok;
				done();
			});
    });
  });
});
