// jshint ignore: start

var contratoRepository = require('../../data/contrato.repository');
var contratoService = require('../../services/contrato.service');
var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

describe('contratoService', function() {
  describe('create', function() {
    it('should call create of the contratoRepository with a contract of 1000 per month  when it is called with such a contract', function() {
      var contrato = {
        alquiler: 1000
      };
      var mock = sinon.mock(contratoRepository);
      mock.expects('create').withArgs(contrato).exactly(1);

      contratoService.create(contrato);
			mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (contratoRepository.getAll.restore) contratoRepository.getAll.restore();
    });

    it('should call getAll of the contratoRepository when it is called ', function() {

      var mock = sinon.mock(contratoRepository);
      mock.expects('getAll').exactly(1);

      contratoService.getAll();

      mock.verify();
    });

    it('should return a rejected promise when getAll returns an error', function(done) {
      var stub = sinon.stub(contratoRepository, 'getAll');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));
      var promise = contratoService.getAll();
      //call the function gave to our repository stub
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var stub = sinon.stub(contratoRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      stub.returns(Promise.resolve(objs));
      var promise = contratoService.getAll();
      //call the function gave to our repository stub
			promise.then(function(result){
      	expect(result).to.eql(objs);
				done();
			});
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (contratoRepository.get.restore) contratoRepository.get.restore();
    });

    it('should call get of the contratoRepository', function() {
      var id = 1;
      var mock = sinon.mock(contratoRepository);
      mock.expects('get').exactly(1).withArgs(id);

      contratoService.get(id);
      mock.verify();
    });

    it('should return a rejected promise  with an error when get returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'get');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = contratoService.get(id);
      //call the function gave to our repository stub
			promise.catch(function(e){
      	expect(e).to.eql(error);
				done();
			});
    });

    it('should a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'get');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve(obj));
      var promise = contratoService.get(id);
      //call the function gave to our repository stub
			promise.then(function(o){
      	expect(o).to.eql(obj);
				done();
			});
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (contratoRepository.remove.restore) contratoRepository.remove.restore();
    });

    it('should call remove of the contratoRepository', function() {
      var id = 1;
      var mock = sinon.mock(contratoRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      contratoService.remove(id);

      mock.verify();
    });

    it('should return a rejected promise with an error when remove returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'remove');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = contratoService.remove(id);
      //call the function gave to our repository stub
			promise.catch(function(e){
      	expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise without data  when there are no errors while removing the contrato', function(done) {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'remove');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve());
      var promise = contratoService.remove(id);
      //call the function gave to our repository stub
			promise.then(function(e){
      	expect(e).not.to.exist;
				done();
			})
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (contratoRepository.update.restore) contratoRepository.update.restore();
    });

    it('should call update of the contratoRepository', function() {
      var id = 1;
      var updatecontrato = {
        apellido: 'test'
      };
      var mock = sinon.mock(contratoRepository);
      mock.expects('update').exactly(1).withArgs(id, updatecontrato);

      contratoService.update(id, updatecontrato);

      mock.verify();
    });

    it('should return a rejected promise with an error when update returns an error', function(done) {
      var id = 1;
      var updatecontrato = {
        apellido: 'test'
      };
      var stub = sinon.stub(contratoRepository, 'update');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));
      var promise = contratoService.update(id, updatecontrato);
      //call the function gave to our repository stub
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;
      var updatecontrato = {
        apellido: 'test'
      };

      var stub = sinon.stub(contratoRepository, 'update');
      var updatedcontrato = {
        apellido: 'test',
        _id: 1
      };
      stub.returns(Promise.resolve(updatedcontrato));

      var promise = contratoService.update(id, updatecontrato);
      //call the function gave to our repository stub
			promise.then(function(o){
				expect(o).to.eql(updatedcontrato);
				done();
			})
    });
  });
});
