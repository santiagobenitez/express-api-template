// jshint ignore: start

var contratoRepository = require('../../data/contrato.repository');
var contratoService = require('../../services/contrato.service');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('contratoService', function() {

  describe('function declaration/definition', function() {
    it('should have create defined', function() {
      expect(contratoService.create).to.exist;
    });
    it('should have getAll defined', function() {
      expect(contratoService.getAll).to.exist;
    });
    it('should have get defined', function() {
      expect(contratoService.get).to.exist;
    });
    it('should have remove defined', function() {
      expect(contratoService.remove).to.exist;
    });
    it('shoud have update defined', function() {
      expect(contratoService.update).to.exist;
    });
  });

  describe('create', function() {

    it('should call create of the contratoRepository with a contrato of alquiler 1000 when it is called with such a contrato', function() {
      var contrato = {
        alquiler: 1000
      };
      var mock = sinon.mock(contratoRepository);
      mock.expects('create').withArgs(contrato).exactly(1);

      contratoService.create(contrato, function(e, obj) {});

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

      contratoService.getAll(function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when getAll returns an error', function() {

      var stub = sinon.stub(contratoRepository, 'getAll');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      contratoService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {

      var stub = sinon.stub(contratoRepository, 'getAll');
      var objs = [{
        _id: '123'
      }];
      var inputCallbackSpy = sinon.spy();

      contratoService.getAll(inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[0](null, objs);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(objs);
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

      contratoService.get(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when get returns an error', function() {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'get');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      contratoService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'get');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      contratoService.get(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(obj);
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

      contratoService.remove(id, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when remove returns an error', function() {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'remove');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      contratoService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with a null error when there are no errors while removing the contrato', function() {
      var id = 1;

      var stub = sinon.stub(contratoRepository, 'remove');
      var obj = {
        _id: '123'
      };
      var inputCallbackSpy = sinon.spy();

      contratoService.remove(id, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[1](null, obj);
      expect(inputCallbackSpy.getCall(0).args[0]).to.be.null;
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

      contratoService.update(id, updatecontrato, function(e, obj) {});

      mock.verify();
    });

    it('should call the cb function with an error when update returns an error', function() {
      var id = 1;
      var updatecontrato = {
        apellido: 'test'
      };

      var stub = sinon.stub(contratoRepository, 'update');
      var error = new Error('unexpected error');
      var inputCallbackSpy = sinon.spy();

      contratoService.update(id, updatecontrato, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](error, null);
      expect(inputCallbackSpy.getCall(0).args[0]).to.eql(error);
    });

    it('should call the cb function with the results returned by the repository when there are no errors', function() {
      var id = 1;
      var updatecontrato = {
        apellido: 'test'
      };

      var stub = sinon.stub(contratoRepository, 'update');
      var updatedcontrato = {
        apellido: 'test',
        _id: 1
      };
      var inputCallbackSpy = sinon.spy();

      contratoService.update(id, updatecontrato, inputCallbackSpy);
      //call the function gave to our repository stub
      stub.getCall(0).args[2](null, updatedcontrato);
      expect(inputCallbackSpy.getCall(0).args[1]).to.eql(updatedcontrato);
    });
  });
});
