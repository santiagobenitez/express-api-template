// jshint ignore: start

var clienteRepository = require('../../data/cliente.repository');
var clienteService = require('../../services/cliente.service');
var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('bluebird');

describe('clienteService', function() {

	describe('create', function() {

		it('should call create of the clienteRepository with a cliente of nombre santiago when it is called with such a cliente', function() {
      var cliente = {
        nombre: 'test'
      };
      var mock = sinon.mock(clienteRepository);
      mock.expects('create').withArgs(cliente).exactly(1);

      clienteService.create(cliente, function(e, obj) {});

      mock.verify();
    });
  });

  describe('getAll', function() {
    afterEach(function() {
      if (clienteRepository.getAll.restore) clienteRepository.getAll.restore();
    });

		it('should return a rejected promise with an error when getAll returns an error', function(done) {

      var stub = sinon.stub(clienteRepository, 'getAll');
      var error = new Error('unexpected error');
			stub.returns(Promise.reject(error));

      var result = clienteService.getAll();
			result.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var stub = sinon.stub(clienteRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
			stub.returns(Promise.resolve(objs));

      var result = clienteService.getAll();
			result.then(function(o){
				expect(o).to.eql(objs);
				done();
			});
    });
  });

  describe('get', function() {
    afterEach(function() {
      if (clienteRepository.get.restore) clienteRepository.get.restore();
    });

    it('should call get of the clienteRepository', function() {
      var id = 1;
      var mock = sinon.mock(clienteRepository);
      mock.expects('get').exactly(1).withArgs(id);

      clienteService.get(id, function(e, obj) {});

      mock.verify();
    });

    it('should return a rejected promise with an error when get returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'get');
      var error = new Error('unexpected error');

			stub.returns(Promise.reject(error));
      var result = clienteService.get(id);
			result.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'get');
      var obj = {
        _id: '123'
      };
			stub.returns(Promise.resolve(obj));

      var result = clienteService.get(id);
			result.then(function(o){
				expect(o).to.eql(obj);
				done();
			});
    });
  });

  describe('remove', function() {
    afterEach(function() {
      if (clienteRepository.remove.restore) clienteRepository.remove.restore();
    });

    it('should call remove of the clienteRepository', function() {
      var id = 1;
      var mock = sinon.mock(clienteRepository);
      mock.expects('remove').exactly(1).withArgs(id);

      clienteService.remove(id, function(e, obj) {});

      mock.verify();
    });

    it('should return a rejected promise with an error when remove returns an error', function(done) {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'remove');
      var error = new Error('unexpected error');
		  stub.returns(Promise.reject(error));
      var result = clienteService.remove(id);
			result.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should should return a fulfilled promise when there are no errors while removing the cliente', function(done) {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'remove');
      var obj = {
        _id: '123'
      };
			stub.returns(Promise.resolve(obj));

      var result = clienteService.remove(id);
      result.then(function(){
				expect(true).to.be.ok;
				done();
			});
    });
  });

  describe('update', function() {
    afterEach(function() {
      if (clienteRepository.update.restore) clienteRepository.update.restore();
    });

    it('should call update of the clienteRepository', function() {
      var id = 1;
      var updateCliente = {
        apellido: 'test'
      };
      var mock = sinon.mock(clienteRepository);
      mock.expects('update').exactly(1).withArgs(id, updateCliente);

      clienteService.update(id, updateCliente, function(e, obj) {});

      mock.verify();
    });

    it('should return a rejected promise with an error when update returns an error', function(done) {
      var id = 1;
      var updateCliente = {
        apellido: 'test'
      };

      var stub = sinon.stub(clienteRepository, 'update');
      var error = new Error('unexpected error');
			stub.returns(Promise.reject(error));

      var result = clienteService.update(id, updateCliente);
			result.catch(function(e){
				expect(e).to.eql(error);
				done();
			});
    });

    it('should return a fulfilled promise with the results returned by the repository when there are no errors', function(done) {
      var id = 1;
      var updateCliente = {
        apellido: 'test'
      };

      var stub = sinon.stub(clienteRepository, 'update');
      var updatedClient = {
        apellido: 'test',
        _id: 1
      };
			stub.returns(Promise.resolve(updatedClient));

      var result = clienteService.update(id, updateCliente);
      result.then(function(c){
				expect(c).to.eql(updatedClient);
				done();
			});
    });
  });
});
