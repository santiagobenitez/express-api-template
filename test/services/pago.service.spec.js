// jshint ignore: start

var pagoRepository = require('../../data/pago.repository');
var pagoService = require('../../services/pago.service');
var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

describe('pagoService', function() {

  describe('create', function() {

    it('should call create of the pagoRepository with a payment of 1000 when it is called', function() {
      var pago = {
        importe: 1000
      };
      var mock = sinon.mock(pagoRepository);
      mock.expects('create').withArgs(pago).exactly(1);

      pagoService.create(pago);

      mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (pagoRepository.getAll.restore) pagoRepository.getAll.restore();
    });

    it('should call getAll of the pagoRepository when it is called ', function() {

      var mock = sinon.mock(pagoRepository);
      mock.expects('getAll').exactly(1);

      pagoService.getAll();

      mock.verify();
    });

    it('should return a rejected promise with an error when getAll returns an error', function(done) {

      var stub = sinon.stub(pagoRepository, 'getAll');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));
      var promise = pagoService.getAll();
      //call the function gave to our repository stub
			promise.catch(function(e){
      	expect(e).to.eql(error);
				done();
			});			
    });

    it('should a fulfilled promise with the results returned by the repository when there are no errors', function(done) {

      var stub = sinon.stub(pagoRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      stub.returns(Promise.resolve(objs));
      var promise = pagoService.getAll();
      //call the function gave to our repository stub

			promise.then(function(o){
				expect(o).to.eql(objs);
				done();
			});
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (pagoRepository.get.restore) pagoRepository.get.restore();
    });

    it('should call get of the pagoRepository', function() {
      var id = 1;
      var mock = sinon.mock(pagoRepository);
      mock.expects('get').exactly(1).withArgs(id);

      pagoService.get(id);

      mock.verify();
    });

    it('should return a rejected promise with an error when get returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'get');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = pagoService.get(id);
      //call the function gave to our repository stub
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			})
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'get');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve(obj));

      var promise = pagoService.get(id);
      //call the function gave to our repository stub
			promise.then(function(o){
				expect(o).to.eql(obj);
				done();
			})
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (pagoRepository.remove.restore) pagoRepository.remove.restore();
    });

    it('should call remove of the pagoRepository', function() {
      var id = 1;
      var mock = sinon.mock(pagoRepository);
      mock.expects('remove').exactly(1).withArgs(id);
      pagoService.remove(id);

      mock.verify();
    });

    it('should return a rejected promise  with an error when remove returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'remove');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));
      var promise = pagoService.remove(id);
      //call the function gave to our repository stub
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should a fulfilled promise there are no errors while removing the pago', function(done) {
      var id = 1;

      var stub = sinon.stub(pagoRepository, 'remove');
      var obj = {
        _id: '123'
      };
      stub.returns(Promise.resolve(obj));
      var promise = pagoService.remove(id);
      //call the function gave to our repository stub
			promise.then(function(){
				expect(true).to.be.ok;
				done();
			});
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (pagoRepository.update.restore) pagoRepository.update.restore();
    });

    it('should call update of the pagoRepository', function() {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };
      var mock = sinon.mock(pagoRepository);
      mock.expects('update').exactly(1).withArgs(id, updatepago);

      pagoService.update(id, updatepago);

      mock.verify();
    });

    it('should return a rejected promise  with an error when update returns an error', function(done) {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };

      var stub = sinon.stub(pagoRepository, 'update');
      var error = new Error('unexpected error');
      stub.returns(Promise.reject(error));

      var promise = pagoService.update(id, updatepago);
      //call the function gave to our repository stub
			promise.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;
      var updatepago = {
        apellido: 'test'
      };

      var stub = sinon.stub(pagoRepository, 'update');
      var updatedpago = {
        apellido: 'test',
        _id: 1
      };
      stub.returns(Promise.resolve(updatedpago));

      var promise = pagoService.update(id, updatepago);
      //call the function gave to our repository stub
			promise.then(function(o){
				expect(o).to.eql(updatedpago);
				done();
			});
    });
  });
});
