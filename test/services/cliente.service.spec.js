// jshint ignore: start

var clienteRepository = require('../../data/cliente.repository');
var clienteService = require('../../services/cliente.service');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('clienteService', function() {

  describe('function declaration/definition', function() {
    it('should have create defined', function() {
      expect(clienteService.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(clienteService.getAll).to.exist;
    });
    it('should have get defined', function() {
      expect(clienteService.get).to.exist;
    });
    it('should have remove defined', function() {
      expect(clienteService.remove).to.exist;
    });
    it('shoud have update defined', function() {
      expect(clienteService.update).to.exist;
    });
  });

  describe('create', function() {

    it('should call create of the clienteRepository with a cliente of nombre santiago when it is called with such a cliente', function() {
      var cliente = {
        nombre: 'santiago'
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

    it('should call getAll of the clienteRepository when it is called ', function() {

      var mock = sinon.mock(clienteRepository);
      mock.expects('getAll').exactly(1);

      clienteService.getAll(function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when getAll returns an error', function() {

      var stub = sinon.stub(clienteRepository, 'getAll');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      clienteService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {

      var stub = sinon.stub(clienteRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      var inputCallbackSpy = sinon.spy();

      clienteService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](null, objs);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(objs);
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

    it('should call the cb function with an error when get returns an error', function() {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'get');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      clienteService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'get');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      clienteService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(obj);
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

    it('should call the cb function with an error when remove returns an error', function() {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'remove');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      clienteService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with a null error when there are no errors while removing the cliente', function() {
      var id = 1;

      var stub = sinon.stub(clienteRepository, 'remove');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      clienteService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[0]).to.be.null;
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

    it('should call the cb function with an error when update returns an error', function() {
      var id = 1;
      var updateCliente = {
        apellido: 'test'
      };

      var stub = sinon.stub(clienteRepository, 'update');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      clienteService.update(id, updateCliente, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;
      var updateCliente = {
        apellido: 'test'
      };

      var stub = sinon.stub(clienteRepository, 'update');
      var updatedCliente = {
        apellido: 'test',
        _id: 1
      };
      var inputCallbackSpy = sinon.spy();

      clienteService.update(id, updateCliente, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](null, updatedCliente);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(updatedCliente);
    });
  });
});
